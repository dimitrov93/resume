import { useEffect, type MouseEvent } from 'react'
import useTheme from './useTheme'

export const CV_FILE_NAME = 'Tsvetomir_Dimitrov_CV.pdf'

// Share sheet is only offered on touch devices; desktops keep a plain download.
const isTouchDevice = () => window.matchMedia('(pointer: coarse)').matches
const canShareFiles = () => typeof navigator.canShare === 'function' && isTouchDevice()

// iOS only opens the share sheet right after a tap, so the file is fetched up front
// and kept here; awaiting the fetch inside the click handler would lose the tap.
const cvFiles = new Map<string, File>()
const pending = new Set<string>()

const absolute = (href: string) => new URL(href, window.location.href).href

// Skip the prefetch for visitors on Data Saver or a 2G connection; they get the plain download.
function prefersLessData() {
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection
  return !!conn && (conn.saveData === true || /(^|-)2g$/.test(conn.effectiveType ?? ''))
}

function prefetchCvFile(href: string) {
  const key = absolute(href)
  if (cvFiles.has(key) || pending.has(key)) return
  pending.add(key)
  fetch(key)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res.arrayBuffer()
    })
    .then(buf => cvFiles.set(key, new File([buf], CV_FILE_NAME, { type: 'application/pdf' })))
    .catch(() => {})
    .finally(() => pending.delete(key))
}

export default function useCvPdf(): string {
  const { theme } = useTheme()
  const pdf = theme === 'dark' ? '/cv-noir.pdf' : '/cv-classic.pdf'

  useEffect(() => {
    if (!canShareFiles() || prefersLessData()) return
    // Wait until the page is idle so the prefetch doesn't compete with the first render.
    const href = cvDownloadUrl(pdf)
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(() => prefetchCvFile(href), { timeout: 4000 })
      return () => window.cancelIdleCallback(id)
    }
    const id = window.setTimeout(() => prefetchCvFile(href), 2000)
    return () => window.clearTimeout(id)
  }, [pdf])

  return pdf
}

// `?download=1` makes Vercel send `Content-Disposition: attachment` (see vercel.json),
// so phones save the file instead of opening it — mobile Safari ignores the `download` attribute.
export function cvDownloadUrl(pdf: string): string {
  return `${pdf}?download=1`
}

// On phones: open the native share sheet (Save to Files, WhatsApp, Mail…).
// Elsewhere, or if sharing isn't possible: fetch the file as an `application/octet-stream`
// blob, which leaves the browser nothing to preview, so it saves it.
// Falls back to normal navigation if the fetch fails.
export async function downloadCv(e: MouseEvent<HTMLAnchorElement>) {
  const href = e.currentTarget.href
  e.preventDefault()

  const file = cvFiles.get(absolute(href))
  if (file && canShareFiles() && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: 'Tsvetomir Dimitrov — CV' })
      return
    } catch (err) {
      // User closed the share sheet — nothing else to do.
      if (err instanceof DOMException && err.name === 'AbortError') return
    }
  }

  try {
    const res = await fetch(href)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const blob = new Blob([await res.arrayBuffer()], { type: 'application/octet-stream' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = CV_FILE_NAME
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 10_000)
  } catch {
    window.location.href = href
  }
}

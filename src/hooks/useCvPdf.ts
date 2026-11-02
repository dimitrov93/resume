import type { MouseEvent } from 'react'
import useTheme from './useTheme'

export const CV_FILE_NAME = 'Tsvetomir_Dimitrov_CV.pdf'

export default function useCvPdf(): string {
  const { theme } = useTheme()
  return theme === 'dark' ? '/cv-noir.pdf' : '/cv-classic.pdf'
}

// `?download=1` makes Vercel send `Content-Disposition: attachment` (see vercel.json),
// so phones save the file instead of opening it — mobile Safari ignores the `download` attribute.
export function cvDownloadUrl(pdf: string): string {
  return `${pdf}?download=1`
}

// Phones open PDFs in their viewer even with the `download` attribute. Fetching the file
// as an `application/octet-stream` blob leaves the browser nothing to preview, so it saves it.
// Falls back to normal navigation if the fetch fails.
export async function downloadCv(e: MouseEvent<HTMLAnchorElement>) {
  const href = e.currentTarget.href
  e.preventDefault()
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

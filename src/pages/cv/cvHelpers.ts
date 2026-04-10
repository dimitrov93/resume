export type Theme = {
  name: string
  accent: string
  accentRgb: string
  dark: string
  darkRgb: string
  sideStart: string
  sideEnd: string
  sideBorder: string
  eduBorder: string
  chipBg: string
}

export const THEMES: Theme[] = [
  { name: 'Classic',   accent: '#c9a44a', accentRgb: '201,164,74',  dark: '#1c2b4a', darkRgb: '28,43,74',  sideStart: '#f7f6f2', sideEnd: '#ede9e0', sideBorder: '#ddd7c8', eduBorder: '#e0d8c8', chipBg: '#f9f7f2' },
  { name: 'Noir',      accent: '#c9a44a', accentRgb: '201,164,74',  dark: '#1a1a1a', darkRgb: '26,26,26',  sideStart: '#f7f6f2', sideEnd: '#ede9e0', sideBorder: '#ddd7c8', eduBorder: '#e0d8c8', chipBg: '#f9f7f2' },
  { name: 'Executive', accent: '#5b8db8', accentRgb: '91,141,184',  dark: '#1e1e1e', darkRgb: '30,30,30',  sideStart: '#f3f5f8', sideEnd: '#e8edf3', sideBorder: '#d0d8e4', eduBorder: '#d5dde8', chipBg: '#f5f7fa' },
  { name: 'Crimson',   accent: '#c0392b', accentRgb: '192,57,43',   dark: '#1a1a1a', darkRgb: '26,26,26',  sideStart: '#faf4f4', sideEnd: '#f2e8e8', sideBorder: '#e0cece', eduBorder: '#e4d2d2', chipBg: '#fdf7f7' },
  { name: 'Minimal',   accent: '#888888', accentRgb: '136,136,136', dark: '#111111', darkRgb: '17,17,17',  sideStart: '#f8f8f8', sideEnd: '#efefef', sideBorder: '#dddddd', eduBorder: '#e2e2e2', chipBg: '#fafafa' },
  { name: 'Ocean',     accent: '#3d9ea8', accentRgb: '61,158,168',  dark: '#1a3a4a', darkRgb: '26,58,74',  sideStart: '#f2f7f8', sideEnd: '#e2eff1', sideBorder: '#c8dde0', eduBorder: '#cfe3e6', chipBg: '#f4f9fa' },
  { name: 'Forest',    accent: '#6a9e6f', accentRgb: '106,158,111', dark: '#1a3a22', darkRgb: '26,58,34',  sideStart: '#f4f7f4', sideEnd: '#e6ede7', sideBorder: '#ccd8cd', eduBorder: '#d2dbd3', chipBg: '#f6f9f6' },
  { name: 'Ruby',      accent: '#b85c5c', accentRgb: '184,92,92',   dark: '#3a1a1a', darkRgb: '58,26,26',  sideStart: '#faf5f5', sideEnd: '#f0e8e8', sideBorder: '#decece', eduBorder: '#e2d4d4', chipBg: '#fdf8f8' },
  { name: 'Amethyst',  accent: '#8b72be', accentRgb: '139,114,190', dark: '#2a1a4a', darkRgb: '42,26,74',  sideStart: '#f6f4fb', sideEnd: '#ece8f5', sideBorder: '#d8d0e8', eduBorder: '#ddd8ec', chipBg: '#f8f6fd' },
  { name: 'Ember',     accent: '#c97a3a', accentRgb: '201,122,58',  dark: '#2a1a0a', darkRgb: '42,26,10',  sideStart: '#faf6f2', sideEnd: '#f0e8e0', sideBorder: '#e0d4c8', eduBorder: '#e4d8cc', chipBg: '#fdf9f5' },
]

export function applyTheme(root: HTMLElement, t: Theme) {
  root.style.setProperty('--accent', t.accent)
  root.style.setProperty('--accent-rgb', t.accentRgb)
  root.style.setProperty('--dark', t.dark)
  root.style.setProperty('--dark-rgb', t.darkRgb)
  root.style.setProperty('--sidebar-start', t.sideStart)
  root.style.setProperty('--sidebar-end', t.sideEnd)
  root.style.setProperty('--sidebar-border', t.sideBorder)
  root.style.setProperty('--edu-border', t.eduBorder)
  root.style.setProperty('--chip-bg', t.chipBg)
}

const crcTable: Uint32Array = (() => {
  const t = new Uint32Array(256)
  for (let i = 0; i < 256; i++) {
    let c = i
    for (let j = 0; j < 8; j++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    t[i] = c
  }
  return t
})()

function crc32(data: Uint8Array): number {
  let c = 0xffffffff
  for (let i = 0; i < data.length; i++) c = crcTable[(c ^ data[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

export function buildZip(files: { name: string; data: string }[]): Uint8Array {
  const enc = new TextEncoder()
  const entries: { name: Uint8Array; crc: number; size: number; offset: number }[] = []
  const parts: Uint8Array[] = []
  let offset = 0
  for (const f of files) {
    const name = enc.encode(f.name)
    const data = enc.encode(f.data)
    const crc = crc32(data)
    const lh = new Uint8Array(30 + name.length)
    const lv = new DataView(lh.buffer)
    lv.setUint32(0, 0x04034b50, true)
    lv.setUint16(4, 20, true)
    lv.setUint32(14, crc, true)
    lv.setUint32(18, data.length, true)
    lv.setUint32(22, data.length, true)
    lv.setUint16(26, name.length, true)
    lh.set(name, 30)
    entries.push({ name, crc, size: data.length, offset })
    parts.push(lh, data)
    offset += lh.length + data.length
  }
  const cdParts: Uint8Array[] = []
  let cdSize = 0
  const cdOffset = offset
  for (const e of entries) {
    const cd = new Uint8Array(46 + e.name.length)
    const cv = new DataView(cd.buffer)
    cv.setUint32(0, 0x02014b50, true)
    cv.setUint16(4, 20, true)
    cv.setUint16(6, 20, true)
    cv.setUint32(16, e.crc, true)
    cv.setUint32(20, e.size, true)
    cv.setUint32(24, e.size, true)
    cv.setUint16(28, e.name.length, true)
    cv.setUint32(42, e.offset, true)
    cd.set(e.name, 46)
    cdParts.push(cd)
    cdSize += cd.length
  }
  const eocd = new Uint8Array(22)
  const ev = new DataView(eocd.buffer)
  ev.setUint32(0, 0x06054b50, true)
  ev.setUint16(8, entries.length, true)
  ev.setUint16(10, entries.length, true)
  ev.setUint32(12, cdSize, true)
  ev.setUint32(16, cdOffset, true)
  const all = [...parts, ...cdParts, eocd]
  const out = new Uint8Array(all.reduce((s, p) => s + p.length, 0))
  let pos = 0
  for (const p of all) {
    out.set(p, pos)
    pos += p.length
  }
  return out
}

export function downloadBlob(blob: Blob, filename: string) {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = filename
  a.click()
  setTimeout(() => URL.revokeObjectURL(a.href), 1000)
}

export async function fetchAsDataUrl(src: string): Promise<string | null> {
  try {
    const resp = await fetch(src)
    const blob = await resp.blob()
    return await new Promise((res) => {
      const fr = new FileReader()
      fr.onload = (e) => res(e.target!.result as string)
      fr.readAsDataURL(blob)
    })
  } catch {
    return null
  }
}

// React strips inline event handlers when serializing innerHTML — re-inject the
// onclick/onchange the standalone HTML's vanilla script depends on.
function reinjectInlineHandlers(innerHtml: string): string {
  return innerHtml
    .replace(
      /<div([^>]*?)class="photo-overlay edit-visible"([^>]*?)>/,
      `<div$1class="photo-overlay edit-visible" onclick="document.getElementById('photo-input').click()"$2>`,
    )
    .replace(
      /<input([^>]*?)id="photo-input"([^>]*?)\/?>/,
      `<input$1id="photo-input"$2 onchange="handlePhoto(event)" />`,
    )
}

function applyThemeToTemplate(template: string, t: Theme): string {
  return template
    .replace(/--accent:\s*[^;]+;/, `--accent: ${t.accent};`)
    .replace(/--accent-rgb:\s*[^;]+;/, `--accent-rgb: ${t.accentRgb};`)
    .replace(/--dark:\s*[^;]+;/, `--dark: ${t.dark};`)
    .replace(/--dark-rgb:\s*[^;]+;/, `--dark-rgb: ${t.darkRgb};`)
    .replace(/--sidebar-start:\s*[^;]+;/, `--sidebar-start: ${t.sideStart};`)
    .replace(/--sidebar-end:\s*[^;]+;/, `--sidebar-end: ${t.sideEnd};`)
    .replace(/--sidebar-border:\s*[^;]+;/, `--sidebar-border: ${t.sideBorder};`)
    .replace(/--edu-border:\s*[^;]+;/, `--edu-border: ${t.eduBorder};`)
    .replace(/--chip-bg:\s*[^;]+;/, `--chip-bg: ${t.chipBg};`)
}

export function buildStandaloneHtml(opts: {
  template: string
  pageInnerHtml: string
  theme?: Theme | null
}): string {
  let html = opts.template
  if (opts.theme) html = applyThemeToTemplate(html, opts.theme)
  const inner = reinjectInlineHandlers(opts.pageInnerHtml)
  return html.replace(
    /(<div class="page" id="cv-page">)[\s\S]*?(<\/div><!-- \/page -->)/,
    (_match, openTag: string, closeTag: string) => `${openTag}${inner}${closeTag}`,
  )
}

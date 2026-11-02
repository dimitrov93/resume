import useTheme from './useTheme'

export default function useCvPdf(): string {
  const { theme } = useTheme()
  return theme === 'dark' ? '/cv-noir.pdf' : '/cv-classic.pdf'
}

// `?download=1` makes Vercel send `Content-Disposition: attachment` (see vercel.json),
// so phones save the file instead of opening it — mobile Safari ignores the `download` attribute.
export function cvDownloadUrl(pdf: string): string {
  return `${pdf}?download=1`
}

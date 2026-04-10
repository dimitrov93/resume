import useTheme from './useTheme'

export default function useCvPdf(): string {
  const { theme } = useTheme()
  return theme === 'dark' ? '/cv-noir.pdf' : '/cv-classic.pdf'
}

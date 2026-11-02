// Inline SVG flags: Windows has no flag emoji glyphs and renders "🇧🇬" as the letters "BG".
export default function LangFlag({ lang, className = 'w-4 h-3' }: { lang: 'bg' | 'en'; className?: string }) {
  if (lang === 'bg') {
    return (
      <svg viewBox="0 0 5 3" className={`${className} rounded-[2px] shrink-0`} aria-hidden="true">
        <rect width="5" height="1" y="0" fill="#ffffff" />
        <rect width="5" height="1" y="1" fill="#00966e" />
        <rect width="5" height="1" y="2" fill="#d62612" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 19 10" className={`${className} rounded-[2px] shrink-0`} aria-hidden="true">
      <rect width="19" height="10" fill="#b22234" />
      {[1, 3, 5, 7, 9].map(y => (
        <rect key={y} width="19" height={10 / 13} y={(y * 10) / 13} fill="#ffffff" />
      ))}
      <rect width="7.6" height={(7 * 10) / 13} fill="#3c3b6e" />
    </svg>
  )
}

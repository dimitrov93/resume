import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useLanguage from '../hooks/useLanguage'
import { profile } from '../data/profile'

export default function NotFound() {
  const { t } = useLanguage()

  // Vercel serves this page with status 200 (SPA fallback), so tell search engines not to index it.
  useEffect(() => {
    const prevTitle = document.title
    document.title = `${t('notFound.title')} — ${profile.name}`
    const robots = document.createElement('meta')
    robots.name = 'robots'
    robots.content = 'noindex'
    document.head.appendChild(robots)
    return () => {
      document.title = prevTitle
      robots.remove()
    }
  }, [t])

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg text-paragraph p-5">
      <main className="flex flex-col items-center gap-6 text-center">
        <div aria-hidden="true" className="text-[clamp(100px,20vw,180px)] font-black leading-none bg-linear-to-br from-accent to-accent-2 bg-clip-text text-transparent">
          404
        </div>
        <h1 className="text-[clamp(18px,3vw,28px)] font-semibold text-heading">
          {t('notFound.title')}
        </h1>
        <p className="text-sm text-muted max-w-100 leading-relaxed">
          {t('notFound.description')}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-linear-to-br from-accent to-accent-2 text-accent-text text-sm font-semibold no-underline transition-[filter] duration-300 hover:brightness-110"
        >
          {t('notFound.backHome')}
        </Link>
      </main>
    </div>
  )
}

import { motion } from 'framer-motion'
import { FiSun, FiMoon } from 'react-icons/fi'
import useLanguage from '../../hooks/useLanguage'
import useTheme from '../../hooks/useTheme'
import type { TranslationKey } from '../../data/translations'
import LangFlag from './LangFlag'

const tabs = ['About', 'Resume', 'Certifications', 'Portfolio', 'Contact'] as const

const tabTranslationKeys: Record<string, TranslationKey> = {
  About: 'nav.about',
  Resume: 'nav.resume',
  Certifications: 'nav.certifications',
  Portfolio: 'nav.portfolio',
  Contact: 'nav.contact',
}

interface NavTabsProps {
  active: string
  setActive: (tab: (typeof tabs)[number]) => void
}

function pillRadius(i: number) {
  const r = '12px'
  if (i === 0) return `${r} ${r} ${r} 0`
  if (i === tabs.length - 1) return `${r} ${r} 0 ${r}`
  return r
}


export default function NavTabs({ active, setActive }: NavTabsProps) {
  const { t, lang, toggle: toggleLang } = useLanguage()
  const { theme, toggle: toggleTheme } = useTheme()
  return (
    <nav className="relative" aria-label={t('a11y.mainMenu')}>
      <div className="flex items-center bg-surface border border-border-gold rounded-t-[20px] rounded-br-none rounded-bl-none overflow-hidden">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            aria-current={active === tab ? 'page' : undefined}
            className={`relative cursor-pointer text-[13px] font-medium px-5 py-3 min-w-[80px] text-center border-none bg-transparent whitespace-nowrap transition-colors duration-300 ${
              active === tab ? 'text-accent-text' : 'text-dim hover:text-muted'
            }`}
          >
            {active === tab && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 bg-linear-to-br from-accent to-accent-2 shadow-[0_2px_10px_var(--color-border-gold)]"
                style={{ borderRadius: pillRadius(i) }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{t(tabTranslationKeys[tab])}</span>
          </button>
        ))}
        <div className="flex items-center gap-1 px-3 ml-auto border-l border-border-gold">
          <button
            onClick={toggleTheme}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-dim cursor-pointer hover:text-accent hover:bg-overlay-5 transition-all duration-300 bg-transparent border-none"
            aria-label={t('a11y.toggleTheme')}
          >
            {theme === 'dark' ? <FiSun size={13} /> : <FiMoon size={13} />}
          </button>
          <button
            onClick={toggleLang}
            className="h-7 px-1.5 rounded-lg flex items-center justify-center gap-1 cursor-pointer hover:bg-overlay-5 transition-all duration-300 bg-transparent border-none text-[12px] leading-none"
          >
            <span className="sr-only">{t('a11y.switchLanguageTo')} </span>
            {lang === 'en' ? <><LangFlag lang="bg" /><span className="text-[10px] font-semibold text-dim">BG</span></> : <><LangFlag lang="en" /><span className="text-[10px] font-semibold text-dim">EN</span></>}
          </button>
        </div>
      </div>
    </nav>
  )
}

import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/profile'
import { AnimatePresence, motion } from 'framer-motion'
import { FiX, FiSun, FiMoon } from 'react-icons/fi'
import CvPreviewModal from '../components/ui/CvPreviewModal'
import { SidebarFull, SidebarCompact } from '../components/Sidebar'
import NavTabs from '../components/ui/NavTabs'
import SectionLine from '../components/ui/SectionLine'
import About from '../components/sections/About'
import Resume from '../components/sections/Skills'
import Portfolio from '../components/sections/Portfolio'

import Certifications from '../components/sections/Certifications'
import Contact from '../components/sections/Contact'
import useLanguage from '../hooks/useLanguage'
import useTheme from '../hooks/useTheme'
import useCvPdf from '../hooks/useCvPdf'
import LanguageSwitcher from '../components/ui/LanguageSwitcher'
import useDialog from '../hooks/useDialog'
import useHashTab from '../hooks/useHashTab'
import useMediaQuery from '../hooks/useMediaQuery'

const sections: Record<string, React.FC> = { About, Resume, Certifications, Portfolio, Contact }
const tabs = ['About', 'Resume', 'Certifications', 'Portfolio', 'Contact'] as const
type Tab = (typeof tabs)[number]

const tabTranslationKeys: Record<string, 'nav.about' | 'nav.resume' | 'nav.certifications' | 'nav.portfolio' | 'nav.contact'> = {
  About: 'nav.about',
  Resume: 'nav.resume',
  Certifications: 'nav.certifications',
  Portfolio: 'nav.portfolio',
  Contact: 'nav.contact',
}

const pageVariants = {
  initial: { opacity: 0, y: 14, scale: 0.99 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  exit: { opacity: 0, y: -8, scale: 0.99, transition: { duration: 0.18, ease: 'easeIn' as const } },
}

function MobileMenu({ active, onSelect, onClose }: {
  active: string
  onSelect: (tab: Tab) => void
  onClose: () => void
}) {
  const { t } = useLanguage()
  const { theme, toggle: toggleTheme } = useTheme()
  const closeRef = useDialog(onClose)
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 z-90"
      />
      <motion.nav
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        aria-label={t('a11y.mainMenu')}
        className="fixed top-0 left-0 bottom-0 w-70 bg-surface z-95 pt-20 px-6 pb-6 flex flex-col gap-2"
      >
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label={t('a11y.closeMenu')}
          className="absolute top-4 left-4 w-11 h-11 rounded-full border-none flex items-center justify-center cursor-pointer shadow-lg bg-linear-to-br from-accent to-accent-2"
        >
          <FiX size={20} className="text-black" />
        </button>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => { onSelect(tab); onClose() }}
            aria-current={active === tab ? 'page' : undefined}
            className={`cursor-pointer bg-transparent border-none text-lg font-medium py-3 text-left transition-colors duration-300 ${
              active === tab ? 'text-accent' : 'text-paragraph'
            }`}
          >
            {t(tabTranslationKeys[tab])}
          </button>
        ))}
        <div className="mt-auto flex items-center gap-2 pt-4 border-t border-border-subtle">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-dim cursor-pointer hover:text-accent hover:bg-overlay-5 transition-all duration-300 bg-transparent border-none"
            aria-label={t('a11y.toggleTheme')}
          >
            {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
          <LanguageSwitcher size="md" placement="up" />
        </div>
      </motion.nav>
    </>
  )
}

function ContentPanel({ active, children }: { active: string; children: React.ReactNode }) {
  const { t } = useLanguage()
  return (
    <div className="bg-surface border border-border-gold rounded-2xl py-7.5 px-6">
      <div className="mb-2">
        <h2 className="text-heading text-2xl font-semibold tracking-tight">
          {active === 'About' ? t('page.aboutMe') : t(tabTranslationKeys[active])}
        </h2>
      </div>
      <SectionLine />
      <main className="mt-5">{children}</main>
    </div>
  )
}

function AnimatedSection({ active }: { active: string }) {
  const ActiveSection = sections[active]
  return (
    <AnimatePresence mode="wait">
      <motion.div key={active} variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex-1 flex flex-col">
        <ActiveSection />
      </motion.div>
    </AnimatePresence>
  )
}

export default function Home() {
  const [active, setActive] = useHashTab(tabs, 'About')
  const isDesktop = useMediaQuery('(min-width: 1200px)')
  const [menuOpen, setMenuOpen] = useState(false)
  const [showCvPreview, setShowCvPreview] = useState(false)
  const { t } = useLanguage()
  const cvPdf = useCvPdf()

  // Browser tab title follows the active section, e.g. "Portfolio — Tsvetomir Dimitrov".
  useEffect(() => {
    document.title = active === 'About'
      ? `${profile.name} — ${profile.title}`
      : `${t(tabTranslationKeys[active])} — ${profile.name}`
  }, [active, t])

  // A newly opened tab starts at its top, not at the previous tab's scroll position.
  const scrollRef = useRef<HTMLDivElement>(null)
  const prevActive = useRef(active)
  useEffect(() => {
    if (prevActive.current === active) return
    prevActive.current = active
    scrollRef.current?.scrollTo({ top: 0 })
    if (!isDesktop) window.scrollTo({ top: 0 })
  }, [active, isDesktop])

  useEffect(() => {
    const handler = () => {
      // Phones and tablets can't show a PDF inside an iframe reliably (blank on Android, first page only on iPad).
      if (window.innerWidth < 640 || window.matchMedia('(pointer: coarse)').matches) {
        window.open(cvPdf, '_blank')
        return
      }
      setShowCvPreview(true)
    }
    window.addEventListener('cv-preview', handler)
    return () => window.removeEventListener('cv-preview', handler)
  }, [cvPdf])

  return (
    <div className="min-[1200px]:h-screen min-[1200px]:overflow-hidden">
      {/* Desktop layout (>=1200px); only the matching layout is rendered */}
      {isDesktop ? (
      <div className="flex flex-col max-w-300 px-5 h-[90vh] my-[5vh] mx-auto">
        <div className="flex -mb-px">
          <div className="w-85 shrink-0" />
          <div className="flex-1 flex justify-end ml-7.5">
            <NavTabs active={active} setActive={setActive} />
          </div>
        </div>
        <div className="flex items-stretch gap-7.5 flex-1 min-h-0">
          <SidebarFull />
          <div className="flex-1 min-w-0 relative bg-surface border border-border-gold rounded-2xl rounded-tr-none">
            <div ref={scrollRef} className="h-full overflow-y-auto overflow-x-hidden py-7.5 px-6 flex flex-col">
              <div className="mb-2">
              <h2 className="text-heading text-2xl font-semibold tracking-tight">
                {active === 'About' ? t('page.aboutMe') : t(tabTranslationKeys[active])}
              </h2>
            </div>
            <SectionLine />
            <main className="mt-5 flex-1 flex flex-col">
              <AnimatedSection active={active} />
            </main>

          </div>
          <div className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none rounded-b-2xl bg-linear-to-t from-surface to-transparent" />
        </div>
        </div>
      </div>

      ) : (
      /* Mobile layout (<1200px) */
      <div className="flex flex-col max-w-250 mx-auto mt-7.5 px-5 gap-6 pt-17.5 max-sm:px-3 max-sm:pt-15 max-sm:gap-4">
        <AnimatePresence>
          {menuOpen && <MobileMenu active={active} onSelect={setActive} onClose={() => setMenuOpen(false)} />}
        </AnimatePresence>
        <SidebarCompact onMenuToggle={() => setMenuOpen(!menuOpen)} active={active} />
        <ContentPanel active={active}>
          <AnimatedSection active={active} />
        </ContentPanel>
      </div>
      )}

      {/* One modal for both layouts (the hidden layout would otherwise mount a second copy). */}
      {showCvPreview && <CvPreviewModal onClose={() => setShowCvPreview(false)} />}
    </div>
  )
}

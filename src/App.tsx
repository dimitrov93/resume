import { useEffect, useState } from 'react'
import { profile } from './data/profile'
import { AnimatePresence, motion } from 'framer-motion'
import { FiX, FiSun, FiMoon } from 'react-icons/fi'
import CvPreviewModal from './components/ui/CvPreviewModal'
import { SidebarFull, SidebarCompact } from './components/Sidebar'
import NavTabs from './components/ui/NavTabs'
import SectionLine from './components/ui/SectionLine'
import About from './components/sections/About'
import Resume from './components/sections/Skills'
import Portfolio from './components/sections/Portfolio'

import Certifications from './components/sections/Certifications'
import Contact from './components/sections/Contact'
import useLanguage from './hooks/useLanguage'
import useTheme from './hooks/useTheme'

const sections: Record<string, React.FC> = { About, Resume, Certifications, Portfolio, Contact }
const tabs = ['About', 'Resume', 'Certifications', 'Portfolio', 'Contact'] as const

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

function MobileNav({ active, setActive, menuOpen, setMenuOpen }: {
  active: string
  setActive: (tab: string) => void
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
}) {
  const { t, lang, toggle: toggleLang } = useLanguage()
  const { theme, toggle: toggleTheme } = useTheme()
  return (
    <>
      {menuOpen && (
        <button
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          className="fixed top-4 left-4 z-100 w-11 h-11 rounded-full border-none items-center justify-center cursor-pointer shadow-lg flex bg-linear-to-br from-accent to-accent-2"
        >
          <FiX size={20} className="text-black" />
        </button>
      )}

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-90"
            />
            <motion.nav
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed top-0 left-0 bottom-0 w-70 bg-surface z-95 pt-20 px-6 pb-6 flex flex-col gap-2"
            >
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => { setActive(tab); setMenuOpen(false) }}
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
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
                </button>
                <button
                  onClick={toggleLang}
                  className="h-9 px-2 rounded-lg flex items-center justify-center gap-1 cursor-pointer hover:bg-overlay-5 transition-all duration-300 bg-transparent border-none text-sm leading-none"
                  aria-label="Toggle language"
                >
                  {lang === 'en' ? <><span>🇧🇬</span><span className="text-xs font-semibold text-dim">BG</span></> : <><span>🇺🇸</span><span className="text-xs font-semibold text-dim">EN</span></>}
                </button>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
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
      <motion.div key={active} variants={pageVariants} initial="initial" animate="animate" exit="exit">
        <ActiveSection />
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  const [active, setActive] = useState<string>('About')
  const [menuOpen, setMenuOpen] = useState(false)
  const [showCvPreview, setShowCvPreview] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    document.title = `${profile.name} — ${profile.title}`
    const handler = () => {
      if (window.innerWidth < 640) {
        window.open('/cv.pdf', '_blank')
        return
      }
      setShowCvPreview(true)
    }
    window.addEventListener('cv-preview', handler)
    return () => window.removeEventListener('cv-preview', handler)
  }, [])

  return (
    <div className="min-[1200px]:h-screen min-[1200px]:overflow-hidden">
      {/* Desktop layout (>=1200px) */}
      <div className="hidden min-[1200px]:flex flex-col max-w-300 px-5 h-[90vh] my-[5vh] mx-auto">
        <div className="flex -mb-px">
          <div className="w-85 shrink-0" />
          <div className="flex-1 flex justify-end ml-7.5">
            <NavTabs active={active} setActive={setActive} />
          </div>
        </div>
        <div className="flex items-stretch gap-7.5 flex-1 min-h-0">
          <SidebarFull />
          <div className="flex-1 min-w-0 relative bg-surface border border-border-gold rounded-2xl rounded-tr-none">
            <div className="h-full overflow-y-auto overflow-x-hidden py-7.5 px-6">
              <div className="mb-2">
              <h2 className="text-heading text-2xl font-semibold tracking-tight">
                {active === 'About' ? t('page.aboutMe') : t(tabTranslationKeys[active])}
              </h2>
            </div>
            <SectionLine />
            <main className="mt-5">
              <AnimatedSection active={active} />
            </main>

            {showCvPreview && <CvPreviewModal onClose={() => setShowCvPreview(false)} />}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none rounded-b-2xl bg-linear-to-t from-surface to-transparent" />
        </div>
        </div>
      </div>

      {/* Mobile layout (<1200px) */}
      <div className="flex min-[1200px]:hidden flex-col max-w-250 mx-auto mt-7.5 px-5 gap-6 pt-17.5 max-sm:px-3 max-sm:pt-15 max-sm:gap-4">
        <MobileNav active={active} setActive={setActive} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <SidebarCompact onMenuToggle={() => setMenuOpen(!menuOpen)} active={active} />
        <ContentPanel active={active}>
          <AnimatedSection active={active} />
        </ContentPanel>
        {showCvPreview && <CvPreviewModal onClose={() => setShowCvPreview(false)} />}
      </div>
    </div>
  )
}

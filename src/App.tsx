import { useEffect, useState } from 'react'
import { profile } from './data/profile'
import { AnimatePresence, motion } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import CvPreviewModal from './components/ui/CvPreviewModal'
import { SidebarFull, SidebarCompact } from './components/Sidebar'
import NavTabs from './components/ui/NavTabs'
import SectionLine from './components/ui/SectionLine'
import About from './components/sections/About'
import Resume from './components/sections/Skills'
import Portfolio from './components/sections/Portfolio'

import Certifications from './components/sections/Certifications'
import Contact from './components/sections/Contact'

const sections: Record<string, React.FC> = { About, Resume, Certifications, Portfolio, Contact }
const tabs = ['About', 'Resume', 'Certifications', 'Portfolio', 'Contact'] as const

const pageVariants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
}

function MobileNav({ active, setActive, menuOpen, setMenuOpen }: {
  active: string
  setActive: (tab: string) => void
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
}) {
  return (
    <>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-4 left-4 z-100 w-11 h-11 rounded-full border-none items-center justify-center cursor-pointer shadow-lg hidden max-[1199px]:flex bg-linear-to-br from-accent to-accent-2"
      >
        {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

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
                    active === tab ? 'text-accent' : 'text-[#aaa]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function ContentPanel({ active, children }: { active: string; children: React.ReactNode }) {
  return (
    <div className="bg-surface border border-border-gold rounded-2xl py-7.5 px-6">
      <div className="mb-2">
        <h2 className="text-white text-2xl font-semibold tracking-tight">
          {active === 'About' ? 'About Me' : active}
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

  useEffect(() => {
    document.title = `${profile.name} — ${profile.title}`
    const handler = () => setShowCvPreview(true)
    window.addEventListener('cv-preview', handler)
    return () => window.removeEventListener('cv-preview', handler)
  }, [])

  return (
    <div className="min-[1200px]:h-screen min-[1200px]:overflow-hidden">
      {/* Desktop layout (>=1200px) */}
      <div className="hidden min-[1200px]:flex items-stretch max-w-300 px-5 gap-7.5 h-[90vh] my-[5vh] mx-auto">
        <SidebarFull />
        <div className="flex-1 min-w-0 relative bg-surface border border-border-gold rounded-2xl">
          <div className="h-full overflow-y-auto overflow-x-hidden py-7.5 px-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-3">
              <h2 className="text-white text-2xl font-semibold tracking-tight">
                {active === 'About' ? 'About Me' : active}
              </h2>
              <NavTabs active={active} setActive={setActive} />
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

      {/* Mobile layout (<1200px) */}
      <div className="flex min-[1200px]:hidden flex-col max-w-250 mx-auto mt-7.5 px-5 gap-6 pt-17.5 max-sm:px-3 max-sm:pt-15 max-sm:gap-4">
        <MobileNav active={active} setActive={setActive} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <SidebarCompact />
        <ContentPanel active={active}>
          <AnimatedSection active={active} />
        </ContentPanel>
        {showCvPreview && <CvPreviewModal onClose={() => setShowCvPreview(false)} />}
      </div>
    </div>
  )
}

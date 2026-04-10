import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiCheck, FiChevronDown, FiExternalLink, FiGrid } from 'react-icons/fi'
import ProjectCard from '../ui/ProjectCard'
import PulseDot from '../ui/PulseDot'
import useLanguage from '../../hooks/useLanguage'
import useFrameworkColors from '../../hooks/useFrameworkColors'
import type { TranslationKey } from '../../data/translations'
import {
  projects,
  frameworkIcons,
  type Project,
  type Framework,
} from '../../data/projects'

type SortKey = 'newest' | 'oldest' | 'a-z' | 'z-a'
type FrameworkFilter = 'All' | Framework

const sortLabelKeys: Record<SortKey, TranslationKey> = {
  newest: 'portfolio.newest',
  oldest: 'portfolio.oldest',
  'a-z': 'portfolio.az',
  'z-a': 'portfolio.za',
}

const sortKeys: SortKey[] = ['newest', 'oldest', 'a-z', 'z-a']

function sortProjects(projects: Project[], sort: SortKey) {
  const sorted = [...projects]
  switch (sort) {
    case 'newest': return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    case 'oldest': return sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    case 'a-z': return sorted.sort((a, b) => a.title.localeCompare(b.title))
    case 'z-a': return sorted.sort((a, b) => b.title.localeCompare(a.title))
  }
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
const anim = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }

export default function Portfolio() {
  const [visible, setVisible] = useState(4)
  const [sort, setSort] = useState<SortKey>('newest')
  const [framework, setFramework] = useState<FrameworkFilter>('All')
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)
  const sortRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()
  const frameworkColors = useFrameworkColors()

  useEffect(() => {
    if (!filterOpen && !sortOpen) return
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (filterOpen && filterRef.current && !filterRef.current.contains(target)) {
        setFilterOpen(false)
      }
      if (sortOpen && sortRef.current && !sortRef.current.contains(target)) {
        setSortOpen(false)
      }
    }
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setFilterOpen(false)
        setSortOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onEsc)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onEsc)
    }
  }, [filterOpen, sortOpen])

  const frameworkCounts = useMemo(() => {
    const counts: Record<string, number> = { All: projects.length }
    for (const p of projects) counts[p.framework] = (counts[p.framework] || 0) + 1
    return counts
  }, [])

  const orderedFrameworks = useMemo<FrameworkFilter[]>(() => {
    const seen = new Set<Framework>()
    for (const p of projects) seen.add(p.framework)
    return ['All', ...Array.from(seen)]
  }, [])

  const filtered = framework === 'All' ? projects : projects.filter(p => p.framework === framework)
  const sorted = sortProjects(filtered, sort)
  const shown = sorted.slice(0, visible)

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-6">
      {/* Featured project */}
      <motion.div variants={anim} className="relative">
        <motion.div
          aria-hidden
          className="absolute -inset-1 rounded-3xl bg-linear-to-r from-accent via-accent-2 to-accent blur-xl pointer-events-none"
          animate={{ opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <a
          href="https://lupygames.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block no-underline"
        >
          <div className="relative flex flex-col sm:flex-row items-stretch rounded-2xl overflow-hidden bg-card border border-accent/40 transition-all duration-300 hover:border-accent/70 shadow-[0_8px_40px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_48px_var(--color-border-gold)]">
            <div className="sm:w-[55%] shrink-0 overflow-hidden h-52 sm:h-auto">
              <img
                src="/lupy-games.png"
                alt="Lupy Games"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex flex-col justify-center gap-4 p-6 sm:p-7 sm:w-[45%]">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent bg-accent/10 px-2.5 py-1 rounded-md">{t('portfolio.featured')}</span>
                  <PulseDot size="sm" />
                </div>
                <span
                  className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] bg-overlay-5 border border-border-subtle px-2 py-1 rounded-md"
                  style={{ color: frameworkColors['Next.js'] }}
                >
                  {(() => {
                    const Icon = frameworkIcons['Next.js']
                    return <Icon size={12} />
                  })()}
                  Next.js
                </span>
              </div>
              <h3 className="text-heading font-bold text-xl group-hover:text-accent transition-colors">Lupy Games</h3>
              <p className="text-sm text-muted leading-relaxed">{t('portfolio.lupyDesc')}</p>
              <span className="inline-flex items-center gap-1.5 text-accent text-sm font-semibold group-hover:gap-2.5 transition-all">
                lupygames.com <FiExternalLink size={14} />
              </span>
            </div>
          </div>
        </a>
      </motion.div>

      {/* Header: count + filter dropdown + sort */}
      <motion.div variants={anim} className="flex gap-3 max-sm:flex-col max-sm:items-stretch sm:items-center sm:justify-between sm:gap-4 sm:flex-wrap">
        <p className="text-sm text-dim">
          <span className="text-accent font-bold">{filtered.length}</span> {t('portfolio.projects')}
        </p>
        <div className="flex items-stretch gap-2 max-sm:w-full">
          {/* Framework filter dropdown */}
          <div ref={filterRef} className="relative max-sm:flex-1 max-sm:min-w-0">
            <button
              onClick={() => setFilterOpen(o => !o)}
              className={`cursor-pointer inline-flex items-center gap-2 text-[12px] font-semibold pl-3 pr-2.5 py-2 rounded-lg border transition-all duration-300 min-w-40 max-sm:min-w-0 max-sm:w-full ${
                framework !== 'All'
                  ? 'border-accent/30 bg-accent/10 text-accent'
                  : 'border-border-subtle bg-transparent text-paragraph hover:border-border-medium'
              }`}
            >
              {(() => {
                const Icon = framework === 'All' ? FiGrid : frameworkIcons[framework]
                const color = framework === 'All' ? undefined : frameworkColors[framework]
                return <Icon size={14} style={{ color }} />
              })()}
              <span className="flex-1 text-left">{framework}</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${framework !== 'All' ? 'bg-accent/20 text-accent' : 'bg-overlay-10 text-dim'}`}>
                {frameworkCounts[framework]}
              </span>
              <FiChevronDown
                size={14}
                className="transition-transform duration-200"
                style={{ transform: filterOpen ? 'rotate(180deg)' : 'rotate(0)' }}
              />
            </button>

            <AnimatePresence>
              {filterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute right-0 mt-2 z-30 w-max min-w-52 max-w-[calc(100vw-4rem)] bg-surface border border-border-gold rounded-xl p-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.4)] max-sm:left-0 max-sm:right-auto"
                >
                  {orderedFrameworks.map(fw => {
                    const Icon = fw === 'All' ? FiGrid : frameworkIcons[fw]
                    const color = fw === 'All' ? undefined : frameworkColors[fw]
                    const active = framework === fw
                    return (
                      <button
                        key={fw}
                        onClick={() => {
                          setFramework(fw)
                          setVisible(4)
                          setFilterOpen(false)
                        }}
                        className={`w-full cursor-pointer inline-flex items-center gap-2.5 text-[12px] font-semibold px-3 py-2 rounded-lg border-none transition-colors duration-200 ${
                          active
                            ? 'bg-accent/15 text-accent'
                            : 'bg-transparent text-paragraph hover:bg-overlay-5'
                        }`}
                      >
                        <Icon size={14} style={{ color: active ? undefined : color }} />
                        <span className="flex-1 text-left whitespace-nowrap">{fw}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${active ? 'bg-accent/20 text-accent' : 'bg-overlay-10 text-dim'}`}>
                          {frameworkCounts[fw]}
                        </span>
                        {active && <FiCheck size={12} className="text-accent" />}
                      </button>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sort dropdown */}
          <div ref={sortRef} className="relative max-sm:flex-1 max-sm:min-w-0">
            <button
              onClick={() => setSortOpen(o => !o)}
              className="cursor-pointer inline-flex items-center gap-2 text-[12px] font-semibold pl-3 pr-2.5 py-2 rounded-lg border border-border-subtle bg-transparent text-paragraph hover:border-border-medium transition-all duration-300 min-w-32 max-sm:min-w-0 max-sm:w-full"
            >
              <span className="text-dim text-[10px] uppercase tracking-wider font-bold max-sm:hidden">{t('portfolio.sort')}</span>
              <span className="flex-1 text-left text-accent">{t(sortLabelKeys[sort])}</span>
              <FiChevronDown
                size={14}
                className="transition-transform duration-200"
                style={{ transform: sortOpen ? 'rotate(180deg)' : 'rotate(0)' }}
              />
            </button>

            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute right-0 mt-2 z-30 w-max min-w-44 max-w-[calc(100vw-4rem)] bg-surface border border-border-gold rounded-xl p-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
                >
                  {sortKeys.map(key => {
                    const active = sort === key
                    return (
                      <button
                        key={key}
                        onClick={() => {
                          setSort(key)
                          setVisible(4)
                          setSortOpen(false)
                        }}
                        className={`w-full cursor-pointer inline-flex items-center gap-2.5 text-[12px] font-semibold px-3 py-2 rounded-lg border-none transition-colors duration-200 ${
                          active
                            ? 'bg-accent/15 text-accent'
                            : 'bg-transparent text-paragraph hover:bg-overlay-5'
                        }`}
                      >
                        <span className="flex-1 text-left">{t(sortLabelKeys[key])}</span>
                        {active && <FiCheck size={12} className="text-accent" />}
                      </button>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Cards */}
      <motion.div variants={anim} className="flex flex-col gap-8">
        {shown.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </motion.div>

      {/* Load more */}
      {shown.length < sorted.length && (
        <motion.div variants={anim} className="text-center pt-2">
          <button
            onClick={() => setVisible(v => v + 4)}
            className="cursor-pointer px-8 py-3 rounded-full text-sm font-semibold bg-gold-glow text-accent border border-accent/25 transition-all duration-300 hover:shadow-[0_4px_16px_var(--color-border-gold)]"
          >
            {t('portfolio.loadMore')}
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}

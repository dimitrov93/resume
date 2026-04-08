import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiExternalLink } from 'react-icons/fi'
import ProjectCard from '../ui/ProjectCard'
import SkeletonCard from '../ui/SkeletonCard'
import PulseDot from '../ui/PulseDot'
import useLanguage from '../../hooks/useLanguage'
import type { TranslationKey } from '../../data/translations'

interface Project {
  _id: string
  title: string
  image: string
  github: string
  demo: string
  createdAt: string
}

type SortKey = 'newest' | 'oldest' | 'a-z' | 'z-a'

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

const API_URL = 'https://nodejs.dimitrov93.eu/api/portfolio'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
const anim = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [visible, setVisible] = useState(4)
  const [sort, setSort] = useState<SortKey>('newest')
  const { t } = useLanguage()

  const fetchProjects = () => {
    setLoading(true)
    setError(false)
    fetch(API_URL)
      .then(res => res.json())
      .then(data => { setProjects(data); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }

  useEffect(() => { fetchProjects() }, [])

  const sorted = sortProjects(projects, sort)
  const shown = sorted.slice(0, visible)

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-6">
      {/* Featured project */}
      <motion.div variants={anim}>
        <a
          href="https://lupygames.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group block no-underline"
        >
          <div className="relative flex flex-col sm:flex-row items-stretch rounded-2xl overflow-hidden bg-card border border-border-gold transition-all duration-300 hover:border-accent/30 hover:shadow-[0_8px_32px_var(--color-border-gold)]">
            <div className="sm:w-[55%] shrink-0 overflow-hidden h-52 sm:h-auto">
              <img
                src="/lupy-games.png"
                alt="Lupy Games"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex flex-col justify-center gap-4 p-6 sm:p-7 sm:w-[45%]">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent bg-accent/10 px-2.5 py-1 rounded-md">{t('portfolio.featured')}</span>
                <PulseDot size="sm" />
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

      {/* Header: count + sort */}
      <motion.div variants={anim} className="flex items-center justify-between gap-4 flex-wrap">
        <p className="text-sm text-dim">
          {loading ? (
            <span className="inline-block h-4 w-20 rounded bg-overlay-5 animate-pulse align-middle" />
          ) : (
            <><span className="text-accent font-bold">{projects.length}</span> {t('portfolio.projects')}</>
          )}
        </p>
        <div className="flex items-center gap-1.5">
          {sortKeys.map(key => (
            <button
              key={key}
              onClick={() => { setSort(key); setVisible(4) }}
              className={`cursor-pointer text-[11px] font-medium px-3 py-1.5 rounded-lg border transition-all duration-300 ${
                sort === key
                  ? 'border-accent/30 bg-accent/10 text-accent'
                  : 'border-border-subtle bg-transparent text-dim hover:text-paragraph hover:border-border-medium'
              }`}
            >
              {t(sortLabelKeys[key])}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Cards */}
      <motion.div variants={anim} className="flex flex-col gap-8">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : error ? (
          <div className="flex flex-col items-center gap-4 py-12 text-center">
            <p className="text-muted text-sm">{t('portfolio.failed')}</p>
            <button
              onClick={fetchProjects}
              className="cursor-pointer px-6 py-2.5 rounded-full text-sm font-semibold bg-gold-glow text-accent border border-accent/25 transition-all duration-300 hover:shadow-[0_4px_16px_var(--color-border-gold)]"
            >
              {t('portfolio.retry')}
            </button>
          </div>
        ) : (
          shown.map((project, i) => (
            <ProjectCard key={project._id} project={project} index={i} />
          ))
        )}
      </motion.div>

      {/* Load more */}
      {!loading && shown.length < sorted.length && (
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

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ProjectCard from '../ui/ProjectCard'
import SkeletonCard from '../ui/SkeletonCard'

interface Project {
  _id: string
  title: string
  image: string
  github: string
  demo: string
  createdAt: string
}

type SortKey = 'newest' | 'oldest' | 'a-z' | 'z-a'

const sortOptions: { key: SortKey; label: string }[] = [
  { key: 'newest', label: 'Newest' },
  { key: 'oldest', label: 'Oldest' },
  { key: 'a-z', label: 'A → Z' },
  { key: 'z-a', label: 'Z → A' },
]

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
      {/* Header: count + sort */}
      <motion.div variants={anim} className="flex items-center justify-between gap-4 flex-wrap">
        <p className="text-sm text-dim">
          {loading ? (
            <span className="inline-block h-4 w-20 rounded bg-white/5 animate-pulse align-middle" />
          ) : (
            <><span className="text-accent font-bold">{projects.length}</span> Projects</>
          )}
        </p>
        <div className="flex items-center gap-1.5">
          {sortOptions.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => { setSort(key); setVisible(4) }}
              className={`cursor-pointer text-[11px] font-medium px-3 py-1.5 rounded-lg border transition-all duration-300 ${
                sort === key
                  ? 'border-accent/30 bg-accent/10 text-accent'
                  : 'border-white/8 bg-transparent text-dim hover:text-paragraph hover:border-white/15'
              }`}
            >
              {label}
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
            <p className="text-muted text-sm">Failed to load projects.</p>
            <button
              onClick={fetchProjects}
              className="cursor-pointer px-6 py-2.5 rounded-full text-sm font-semibold bg-gold-glow text-accent border border-accent/25 transition-all duration-300 hover:shadow-[0_4px_16px_var(--color-border-gold)]"
            >
              Retry
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
            Load More
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}

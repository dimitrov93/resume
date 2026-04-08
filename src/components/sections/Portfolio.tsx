import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

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

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative"
    >
      {/* Number watermark */}
      <span className="absolute -top-6 -left-2 text-[80px] font-black text-white/2 leading-none select-none pointer-events-none z-0">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative flex flex-col sm:flex-row items-stretch gap-0 rounded-2xl overflow-hidden bg-[#141415] z-10">
        {/* Image side */}
        <div className="relative sm:w-[55%] shrink-0 overflow-hidden h-52 sm:h-64">
          <motion.div
            className="absolute inset-0 z-10 bg-accent/0"
            animate={{ backgroundColor: hovered ? 'rgba(255,219,110,0.05)' : 'rgba(255,219,110,0)' }}
          />
          <motion.img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover"
            animate={{
              scale: hovered ? 1.04 : 1,
              filter: hovered ? 'grayscale(0) brightness(1)' : 'grayscale(30%) brightness(0.85)',
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
          {/* Diagonal slice overlay */}
          <div className="hidden sm:block absolute top-0 right-0 bottom-0 w-20 bg-[#141415]" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%, 100% 0)' }} />
        </div>

        {/* Content side */}
        <div className="flex flex-col justify-center gap-5 p-6 sm:p-7 sm:w-[45%] relative">
          {/* Project number */}
          <span className="text-accent/40 text-[11px] font-bold tracking-[0.3em] uppercase">
            Project {String(index + 1).padStart(2, '0')}
          </span>

          <h3 className="text-white font-bold text-lg leading-snug">
            {project.title}
          </h3>

          {/* Accent line */}
          <motion.div
            className="h-0.5 bg-linear-to-r from-accent to-accent-2 rounded-full"
            animate={{ width: hovered ? 80 : 40 }}
            transition={{ duration: 0.4 }}
          />

          {/* Links */}
          <div className="flex items-center gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-2 text-[#666] text-[13px] font-medium no-underline hover:text-white transition-colors"
            >
              <span className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center group-hover/link:bg-white/10 group-hover/link:border-white/15 transition-all">
                <FiGithub size={15} />
              </span>
              Source
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-2 text-[#666] text-[13px] font-medium no-underline hover:text-accent transition-colors"
            >
              <span className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center text-accent group-hover/link:bg-accent/20 transition-all">
                <FiExternalLink size={15} />
              </span>
              Live Demo
            </a>
          </div>
        </div>

        {/* Top accent border that animates in */}
        <motion.div
          className="absolute top-0 left-0 h-0.5 bg-linear-to-r from-accent to-accent-2"
          animate={{ width: hovered ? '100%' : '0%' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="flex flex-col sm:flex-row items-stretch rounded-2xl overflow-hidden bg-[#141415] animate-pulse">
      <div className="sm:w-[55%] shrink-0 h-52 sm:h-64 bg-white/5" />
      <div className="flex flex-col justify-center gap-5 p-6 sm:p-7 sm:w-[45%]">
        <div className="h-3 w-20 rounded bg-white/5" />
        <div className="flex flex-col gap-2">
          <div className="h-5 w-full rounded bg-white/5" />
          <div className="h-5 w-2/3 rounded bg-white/5" />
        </div>
        <div className="h-0.5 w-10 rounded bg-white/5" />
        <div className="flex gap-3">
          <div className="h-9 w-24 rounded-xl bg-white/5" />
          <div className="h-9 w-28 rounded-xl bg-white/5" />
        </div>
      </div>
    </div>
  )
}

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
        <p className="text-sm text-[#555]">
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
                  : 'border-white/8 bg-transparent text-[#555] hover:text-[#aaa] hover:border-white/15'
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
            <p className="text-[#888] text-sm">Failed to load projects.</p>
            <button
              onClick={fetchProjects}
              className="cursor-pointer px-6 py-2.5 rounded-full text-sm font-semibold bg-gold-glow text-accent border border-accent/25 transition-all duration-300 hover:shadow-[0_4px_16px_rgba(255,219,110,0.15)]"
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
            className="cursor-pointer px-8 py-3 rounded-full text-sm font-semibold bg-gold-glow text-accent border border-accent/25 transition-all duration-300 hover:shadow-[0_4px_16px_rgba(255,219,110,0.15)]"
          >
            Load More
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}

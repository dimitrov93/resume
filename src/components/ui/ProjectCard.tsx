import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import useLanguage from '../../hooks/useLanguage'

interface Project {
  _id: string
  title: string
  image: string
  github: string
  demo: string
  createdAt: string
}

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false)
  const { t } = useLanguage()

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative"
    >
      {/* Number watermark */}
      <span className="absolute -top-6 -left-2 text-[80px] font-black text-heading/2 leading-none select-none pointer-events-none z-0">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative flex flex-col sm:flex-row items-stretch gap-0 rounded-2xl overflow-hidden bg-card z-10">
        {/* Image side */}
        <div className="relative sm:w-[55%] shrink-0 overflow-hidden h-52 sm:h-64">
          <motion.div
            className="absolute inset-0 z-10 bg-accent/0"
            animate={{ opacity: hovered ? 0.05 : 0 }}
            style={{ backgroundColor: 'var(--color-accent)' }}
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
          <div className="hidden sm:block absolute top-0 right-0 bottom-0 w-20 bg-card" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%, 100% 0)' }} />
        </div>

        {/* Content side */}
        <div className="flex flex-col justify-center gap-5 p-6 sm:p-7 sm:w-[45%] relative">
          {/* Project number */}
          <span className="text-accent/40 text-[11px] font-bold tracking-[0.3em] uppercase">
            {t('portfolio.project')} {String(index + 1).padStart(2, '0')}
          </span>

          <h3 className="text-heading font-bold text-lg leading-snug">
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
              className="group/link flex items-center gap-2 text-dim text-[13px] font-medium no-underline hover:text-heading transition-colors"
            >
              <span className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center group-hover/link:bg-white/10 group-hover/link:border-white/15 transition-all">
                <FiGithub size={15} />
              </span>
              {t('portfolio.source')}
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-2 text-dim text-[13px] font-medium no-underline hover:text-accent transition-colors"
            >
              <span className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center text-accent group-hover/link:bg-accent/20 transition-all">
                <FiExternalLink size={15} />
              </span>
              {t('portfolio.liveDemo')}
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

import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiChevronLeft, FiChevronRight, FiLayers } from 'react-icons/fi'
import { certifications } from '../../data/resume'
import CertPreview from './CertPreview'

const jsPathTitles = [
  'ReactJS', 'Angular', 'JS Applications', 'JS Back-End', 'HTML & CSS', 'Programming Basics',
]

const diploma = certifications.find(c => c.title === 'Front-End Developer with JavaScript')!
const softuniCourses = certifications.filter(c => jsPathTitles.includes(c.title))

export default function SoftUniHero({ onViewCert }: { onViewCert: (title: string, file: string) => void }) {
  const [expanded, setExpanded] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -280 : 280, behavior: 'smooth' })
  }

  return (
    <div className="bg-card border border-border-gold rounded-2xl overflow-hidden">
      {/* Diploma hero */}
      <div
        className="flex flex-col sm:flex-row items-stretch cursor-pointer"
        onClick={() => onViewCert(diploma.title, diploma.pdf)}
      >
        <div className="sm:w-[45%] shrink-0 aspect-16/10 sm:aspect-auto overflow-hidden relative bg-white/5">
          <CertPreview file={diploma.pdf} title={diploma.title} />
        </div>
        <div className="flex flex-col justify-center gap-4 p-6 sm:p-8 flex-1">
          <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-accent/50">SoftUni Diploma</span>
          <h3 className="text-heading font-bold text-xl leading-snug">{diploma.title}</h3>
          <p className="text-[13px] text-muted leading-relaxed">
            Full JavaScript Web Developer track — {softuniCourses.length} courses completed.
          </p>
          <button
            onClick={e => { e.stopPropagation(); setExpanded(!expanded) }}
            className="flex items-center gap-2 w-fit text-accent text-[13px] font-semibold cursor-pointer bg-transparent border-none hover:underline"
          >
            <FiLayers size={14} />
            {expanded ? 'Hide courses' : `View all ${softuniCourses.length} courses`}
          </button>
        </div>
      </div>

      {/* Expandable course gallery */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="border-t border-border-gold px-6 py-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-dim uppercase tracking-wider">Individual Courses</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => scroll('left')}
                    className="w-7 h-7 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-dim cursor-pointer hover:text-heading hover:bg-white/10 transition-colors"
                  >
                    <FiChevronLeft size={14} />
                  </button>
                  <button
                    onClick={() => scroll('right')}
                    className="w-7 h-7 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-dim cursor-pointer hover:text-heading hover:bg-white/10 transition-colors"
                  >
                    <FiChevronRight size={14} />
                  </button>
                </div>
              </div>
              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto pb-2 scrollbar-none"
                style={{ scrollbarWidth: 'none' }}
              >
                {softuniCourses.map(cert => (
                  <div
                    key={cert.title}
                    className="shrink-0 w-56 cursor-pointer group"
                    onClick={() => cert.pdf && onViewCert(cert.title, cert.pdf)}
                  >
                    <div className="aspect-16/10 rounded-lg overflow-hidden bg-white/5 relative mb-2 border border-transparent group-hover:border-accent/20 transition-colors">
                      <CertPreview file={cert.pdf} title={cert.title} />
                    </div>
                    <h4 className="text-heading text-xs font-medium group-hover:text-accent transition-colors truncate">{cert.title}</h4>
                    <p className="text-[10px] text-dim">{cert.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

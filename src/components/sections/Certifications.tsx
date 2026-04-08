import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiX, FiAward, FiChevronLeft, FiChevronRight, FiLayers } from 'react-icons/fi'
import { certifications } from '../../data/resume'
import GradientCard from '../ui/GradientCard'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
const anim = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }

const isImage = (path: string) => /\.(jpg|jpeg|png|webp)$/i.test(path)

const jsPathTitles = [
  'ReactJS', 'Angular', 'JS Applications', 'JS Back-End', 'HTML & CSS', 'Programming Basics',
]

const diploma = certifications.find(c => c.title === 'Front-End Developer with JavaScript')!
const softuniCourses = certifications.filter(c => jsPathTitles.includes(c.title))
const otherCerts = certifications.filter(c => c !== diploma && !jsPathTitles.includes(c.title))

function CertModal({ title, file, onClose }: { title: string; file: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.25 }}
          onClick={e => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[85vh] bg-surface border border-border-gold rounded-2xl overflow-hidden flex flex-col"
        >
          <div className="flex items-center justify-between px-5 py-3 border-b border-border-gold">
            <span className="text-white font-semibold text-sm truncate">{title}</span>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 border-none cursor-pointer text-white hover:bg-white/20 transition-colors"
            >
              <FiX size={16} />
            </button>
          </div>
          {isImage(file) ? (
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center">
              <img src={file} alt={title} className="max-w-full max-h-full object-contain rounded-lg" />
            </div>
          ) : (
            <iframe
              src={file}
              title={title}
              className="flex-1 w-full border-none min-h-[75vh]"
            />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function CertPreview({ file, title }: { file: string; title: string }) {
  if (!file) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-accent/30">
        <FiAward size={24} />
        <span className="text-[10px] font-medium">Not added yet</span>
      </div>
    )
  }

  if (isImage(file)) {
    return <img src={file} alt={title} className="w-full h-full object-cover" />
  }

  return (
    <>
      <iframe
        src={`${file}#toolbar=0&navpanes=0&scrollbar=0&page=1`}
        title={title}
        className="w-full h-full border-none pointer-events-none"
      />
      <div className="absolute inset-0 bg-transparent" />
    </>
  )
}

function SoftUniHero({ onViewCert }: { onViewCert: (title: string, file: string) => void }) {
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
          <h3 className="text-white font-bold text-xl leading-snug">{diploma.title}</h3>
          <p className="text-[13px] text-[#888] leading-relaxed">
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
                <span className="text-xs font-semibold text-[#555] uppercase tracking-wider">Individual Courses</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => scroll('left')}
                    className="w-7 h-7 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-[#555] cursor-pointer hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <FiChevronLeft size={14} />
                  </button>
                  <button
                    onClick={() => scroll('right')}
                    className="w-7 h-7 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-[#555] cursor-pointer hover:text-white hover:bg-white/10 transition-colors"
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
                    <h4 className="text-white text-xs font-medium group-hover:text-accent transition-colors truncate">{cert.title}</h4>
                    <p className="text-[10px] text-[#666]">{cert.year}</p>
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

export default function Certifications() {
  const [activeFile, setActiveFile] = useState<{ title: string; file: string } | null>(null)

  const handleViewCert = (title: string, file: string) => setActiveFile({ title, file })

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-6">
      {/* SoftUni featured diploma + expandable courses */}
      <motion.div variants={anim}>
        <SoftUniHero onViewCert={handleViewCert} />
      </motion.div>

      {/* Other certifications */}
      {otherCerts.length > 0 && (
        <motion.div variants={anim}>
          <h3 className="text-lg text-white font-semibold mb-4">Other Certifications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {otherCerts.map(cert => (
              <motion.div key={cert.title} variants={anim} whileHover={{ y: -4 }}>
                <GradientCard
                  className={`flex flex-col gap-3 h-full ${cert.pdf ? 'cursor-pointer' : ''}`}
                  onClick={cert.pdf ? () => handleViewCert(cert.title, cert.pdf) : undefined}
                >
                  <div className="w-full aspect-16/10 rounded-lg overflow-hidden bg-white/5 relative">
                    <CertPreview file={cert.pdf} title={cert.title} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-1">{cert.title}</h4>
                    <p className="text-xs text-[#aaa]">{cert.source} · {cert.year}</p>
                  </div>
                </GradientCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {activeFile && <CertModal title={activeFile.title} file={activeFile.file} onClose={() => setActiveFile(null)} />}
    </motion.div>
  )
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiExternalLink } from 'react-icons/fi'

const filters = ['All', 'Applications', 'UI/UX Design', 'Web Development'] as const

const projects = [
  { title: 'Gourmania', category: 'Applications', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=420&fit=crop' },
  { title: 'Nurot', category: 'Web Development', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=420&fit=crop' },
  { title: 'Lorex', category: 'Web Development', image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=420&fit=crop' },
  { title: 'Canva', category: 'UI/UX Design', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=420&fit=crop' },
  { title: 'Klama', category: 'Web Development', image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&h=420&fit=crop' },
  { title: 'Elemento', category: 'Applications', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=420&fit=crop' },
]

export default function Portfolio() {
  const [active, setActive] = useState<string>('All')
  const [visible, setVisible] = useState(6)

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)
  const shown = filtered.slice(0, visible)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => { setActive(f); setVisible(6) }}
            className={`cursor-pointer text-xs font-semibold px-4 py-2 rounded-full transition-all duration-300 ${
              active === f
                ? 'border border-transparent text-[#1a1a1b]'
                : 'border border-white/8 bg-white/4 text-dim'
            }`}
            style={active === f ? { background: 'linear-gradient(137.84deg, #FFDB6E 26.31%, #FFBC5E 93.75%)' } : undefined}
          >
            {f}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {shown.map(project => (
            <motion.div
              key={project.title} layout whileHover={{ y: -5 }}
              className="overflow-hidden cursor-pointer group bg-card border border-border-gold rounded-2xl transition-[border-color] duration-300"
            >
              <div className="relative overflow-hidden h-[200px]">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[rgba(20,20,21,0.85)]">
                  <div className="flex items-center justify-center rounded-full w-11 h-11" style={{ background: 'linear-gradient(137.84deg, #FFDB6E 26.31%, #FFBC5E 93.75%)' }}>
                    <FiExternalLink size={18} color="#1a1a1b" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-white text-sm">{project.title}</h3>
                <p className="text-xs mt-1 text-accent">{project.category}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {shown.length < filtered.length && (
        <div className="text-center">
          <button
            onClick={() => setVisible(v => v + 3)}
            className="cursor-pointer px-8 py-3 rounded-full text-sm font-semibold bg-gold-glow text-accent border border-accent/25"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  )
}

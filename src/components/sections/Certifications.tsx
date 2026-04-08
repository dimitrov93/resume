import { motion } from 'framer-motion'
import { certifications } from '../../data/resume'
import GradientCard from '../ui/GradientCard'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
const anim = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }

export default function Certifications() {
  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {certifications.map(cert => (
          <motion.div key={cert.title} variants={anim} whileHover={{ y: -4 }}>
            <GradientCard className="flex flex-col gap-3 h-full">
              <div className="w-full aspect-[16/10] rounded-lg overflow-hidden bg-white/5">
                {cert.image
                  ? <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center text-accent/40 text-xs">No image</div>
                }
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
  )
}

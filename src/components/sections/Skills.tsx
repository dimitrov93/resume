import { motion } from 'framer-motion'
import { currentPositions, experience, education } from '../../data/resume'
import TimelineEntry from '../ui/TimelineEntry'
import GradientCard from '../ui/GradientCard'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
const anim = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }

export default function Resume() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-10">
      <motion.div variants={anim}>
        <h3 className="text-lg sm:text-xl text-white font-semibold mb-4">Currently</h3>
        <div className={`grid gap-3 mx-auto ${currentPositions.length === 1 ? 'grid-cols-1 max-w-xs' : currentPositions.length === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-lg' : 'grid-cols-1 sm:grid-cols-3'}`}>
          {currentPositions.map(({ role, company }) => (
            <motion.div key={company} whileHover={{ y: -4 }}>
              <GradientCard className="flex flex-col items-center text-center gap-2.5 py-5! px-4!">
                <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <div className="relative flex items-center justify-center w-2.5 h-2.5">
                    <span className="absolute inline-flex w-full h-full rounded-full bg-green-400/40 animate-ping" />
                    <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                  </div>
                </div>
                <span className="text-sm font-semibold text-white">{role}</span>
                <span className="text-[11px] text-accent font-medium tracking-wide uppercase">{company}</span>
              </GradientCard>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={anim}>
        <h3 className="text-lg sm:text-xl text-white font-semibold mb-5">Experience</h3>
        <div className="flex flex-col gap-5">
          {experience.map(e => <TimelineEntry key={e.title} {...e} />)}
        </div>
      </motion.div>

      <motion.div variants={anim}>
        <h3 className="text-lg sm:text-xl text-white font-semibold mb-5">Education</h3>
        <div className="flex flex-col gap-5">
          {education.map(e => <TimelineEntry key={e.title} {...e} />)}
        </div>
      </motion.div>
    </motion.div>
  )
}

import { motion } from 'framer-motion'
import { skills, skillCategories } from '../../data/resume'
import GradientCard from '../ui/GradientCard'
import IconBox from '../ui/IconBox'

const services = [
  { icon: '/icons/web-design.svg', title: 'Web Design', desc: 'Clean, modern UI/UX built with attention to detail and user experience.' },
  { icon: '/icons/web-dev.svg', title: 'Web Development', desc: 'Scalable React & Next.js applications with clean architecture.' },
  { icon: '/icons/mobile.svg', title: 'Team Leadership', desc: 'Coaching, mentoring and driving team performance through one-on-ones and KPI tracking.' },
  { icon: '/icons/photo.svg', title: 'Full-Stack Solutions', desc: 'End-to-end systems with Vue, Spring Boot, PostgreSQL, and Docker.' },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
const item = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }
const iconFilter = 'invert(92%) sepia(85%) saturate(652%) hue-rotate(319deg) brightness(102%) contrast(101%)'

export default function About() {
  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="flex flex-col gap-3">
        <p className="text-[#aaa] leading-[1.8]">
          Dual-role professional: Front-End Developer at Lupy Games and Team Lead at Montway Auto Transport,
          overseeing a LiveChat team. On one side, building scalable React/Next.js applications with clean
          architecture. On the other, running one-on-ones, monitoring performance, and developing team members day-to-day.
        </p>
        <p className="text-[#aaa] leading-[1.8]">
          A developer with genuine people management experience — in the field, not just on paper.
          Passionate about turning complex problems into simple, performant, and intuitive interfaces.
        </p>
      </motion.div>

      <motion.div variants={item} className="mt-8">
        <h3 className="text-lg sm:text-xl text-white font-semibold mb-4">What I'm Doing</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {services.map(({ icon, title, desc }) => (
            <motion.div key={title} whileHover={{ y: -4 }}>
              <GradientCard className="flex items-start gap-4">
                <IconBox size={56}>
                  <img src={icon} alt={title} className="w-7 h-7" style={{ filter: iconFilter }} />
                </IconBox>
                <div>
                  <h4 className="text-white font-bold mb-2 text-base">{title}</h4>
                  <p className="text-sm leading-relaxed text-[#999]">{desc}</p>
                </div>
              </GradientCard>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={item} className="mt-8">
        <h3 className="text-lg sm:text-xl text-white font-semibold mb-5">My Skills</h3>
        <div className="flex flex-col gap-5">
          {skillCategories.map(cat => (
            <div key={cat}>
              <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">{cat}</p>
              <div className="flex flex-wrap gap-3">
                {skills.filter(s => s.category === cat).map(({ icon: Icon, label, color }) => (
                  <motion.div key={label} whileHover={{ y: -3 }}>
                    <GradientCard className="flex items-center gap-2.5 py-2.5! px-4!">
                      <IconBox size={32}>
                        <Icon size={16} color={color} />
                      </IconBox>
                      <span className="text-sm font-medium text-[#ccc]">{label}</span>
                    </GradientCard>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

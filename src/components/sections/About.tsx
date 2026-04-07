import { motion } from 'framer-motion'
import {
  SiReact, SiTypescript, SiNextdotjs, SiTailwindcss,
  SiVuedotjs, SiAngular, SiNodedotjs, SiExpress,
  SiSpringboot, SiPostgresql, SiMongodb, SiDocker,
  SiGit, SiMariadb, SiJavascript,
} from 'react-icons/si'
import GradientCard from '../ui/GradientCard'
import IconBox from '../ui/IconBox'

const services = [
  { icon: '/icons/web-design.svg', title: 'Web Design', desc: 'Clean, modern UI/UX built with attention to detail and user experience.' },
  { icon: '/icons/web-dev.svg', title: 'Web Development', desc: 'Scalable React & Next.js applications with clean architecture.' },
  { icon: '/icons/mobile.svg', title: 'Team Leadership', desc: 'Coaching, mentoring and driving team performance through one-on-ones and KPI tracking.' },
  { icon: '/icons/photo.svg', title: 'Full-Stack Solutions', desc: 'End-to-end systems with Vue, Spring Boot, PostgreSQL, and Docker.' },
]

const techStack = [
  { icon: SiReact, label: 'React', color: '#61DAFB' },
  { icon: SiNextdotjs, label: 'Next.js', color: '#ffffff' },
  { icon: SiTypescript, label: 'TypeScript', color: '#3178C6' },
  { icon: SiJavascript, label: 'JavaScript', color: '#F7DF1E' },
  { icon: SiVuedotjs, label: 'Vue', color: '#4FC08D' },
  { icon: SiAngular, label: 'Angular', color: '#DD0031' },
  { icon: SiTailwindcss, label: 'Tailwind', color: '#06B6D4' },
  { icon: SiNodedotjs, label: 'Node.js', color: '#339933' },
  { icon: SiExpress, label: 'Express', color: '#ffffff' },
  { icon: SiSpringboot, label: 'Spring Boot', color: '#6DB33F' },
  { icon: SiPostgresql, label: 'PostgreSQL', color: '#4169E1' },
  { icon: SiMongodb, label: 'MongoDB', color: '#47A248' },
  { icon: SiMariadb, label: 'MariaDB', color: '#003545' },
  { icon: SiDocker, label: 'Docker', color: '#2496ED' },
  { icon: SiGit, label: 'Git', color: '#F05032' },
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
        <h3 className="text-lg sm:text-xl text-white font-semibold mb-4">Tech Stack</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {techStack.map(({ icon: Icon, label, color }) => (
            <motion.div key={label} whileHover={{ y: -4 }}>
              <GradientCard className="flex flex-col items-center gap-3 py-5">
                <IconBox size={48}>
                  <Icon size={22} color={color} />
                </IconBox>
                <span className="text-sm font-medium text-[#ccc]">{label}</span>
              </GradientCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

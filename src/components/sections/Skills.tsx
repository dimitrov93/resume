import { motion } from 'framer-motion'
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript,
  SiVuedotjs, SiAngular, SiTailwindcss, SiNodedotjs,
  SiExpress, SiSpringboot, SiPostgresql, SiMongodb,
  SiMariadb, SiDocker, SiGit,
} from 'react-icons/si'
import GradientCard from '../ui/GradientCard'
import IconBox from '../ui/IconBox'
import TimelineEntry from '../ui/TimelineEntry'

const skills = [
  { icon: SiReact, label: 'React', color: '#61DAFB', category: 'Frontend' },
  { icon: SiNextdotjs, label: 'Next.js', color: '#ffffff', category: 'Frontend' },
  { icon: SiTypescript, label: 'TypeScript', color: '#3178C6', category: 'Frontend' },
  { icon: SiJavascript, label: 'JavaScript', color: '#F7DF1E', category: 'Frontend' },
  { icon: SiVuedotjs, label: 'Vue', color: '#4FC08D', category: 'Frontend' },
  { icon: SiAngular, label: 'Angular', color: '#DD0031', category: 'Frontend' },
  { icon: SiTailwindcss, label: 'Tailwind', color: '#06B6D4', category: 'Frontend' },
  { icon: SiNodedotjs, label: 'Node.js', color: '#339933', category: 'Backend' },
  { icon: SiExpress, label: 'Express', color: '#ffffff', category: 'Backend' },
  { icon: SiSpringboot, label: 'Spring Boot', color: '#6DB33F', category: 'Backend' },
  { icon: SiPostgresql, label: 'PostgreSQL', color: '#4169E1', category: 'Database & Tools' },
  { icon: SiMongodb, label: 'MongoDB', color: '#47A248', category: 'Database & Tools' },
  { icon: SiMariadb, label: 'MariaDB', color: '#003545', category: 'Database & Tools' },
  { icon: SiDocker, label: 'Docker', color: '#2496ED', category: 'Database & Tools' },
  { icon: SiGit, label: 'Git', color: '#F05032', category: 'Database & Tools' },
]

const categories = ['Frontend', 'Backend', 'Database & Tools'] as const

const experience = [
  {
    title: 'Front-End Developer — Lupy Games',
    period: 'Apr 2024 — Present',
    desc: 'Led full platform migration from WordPress to Next.js. Drove user engagement through gamification: achievements, ranks, level progression, and customizable themes.',
  },
  {
    title: 'Team Lead — Montway Auto Transport',
    period: 'Sep 2016 — Present',
    desc: 'Lead a LiveChat team at one of the largest auto transport companies in the U.S. Drive performance through coaching, one-on-ones, KPI tracking, and Salesforce reporting.',
  },
  {
    title: 'Front-End Developer — Vola',
    period: 'Jul 2023 — Present',
    desc: 'Architected a full-stack jewellery inventory management system (Vue3, Vuex, Spring Boot, PostgreSQL, Docker). Delivered real-time sales tracking and multi-role access.',
  },
  {
    title: 'Sales Support Specialist — Sutherland',
    period: 'Jan 2018 — Apr 2018',
    desc: 'Phone sales & support for GoDaddy — product inquiries, account issues & upselling.',
  },
]

const education = [
  {
    title: 'SoftUni — Computer Software Engineering',
    period: '2021 — 2022',
    desc: 'JavaScript Web Developer · Grade: 6 (Excellent)',
  },
  {
    title: 'UNWE — Bachelor\'s, Accounting & Finance',
    period: '2012 — 2016',
    desc: 'Bachelor\'s degree in Accounting and Finance.',
  },
]

const certifications = [
  'Microservices with React & Node.js — Udemy \'23',
  'Next.js — Udemy \'23',
  'Vue & Vuex — Udemy \'23',
  'JavaScript Web Developer — SoftUni \'21–\'22',
  'QA Manual & Automation — SoftUni \'22',
  'Java Basic, OOP & Web — Vola Software \'22',
  'Microsoft Excel Advanced — SoftUni \'22',
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
const anim = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }

export default function Resume() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-10">
      <motion.div variants={anim}>
        <h3 className="text-lg sm:text-xl text-white font-semibold mb-5">My Skills</h3>
        <div className="flex flex-col gap-5">
          {categories.map(cat => (
            <div key={cat}>
              <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">{cat}</p>
              <div className="flex flex-wrap gap-3">
                {skills.filter(s => s.category === cat).map(({ icon: Icon, label, color }) => (
                  <motion.div key={label} whileHover={{ y: -3 }}>
                    <GradientCard className="flex items-center gap-2.5 !py-2.5 !px-4">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <motion.div variants={anim}>
          <h3 className="text-lg sm:text-xl text-white font-semibold mb-5">Experience</h3>
          <div className="flex flex-col gap-4">
            {experience.map(e => <TimelineEntry key={e.title} {...e} />)}
          </div>
        </motion.div>

        <motion.div variants={anim}>
          <h3 className="text-lg sm:text-xl text-white font-semibold mb-5">Education</h3>
          <div className="flex flex-col gap-4">
            {education.map(e => <TimelineEntry key={e.title} {...e} />)}
          </div>

          <h3 className="text-lg sm:text-xl text-white font-semibold mb-4 mt-8">Certifications</h3>
          <div className="flex flex-col gap-2">
            {certifications.map(cert => (
              <div key={cert} className="flex items-start gap-2.5 text-sm text-[#aaa]">
                <span className="text-accent mt-0.5">▹</span>
                {cert}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

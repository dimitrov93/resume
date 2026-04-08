import { motion } from 'framer-motion'
import { FiExternalLink } from 'react-icons/fi'
import { skills, skillCategories } from '../../data/resume'
import GradientCard from '../ui/GradientCard'
import IconBox from '../ui/IconBox'
import PulseDot from '../ui/PulseDot'
import useLanguage from '../../hooks/useLanguage'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
const item = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }
const iconFilter = 'invert(92%) sepia(85%) saturate(652%) hue-rotate(319deg) brightness(102%) contrast(101%)'

export default function About() {
  const { t } = useLanguage()

  const services = [
    { icon: '/icons/web-design.svg', title: t('about.webDesign'), desc: t('about.webDesignDesc') },
    { icon: '/icons/web-dev.svg', title: t('about.webDev'), desc: t('about.webDevDesc') },
    { icon: '/icons/mobile.svg', title: t('about.teamLead'), desc: t('about.teamLeadDesc') },
    { icon: '/icons/photo.svg', title: t('about.fullStack'), desc: t('about.fullStackDesc') },
  ]

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="flex flex-col gap-3">
        <div className="flex items-center gap-2 w-fit px-4 py-2 rounded-full bg-card border border-green-400/20">
          <PulseDot size="sm" />
          <span className="text-xs font-medium text-green-400">{t('about.available')}</span>
        </div>
        <p className="text-paragraph leading-[1.8]">
          {t('about.bio1')}
        </p>
        <p className="text-paragraph leading-[1.8]">
          {t('about.bio2')}
        </p>
      </motion.div>

      <motion.div variants={item} className="mt-8">
        <h3 className="text-lg sm:text-xl text-heading font-semibold mb-4">{t('about.whatImDoing')}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {services.map(({ icon, title, desc }) => (
            <motion.div key={title} whileHover={{ y: -4 }}>
              <GradientCard className="flex items-start gap-4">
                <IconBox size={56}>
                  <img src={icon} alt={title} className="w-7 h-7" style={{ filter: iconFilter }} />
                </IconBox>
                <div>
                  <h4 className="text-heading font-bold mb-2 text-base">{title}</h4>
                  <p className="text-sm leading-relaxed text-muted">{desc}</p>
                </div>
              </GradientCard>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={item} className="mt-8">
        <h3 className="text-lg sm:text-xl text-heading font-semibold mb-4">{t('about.featuredProject')}</h3>
        <a
          href="https://lupygames.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group block no-underline"
        >
          <div className="bg-card border border-border-gold rounded-2xl overflow-hidden transition-all duration-300 hover:border-accent/30 hover:shadow-[0_8px_32px_var(--color-border-gold)]">
            <div className="relative overflow-hidden aspect-[16/8]">
              <img
                src="/lupy-games.png"
                alt="Lupy Games"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-linear-to-t from-card via-transparent to-transparent" />
            </div>
            <div className="p-6 -mt-8 relative">
              <div className="flex items-center gap-2 mb-2">
                <PulseDot size="sm" />
                <span className="text-xs font-semibold text-green-400 uppercase tracking-wider">Live Project</span>
              </div>
              <h4 className="text-heading font-bold text-xl mb-2 group-hover:text-accent transition-colors">Lupy Games</h4>
              <p className="text-sm text-muted leading-relaxed mb-4">{t('about.lupyDesc')}</p>
              <span className="inline-flex items-center gap-1.5 text-accent text-sm font-semibold group-hover:gap-2.5 transition-all">
                {t('about.visitSite')} <FiExternalLink size={14} />
              </span>
            </div>
          </div>
        </a>
      </motion.div>

      <motion.div variants={item} className="mt-8">
        <h3 className="text-lg sm:text-xl text-heading font-semibold mb-5">{t('about.mySkills')}</h3>
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
                      <span className="text-sm font-medium text-paragraph">{label}</span>
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

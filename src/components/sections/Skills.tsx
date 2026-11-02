import { motion } from 'framer-motion'
import TimelineEntry from '../ui/TimelineEntry'
import useLanguage from '../../hooks/useLanguage'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
const anim = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }

export default function Resume() {
  const { t } = useLanguage()

  const localExperience = [
    {
      title: t('exp.lupyTitle'),
      period: t('exp.lupyPeriod'),
      desc: t('exp.lupyDesc'),
    },
    {
      title: t('exp.montwayTitle'),
      period: t('exp.montwayPeriod'),
      desc: t('exp.montwayDesc'),
      roles: [
        { role: t('role.teamLead'), period: t('role.teamLeadPeriod') },
        { role: t('role.seniorSales'), period: '2020 — 2022' },
        { role: t('role.sales'), period: '2018 — 2020' },
        { role: t('role.coordinator'), period: '2016 — 2018' },
      ],
    },
    {
      title: t('exp.volaTitle'),
      period: t('exp.volaPeriod'),
      desc: t('exp.volaDesc'),
    },
    {
      title: t('exp.sutherlandTitle'),
      period: t('exp.sutherlandPeriod'),
      desc: t('exp.sutherlandDesc'),
    },
    {
      title: t('exp.gameloftTitle'),
      period: t('exp.gameloftPeriod'),
      desc: t('exp.gameloftDesc'),
    },
  ]

  const localEducation = [
    {
      title: t('edu.softuni'),
      period: t('edu.softuniPeriod'),
      desc: t('edu.softuniDesc'),
    },
    {
      title: t('edu.unwe'),
      period: t('edu.unwePeriod'),
      desc: t('edu.unweDesc'),
    },
  ]

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-10">
      <motion.div variants={anim}>
        <div className="flex flex-col gap-5">
          {localExperience.map(e => <TimelineEntry key={e.title} {...e} />)}
        </div>
      </motion.div>

      <motion.div variants={anim}>
        <h3 className="text-lg sm:text-xl text-heading font-semibold mb-5">{t('resume.education')}</h3>
        <div className="flex flex-col gap-5">
          {localEducation.map(e => <TimelineEntry key={e.title} {...e} />)}
        </div>
      </motion.div>
    </motion.div>
  )
}

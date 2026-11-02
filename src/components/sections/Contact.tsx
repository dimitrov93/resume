import { motion } from 'framer-motion'
import { FiMail } from 'react-icons/fi'
import { profile } from '../../data/profile'
import useLanguage from '../../hooks/useLanguage'
import ContactForm from '../ui/ContactForm'

const anim = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }
const container = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }

export default function Contact() {
  const { t } = useLanguage()
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-6 flex-1">
      <motion.div variants={anim}>
        <a
          href={`mailto:${profile.email}`}
          className="group flex items-center gap-5 bg-card border border-border-gold rounded-2xl p-6 no-underline transition-all duration-300 hover:border-accent/30 hover:shadow-[0_4px_24px_var(--color-border-gold)]"
        >
          <div className="shrink-0 w-14 h-14 rounded-2xl bg-linear-to-br from-accent to-accent-2 flex items-center justify-center shadow-[0_4px_16px_var(--color-border-gold)] group-hover:shadow-[0_4px_24px_var(--color-border-gold)] transition-shadow duration-300">
            <FiMail size={24} className="text-accent-text" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-dim">{t('contact.getInTouch')}</span>
            <span className="text-base sm:text-lg font-semibold text-heading group-hover:text-accent transition-colors duration-300 wrap-break-word">
              {profile.email.split('@')[0]}@<wbr />{profile.email.split('@')[1]}
            </span>
            <span className="text-xs text-dim">{t('contact.clickToEmail')}</span>
          </div>
        </a>
      </motion.div>

      {/* The form fills the rest of the section (desktop panel has a fixed height). */}
      <motion.div variants={anim} className="flex-1 flex flex-col">
        <p className="text-xs uppercase tracking-wider font-semibold text-dim mb-4">{t('contact.orUseForm')}</p>
        <ContactForm />
      </motion.div>

    </motion.div>
  )
}

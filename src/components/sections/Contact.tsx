import { motion } from 'framer-motion'
import { FiMail } from 'react-icons/fi'
import { profile } from '../../data/profile'
import ContactForm from '../ui/ContactForm'

const anim = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }
const container = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }

export default function Contact() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-6">
      <motion.div variants={anim}>
        <a
          href={`mailto:${profile.email}`}
          className="group flex items-center gap-5 bg-card border border-border-gold rounded-2xl p-6 no-underline transition-all duration-300 hover:border-accent/30 hover:shadow-[0_4px_24px_rgba(255,219,110,0.08)]"
        >
          <div className="shrink-0 w-14 h-14 rounded-2xl bg-linear-to-br from-accent to-accent-2 flex items-center justify-center shadow-[0_4px_16px_rgba(255,219,110,0.2)] group-hover:shadow-[0_4px_24px_rgba(255,219,110,0.35)] transition-shadow duration-300">
            <FiMail size={24} className="text-[#1a1a1b]" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#555]">Get in touch</span>
            <span className="text-base sm:text-lg font-semibold text-white group-hover:text-accent transition-colors duration-300 break-all">{profile.email}</span>
            <span className="text-xs text-[#666]">Click to send me an email</span>
          </div>
        </a>
      </motion.div>

      <motion.div variants={anim}>
        <p className="text-xs uppercase tracking-wider font-semibold text-[#555] mb-4">Or use the form below</p>
        <ContactForm />
      </motion.div>

      <motion.div variants={anim}>
        <p className="text-xs uppercase tracking-wider font-semibold text-[#555] mb-4">Where I'm based</p>
        <div className="rounded-2xl overflow-hidden border border-border-gold h-60 sm:h-72">
          <iframe
            title="Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46732.0!2d23.225!3d43.4125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40ab37e2e1e43ac1%3A0xa000f1e0f39c0!2sMontana%2C%20Bulgaria!5e0!3m2!1sen!2sbg!4v1700000000000"
            className="w-full h-full border-none grayscale-80 contrast-[1.1] invert-[0.9] hue-rotate-180"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

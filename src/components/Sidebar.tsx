import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown, FiDownload, FiEye } from 'react-icons/fi'
import { contacts } from '../data/contacts'
import { profile } from '../data/profile'
import ContactItem from './ContactItem'
import SocialLinks from './ui/SocialLinks'
import Divider from './ui/Divider'

export function SidebarFull() {
  return (
    <motion.aside
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="shrink-0 flex flex-col items-center justify-center overflow-hidden w-85 bg-surface border border-border-gold rounded-3xl py-7.5 px-7 gap-4"
    >
      <div className="flex flex-col items-center gap-2">
        <div className="overflow-hidden w-45 h-45 rounded-3xl bg-surface-2">
          <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
        </div>
        <h1 className="text-xl sm:text-2xl text-white font-semibold tracking-tight mt-3">
          {profile.name}
        </h1>
        <div className="py-2.5 px-6 rounded-[10px] text-sm font-medium bg-gold-glow text-accent">
          {profile.title}
        </div>
      </div>

      <Divider />

      <div className="w-full flex flex-col px-2">
        {contacts.map(({ icon, label, value, href }, i) => (
          <div key={label}>
            <ContactItem icon={icon} label={label} value={value} href={href} />
            {i < contacts.length - 1 && <Divider width="100%" />}
          </div>
        ))}
      </div>

      <Divider />
      <SocialLinks />

      <Divider />
      <div className="flex gap-2">
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('cv-preview'))}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-accent bg-transparent text-accent text-[11px] font-semibold cursor-pointer transition-all duration-300 hover:bg-accent/10"
        >
          <FiEye size={12} />
          Preview CV
        </button>
        <a
          href="/cv.pdf"
          download="Tsvetomir_Dimitrov_CV.pdf"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-linear-to-r from-accent to-accent-2 text-[#1a1a1b] text-[11px] font-semibold no-underline transition-all duration-300 hover:brightness-110"
        >
          <FiDownload size={12} />
          Download CV
        </a>
      </div>
    </motion.aside>
  )
}

export function SidebarCompact() {
  const [showContacts, setShowContacts] = useState(false)

  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-surface border border-border-gold rounded-2xl p-5 max-sm:p-4"
    >
      <div className="flex items-center gap-4">
        <div className="shrink-0 overflow-hidden w-20 h-20 rounded-2xl bg-surface-2">
          <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col gap-1.5">
          <h1 className="text-white text-xl font-semibold tracking-tight">{profile.name}</h1>
          <div className="py-1.5 px-4 rounded-lg text-[13px] font-medium bg-white/6 text-[#aaa] w-fit">
            {profile.title}
          </div>
        </div>

        <button
          onClick={() => setShowContacts(!showContacts)}
          className="cursor-pointer ml-auto py-2 px-4 rounded-xl border border-accent/20 bg-transparent text-accent text-[13px] font-medium flex items-center gap-1.5 whitespace-nowrap transition-all duration-300"
        >
          <span className="max-sm:hidden">Show Contacts</span>
          <FiChevronDown
            size={14}
            className="transition-transform duration-300"
            style={{ transform: showContacts ? 'rotate(180deg)' : 'rotate(0)' }}
          />
        </button>
      </div>

      <AnimatePresence>
        {showContacts && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-3">
              <Divider width="100%" />
              <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-x-6 gap-y-1 py-3">
                {contacts.map(({ icon, label, value, href }) => (
                  <ContactItem key={label} icon={icon} label={label} value={value} href={href} />
                ))}
              </div>
              <Divider width="100%" />
              <div className="pt-3 flex justify-center">
                <SocialLinks />
              </div>
              <div className="pt-3 flex justify-center gap-2">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('cv-preview'))}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-accent bg-transparent text-accent text-[11px] font-semibold cursor-pointer transition-all duration-300 hover:bg-accent/10"
                >
                  <FiEye size={12} />
                  Preview CV
                </button>
                <a
                  href="/cv.pdf"
                  download="Tsvetomir_Dimitrov_CV.pdf"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-linear-to-r from-accent to-accent-2 text-[#1a1a1b] text-[11px] font-semibold no-underline transition-all duration-300 hover:brightness-110"
                >
                  <FiDownload size={12} />
                  Download CV
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default SidebarFull

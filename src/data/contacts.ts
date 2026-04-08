import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { FaLinkedinIn, FaGithub, FaFacebookMessenger } from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import { profile } from './profile'

interface ContactEntry {
  icon: IconType
  label: string
  value: string
  href: string
}

interface SocialEntry {
  icon: IconType
  label: string
  href: string
}

export const contacts: ContactEntry[] = [
  { icon: FiMail, label: 'EMAIL', value: profile.email, href: `mailto:${profile.email}` },
  { icon: FiPhone, label: 'PHONE', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
  { icon: FiMapPin, label: 'LOCATION', value: profile.location, href: '#' },
]

export const socials: SocialEntry[] = [
  { icon: FaGithub, href: 'https://github.com/dimitrov93', label: 'GitHub' },
  { icon: FaLinkedinIn, href: 'https://linkedin.com/in/tsvetomir-dimitrov', label: 'LinkedIn' },
  { icon: FaFacebookMessenger, href: 'https://m.me/dimitrovtsvetomir', label: 'Messenger' },
]

import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { FaFacebookF, FaLinkedinIn, FaGithub } from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import { profile } from './profile'

export interface ContactEntry {
  icon: IconType
  label: string
  value: string
  href: string
}

export interface SocialEntry {
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
  { icon: FaFacebookF, href: '#', label: 'Facebook' },
  { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
  { icon: FaGithub, href: '#', label: 'GitHub' },
]

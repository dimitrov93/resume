import type { IconType } from 'react-icons'
import useLanguage from '../hooks/useLanguage'
import type { TranslationKey } from '../data/translations'
import IconBox from './ui/IconBox'

const labelKeys: Record<string, TranslationKey> = {
  EMAIL: 'sidebar.email',
  PHONE: 'sidebar.phone',
  LOCATION: 'sidebar.location',
}

interface ContactItemProps {
  icon: IconType
  label: string
  value: string
  href: string
}

export default function ContactItem({ icon: Icon, label, value, href }: ContactItemProps) {
  const { t } = useLanguage()
  return (
    <a href={href} className="flex items-center gap-4 py-2 no-underline text-inherit transition-opacity duration-300">
      <IconBox>
        <Icon size={18} style={{ color: 'var(--color-accent)' }} />
      </IconBox>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted mb-1">{t(labelKeys[label]) || label}</p>
        <p className="text-[15px] font-normal text-heading">{value}</p>
      </div>
    </a>
  )
}

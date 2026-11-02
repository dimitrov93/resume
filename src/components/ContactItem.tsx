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
    <a
      href={href}
      {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
      className="block py-2 no-underline text-inherit transition-opacity duration-300"
    >
      {/* Row layout on an inner element: browser extensions (dialers, CRMs) restyle mailto:/tel: links themselves. */}
      <div className="flex flex-row flex-nowrap items-center gap-4">
        <IconBox>
          <Icon size={18} style={{ color: 'var(--color-accent)' }} />
        </IconBox>
        <div className="min-w-0">
          <span className="block text-[11px] font-semibold uppercase tracking-wide text-muted mb-1">{t(labelKeys[label]) || label}</span>
          <span className="block text-[15px] font-normal text-heading wrap-break-word">{value}</span>
        </div>
      </div>
    </a>
  )
}

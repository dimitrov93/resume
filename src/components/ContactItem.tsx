import type { IconType } from 'react-icons'
import IconBox from './ui/IconBox'

interface ContactItemProps {
  icon: IconType
  label: string
  value: string
  href: string
}

export default function ContactItem({ icon: Icon, label, value, href }: ContactItemProps) {
  return (
    <a href={href} className="flex items-center gap-4 py-2 no-underline text-inherit transition-opacity duration-300">
      <IconBox>
        <Icon size={18} style={{ color: 'var(--color-accent)' }} />
      </IconBox>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted mb-1">{label}</p>
        <p className="text-[15px] font-normal text-heading">{value}</p>
      </div>
    </a>
  )
}

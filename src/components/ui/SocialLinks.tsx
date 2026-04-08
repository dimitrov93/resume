import { socials } from '../../data/contacts'

export default function SocialLinks() {
  return (
    <div className="flex gap-4">
      {socials.map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          className="flex items-center justify-center w-[42px] h-[42px] rounded-xl bg-surface-2 border border-border-gold text-dim transition-all duration-300 hover:text-bg"
          onMouseEnter={e => {
            e.currentTarget.style.background = `linear-gradient(137.84deg, var(--color-accent) 26.31%, var(--color-accent-2) 93.75%)`
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = ''
          }}
        >
          <Icon size={18} />
        </a>
      ))}
    </div>
  )
}

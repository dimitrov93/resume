import { motion } from 'framer-motion'

const tabs = ['About', 'Resume', 'Certifications', 'Portfolio', 'Contact'] as const

interface NavTabsProps {
  active: string
  setActive: (tab: string) => void
}

function pillRadius(i: number) {
  const r = '12px'
  if (i === 0) return `${r} ${r} ${r} 0`
  if (i === tabs.length - 1) return `${r} ${r} 0 ${r}`
  return r
}

function btnRadius(i: number) {
  if (i === 0) return '0'
  if (i === tabs.length - 1) return '0'
  return '0'
}

export default function NavTabs({ active, setActive }: NavTabsProps) {
  return (
    <nav className="relative">
      <div className="flex bg-surface border border-border-gold rounded-t-[20px] rounded-br-none rounded-bl-none overflow-hidden">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`relative cursor-pointer text-[13px] font-medium px-5 py-3 border-none bg-transparent whitespace-nowrap transition-colors duration-300 ${
              active === tab ? 'text-heading' : 'text-dim hover:text-muted'
            }`}
            style={{ borderRadius: btnRadius(i) }}
          >
            {active === tab && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 bg-linear-to-br from-accent to-accent-2 shadow-[0_2px_10px_var(--color-border-gold)]"
                style={{ borderRadius: pillRadius(i) }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}

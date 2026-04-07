import { motion } from 'framer-motion'

const tabs = ['About', 'Resume', 'Portfolio', 'Blog', 'Contact'] as const

interface NavTabsProps {
  active: string
  setActive: (tab: string) => void
}

function pillRadius(i: number) {
  const r = '12px'
  if (i === 0) return `0 ${r} ${r} 16px`
  if (i === tabs.length - 1) return `${r} 20px 0 ${r}`
  return r
}

function btnRadius(i: number) {
  if (i === 0) return '0 0 0 16px'
  if (i === tabs.length - 1) return '0 20px 0 0'
  return '0'
}

export default function NavTabs({ active, setActive }: NavTabsProps) {
  return (
    <nav className="relative mb-3 sm:absolute sm:top-0 sm:right-0 sm:mb-0">
      <div className="flex bg-white/3 border border-white/6 rounded-tl-none rounded-tr-[20px] rounded-br-none rounded-bl-2xl overflow-hidden">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`relative cursor-pointer text-[13px] font-medium px-5 py-3 border-none bg-transparent whitespace-nowrap transition-colors duration-300 ${
              active === tab ? 'text-[#1a1a1b]' : 'text-dim hover:text-white/70'
            }`}
            style={{ borderRadius: btnRadius(i) }}
          >
            {active === tab && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 bg-linear-to-br from-accent to-accent-2 shadow-[0_2px_10px_rgba(255,219,110,0.3)]"
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

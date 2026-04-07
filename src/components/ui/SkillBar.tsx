import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface SkillBarProps {
  name: string
  level: number
}

export default function SkillBar({ name, level }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  // level controls how much of the border is gold vs dark
  const borderProgress = level / 100

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -4, scale: 1.03 }}
      className="relative rounded-2xl p-5 flex items-center justify-center cursor-default overflow-hidden"
      style={{ background: '#202021' }}
    >
      {/* Animated gold border that reveals based on skill level */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <rect
          x="0.5"
          y="0.5"
          width="calc(100% - 1px)"
          height="calc(100% - 1px)"
          rx="16"
          ry="16"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
        <motion.rect
          x="0.5"
          y="0.5"
          width="calc(100% - 1px)"
          height="calc(100% - 1px)"
          rx="16"
          ry="16"
          fill="none"
          stroke="url(#borderGold)"
          strokeWidth="1.5"
          strokeLinecap="round"
          pathLength="1"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: borderProgress } : { pathLength: 0 }}
          transition={{ duration: 1.4, ease: 'easeOut', delay: 0.15 }}
        />
        <defs>
          <linearGradient id="borderGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFDB6E" />
            <stop offset="100%" stopColor="#FFBC5E" />
          </linearGradient>
        </defs>
      </svg>

      {/* Glow effect behind the card, intensity based on level */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: borderProgress * 0.15 } : { opacity: 0 }}
        transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }}
        style={{
          boxShadow: '0 0 20px rgba(255,219,110,0.3), inset 0 0 20px rgba(255,219,110,0.05)',
        }}
      />

      <span className="relative text-sm font-medium text-[#ddd] text-center">{name}</span>
    </motion.div>
  )
}

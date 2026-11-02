import { motion, useReducedMotion } from 'framer-motion'
import { FiExternalLink } from 'react-icons/fi'
import PulseDot from './PulseDot'
import useLanguage from '../../hooks/useLanguage'
import useFrameworkColors from '../../hooks/useFrameworkColors'
import { frameworkIcons, type Framework } from '../../data/projects'

type Props = {
  href: string
  image: string
  title: string
  desc: string
  framework: Framework
}

export default function FeaturedProjectCard({ href, image, title, desc, framework }: Props) {
  const reduceMotion = useReducedMotion()
  const { t } = useLanguage()
  const frameworkColors = useFrameworkColors()
  const Icon = frameworkIcons[framework]

  return (
    <div className="relative">
      <motion.div
        aria-hidden
        className="absolute -inset-1 rounded-3xl bg-linear-to-r from-accent via-accent-2 to-accent blur-xl pointer-events-none"
        animate={reduceMotion ? { opacity: 0.4 } : { opacity: [0.25, 0.55, 0.25] }}
        transition={reduceMotion ? { duration: 0 } : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block no-underline"
      >
        <div className="relative flex flex-col lg:flex-row items-stretch rounded-2xl overflow-hidden bg-card border border-accent/40 transition-all duration-300 hover:border-accent/70 shadow-[0_8px_40px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_48px_var(--color-border-gold)]">
          <div className="lg:w-[55%] shrink-0 overflow-hidden aspect-[1200/630] lg:aspect-auto">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover object-left"
            />
          </div>
          <div className="flex flex-col justify-center gap-4 p-6 sm:p-7 lg:w-[45%]">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent bg-accent/10 px-2.5 py-1 rounded-md">{t('portfolio.featured')}</span>
                <PulseDot size="sm" />
              </div>
              <span
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] bg-overlay-5 border border-border-subtle px-2 py-1 rounded-md"
                style={{ color: frameworkColors[framework] }}
              >
                <Icon size={12} />
                {framework}
              </span>
            </div>
            <h3 className="text-heading font-bold text-xl group-hover:text-accent transition-colors">{title}</h3>
            <p className="text-sm text-muted leading-relaxed">{desc}</p>
            <span className="inline-flex items-center gap-1.5 text-accent text-sm font-semibold group-hover:gap-2.5 transition-all">
              {new URL(href).hostname} <FiExternalLink size={14} />
            </span>
          </div>
        </div>
      </a>
    </div>
  )
}

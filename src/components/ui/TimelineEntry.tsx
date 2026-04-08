import { motion } from 'framer-motion'
import useLanguage from '../../hooks/useLanguage'

interface TimelineEntryProps {
  title: string
  period: string
  desc: string
  roles?: { role: string; period: string }[]
}

export default function TimelineEntry({ title, period, desc, roles }: TimelineEntryProps) {
  const { t } = useLanguage()
  return (
    <motion.div
      className="relative pl-8"
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/30 to-transparent" />
      <div className="absolute left-0 top-3 -translate-x-1/2">
        <div className="w-3 h-3 rounded-full bg-accent/20 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_var(--color-border-gold)]" />
        </div>
      </div>

      <div className="group bg-card border border-border-gold rounded-2xl p-5 transition-all duration-300 hover:border-accent/30 hover:shadow-[0_4px_20px_var(--color-border-gold)]">
        <span className="inline-block text-[11px] px-3 py-1 rounded-full bg-gold-glow text-accent font-medium mb-3 tracking-wide">
          {period}
        </span>
        <h3 className="font-semibold text-heading text-[15px] mb-2 group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>
        <p className="text-[13px] leading-relaxed text-muted">{desc}</p>

        {roles && (
          <div className="mt-4 pt-4 border-t border-white/5">
            <p className="text-[11px] uppercase tracking-wider text-accent/70 font-semibold mb-3">{t('resume.careerProgression')}</p>
            <div className="flex flex-col gap-2">
              {roles.map((r, i) => (
                <div key={r.role} className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-accent shadow-[0_0_6px_var(--color-border-gold)]' : 'bg-white/20'}`} />
                    {i < roles.length - 1 && (
                      <div className="absolute ml-[2.5px] mt-6 w-px h-3 bg-white/10" />
                    )}
                  </div>
                  <span className={`text-[13px] font-medium ${i === 0 ? 'text-heading' : 'text-dim'}`}>{r.role}</span>
                  <span className="text-[11px] text-dim ml-auto shrink-0">{r.period}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

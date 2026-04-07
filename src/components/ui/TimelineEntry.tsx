interface TimelineEntryProps {
  title: string
  period: string
  desc: string
}

export default function TimelineEntry({ title, period, desc }: TimelineEntryProps) {
  return (
    <div className="relative pl-6">
      <div className="absolute left-0 top-1.5 bottom-0 w-px bg-gradient-to-b from-accent to-accent/5" />
      <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent border-2 border-[#1a1a1b]" />
      <div className="bg-card border border-border-gold rounded-2xl p-5 transition-colors duration-300">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-white text-sm">{title}</h3>
          <span className="text-xs px-2.5 py-1 rounded-full bg-gold-glow text-accent">{period}</span>
        </div>
        <p className="text-xs leading-relaxed text-[#777]">{desc}</p>
      </div>
    </div>
  )
}

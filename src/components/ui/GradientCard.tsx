interface GradientCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export default function GradientCard({ children, className = '', ...rest }: GradientCardProps) {
  return (
    <div
      className={`relative bg-card rounded-[18px] p-5 transition-all duration-300 ${className}`}
      {...rest}
    >
      <div
        className="absolute inset-0 pointer-events-none rounded-[18px] p-px"
        style={{
          background: `linear-gradient(155deg, var(--color-accent) 0%, transparent 50%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      {children}
    </div>
  )
}

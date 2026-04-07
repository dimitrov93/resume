interface IconBoxProps {
  size?: number
  children: React.ReactNode
}

export default function IconBox({ size = 48, children }: IconBoxProps) {
  return (
    <div
      className="flex items-center justify-center shrink-0 border border-border-gold"
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.25,
        background: 'linear-gradient(135deg, rgba(255,218,109,0.25) 0%, rgba(255,189,94,0) 59.86%), #202021',
      }}
    >
      {children}
    </div>
  )
}

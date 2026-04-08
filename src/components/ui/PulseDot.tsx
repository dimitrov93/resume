export default function PulseDot({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  const dotSize = size === 'sm' ? 'w-2 h-2' : 'w-2.5 h-2.5'
  const wrapperSize = size === 'sm' ? 'w-2 h-2' : 'w-2.5 h-2.5'
  const shadow = size === 'sm' ? 'shadow-[0_0_6px_rgba(74,222,128,0.5)]' : 'shadow-[0_0_8px_rgba(74,222,128,0.5)]'

  return (
    <div className={`relative flex items-center justify-center ${wrapperSize}`}>
      <span className={`absolute inline-flex w-full h-full rounded-full bg-green-400/40 animate-ping`} />
      <span className={`relative inline-flex ${dotSize} rounded-full bg-green-400 ${shadow}`} />
    </div>
  )
}

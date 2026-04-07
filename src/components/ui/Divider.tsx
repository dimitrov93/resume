interface DividerProps {
  width?: string
}

export default function Divider({ width = '80%' }: DividerProps) {
  return <div className="h-px bg-white/6" style={{ width }} />
}

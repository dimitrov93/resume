import { useReducedMotion } from 'framer-motion'
import useTypewriter from '../../hooks/useTypewriter'

// The longest role is rendered invisibly in the same grid cell, so the badge keeps its final
// size while the text is typed — no layout shift as letters appear and lines wrap.
export default function TypedRoles({ roles }: { roles: string[] }) {
  const typed = useTypewriter(roles)
  const reduceMotion = useReducedMotion()
  const longest = roles.reduce((a, b) => (b.length > a.length ? b : a), '')

  return (
    <span className="inline-grid">
      <span className="sr-only">{roles.join(', ')}</span>
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">{longest}|</span>
      <span aria-hidden="true" className="col-start-1 row-start-1">
        {reduceMotion ? roles[0] : <>{typed}<span className="animate-pulse">|</span></>}
      </span>
    </span>
  )
}

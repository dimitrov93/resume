import { useSyncExternalStore } from 'react'

// Subscribes to a CSS media query so only the matching layout is rendered (not both, hidden by CSS).
export default function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    onChange => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
  )
}

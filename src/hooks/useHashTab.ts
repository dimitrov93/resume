import { useCallback, useSyncExternalStore } from 'react'

// Keeps the active tab in the URL hash (#portfolio), so tabs can be linked to,
// survive a refresh, and the browser/phone Back button steps through them.
export default function useHashTab<T extends string>(tabs: readonly T[], fallback: T): [T, (tab: T) => void] {
  const hash = useSyncExternalStore(
    onChange => {
      window.addEventListener('hashchange', onChange)
      return () => window.removeEventListener('hashchange', onChange)
    },
    () => window.location.hash.slice(1).toLowerCase(),
  )

  const active = tabs.find(tab => tab.toLowerCase() === hash) ?? fallback

  const setActive = useCallback(
    (tab: T) => {
      if (tab === active) return
      window.location.hash = tab === fallback ? '' : tab.toLowerCase()
    },
    [active, fallback],
  )

  return [active, setActive]
}

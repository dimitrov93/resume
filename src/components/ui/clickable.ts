import type { KeyboardEvent } from 'react'

// Props that make a card-like element behave as a button: reachable with Tab,
// activated with Enter/Space, announced as a button by screen readers.
export function clickable(onActivate: () => void, label?: string) {
  return {
    role: 'button' as const,
    tabIndex: 0,
    'aria-label': label,
    onClick: onActivate,
    onKeyDown: (e: KeyboardEvent<HTMLElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onActivate()
      }
    },
  }
}

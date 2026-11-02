import { useEffect, useRef } from 'react'

// Counts open dialogs so nested or duplicated ones don't restore the page scroll too early.
let openDialogs = 0

// Shared modal behavior: Esc closes, the page behind stops scrolling, focus moves into the
// dialog (its close button) and returns to whatever opened it when the dialog closes.
export default function useDialog(onClose: () => void) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    openDialogs += 1
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current()
    }
    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('keydown', onKey)
      openDialogs -= 1
      if (openDialogs === 0) document.body.style.overflow = ''
      opener?.focus?.()
    }
  }, [])

  return closeRef
}

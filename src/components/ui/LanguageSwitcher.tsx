import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FiCheck, FiChevronDown } from 'react-icons/fi'
import useLanguage, { type Lang } from '../../hooks/useLanguage'
import LangFlag from './LangFlag'

const languages: { code: Lang; label: string; short: string }[] = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'bg', label: 'Български', short: 'BG' },
]

// Language dropdown. The menu is portaled to <body> so it isn't clipped by the
// tab bar (overflow-hidden) and sits above the mobile drawer.
export default function LanguageSwitcher({ size = 'sm', placement = 'down' }: { size?: 'sm' | 'md'; placement?: 'down' | 'up' }) {
  const { lang, setLang, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const current = languages.find(l => l.code === lang)!

  // Anchor the menu to the button (right-aligned when opening down, left-aligned when opening up).
  useLayoutEffect(() => {
    if (!open || !buttonRef.current) return
    const r = buttonRef.current.getBoundingClientRect()
    const menuWidth = 176
    setPos(placement === 'down'
      ? { top: r.bottom + 8, left: Math.max(8, r.right - menuWidth) }
      : { top: r.top - 8, left: r.left })
  }, [open, placement])

  // Move focus into the menu once it is positioned and mounted.
  useEffect(() => {
    if (open && pos) menuRef.current?.querySelector<HTMLButtonElement>('[aria-checked="true"]')?.focus()
  }, [open, pos])

  useEffect(() => {
    if (!open) return
    const onPointer = (e: MouseEvent) => {
      const target = e.target as Node
      if (!menuRef.current?.contains(target) && !buttonRef.current?.contains(target)) setOpen(false)
    }
    const close = () => setOpen(false)
    document.addEventListener('mousedown', onPointer)
    window.addEventListener('resize', close)
    window.addEventListener('scroll', close, true)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      window.removeEventListener('resize', close)
      window.removeEventListener('scroll', close, true)
    }
  }, [open])

  const choose = (code: Lang) => {
    setLang(code)
    setOpen(false)
    buttonRef.current?.focus()
  }

  // Esc closes only the dropdown (stopPropagation keeps an open mobile drawer open); arrows move between options.
  const onMenuKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.stopPropagation()
      setOpen(false)
      buttonRef.current?.focus()
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      const items = [...(menuRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]') ?? [])]
      const i = items.indexOf(document.activeElement as HTMLButtonElement)
      items[(i + (e.key === 'ArrowDown' ? 1 : items.length - 1)) % items.length]?.focus()
    }
  }

  const md = size === 'md'

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setOpen(o => !o)}
        onKeyDown={e => { if (e.key === 'Escape' && open) { e.stopPropagation(); setOpen(false) } }}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`${t('a11y.language')}: ${current.label}`}
        className={`${md ? 'h-9 px-2.5 gap-1.5 text-xs' : 'h-7 px-2 gap-1.5 text-[11px]'} rounded-lg flex items-center justify-center cursor-pointer border border-transparent bg-transparent leading-none font-semibold text-dim hover:text-heading hover:bg-overlay-5 transition-colors duration-200 ${open ? 'bg-overlay-5 text-heading' : ''}`}
      >
        <LangFlag lang={current.code} className={md ? 'w-5 h-3.5' : 'w-4 h-3'} />
        <span>{current.short}</span>
        <FiChevronDown size={md ? 14 : 12} className="transition-transform duration-200" style={{ transform: open ? 'rotate(180deg)' : 'none' }} />
      </button>

      {createPortal(
        <AnimatePresence>
          {open && pos && (
            <motion.div
              ref={menuRef}
              role="menu"
              aria-label={t('a11y.language')}
              onKeyDown={onMenuKey}
              initial={{ opacity: 0, y: placement === 'down' ? -6 : 6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: placement === 'down' ? -6 : 6, scale: 0.97 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              style={{ top: pos.top, left: pos.left, transformOrigin: placement === 'down' ? 'top right' : 'bottom left', translate: placement === 'up' ? '0 -100%' : undefined }}
              className="fixed z-[120] w-44 bg-surface border border-border-gold rounded-xl p-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.35)]"
            >
              {languages.map(l => {
                const selected = l.code === lang
                return (
                  <button
                    key={l.code}
                    role="menuitemradio"
                    aria-checked={selected}
                    lang={l.code}
                    onClick={() => choose(l.code)}
                    className={`w-full cursor-pointer flex items-center gap-2.5 px-3 py-2 rounded-lg border-none text-[13px] font-medium text-left transition-colors duration-150 ${
                      selected ? 'bg-accent/15 text-accent' : 'bg-transparent text-paragraph hover:bg-overlay-5'
                    }`}
                  >
                    <LangFlag lang={l.code} className="w-5 h-3.5" />
                    <span className="flex-1">{l.label}</span>
                    {selected && <FiCheck size={14} />}
                  </button>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}

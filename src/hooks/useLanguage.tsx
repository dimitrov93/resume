import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'
import translations from '../data/translations'
import type { TranslationKey } from '../data/translations'

export type Lang = 'en' | 'bg'

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  setLang: () => {},
  t: (key) => key,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('lang') as Lang | null
    if (saved === 'bg' || saved === 'en') return saved
    // First visit: Bulgarian browsers get BG, everyone else EN.
    return navigator.languages?.some(l => l.toLowerCase().startsWith('bg')) ? 'bg' : 'en'
  })

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.setAttribute('lang', lang)
  }, [lang])

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[lang][key] ?? key
    },
    [lang],
  )

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Provider and hook share this file on purpose; it only costs fast refresh for this module.
// eslint-disable-next-line react-refresh/only-export-components
export default function useLanguage() {
  return useContext(LanguageContext)
}

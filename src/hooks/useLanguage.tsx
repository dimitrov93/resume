import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'
import translations from '../data/translations'
import type { TranslationKey } from '../data/translations'

type Lang = 'en' | 'bg'

interface LanguageContextValue {
  lang: Lang
  toggle: () => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  toggle: () => {},
  t: (key) => key,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('lang') as Lang | null
    return saved === 'bg' ? 'bg' : 'en'
  })

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.setAttribute('lang', lang)
  }, [lang])

  const toggle = () => setLang((l) => (l === 'en' ? 'bg' : 'en'))

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[lang][key] ?? key
    },
    [lang],
  )

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export default function useLanguage() {
  return useContext(LanguageContext)
}

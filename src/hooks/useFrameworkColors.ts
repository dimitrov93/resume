import { useMemo } from 'react'
import { frameworkColors, type Framework } from '../data/projects'
import useTheme from './useTheme'

const lightOverrides: Partial<Record<Framework, string>> = {
  'Next.js': '#000000',
  'JavaScript': '#b38a00',
}

export default function useFrameworkColors(): Record<Framework, string> {
  const { theme } = useTheme()
  return useMemo(() => {
    if (theme === 'light') return { ...frameworkColors, ...lightOverrides }
    return frameworkColors
  }, [theme])
}

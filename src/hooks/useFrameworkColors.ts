import { useMemo } from 'react'
import { frameworkColors, type Framework } from '../data/projects'
import useTheme from './useTheme'

const lightOverrides: Partial<Record<Framework, string>> = {
  'Next.js': '#000000',
  'JavaScript': '#8a6a00',
  'React': '#06708f',
  'Angular': '#c3002f',
  'T3 Stack': '#2a6fa8',
}

export default function useFrameworkColors(): Record<Framework, string> {
  const { theme } = useTheme()
  return useMemo(() => {
    if (theme === 'light') return { ...frameworkColors, ...lightOverrides }
    return frameworkColors
  }, [theme])
}

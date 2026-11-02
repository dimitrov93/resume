import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import { IconContext } from 'react-icons'
import './index.css'
import { ThemeProvider } from './hooks/useTheme'
import { LanguageProvider } from './hooks/useLanguage'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Icons are decorative (buttons/links carry their own labels); motion follows the OS "reduce motion" setting. */}
    <IconContext.Provider value={{ attr: { 'aria-hidden': 'true' } }}>
      <MotionConfig reducedMotion="user">
        <LanguageProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </LanguageProvider>
      </MotionConfig>
    </IconContext.Provider>
  </StrictMode>,
)

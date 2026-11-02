import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import { IconContext } from 'react-icons'
// Self-hosted Poppins: no render-blocking request to Google and no visitor IPs sent to Google Fonts (GDPR).
import '@fontsource/poppins/300.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import './index.css'
import { ThemeProvider } from './hooks/useTheme'
import { LanguageProvider } from './hooks/useLanguage'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Icons are decorative (buttons/links carry their own labels); motion follows the OS "reduce motion" setting. */}
    <IconContext.Provider value={{ attr: { 'aria-hidden': 'true' } }}>
      <MotionConfig reducedMotion="user">
        <LanguageProvider>
          <ThemeProvider>
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          </ThemeProvider>
        </LanguageProvider>
      </MotionConfig>
    </IconContext.Provider>
  </StrictMode>,
)

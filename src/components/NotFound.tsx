import { motion } from 'framer-motion'
import useLanguage from '../hooks/useLanguage'

export default function NotFound() {
  const { lang } = useLanguage()
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center flex flex-col items-center gap-6"
      >
        <h1 className="text-[120px] sm:text-[160px] font-black leading-none bg-linear-to-br from-accent to-accent-2 bg-clip-text text-transparent">
          404
        </h1>
        <p className="text-xl sm:text-2xl font-semibold text-heading">
          {lang === 'bg' ? 'Страницата не е намерена' : 'Page Not Found'}
        </p>
        <p className="text-sm text-muted max-w-md">
          {lang === 'bg'
            ? 'Страницата, която търсите, не съществува или е била преместена.'
            : "The page you're looking for doesn't exist or has been moved."}
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-accent to-accent-2 text-accent-text text-sm font-semibold no-underline hover:brightness-110 transition-all duration-300"
        >
          {lang === 'bg' ? '← Към началото' : '← Back to Home'}
        </a>
      </motion.div>
    </div>
  )
}

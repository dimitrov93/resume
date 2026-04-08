import { AnimatePresence, motion } from 'framer-motion'
import { FiDownload, FiX } from 'react-icons/fi'

export default function CvPreviewModal({ onClose }: { onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.25 }}
          onClick={e => e.stopPropagation()}
          className="relative w-full max-w-4xl h-[85vh] bg-surface border border-border-gold rounded-2xl overflow-hidden flex flex-col"
        >
          <div className="flex items-center justify-between px-5 py-3 border-b border-border-gold">
            <span className="text-white font-semibold text-sm">CV Preview</span>
            <div className="flex items-center gap-3">
              <a
                href="/cv.pdf"
                download="Tsvetomir_Dimitrov_CV.pdf"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-linear-to-r from-accent to-accent-2 text-white text-xs font-semibold no-underline transition-all duration-300 hover:brightness-110"
              >
                <FiDownload size={14} />
                Download
              </a>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 border-none cursor-pointer text-white hover:bg-white/20 transition-colors"
              >
                <FiX size={16} />
              </button>
            </div>
          </div>
          <iframe
            src="/cv.pdf"
            title="CV Preview"
            className="flex-1 w-full border-none"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

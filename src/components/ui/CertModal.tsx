import { AnimatePresence, motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'

const isImage = (path: string) => /\.(jpg|jpeg|png|webp)$/i.test(path)

export default function CertModal({ title, file, onClose }: { title: string; file: string; onClose: () => void }) {
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
          className="relative w-full max-w-4xl max-h-[85vh] bg-surface border border-border-gold rounded-2xl overflow-hidden flex flex-col"
        >
          <div className="flex items-center justify-between px-5 py-3 border-b border-border-gold">
            <span className="text-heading font-semibold text-sm truncate">{title}</span>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 border-none cursor-pointer text-heading hover:bg-white/20 transition-colors"
            >
              <FiX size={16} />
            </button>
          </div>
          {isImage(file) ? (
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center">
              <img src={file} alt={title} className="max-w-full max-h-full object-contain rounded-lg" />
            </div>
          ) : (
            <iframe
              src={file}
              title={title}
              className="flex-1 w-full border-none min-h-[75vh]"
            />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

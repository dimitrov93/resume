import { FiAward } from 'react-icons/fi'
import useLanguage from '../../hooks/useLanguage'

const isImage = (path: string) => /\.(jpg|jpeg|png|webp)$/i.test(path)

export default function CertPreview({ file, title }: { file: string; title: string }) {
  const { t } = useLanguage()

  if (!file) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-accent/30">
        <FiAward size={24} />
        <span className="text-[10px] font-medium">{t('certs.notAdded')}</span>
      </div>
    )
  }

  if (isImage(file)) {
    return <img src={file} alt={title} className="w-full h-full object-cover" />
  }

  return (
    <>
      <iframe
        src={`${file}#toolbar=0&navpanes=0&scrollbar=0&page=1`}
        title={title}
        className="w-full h-full border-none pointer-events-none"
      />
      <div className="absolute inset-0 bg-transparent" />
    </>
  )
}

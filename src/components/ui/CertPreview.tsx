import { FiAward } from 'react-icons/fi'
import useLanguage from '../../hooks/useLanguage'

// Small WebP previews in /certs/thumbs (≈30 KB); the full JPG/PDF is only loaded when opened.
function getThumbnail(file: string): string {
  const name = file.split('/').pop()!.replace(/\.(pdf|jpe?g|png|webp)$/i, '')
  return `/certs/thumbs/${name}.webp`
}

export default function CertPreview({ file, title, className = '' }: { file: string; title: string; className?: string }) {
  const { t } = useLanguage()

  if (!file) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-accent/30">
        <FiAward size={24} />
        <span className="text-[10px] font-medium">{t('certs.notAdded')}</span>
      </div>
    )
  }

  return <img src={getThumbnail(file)} alt={title} loading="lazy" className={`w-full h-full object-cover ${className}`} />
}

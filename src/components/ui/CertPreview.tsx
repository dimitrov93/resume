import { FiAward } from 'react-icons/fi'
import useLanguage from '../../hooks/useLanguage'

function getThumbnail(file: string): string {
  if (/\.(jpg|jpeg|png|webp)$/i.test(file)) return file
  return file.replace(/\.pdf$/i, '.jpg')
}

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

  return <img src={getThumbnail(file)} alt={title} className="w-full h-full object-cover" />
}

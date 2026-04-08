import { useState } from 'react'
import { motion } from 'framer-motion'
import { certifications } from '../../data/resume'
import GradientCard from '../ui/GradientCard'
import CertModal from '../ui/CertModal'
import CertPreview from '../ui/CertPreview'
import SoftUniHero from '../ui/SoftUniHero'
import useLanguage from '../../hooks/useLanguage'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
const anim = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }

const jsPathTitles = [
  'ReactJS', 'Angular', 'JS Applications', 'JS Back-End', 'HTML & CSS', 'Programming Basics',
]

const diploma = certifications.find(c => c.title === 'Front-End Developer with JavaScript')!
const otherCerts = certifications.filter(c => c !== diploma && !jsPathTitles.includes(c.title))

export default function Certifications() {
  const [activeFile, setActiveFile] = useState<{ title: string; file: string } | null>(null)
  const { t } = useLanguage()

  const handleViewCert = (title: string, file: string) => setActiveFile({ title, file })

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-6">
      {/* SoftUni featured diploma + expandable courses */}
      <motion.div variants={anim}>
        <SoftUniHero onViewCert={handleViewCert} />
      </motion.div>

      {/* Other certifications */}
      {otherCerts.length > 0 && (
        <motion.div variants={anim}>
          <h3 className="text-lg text-heading font-semibold mb-4">{t('certs.otherCerts')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {otherCerts.map(cert => (
              <motion.div key={cert.title} variants={anim} whileHover={{ y: -4 }}>
                <GradientCard
                  className={`flex flex-col gap-3 h-full ${cert.pdf ? 'cursor-pointer' : ''}`}
                  onClick={cert.pdf ? () => handleViewCert(cert.title, cert.pdf) : undefined}
                >
                  <div className="w-full aspect-16/10 rounded-lg overflow-hidden bg-overlay-5 relative">
                    <CertPreview file={cert.pdf} title={cert.title} />
                  </div>
                  <div>
                    <h4 className="text-heading font-semibold text-sm mb-1">{cert.title}</h4>
                    <p className="text-xs text-paragraph">{cert.source} · {cert.year}</p>
                  </div>
                </GradientCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {activeFile && <CertModal title={activeFile.title} file={activeFile.file} onClose={() => setActiveFile(null)} />}
    </motion.div>
  )
}

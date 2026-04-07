import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSend, FiCheckCircle } from 'react-icons/fi'
import { contacts } from '../../data/contacts'

const contactItems = contacts
  .filter(c => ['EMAIL', 'PHONE', 'LOCATION'].includes(c.label))
  .map(c => ({ icon: c.icon, label: c.label.charAt(0) + c.label.slice(1).toLowerCase(), value: c.value }))

const anim = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 1500)
  }

  return (
    <div className="flex flex-col gap-6">
      <motion.div variants={anim} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {contactItems.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex flex-col items-center text-center bg-card border border-border-gold rounded-2xl p-5 gap-3">
            <div className="flex items-center justify-center rounded-full w-12 h-12 bg-gold-glow">
              <Icon size={20} color="#FFDB6E" />
            </div>
            <div>
              <p className="text-xs mb-0.5 text-[#555]">{label}</p>
              <p className="text-sm font-medium text-white">{value}</p>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div variants={anim}>
        {sent ? (
          <div className="flex flex-col items-center justify-center text-center bg-card border border-border-gold rounded-2xl py-12 px-4 gap-4">
            <FiCheckCircle size={48} color="#4ade80" />
            <h3 className="text-lg font-semibold text-white">Message Sent!</h3>
            <p className="text-sm text-dim">Thanks for reaching out.</p>
            <button
              onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
              className="cursor-pointer px-6 py-2 rounded-full text-sm bg-gold-glow text-accent border border-accent/25"
            >
              Send Another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col bg-card border border-border-gold rounded-2xl p-6 gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1.5 text-[#666]">Full Name</label>
                <input
                  name="name" value={form.name} onChange={handleChange} placeholder="Your name" required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none bg-[#1a1a1b] border border-white/8 text-paragraph font-[Poppins,sans-serif] transition-[border-color] duration-300 focus:border-accent/40"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5 text-[#666]">Email</label>
                <input
                  name="email" type="email" value={form.email} onChange={handleChange} placeholder="ricardo@example.com" required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none bg-[#1a1a1b] border border-white/8 text-paragraph font-[Poppins,sans-serif] transition-[border-color] duration-300 focus:border-accent/40"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5 text-[#666]">Subject</label>
              <input
                name="subject" value={form.subject} onChange={handleChange} placeholder="Say something..." required
                className="w-full px-4 py-3 rounded-xl text-sm outline-none bg-[#1a1a1b] border border-white/8 text-paragraph font-[Poppins,sans-serif] transition-[border-color] duration-300 focus:border-accent/40"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5 text-[#666]">Message</label>
              <textarea
                name="message" value={form.message} onChange={handleChange} placeholder="Your message..." rows={4} required
                className="w-full px-4 py-3 rounded-xl text-sm outline-none bg-[#1a1a1b] border border-white/8 text-paragraph font-[Poppins,sans-serif] transition-[border-color] duration-300 focus:border-accent/40 resize-none"
              />
            </div>
            <button
              type="submit" disabled={loading}
              className="flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold border-none text-[#1a1a1b] cursor-pointer"
              style={{ background: loading ? 'rgba(255,219,110,0.5)' : 'linear-gradient(137.84deg, #FFDB6E 26.31%, #FFBC5E 93.75%)' }}
            >
              {loading ? 'Sending...' : <><FiSend size={15} />Send Message</>}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  )
}

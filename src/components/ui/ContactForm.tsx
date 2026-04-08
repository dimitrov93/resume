import { useRef, useState } from 'react'
import { FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import emailjs from '@emailjs/browser'

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formRef.current!,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    )
      .then(() => {
        setLoading(false)
        setSent(true)
        setForm({ name: '', email: '', subject: '', message: '' })
      })
      .catch(() => {
        setLoading(false)
        setError('Failed to send message. Please try again or email me directly.')
      })
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center text-center bg-card border border-border-gold rounded-2xl py-12 px-4 gap-4">
        <FiCheckCircle size={48} color="#4ade80" />
        <h3 className="text-lg font-semibold text-heading">Message Sent!</h3>
        <p className="text-sm text-dim">Thanks for reaching out.</p>
        <button
          onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
          className="cursor-pointer px-6 py-2 rounded-full text-sm bg-gold-glow text-accent border border-accent/25"
        >
          Send Another
        </button>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col bg-card border border-border-gold rounded-2xl p-6 gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium mb-1.5 text-dim">Full Name</label>
          <input
            name="name" value={form.name} onChange={handleChange} placeholder="Your name" required
            className="w-full px-4 py-3 rounded-xl text-sm outline-none bg-bg border border-white/8 text-paragraph font-[Poppins,sans-serif] transition-[border-color] duration-300 focus:border-accent/40"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1.5 text-dim">Email</label>
          <input
            name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required
            className="w-full px-4 py-3 rounded-xl text-sm outline-none bg-bg border border-white/8 text-paragraph font-[Poppins,sans-serif] transition-[border-color] duration-300 focus:border-accent/40"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium mb-1.5 text-dim">Subject</label>
        <input
          name="subject" value={form.subject} onChange={handleChange} placeholder="Say something..." required
          className="w-full px-4 py-3 rounded-xl text-sm outline-none bg-bg border border-white/8 text-paragraph font-[Poppins,sans-serif] transition-[border-color] duration-300 focus:border-accent/40"
        />
      </div>
      <div>
        <label className="block text-xs font-medium mb-1.5 text-dim">Message</label>
        <textarea
          name="message" value={form.message} onChange={handleChange} placeholder="Your message..." rows={4} required
          className="w-full px-4 py-3 rounded-xl text-sm outline-none bg-bg border border-white/8 text-paragraph font-[Poppins,sans-serif] transition-[border-color] duration-300 focus:border-accent/40 resize-none"
        />
      </div>
      {error && (
        <div className="flex items-center gap-2 text-red-400 text-sm">
          <FiAlertCircle size={16} />
          {error}
        </div>
      )}
      <button
        type="submit" disabled={loading}
        className="flex items-center justify-center gap-2 w-fit ml-auto max-sm:mx-auto px-6 py-2.5 rounded-full text-sm font-semibold border-none text-[#1a1a1b] cursor-pointer"
        style={{ background: loading ? 'color-mix(in srgb, var(--color-accent) 50%, transparent)' : `linear-gradient(137.84deg, var(--color-accent) 26.31%, var(--color-accent-2) 93.75%)` }}
      >
        {loading ? 'Sending...' : <><FiSend size={15} />Send Message</>}
      </button>
    </form>
  )
}

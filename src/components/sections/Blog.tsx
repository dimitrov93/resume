import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'

const posts = [
  { title: 'Design Principles Every UI Designer Should Know', date: 'March 15, 2025', category: 'Design', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=380&fit=crop', excerpt: 'Design principles are the foundation of great UI.' },
  { title: 'The Future of Web Development in 2025', date: 'February 28, 2025', category: 'Development', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=380&fit=crop', excerpt: "What's trending — from AI-assisted coding to edge computing." },
  { title: 'How to Build a Killer Creative Portfolio', date: 'January 10, 2025', category: 'Career', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=380&fit=crop', excerpt: 'Learn how to curate your best work and present it effectively.' },
  { title: 'Typography: The Silent Communicator', date: 'December 5, 2024', category: 'Design', image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&h=380&fit=crop', excerpt: 'A deep dive into choosing typefaces and setting hierarchy.' },
]

const anim = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }

export default function Blog() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {posts.map(({ title, date, category, image, excerpt }) => (
        <motion.article
          key={title} variants={anim}
          whileHover={{ y: -5 }}
          className="overflow-hidden cursor-pointer group bg-card border border-border-gold rounded-2xl transition-[border-color] duration-300"
        >
          <div className="overflow-hidden h-[180px]">
            <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          </div>
          <div className="flex flex-col px-5 py-4 gap-2.5">
            <div className="flex items-center gap-3">
              <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-gold-glow text-accent">{category}</span>
              <span className="text-xs text-[#555]">{date}</span>
            </div>
            <h3 className="font-semibold text-white text-sm leading-snug">{title}</h3>
            <p className="text-xs leading-relaxed text-[#777]">{excerpt}</p>
            <div className="flex items-center gap-2 text-xs font-semibold text-accent">
              Read More <FiArrowRight size={13} />
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  )
}

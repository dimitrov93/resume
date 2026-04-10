import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] text-[#d6d6d6] p-5">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="text-[clamp(100px,20vw,180px)] font-black leading-none bg-linear-to-br from-accent to-accent-2 bg-clip-text text-transparent">
          404
        </div>
        <h1 className="text-[clamp(18px,3vw,28px)] font-semibold text-[#fcfcfc]">
          Page Not Found
        </h1>
        <p className="text-sm text-[#9c9c9c] max-w-100 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-linear-to-br from-accent to-accent-2 text-[#1a1a1b] text-sm font-semibold no-underline transition-[filter] duration-300 hover:brightness-110"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}

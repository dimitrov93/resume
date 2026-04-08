export default function SkeletonCard() {
  return (
    <div className="flex flex-col sm:flex-row items-stretch rounded-2xl overflow-hidden bg-card animate-pulse">
      <div className="sm:w-[55%] shrink-0 h-52 sm:h-64 bg-white/5" />
      <div className="flex flex-col justify-center gap-5 p-6 sm:p-7 sm:w-[45%]">
        <div className="h-3 w-20 rounded bg-white/5" />
        <div className="flex flex-col gap-2">
          <div className="h-5 w-full rounded bg-white/5" />
          <div className="h-5 w-2/3 rounded bg-white/5" />
        </div>
        <div className="h-0.5 w-10 rounded bg-white/5" />
        <div className="flex gap-3">
          <div className="h-9 w-24 rounded-xl bg-white/5" />
          <div className="h-9 w-28 rounded-xl bg-white/5" />
        </div>
      </div>
    </div>
  )
}

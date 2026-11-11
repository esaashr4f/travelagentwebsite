import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { reviews } from '@/data/site'
import { reducedMotion } from '@/lib/motion'
import { cn } from '@/lib/utils'

const ROTATE_MS = 8000

export function Reviews() {
  const [active, setActive] = useState(0)
  // Rotates slowly until someone steps through by hand; hover or focus holds it (WCAG 2.2.2).
  const [auto, setAuto] = useState(() => !reducedMotion())
  const [held, setHeld] = useState(false)

  useEffect(() => {
    if (!auto || held) return
    const id = setTimeout(() => setActive((i) => (i + 1) % reviews.length), ROTATE_MS)
    return () => clearTimeout(id)
  }, [active, auto, held])

  const go = (step: number) => {
    setAuto(false)
    setActive((i) => (i + step + reviews.length) % reviews.length)
  }
  const r = reviews[active]

  return (
    <section
      id="reviews"
      aria-roledescription="carousel"
      aria-label="Client reviews"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHeld(false)}
      className="border-t border-line px-5 py-[16svh] text-center"
    >
      <figure data-reveal className="mx-auto max-w-3xl">
        <blockquote
          key={active}
          aria-live={auto ? 'off' : 'polite'}
          className="min-h-[5.5em] animate-in fade-in duration-1000 text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.35] font-light"
        >
          “{r.quote}”
        </blockquote>
        <figcaption className="mt-8 text-sm">Sample review, {r.trip}</figcaption>
      </figure>

      <div className="mt-10 flex items-center justify-center gap-6">
        <button type="button" onClick={() => go(-1)} aria-label="Previous review" className="press p-3">
          <ChevronLeft strokeWidth={1} className="size-6" />
        </button>
        <div className="flex gap-2.5" aria-hidden>
          {reviews.map((x, i) => (
            <span
              key={x.trip}
              className={cn('size-1.5 rounded-full bg-ink transition-opacity duration-500', i === active ? 'opacity-100' : 'opacity-25')}
            />
          ))}
        </div>
        <button type="button" onClick={() => go(1)} aria-label="Next review" className="press p-3">
          <ChevronRight strokeWidth={1} className="size-6" />
        </button>
      </div>
    </section>
  )
}

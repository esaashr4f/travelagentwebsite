import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { reviews } from '@/data/site'
import { reducedMotion } from '@/lib/motion'
import { cn } from '@/lib/utils'

gsap.registerPlugin(SplitText)

const ROTATE_MS = 9000
const pad = (n: number) => String(n).padStart(2, '0')

export function Reviews() {
  const [active, setActive] = useState(0)
  // Auto-advance stops for good once someone steps through by hand, and never starts for reduced motion.
  const [auto, setAuto] = useState(() => !reducedMotion())
  const [hovered, setHovered] = useState(false)
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const quote = useRef<HTMLParagraphElement>(null)

  // Start rotating (and animating) only once the section is properly on screen.
  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin: '-20% 0px' },
    )
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  // Each new quote rises in word by word from behind a mask.
  useEffect(() => {
    if (!inView || !quote.current || reducedMotion()) return
    const split = SplitText.create(quote.current, { type: 'words', mask: 'words' })
    const tween = gsap.from(split.words, { yPercent: 100, duration: 0.9, stagger: 0.018, ease: 'power3.out' })
    return () => {
      tween.kill()
      split.revert()
    }
  }, [active, inView])

  useEffect(() => {
    if (!inView || !auto || hovered) return
    const id = setTimeout(() => setActive((i) => (i + 1) % reviews.length), ROTATE_MS)
    return () => clearTimeout(id)
  }, [active, inView, auto, hovered])

  const go = (step: number) => {
    setAuto(false)
    setActive((i) => (i + step + reviews.length) % reviews.length)
  }

  const review = reviews[active]

  return (
    <section
      ref={ref}
      aria-roledescription="carousel"
      aria-label="Client reviews"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-espresso text-cream"
    >
      <div className="mx-auto grid max-w-[1600px] md:min-h-[86svh] md:grid-cols-2">
        <div className="relative hidden overflow-hidden md:block">
          <div data-parallax="5" className="absolute inset-0">
          {reviews.map((r, i) => (
            <img
              key={r.image}
              src={r.image}
              alt=""
              loading="lazy"
              className={cn(
                'absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out',
                i === active ? 'opacity-100' : 'opacity-0',
              )}
            />
          ))}
          </div>
        </div>

        <figure className="flex flex-col justify-between gap-14 px-5 py-16 md:px-16 md:py-20 lg:px-24">
          <p className="eyebrow text-gold">In their words</p>

          <div>
            <span aria-hidden className="block font-heading text-[7rem] leading-[0.6] text-terracotta">
              “
            </span>
            <blockquote
              aria-live="polite"
              className="mt-6 min-h-[9em] font-heading text-[clamp(1.5rem,2.4vw,2.3rem)] leading-[1.3] md:min-h-[7.5em]"
            >
              <p key={active} ref={quote}>
                {review.quote}
              </p>
            </blockquote>
            <figcaption key={review.trip} className="eyebrow mt-8 text-cream/60 animate-in fade-in duration-700">
              Sample review · {review.trip}
            </figcaption>
          </div>

          <div className="flex items-center justify-between border-t border-cream/15 pt-6 text-[0.68rem] font-medium tracking-[0.22em] uppercase">
            <span className="tabular-nums text-cream/50">
              {pad(active + 1)} / {pad(reviews.length)}
            </span>
            <div className="flex gap-8">
              <button type="button" onClick={() => go(-1)} className="link-line text-cream/80 hover:text-cream">
                Previous
              </button>
              <button type="button" onClick={() => go(1)} className="link-line text-cream/80 hover:text-cream">
                Next
              </button>
            </div>
          </div>
        </figure>
      </div>
    </section>
  )
}

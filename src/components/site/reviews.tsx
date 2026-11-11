import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import { reviews } from '@/data/site'
import { getLenis } from '@/hooks/use-smooth-scroll'
import { reducedMotion, SCENES } from '@/lib/motion'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger, SplitText)

const ROTATE_MS = 9000

export function Reviews() {
  const [active, setActive] = useState(0)
  // Auto-advance stops for good once someone steps through by hand, and never starts for reduced motion.
  const [auto, setAuto] = useState(() => !reducedMotion())
  // Hover or keyboard focus inside the section holds the current review (WCAG 2.2.2).
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const quote = useRef<HTMLParagraphElement>(null)
  // On laptops the section is a sticky scene and scrolling steps through the reviews.
  const scene = useRef<ScrollTrigger | null>(null)
  const last = reviews.length - 1

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(SCENES, () => {
        const st = ScrollTrigger.create({
          trigger: ref.current,
          start: 'top top',
          end: `+=${last * 100}%`,
          onUpdate: (self) => setActive(Math.min(last, Math.round(self.progress * last))),
        })
        scene.current = st
        setAuto(false)
        gsap.fromTo(
          '[data-review-photos]',
          { scale: 1.14 },
          { scale: 1, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: () => st.end, scrub: true } },
        )
        return () => {
          scene.current = null
          setAuto(!reducedMotion())
        }
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

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
    const split = SplitText.create(quote.current, { type: 'words', mask: 'words', aria: 'none' })
    const tween = gsap.from(split.words, { yPercent: 100, duration: 0.9, stagger: 0.018, ease: 'power3.out' })
    return () => {
      tween.kill()
      split.revert()
    }
  }, [active, inView])

  useEffect(() => {
    if (!inView || !auto || hovered || focused) return
    const id = setTimeout(() => setActive((i) => (i + 1) % reviews.length), ROTATE_MS)
    return () => clearTimeout(id)
  }, [active, inView, auto, hovered, focused])

  const go = (step: number) => {
    const st = scene.current
    if (st) {
      // Scroll-driven: glide the page to the point where that review is showing.
      const target = Math.max(0, Math.min(last, active + step))
      const y = st.start + ((st.end - st.start) * target) / last
      const lenis = getLenis()
      if (lenis) lenis.scrollTo(y)
      else window.scrollTo({ top: y })
      return
    }
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
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false)
      }}
      data-scene="reviews"
      data-bg="espresso"
      // Four screens on laptops: arrive, two steps through the reviews, be covered.
      className="relative z-40 md:-mt-[100svh] md:h-[400svh]"
    >
      <div data-scene-frame className="relative bg-espresso text-cream md:sticky md:top-0 md:h-svh md:overflow-hidden md:shadow-[0_-20px_50px_rgba(42,28,21,0.3)]">
      <div data-scene-lift className="mx-auto grid max-w-[1600px] md:h-svh md:min-h-[600px] md:grid-cols-2">
        <div className="relative hidden overflow-hidden md:block">
          <div data-review-photos className="absolute inset-0">
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

        <figure className="flex flex-col justify-between gap-14 px-5 py-16 md:px-16 md:pt-32 md:pb-12 lg:px-24">
          <div className="my-auto">
            <span aria-hidden className="block font-heading text-[7rem] leading-[0.6] text-terracotta">
              “
            </span>
            {/* Announce changes the visitor asked for, not the automatic rotation. */}
            <blockquote
              aria-live={auto ? 'off' : 'polite'}
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

          <div className="flex justify-end gap-8 border-t border-cream/15 pt-3 text-[0.75rem] font-medium tracking-[0.22em] uppercase">
            {[
              { label: 'Previous', step: -1 },
              { label: 'Next', step: 1 },
            ].map((b) => (
              <button
                key={b.label}
                type="button"
                onClick={() => go(b.step)}
                aria-label={`${b.label} review`}
                className="group py-3 text-cream/80 hover:text-cream"
              >
                <span className="link-line group-hover:[background-size:100%_1px]">{b.label}</span>
              </button>
            ))}
          </div>
        </figure>
      </div>
      <div data-scene-dim className="pointer-events-none absolute inset-0 bg-espresso opacity-0" />
      </div>
    </section>
  )
}

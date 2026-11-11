import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { brand } from '@/config/brand'
import { heroSlides } from '@/data/site'
import { MOTION_OK, reducedMotion, SCENES } from '@/lib/motion'
import { cn } from '@/lib/utils'

const SLIDE_MS = 4500

type HeroProps = {
  // When the Higgsfield cut is ready: one pre-edited, muted MP4 (~720p, ≤6 MB) plus a
  // poster frame. Until then the hero crossfades between stills.
  video?: { src: string; poster: string }
}

export function Hero({ video }: HeroProps) {
  const [active, setActive] = useState(0)
  // Plays for everyone; a crossfade isn't motion in the vestibular sense, and the slow zoom
  // follows the brand's reduce-motion choice. The Pause control covers WCAG 2.2.2.
  const [paused, setPaused] = useState(false)
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    if (video || paused) return
    const id = setInterval(() => setActive((i) => (i + 1) % heroSlides.length), SLIDE_MS)
    return () => clearInterval(id)
  }, [video, paused])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from('[data-hero-line]', { yPercent: 110, duration: 1.4, stagger: 0.12, delay: 0.2 })
          .from('[data-hero-fade]', { opacity: 0, y: 12, duration: 1, stagger: 0.1 }, '-=0.8')

      })

      // Scene 1 → 2: the hero holds still while the intro slides up over it like a sheet,
      // and recedes as it goes (settles back, dims, its words lift away).
      mm.add(SCENES, () => {
        const cover = { trigger: root.current, start: 'top top', end: '+=100%', scrub: true }
        ScrollTrigger.create({ ...cover, pin: true, pinSpacing: false })
        gsap.to('[data-hero-media]', { scale: 0.94, yPercent: 6, ease: 'none', scrollTrigger: cover })
        gsap.to('[data-hero-copy]', { yPercent: -18, opacity: 0, ease: 'none', scrollTrigger: { ...cover, end: '+=60%' } })
        gsap.to('[data-hero-dim]', { opacity: 0.65, ease: 'none', scrollTrigger: cover })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section id="top" ref={root} data-page-hero className="relative z-0 h-svh min-h-[560px] overflow-hidden bg-espresso text-cream">
      <div data-hero-media className="absolute inset-0">
        {video ? (
          <video
            className="h-full w-full object-cover"
            src={video.src}
            poster={video.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        ) : (
          heroSlides.map((slide, i) => (
            <img
              key={slide.src}
              src={slide.src}
              alt=""
              fetchPriority={i === 0 ? 'high' : 'low'}
              decoding="async"
              className={cn(
                'absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-in-out',
                i === active ? cn('opacity-100', !reducedMotion() && 'kenburns') : 'opacity-0',
                paused && '[animation-play-state:paused]',
              )}
            />
          ))
        )}
      </div>

      {/* Top shade keeps the nav legible over bright skies; bottom shade carries the headline. */}
      <div className="absolute inset-0 bg-gradient-to-b from-espresso/65 via-espresso/5 via-30% to-espresso/75" />
      <div data-hero-dim className="pointer-events-none absolute inset-0 bg-espresso opacity-0" />

      <div data-hero-copy className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-10 md:px-10 md:pb-14">
        <h1 className="text-[clamp(2.9rem,7.6vw,6rem)] leading-[0.98] tracking-[-0.01em]">
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-hero-line className="block">Journeys,</span>
          </span>
          {/* Extra bottom room so the italic descender in "beautifully" isn't clipped by the mask. */}
          <span className="block overflow-hidden pb-[0.14em]">
            <span data-hero-line className="block">
              <em className="text-sand">beautifully</em> planned.
            </span>
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-6 border-t border-cream/30 pt-6 md:mt-12 md:flex-row md:items-end md:justify-between">
          <p data-hero-fade className="max-w-sm text-sm leading-relaxed text-cream/85 md:text-base">
            Bespoke holidays, planned personally by {brand.advisorFullName}.
          </p>
          {!video && (
            <div data-hero-fade className="flex items-center gap-5 text-[0.75rem] tracking-[0.22em] uppercase">
              <span key={active} className="animate-in fade-in duration-700">
                {heroSlides[active].place}
              </span>
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
                // Padding widens the hit area to 44px tall without changing the type.
                className="group -my-3 py-3 text-cream/80 hover:text-cream"
              >
                <span className="link-line group-hover:[background-size:100%_1px]">{paused ? 'Play' : 'Pause'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

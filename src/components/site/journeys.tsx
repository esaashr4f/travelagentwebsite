import { useRef } from 'react'
import { brand } from '@/config/brand'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { journeys } from '@/data/site'
import { layered } from '@/lib/transition'

export function Journeys() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Scene 4 (laptops): the section is as tall as the row is wide, plus a screen to arrive
      // and a screen to be covered. Its frame is sticky, and the row slides sideways 1:1 with
      // the scroll while it holds. Not tied to reduce-motion, since the row is otherwise
      // unreachable. Phones keep a native swipe row.
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px)', () => {
        const distance = () => track.current!.scrollWidth - window.innerWidth
        // One screen for the frame, the row's width to pan, and (when the next scene slides
        // over it) one more screen to be covered.
        const size = () =>
          gsap.set(root.current, { height: `calc(${layered ? 200 : 100}svh + ${distance()}px)` })
        size()
        ScrollTrigger.addEventListener('refreshInit', size)
        gsap.to(track.current, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        return () => ScrollTrigger.removeEventListener('refreshInit', size)
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  const intro = (
    <>
      <div>
        <h2 className="text-[clamp(2.4rem,3.6vw,3.8rem)] leading-[1.04]">
          Itineraries {brand.advisor} loves to send people on.
        </h2>
        <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Each one is a starting point, rewritten around whoever is travelling.
        </p>
      </div>
    </>
  )

  return (
    <section id="journeys" ref={root} data-scene="journeys" data-bg="sand" className="relative z-30 md:-mt-[100svh]">
      <div data-scene-frame className="relative overflow-hidden bg-sand py-24 md:sticky md:top-0 md:flex md:h-svh md:items-center md:py-0 md:pt-24 md:shadow-[0_-20px_50px_rgba(42,28,21,0.22)]">
      <div data-scene-lift className="w-full">
      {/* scroll-px-5 makes snapping respect the side padding, so the first card keeps its margin. */}
      <div
        ref={track}
        className="flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 [scrollbar-width:none] md:snap-none md:gap-8 md:overflow-visible md:px-10"
      >
        <div className="flex w-[80vw] max-w-[360px] shrink-0 snap-start flex-col justify-end pr-4 md:w-[36vw] md:max-w-none md:pr-16 lg:w-[32vw]">
          {intro}
        </div>

        {journeys.map((j) => (
          <a
            key={j.title}
            href="#enquire"
            className="group w-[80vw] max-w-[360px] shrink-0 snap-start md:w-[34vw] md:max-w-none lg:w-[28vw]"
          >
            <div className="relative overflow-hidden bg-border">
              <img
                src={j.image}
                alt=""
                // Six small images: load them up front so swiping never reveals a blank card.
                loading="eager"
                decoding="async"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04] md:h-[52svh] md:aspect-auto"
              />
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-4 text-[0.75rem] font-medium tracking-[0.22em] uppercase">
              <span>{j.place}</span>
              <span className="text-muted-foreground">{j.length}</span>
            </div>
            <h3 className="mt-2 text-xl leading-snug md:text-2xl">{j.title}</h3>
          </a>
        ))}

        <div aria-hidden className="w-1 shrink-0 md:w-[4vw]" />
      </div>
      </div>
      </div>
    </section>
  )
}

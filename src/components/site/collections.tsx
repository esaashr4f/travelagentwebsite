import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { collections } from '@/data/site'
import { SCENES } from '@/lib/motion'
import { cn } from '@/lib/utils'

export function Collections() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      // Scene 3: the collections slide in over the intro, rising into place one after
      // another as they come, then hold while the photos settle from a slight zoom.
      mm.add(SCENES, () => {
        gsap
          .timeline({
            defaults: { ease: 'none' },
            scrollTrigger: { trigger: root.current, start: 'top 75%', end: 'top 0%', scrub: true },
          })
          .from('[data-collections-title]', { yPercent: 40, opacity: 0, duration: 0.35 })
          .from('[data-collection]', { yPercent: 25, opacity: 0, stagger: 0.12, duration: 0.45 }, 0.1)
        gsap.fromTo(
          '[data-collection-photo]',
          { scale: 1.15 },
          {
            scale: 1,
            ease: 'none',
            stagger: 0.04,
            scrollTrigger: { trigger: root.current, start: 'top 40%', end: 'top -60%', scrub: true },
          },
        )
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section
      id="collections"
      ref={root}
      data-scene
      // 2.6 screens on laptops: arrive, hold briefly, be covered.
      className="relative z-20 md:-mt-[100svh] md:h-[260svh]"
    >
      <div className="relative bg-background md:sticky md:top-0 md:flex md:h-svh md:min-h-[640px] md:flex-col md:justify-center md:overflow-hidden md:shadow-[0_-20px_50px_rgba(42,28,21,0.22)]">
      <div data-scene-lift className="mx-auto w-full max-w-[1600px] px-5 py-24 md:px-10 md:pt-28 md:pb-10">
        <h2 data-collections-title className="mb-10 text-[clamp(2.4rem,4.6vw,4.4rem)] leading-[1.05] md:mb-[5svh]">
          Where would you like to be?
        </h2>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:items-start md:gap-x-6">
          {collections.map((c, i) => (
            <a
              key={c.title}
              href="#journeys"
              data-collection
              className={cn('group block', i % 2 === 1 && 'md:mt-[7svh]')}
            >
              <div className="overflow-hidden">
                <img
                  data-collection-photo
                  src={c.image}
                  alt=""
                  decoding="async"
                  // Photo height tracks the screen, so the row always fits within one view.
                  className="aspect-[3/4] w-full object-cover md:aspect-auto md:h-[44svh]"
                />
              </div>
              <h3 className="mt-4 text-2xl transition-colors duration-300 group-hover:text-terracotta md:text-[1.75rem]">
                {c.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.note}</p>
            </a>
          ))}
        </div>
      </div>
      </div>
    </section>
  )
}

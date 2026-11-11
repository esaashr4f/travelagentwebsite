import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { collections } from '@/data/site'
import { SCENES } from '@/lib/motion'
import { cn } from '@/lib/utils'

export function Collections() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      // Scene 3: the collections rise into place one after another as the section scrolls
      // up into view, so it arrives already composed; it then locks briefly while the
      // photos settle from a slight zoom.
      mm.add(SCENES, () => {
        gsap
          .timeline({
            defaults: { ease: 'none' },
            scrollTrigger: { trigger: root.current, start: 'top 85%', end: 'top 5%', scrub: 0.6 },
          })
          .from('[data-collections-title]', { y: 60, opacity: 0, duration: 0.35 })
          .from('[data-collection]', { yPercent: 30, opacity: 0, stagger: 0.12, duration: 0.45 }, 0.1)
        gsap.fromTo(
          '[data-collection-photo]',
          { scale: 1.16 },
          {
            scale: 1,
            ease: 'none',
            stagger: 0.05,
            scrollTrigger: { trigger: root.current, start: 'top 60%', end: '+=110%', scrub: 0.6 },
          },
        )
        ScrollTrigger.create({ trigger: root.current, start: 'top top', end: '+=55%', pin: true })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section
      id="collections"
      ref={root}
      className="relative z-10 bg-background md:flex md:h-svh md:min-h-[640px] md:flex-col md:justify-center"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 py-24 md:px-10 md:pt-28 md:pb-10">
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
                  loading="lazy"
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
    </section>
  )
}

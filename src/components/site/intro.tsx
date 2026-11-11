import { useRef } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import { brand } from '@/config/brand'
import { MOTION_OK } from '@/lib/motion'

gsap.registerPlugin(SplitText)

export function Intro() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      let split: SplitText | undefined
      mm.add(MOTION_OK, () => {
        // Words warm from faint to full ink as the statement scrolls through the viewport.
        // Reduced motion skips this entirely, so the statement is simply there at full strength.
        split = SplitText.create('[data-statement]', { type: 'words' })
        gsap.fromTo(
          split.words,
          { opacity: 0.3 },
          {
            opacity: 1,
            stagger: 0.08,
            ease: 'none',
            scrollTrigger: { trigger: '[data-statement]', start: 'top 80%', end: 'bottom 50%', scrub: true },
          },
        )
        gsap.from('[data-intro-image]', {
          clipPath: 'inset(100% 0 0 0)',
          duration: 1.6,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: '[data-intro-image]', start: 'top 85%' },
        })
      })
      return () => {
        mm.revert()
        split?.revert()
      }
    },
    { scope: root },
  )

  return (
    <section id="about" ref={root} className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-44">
      <div className="grid gap-16 md:grid-cols-12 md:gap-10">
        <h2 data-statement className="font-heading text-[clamp(1.9rem,3.6vw,3.6rem)] leading-[1.15] md:col-span-8">
          The best journeys are planned by someone who has been there: who knows which room catches the
          sunset, which table to ask for, and who answers when you call from the other side of the world.
        </h2>

        <div className="flex flex-col gap-6 md:col-span-3 md:col-start-10 md:pt-3">
          <div data-intro-image className="overflow-hidden">
            <img
              data-parallax="6"
              src="/images/intro-pool.webp"
              alt="Sun loungers beside a palm-lined pool"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {brand.advisor} has spent more than a decade sending people somewhere extraordinary, and looking
            after them while they are there.
          </p>
          <a href="#enquire" className="link-line self-start text-[0.7rem] font-medium tracking-[0.22em] uppercase">
            Enquire with {brand.advisor}
          </a>
        </div>
      </div>
    </section>
  )
}

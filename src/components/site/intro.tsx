import { useRef } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import { brand } from '@/config/brand'
import { SCENES } from '@/lib/motion'

gsap.registerPlugin(SplitText)

export function Intro() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      let split: SplitText | undefined
      // Scene 2: once the intro has covered the hero it locks in place while the photo
      // unveils and the statement inks in word by word, all tied to the scroll.
      mm.add(SCENES, () => {
        split = SplitText.create('[data-statement]', { type: 'words' })
        gsap
          .timeline({
            defaults: { ease: 'none' },
            scrollTrigger: { trigger: root.current, start: 'top top', end: '+=110%', pin: true, scrub: 0.6 },
          })
          .fromTo('[data-intro-image]', { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 0.5 })
          .fromTo('[data-intro-photo]', { scale: 1.25 }, { scale: 1, duration: 0.8 }, 0)
          .fromTo(split.words, { opacity: 0.25 }, { opacity: 1, stagger: 0.03, duration: 0.25 }, 0.1)
          .from('[data-intro-aside]', { opacity: 0, y: 24, duration: 0.25 }, '>-0.15')
      })
      return () => {
        mm.revert()
        split?.revert()
      }
    },
    { scope: root },
  )

  return (
    <section
      id="about"
      ref={root}
      data-after-hero
      // Sits above the pinned hero so it slides over it; the shadow sells the layering.
      className="relative z-10 bg-background md:flex md:h-svh md:min-h-[600px] md:items-center md:shadow-[0_-24px_60px_rgba(42,28,21,0.28)]"
    >
      <div className="mx-auto grid w-full max-w-[1600px] gap-14 px-5 py-24 md:grid-cols-12 md:items-center md:gap-10 md:px-10 md:py-0">
        <h2
          data-statement
          className="font-heading text-[clamp(1.9rem,3.3vw,3.4rem)] leading-[1.14] md:col-span-7"
        >
          The best journeys are planned by someone who has been there: who knows which room catches the
          sunset, which table to ask for, and who answers when you call from the other side of the world.
        </h2>

        <div className="flex flex-col gap-6 md:col-span-4 md:col-start-9">
          <div data-intro-image className="overflow-hidden">
            <img
              data-intro-photo
              src="/images/intro-pool.webp"
              alt="Sun loungers beside a palm-lined pool"
              loading="lazy"
              // Height follows the screen so the whole scene fits any laptop.
              className="aspect-[4/5] w-full object-cover md:aspect-auto md:h-[52svh]"
            />
          </div>
          <div data-intro-aside className="flex flex-col gap-5">
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {brand.advisor} has spent more than a decade sending people somewhere extraordinary, and looking
              after them while they are there.
            </p>
            <a href="#enquire" className="link-line self-start text-[0.75rem] font-medium tracking-[0.22em] uppercase">
              Enquire with {brand.advisor}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

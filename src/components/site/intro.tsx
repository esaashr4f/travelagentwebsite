import { useRef } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import { brand } from '@/config/brand'
import { SCENES } from '@/lib/motion'
import { transition } from '@/lib/transition'

gsap.registerPlugin(SplitText)

export function Intro() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      let split: SplitText | undefined
      // Scene 2: the intro slides over the hero, then holds while the photo unveils and the
      // statement inks in word by word. Transforms and opacity only, tied 1:1 to the scroll.
      mm.add(SCENES, () => {
        split = SplitText.create('[data-statement]', { type: 'words' })
        // Runs while the intro arrives and holds: it finishes before the next scene covers it.
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: root.current, start: 'top 55%', end: 'top -85%', scrub: true },
        })
        // In the signature transition the hero photo itself shrinks into this frame, so the
        // intro doesn't run its own photo reveal.
        if (transition !== 'signature') {
          tl.fromTo('[data-intro-panel]', { yPercent: 101 }, { yPercent: 0, duration: 0.45 }).fromTo(
            '[data-intro-photo]',
            { scale: 1.3 },
            { scale: 1, duration: 0.8 },
            0,
          )
        }
        tl.fromTo(split.words, { opacity: 0.25 }, { opacity: 1, stagger: 0.03, duration: 0.25 }, 0.12)
          .from('[data-intro-aside]', { opacity: 0, yPercent: 30, duration: 0.25 }, '>-0.15')
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
      data-scene="intro"
      data-bg="cream"
      data-after-hero
      // Three screens tall on laptops: one to arrive, one to hold, one to be covered.
      className="relative z-10 md:-mt-[100svh] md:h-[300svh]"
    >
      <div data-scene-frame className="relative bg-background md:sticky md:top-0 md:flex md:h-svh md:min-h-[600px] md:items-center md:overflow-hidden md:shadow-[0_-20px_50px_rgba(42,28,21,0.22)]">
        <div
          data-scene-lift
          className="mx-auto grid w-full max-w-[1600px] gap-14 px-5 py-24 md:grid-cols-12 md:items-center md:gap-10 md:px-10 md:py-0"
        >
          <h2
            data-statement
            className="font-heading text-[clamp(1.9rem,3.3vw,3.4rem)] leading-[1.14] md:col-span-7"
          >
            The best journeys are planned by someone who has been there: who knows which room catches the
            sunset, which table to ask for, and who answers when you call from the other side of the world.
          </h2>

          <div className="flex flex-col gap-6 md:col-span-4 md:col-start-9">
            <div data-intro-slot className="overflow-hidden">
              <div data-intro-panel className="overflow-hidden">
                <img
                  data-intro-photo
                  src="/images/intro-pool.webp"
                  alt="Sun loungers beside a palm-lined pool"
                  decoding="async"
                  // Height follows the screen so the whole scene fits any laptop.
                  className="aspect-[4/5] w-full object-cover md:aspect-auto md:h-[52svh]"
                />
              </div>
            </div>
            <div data-intro-aside className="flex flex-col gap-5">
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                {brand.advisor} has spent more than a decade sending people somewhere extraordinary, and
                looking after them while they are there.
              </p>
              <a href="#enquire" className="link-line self-start text-[0.75rem] font-medium tracking-[0.22em] uppercase">
                Enquire with {brand.advisor}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

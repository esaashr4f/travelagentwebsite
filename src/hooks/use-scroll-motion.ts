import type { RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { SCENES } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

// Scroll-linked motion for a page, driven by data attributes so sections stay declarative:
//   data-parallax="8"  image drifts against the scroll inside its overflow-hidden frame
//   data-rise="120"    block rises (and fades up) as it enters, tied to scroll position
//   data-clip-reveal   frame unveils from the bottom as it enters
// Everything is scrubbed, so it moves with the scrollbar and reverses on the way back up.
// Laptops and up (see SCENES in src/lib/motion.ts).
export function useScrollMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(SCENES, () => {
        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
          const amount = Number(el.dataset.parallax) || 8
          gsap.set(el, { scale: 1 + (amount * 2.4) / 100 })
          gsap.fromTo(
            el,
            { yPercent: -amount },
            {
              yPercent: amount,
              ease: 'none',
              scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        })

        gsap.utils.toArray<HTMLElement>('[data-clip-reveal]').forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: 'inset(100% 0 0 0)' },
            {
              clipPath: 'inset(0% 0 0 0)',
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 35%', scrub: 0.6 },
            },
          )
        })

        gsap.utils.toArray<HTMLElement>('[data-rise]').forEach((el) => {
          const distance = Number(el.dataset.rise) || 80
          gsap.fromTo(
            el,
            { y: distance, opacity: 0.2 },
            {
              y: 0,
              opacity: 1,
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 55%', scrub: 0.6 },
            },
          )
        })
      })
      return () => mm.revert()
    },
    { scope },
  )
}

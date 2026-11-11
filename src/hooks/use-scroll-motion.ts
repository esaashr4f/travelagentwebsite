import type { RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { SCENES } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

// Scroll-linked motion for a page, driven by data attributes so sections stay declarative:
//   data-parallax="8"  image drifts against the scroll inside its overflow-hidden frame
//   data-rise="120"    block rises (and fades up) as it enters, tied to scroll position
//   data-unveil        framed photo slides up out of its mask as it enters
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

        // Transform-only unveil: the inner frame slides up out of its mask while the photo
        // settles from a zoom. (Cheaper than animating clip-path, which repaints each frame.)
        gsap.utils.toArray<HTMLElement>('[data-unveil]').forEach((el) => {
          const panel = el.firstElementChild
          const img = el.querySelector('img')
          const st = { trigger: el, start: 'top 95%', end: 'top 30%', scrub: true }
          if (panel) gsap.fromTo(panel, { yPercent: 101 }, { yPercent: 0, ease: 'none', scrollTrigger: st })
          if (img) gsap.fromTo(img, { scale: 1.3 }, { scale: 1, ease: 'none', scrollTrigger: st })
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
              scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 55%', scrub: true },
            },
          )
        })
      })
      return () => mm.revert()
    },
    { scope },
  )
}

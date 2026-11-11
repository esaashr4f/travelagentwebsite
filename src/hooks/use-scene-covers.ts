import type { RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { SCENES } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

// The transition between scenes. Each [data-scene] (after the first) is pulled up by one
// screen and sits above the previous one, whose content is position: sticky, so the new
// scene slides over a still frame using nothing but the browser's own scrolling. While it
// arrives, the scene underneath recedes:
//   [data-scene-dim]     overlay that darkens it (dark, photographic scenes only; on the
//                        cream scenes a veil reads as grey, so they just lift and soften)
//   [data-scene-recede]  media that drifts down, as if falling behind
//   [data-scene-lift]    copy that lifts away and fades
// Tweens are tied 1:1 to the scroll (scrub: true); Lenis already supplies the smoothing.
export function useSceneCovers(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(SCENES, () => {
        const scenes = gsap.utils.toArray<HTMLElement>('[data-scene]')
        scenes.slice(0, -1).forEach((scene, i) => {
          const next = scenes[i + 1]
          const arrival = { trigger: next, start: 'top bottom', end: 'top top', scrub: true }
          const dim = scene.querySelector('[data-scene-dim]')
          const recede = scene.querySelector('[data-scene-recede]')
          const lift = scene.querySelector('[data-scene-lift]')
          if (dim) gsap.fromTo(dim, { opacity: 0 }, { opacity: 0.55, ease: 'none', scrollTrigger: arrival })
          if (recede) gsap.fromTo(recede, { yPercent: 0 }, { yPercent: 10, ease: 'none', scrollTrigger: arrival })
          if (lift)
            gsap.fromTo(
              lift,
              { yPercent: 0, opacity: 1 },
              { yPercent: -8, opacity: 0.25, ease: 'none', scrollTrigger: arrival },
            )
        })
      })
      return () => mm.revert()
    },
    { scope },
  )
}

import { useEffect, type RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { DESKTOP_MOTION, reducedMotion } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

// The page's whole motion vocabulary, kept deliberately small:
//   data-reveal     block settles up and fades in once as it enters (CSS transition, see
//                   index.css); stagger siblings with style={{ '--reveal-delay': '120ms' }}
//   data-parallax   photo sits slightly enlarged in its frame and drifts with the scroll
export function useScrollMotion(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (reducedMotion()) {
      document.documentElement.classList.add('no-motion')
      return
    }
    const els = scope.current?.querySelectorAll<HTMLElement>('[data-reveal]') ?? []
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        }),
      { rootMargin: '0px 0px -12% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [scope])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(DESKTOP_MOTION, () => {
        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
          gsap.set(el, { scale: 1.1 })
          gsap.fromTo(
            el,
            { yPercent: -4 },
            {
              yPercent: 4,
              ease: 'none',
              scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        })
      })
      return () => mm.revert()
    },
    { scope },
  )
}

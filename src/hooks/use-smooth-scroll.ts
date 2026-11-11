import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reducedMotion } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

let instance: Lenis | null = null

// The live Lenis instance, or null when smooth scrolling is off (reduced motion).
export const getLenis = () => instance

// Lenis owns the scroll; GSAP's ticker drives it so ScrollTrigger animations
// stay in lockstep with the smoothed position instead of the native one.
export function useSmoothScroll() {
  useEffect(() => {
    if (reducedMotion()) return

    // anchors: in-page links (#journeys, #enquire…) glide there instead of jumping,
    // stopping clear of the fixed header (Lenis reads that gap from scroll-margin-top in CSS).
    const lenis = new Lenis({ lerp: 0.1, anchors: true })
    instance = lenis
    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      instance = null
    }
  }, [])
}

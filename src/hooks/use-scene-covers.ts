import type { RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { SCENES } from '@/lib/motion'
import { transition } from '@/lib/transition'

gsap.registerPlugin(ScrollTrigger)

// How one scene hands over to the next on laptops (see src/lib/transition.ts). The markup
// is laid out for stacking: each [data-scene] after the first is pulled up a screen over a
// sticky [data-scene-frame]. CSS in index.css reshapes that per mode. Inside a scene:
//   [data-scene-dim]     overlay that darkens it as it is covered (dark scenes only)
//   [data-scene-recede]  media that drifts down, as if falling behind
//   [data-scene-lift]    copy that lifts away and softens
// Every tween is tied 1:1 to the scroll (scrub: true); Lenis supplies the smoothing.

// Read from the palette tokens in index.css. GSAP needs real colour values to blend; it
// can't interpolate between var() strings (mid-tween they'd go transparent).
const token = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim()
const colour = (name: string | undefined) => token(name ?? 'cream') || '#f6efe4'

export function useSceneCovers(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(SCENES, () => {
        const scenes = gsap.utils.toArray<HTMLElement>('[data-scene]')
        const pairs = scenes.slice(0, -1).map((scene, i) => [scene, scenes[i + 1]] as const)

        if (transition === 'slide' || transition === 'dissolve') {
          pairs.forEach(([scene, next]) => {
            const arrival: Arrival = { trigger: next, start: 'top bottom', end: 'top top', scrub: true }
            if (transition === 'slide') recede(scene, arrival)
            else {
              // A film dissolve, staggered so the two scenes never sit half-visible over
              // each other: the old one fades in the first half, the new one in the second.
              fadeOut(scene, { ...arrival, end: 'top 45%' })
              dissolveIn(next, arrival)
            }
          })
        }

        if (transition === 'canvas' || transition === 'signature') {
          shiftPageColour(scope.current, scenes)
        }

        if (transition === 'signature') {
          const [hero, intro] = scenes
          const arrival: Arrival = { trigger: intro, start: 'top bottom', end: 'top top', scrub: true }
          dissolveIn(intro, arrival)
          heroIntoFrame(hero, intro, arrival)
        }
      })
      return () => mm.revert()
    },
    { scope },
  )
}

type Arrival = { trigger: Element; start: string; end: string; scrub: true }

// The scene being covered settles back: dims (if it has a veil), drifts, softens.
function recede(scene: HTMLElement, arrival: Arrival) {
  const dim = scene.querySelector('[data-scene-dim]')
  const media = scene.querySelector('[data-scene-recede]')
  const lift = scene.querySelector('[data-scene-lift]')
  if (dim) gsap.fromTo(dim, { opacity: 0 }, { opacity: 0.55, ease: 'none', scrollTrigger: arrival })
  if (media) gsap.fromTo(media, { yPercent: 0 }, { yPercent: 10, ease: 'none', scrollTrigger: arrival })
  if (lift)
    gsap.fromTo(lift, { yPercent: 0, opacity: 1 }, { yPercent: -8, opacity: 0.25, ease: 'none', scrollTrigger: arrival })
}

function fadeOut(scene: HTMLElement, range: Arrival) {
  const media = scene.querySelector('[data-scene-recede]')
  const lift = scene.querySelector('[data-scene-lift]')
  if (media) gsap.fromTo(media, { opacity: 1, scale: 1 }, { opacity: 0, scale: 1.04, ease: 'none', scrollTrigger: range })
  if (lift) gsap.fromTo(lift, { opacity: 1 }, { opacity: 0, ease: 'none', scrollTrigger: range })
}

// The arriving scene appears in place instead of sliding: its frame is counter-moved by
// exactly the distance it scrolls (so it holds still) and fades up in the second half.
function dissolveIn(next: HTMLElement, arrival: Arrival) {
  const frame = next.querySelector('[data-scene-frame]')
  if (!frame) return
  gsap.fromTo(
    frame,
    { y: () => -window.innerHeight },
    { y: 0, ease: 'none', scrollTrigger: { ...arrival, invalidateOnRefresh: true } },
  )
  gsap.fromTo(frame, { opacity: 0 }, { opacity: 1, ease: 'none', scrollTrigger: { ...arrival, start: 'top 55%' } })
}

// canvas: one surface whose colour moves between sections as each one scrolls into place.
function shiftPageColour(surface: HTMLElement | null, scenes: HTMLElement[]) {
  if (!surface) return
  scenes.forEach((scene, i) => {
    if (i === 0) return
    const from = colour(scenes[i - 1].dataset.bg)
    const to = colour(scene.dataset.bg)
    if (from === to) return
    gsap.fromTo(
      surface,
      { backgroundColor: from },
      {
        backgroundColor: to,
        ease: 'none',
        immediateRender: false,
        scrollTrigger: { trigger: scene, start: 'top 85%', end: 'top 35%', scrub: true },
      },
    )
  })
}

// signature: the hero photo's window narrows onto the intro's photo frame while the photo
// itself shrinks inside it, so one image travels from full screen into its place on the
// page. The headline lifts away, the shade and dark backing fade, and at the very end the
// intro's own photo fades in over it.
function heroIntoFrame(hero: HTMLElement, intro: HTMLElement, arrival: Arrival) {
  const heroFrame = hero.querySelector<HTMLElement>('[data-scene-frame]')
  const windowEl = hero.querySelector<HTMLElement>('[data-scene-recede]')
  const zoom = hero.querySelector<HTMLElement>('[data-hero-zoom]')
  const introFrame = intro.querySelector<HTMLElement>('[data-scene-frame]')
  const slot = intro.querySelector<HTMLElement>('[data-intro-slot]')
  const introPhoto = intro.querySelector<HTMLElement>('[data-intro-panel]')
  if (!heroFrame || !windowEl || !zoom || !introFrame || !slot || !introPhoto) return

  // Where the slot will sit once the intro has arrived (its frame is then at the top of the
  // screen), measured relative to that frame so in-flight transforms cancel out.
  const target = () => {
    const f = introFrame.getBoundingClientRect()
    const s = slot.getBoundingClientRect()
    const w = heroFrame.clientWidth
    const h = heroFrame.clientHeight
    const left = s.left - f.left
    const top = s.top - f.top
    return { left, top, right: w - (left + s.width), bottom: h - (top + s.height), w, h, sw: s.width, sh: s.height }
  }

  const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { ...arrival, invalidateOnRefresh: true } })
  tl.fromTo(
    windowEl,
    { clipPath: 'inset(0px 0px 0px 0px)' },
    {
      clipPath: () => {
        const t = target()
        return `inset(${t.top}px ${t.right}px ${t.bottom}px ${t.left}px)`
      },
      duration: 1,
    },
    0,
  )
    .fromTo(
      zoom,
      { scale: 1, transformOrigin: '50% 50%' },
      {
        // Shrink just enough that the photo still covers the frame it lands in.
        scale: () => {
          const t = target()
          return Math.max(t.sw / t.w, t.sh / t.h) * 1.08
        },
        transformOrigin: () => {
          const t = target()
          return `${t.left + t.sw / 2}px ${t.top + t.sh / 2}px`
        },
        duration: 1,
      },
      0,
    )
    .to(hero.querySelector('[data-scene-lift]'), { yPercent: -20, opacity: 0, duration: 0.35 }, 0)
    .to(hero.querySelector('[data-hero-shade]'), { opacity: 0, duration: 0.6 }, 0)
    .to(heroFrame, { backgroundColor: colour('cream'), duration: 0.5 }, 0)
    .fromTo(introPhoto, { opacity: 0 }, { opacity: 1, duration: 0.15 }, 0.9)
}

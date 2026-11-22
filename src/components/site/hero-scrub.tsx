import { useEffect, useRef } from 'react'
import { brandName } from '@/config/brand'
import { heroSequence } from '@/data/site'

const frameSrc = (i: number) => `${heroSequence.dir}f${String(i).padStart(3, '0')}.webp`
const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const smoothstep = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a))
  return t * t * (3 - 2 * t)
}

// The film hero on /changedversion. The section is tall; its inner frame stays put
// (CSS sticky, not a GSAP pin) while scrolling plays the clip forwards and backwards,
// one still per step, drawn on a canvas. Stills scrub cleanly where a <video> judders.
export function HeroScrub() {
  const section = useRef<HTMLElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const copy = useRef<HTMLDivElement>(null)
  const hint = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const sec = section.current
    const cvs = canvas.current
    const ctx = cvs?.getContext('2d')
    if (!sec || !cvs || !ctx) return

    const { count, focus } = heroSequence
    const frames: HTMLImageElement[] = []
    let shown = -1
    let raf = 0

    const ready = (img?: HTMLImageElement) => !!img && img.complete && img.naturalWidth > 0

    // Cover-fit the frame into the canvas, cropping around the focus point.
    const paint = (i: number) => {
      let k = i
      while (k > 0 && !ready(frames[k])) k-- // fall back to the nearest earlier still
      const img = frames[k]
      if (!ready(img)) return
      const cw = cvs.width
      const ch = cvs.height
      const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
      const w = img.naturalWidth * s
      const h = img.naturalHeight * s
      const x = (cw - w) * focus.x
      const y = (ch - h) * focus.y
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(img, x, y, w, h)
      shown = k
    }

    const progress = () => {
      const travel = sec.offsetHeight - window.innerHeight
      return travel > 0 ? clamp01(-sec.getBoundingClientRect().top / travel) : 0
    }

    const update = () => {
      raf = 0
      const p = progress()
      const i = Math.round(p * (count - 1))
      if (i !== shown) paint(i)
      // The words step aside for the last stretch, so the reveal plays out clean.
      if (copy.current) {
        const out = smoothstep(0.62, 0.86, p)
        copy.current.style.opacity = String(1 - out)
        copy.current.style.transform = `translateY(${-out * 32}px)`
      }
      // The scroll hint has done its job as soon as the film starts moving.
      if (hint.current) hint.current.style.opacity = String(1 - smoothstep(0, 0.06, p))
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      cvs.width = Math.round(cvs.clientWidth * dpr)
      cvs.height = Math.round(cvs.clientHeight * dpr)
      shown = -1
      update()
    }

    // First still straight away, the rest in order behind it.
    for (let i = 0; i < count; i++) {
      const img = new Image()
      img.decoding = 'async'
      if (i === 0) img.fetchPriority = 'high'
      img.onload = () => {
        if (i === 0 || Math.round(progress() * (count - 1)) === i) {
          shown = -1
          schedule()
        }
      }
      img.src = frameSrc(i)
      frames.push(img)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(cvs)
    window.addEventListener('scroll', schedule, { passive: true })
    resize()

    return () => {
      ro.disconnect()
      window.removeEventListener('scroll', schedule)
      cancelAnimationFrame(raf)
      frames.forEach((f) => (f.src = ''))
    }
  }, [])

  return (
    <section id="top" ref={section} aria-label="Introduction" className="relative h-[300svh] pt-[var(--nav-h)]">
      <div id="top-sentinel" aria-hidden className="absolute top-0 h-px w-px" />

      <div className="sticky top-[var(--nav-h)] h-[calc(100svh-var(--nav-h))] overflow-hidden bg-ink">
        {/* The first still as a plain image paints instantly; the canvas draws over it. */}
        <img
          src={frameSrc(0)}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: `${heroSequence.focus.x * 100}% ${heroSequence.focus.y * 100}%` }}
        />
        <canvas ref={canvas} aria-hidden className="absolute inset-0 h-full w-full" />

        {/* Shade behind the words so they keep their contrast over the brightest cloud: an
            even veil on phones, where the words span the frame, a left-edge fade on laptops. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[rgb(13_28_38/0.5)] md:bg-transparent md:bg-[linear-gradient(90deg,rgb(13_28_38/0.62)_0%,rgb(13_28_38/0.34)_38%,transparent_68%)]"
        />

        <div
          ref={copy}
          className="absolute inset-y-0 left-0 flex max-w-[min(42rem,92vw)] flex-col justify-center px-6 text-paper will-change-transform md:px-10 lg:px-16"
        >
          <h1 className="text-[clamp(3.25rem,1.5rem+6.4vw,7.25rem)] leading-[0.92] font-semibold tracking-[-0.025em]">
            {/* "Travel" on its own line, then the rest: "with Yuval". */}
            {brandName.split(' ')[0]}
            <br />
            {brandName.split(' ').slice(1).join(' ')}
          </h1>
          <p className="mt-6 max-w-sm text-[1.0625rem] leading-relaxed text-paper/90">
            Bespoke holidays, planned personally from the first idea to the flight home.
          </p>
          <a
            href="#enquire"
            className="press caps mt-8 inline-flex min-h-11 items-center self-start border border-paper/70 px-7 hover:bg-paper hover:text-ink"
          >
            Plan a journey
          </a>
        </div>

        <p ref={hint} aria-hidden className="caps absolute bottom-6 left-1/2 -translate-x-1/2 text-paper/80">
          Scroll
        </p>
      </div>
    </section>
  )
}

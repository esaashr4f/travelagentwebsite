import { useEffect, useState } from 'react'
import { brand } from '@/config/brand'
import { heroSlides } from '@/data/site'
import { reducedMotion } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { pick } from '@/lib/variant'

const SLIDE_MS = 5000

type HeroProps = {
  // Optional looping clip (one muted MP4, ~720p, under ~6 MB, plus a poster frame).
  // Without it the photo frame crossfades between stills.
  video?: { src: string; poster: string }
}

export function Hero({ video }: HeroProps) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (video || paused) return
    const id = setInterval(() => setActive((i) => (i + 1) % heroSlides.length), SLIDE_MS)
    return () => clearInterval(id)
  }, [video, paused])

  return (
    <section id="top" className="pt-[72px]">
      {/* Sentinel the nav watches to know when the page has started to move. */}
      <div id="top-sentinel" aria-hidden className="h-px" />

      <div className={pick("px-6", "px-5") + " mx-auto max-w-3xl pt-[7svh] pb-[6svh] text-center md:pt-[9svh]"}>
        <h1 data-reveal className={pick("type-display", "text-[clamp(2.4rem,4.4vw,3.9rem)] leading-[1.1] tracking-[-0.01em]")}>
          Journeys, beautifully planned.
        </h1>
        <p data-reveal style={{ '--reveal-delay': '150ms' } as React.CSSProperties} className={pick("mt-5", "mt-5 text-lg")}>
          Bespoke holidays, planned personally by {brand.advisorFullName}.
        </p>
      </div>

      <div data-reveal style={{ '--reveal-delay': '250ms' } as React.CSSProperties} className={pick("relative aspect-[4/5] overflow-hidden bg-tint md:aspect-[21/9]", "relative h-[72svh] min-h-[420px] overflow-hidden bg-tint md:h-[78svh]")}>
        {video ? (
          <video
            className="h-full w-full object-cover"
            src={video.src}
            poster={video.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        ) : (
          heroSlides.map((slide, i) => (
            <img
              key={slide.src}
              src={slide.src}
              alt=""
              fetchPriority={i === 0 ? 'high' : 'low'}
              decoding="async"
              className={cn(
                'absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ease-in-out',
                i === active ? cn('opacity-100', !reducedMotion() && 'kenburns') : 'opacity-0',
                paused && '[animation-play-state:paused]',
              )}
            />
          ))
        )}
      </div>

      {!video && (
        <div className={pick("type-small px-6 py-1", "px-5 py-4 text-sm") + " mx-auto flex max-w-[1600px] items-center justify-between md:px-10"}>
          <span key={active} className="animate-in fade-in duration-700">
            {heroSlides[active].place}
          </span>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
            className={pick("inline-flex min-h-11 min-w-11 items-center justify-end", "-my-3 py-3")}
          >
            <span className="link-line">{paused ? 'Play' : 'Pause'}</span>
          </button>
        </div>
      )}
    </section>
  )
}

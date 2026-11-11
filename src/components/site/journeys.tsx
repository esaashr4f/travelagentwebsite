import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { brand } from '@/config/brand'
import { journeys } from '@/data/site'

export function Journeys() {
  const row = useRef<HTMLDivElement>(null)

  // Step one card at a time. The row is an ordinary horizontal scroller, so a vertical
  // wheel always scrolls the page, never the row.
  const step = (dir: number) => {
    const el = row.current
    const card = el?.querySelector<HTMLElement>('[data-card]')
    if (!el || !card) return
    el.scrollBy({ left: dir * (card.offsetWidth + 24), behavior: 'smooth' })
  }

  const arrows = (
    <div className="flex gap-2">
      <button type="button" onClick={() => step(-1)} aria-label="Previous journeys" className="press p-3">
        <ChevronLeft strokeWidth={1} className="size-7" />
      </button>
      <button type="button" onClick={() => step(1)} aria-label="More journeys" className="press p-3">
        <ChevronRight strokeWidth={1} className="size-7" />
      </button>
    </div>
  )

  // On laptops the section fills the window below the header: the heading takes what it
  // needs and the photos take the rest, so the whole row is always seen at once.
  return (
    <section id="journeys" className="fit-screen mt-[14svh] flex flex-col md:mt-[12svh]">
      <div className="relative mx-auto w-full max-w-[1600px] px-5 pt-[7svh] text-center md:px-10 md:pt-[4.5svh]">
        <h2 data-reveal className="text-[clamp(2rem,3.2vw,2.75rem)]">
          Itineraries {brand.advisor} loves
        </h2>
        <p data-reveal style={{ '--reveal-delay': '120ms' } as React.CSSProperties} className="mx-auto mt-3 max-w-md text-lg">
          Each one is a starting point, rewritten around whoever is travelling.
        </p>
        <div className="absolute right-7 bottom-0 hidden md:block">{arrows}</div>
      </div>

      <div
        ref={row}
        data-reveal
        style={{ '--reveal-delay': '200ms' } as React.CSSProperties}
        className="mt-[6svh] flex snap-x snap-mandatory scroll-px-5 gap-6 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mt-[3.5svh] md:min-h-0 md:flex-1 md:scroll-px-10 md:px-10 md:pb-[4svh]"
      >
        {journeys.map((j) => (
          <a
            key={j.title}
            href="#enquire"
            data-card
            className="group flex w-[78vw] shrink-0 snap-start flex-col sm:w-[44vw] md:w-[max(240px,calc((100svh-var(--nav-h)-17rem)*0.8))]"
          >
            <div className="aspect-[4/5] overflow-hidden bg-tint md:aspect-auto md:min-h-0 md:flex-1">
              <img
                data-parallax
                src={j.image}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-4 text-sm">
              {j.place}, {j.length}
            </p>
            <h3 className="mt-1 min-h-[2lh] text-[1.45rem] leading-snug transition-opacity duration-300 group-hover:opacity-70">{j.title}</h3>
          </a>
        ))}
        <div aria-hidden className="w-px shrink-0" />
      </div>

      <div className="mt-6 flex justify-end px-3 md:hidden">{arrows}</div>
    </section>
  )
}

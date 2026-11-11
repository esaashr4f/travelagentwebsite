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

  return (
    <section id="journeys" className="py-[14svh]">
      <div className="mx-auto max-w-[1600px] px-5 text-center md:px-10">
        <h2 data-reveal className="text-[clamp(2rem,3.2vw,2.75rem)]">
          Itineraries {brand.advisor} loves
        </h2>
        <p data-reveal style={{ '--reveal-delay': '120ms' } as React.CSSProperties} className="mx-auto mt-4 max-w-md text-lg">
          Each one is a starting point, rewritten around whoever is travelling.
        </p>
      </div>

      <div
        ref={row}
        data-reveal
        style={{ '--reveal-delay': '200ms' } as React.CSSProperties}
        className="mt-[7svh] flex snap-x snap-mandatory scroll-px-5 gap-6 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:scroll-px-10 md:px-10"
      >
        {journeys.map((j) => (
          <a key={j.title} href="#enquire" data-card className="group w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[30vw]">
            <div className="overflow-hidden bg-tint">
              <img
                data-parallax
                src={j.image}
                alt=""
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <p className="mt-5 text-sm">
              {j.place}, {j.length}
            </p>
            <h3 className="mt-1 text-[1.6rem] leading-snug transition-opacity duration-300 group-hover:opacity-70">{j.title}</h3>
          </a>
        ))}
        <div aria-hidden className="w-px shrink-0" />
      </div>

      <div className="mx-auto mt-8 flex max-w-[1600px] justify-end gap-2 px-5 md:px-10">
        <button type="button" onClick={() => step(-1)} aria-label="Previous journeys" className="press p-3">
          <ChevronLeft strokeWidth={1} className="size-7" />
        </button>
        <button type="button" onClick={() => step(1)} aria-label="More journeys" className="press p-3">
          <ChevronRight strokeWidth={1} className="size-7" />
        </button>
      </div>
    </section>
  )
}

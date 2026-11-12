import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { collections } from '@/data/site'
import { cn } from '@/lib/utils'
import { pick } from '@/lib/variant'

export function Collections() {
  const [active, setActive] = useState(0)
  const go = (step: number) => setActive((i) => (i + step + collections.length) % collections.length)
  const c = collections[active]

  return (
    <section id="collections" className="fit-screen flex flex-col">
      <h2 data-reveal className={pick("type-h2 px-6", "px-5 text-[clamp(2rem,3.2vw,2.75rem)]") + " py-[7svh] text-center md:py-[4.5svh]"}>
        Where would you like to be?
      </h2>

      {/* A soft panel beside a large photo; the arrows step through the collections. */}
      {/* /changedversion keeps the photo a true 4:5 portrait: its width follows the height
          left once the heading is placed (91svh - 111px), and the panel takes the rest. */}
      <div data-reveal className={pick("md:grid-cols-[1fr_auto]", "md:grid-cols-2") + " grid md:min-h-0 md:flex-1"}>
        <div className="relative order-2 flex flex-col items-center justify-center bg-tint px-8 py-16 text-center md:order-1">
          <div key={active} className="animate-in fade-in duration-700">
            <h3 className={pick("type-h2", "text-[clamp(2rem,3vw,2.75rem)]")}>{c.title}</h3>
            <p className={pick("mx-auto mt-4 max-w-xs", "mx-auto mt-4 max-w-xs text-lg leading-relaxed")}>{c.note}</p>
            <a href="#journeys" className={pick("caps mt-6 inline-flex min-h-11 items-center", "caps mt-8 inline-block")}>
              <span className="link-line">See journeys</span>
            </a>
          </div>

          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous collection"
            className="press absolute top-1/2 left-3 -translate-y-1/2 p-3 md:left-6"
          >
            <ChevronLeft strokeWidth={1} className="size-7" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next collection"
            className="press absolute top-1/2 right-3 -translate-y-1/2 p-3 md:right-6"
          >
            <ChevronRight strokeWidth={1} className="size-7" />
          </button>

          <div className="absolute bottom-8 flex gap-2.5" aria-hidden>
            {collections.map((x, i) => (
              <span
                key={x.title}
                className={cn('size-1.5 rounded-full bg-ink transition-opacity duration-500', i === active ? 'opacity-100' : 'opacity-25')}
              />
            ))}
          </div>
        </div>

        <div className={pick("md:w-[calc((91svh-111px)*0.8)]", "") + " relative order-1 aspect-[4/5] overflow-hidden md:order-2 md:aspect-auto"}>
          {collections.map((x, i) => (
            <img
              key={x.image}
              src={x.image}
              alt=""
              decoding="async"
              className={cn(
                'absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out',
                i === active ? 'opacity-100' : 'opacity-0',
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

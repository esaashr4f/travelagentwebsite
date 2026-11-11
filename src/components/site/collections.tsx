import { collections } from '@/data/site'
import { cn } from '@/lib/utils'

export function Collections() {
  return (
    <section id="collections" className="mx-auto max-w-[1600px] px-5 pb-28 md:px-10 md:pb-44">
      <div className="mb-12 flex items-end justify-between gap-6 md:mb-16">
        <h2 className="text-[clamp(2.4rem,5vw,4.5rem)] leading-none">
          Where would you <em>like</em> to be?
        </h2>
        <p className="eyebrow hidden md:block">Four ways to travel</p>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
        {collections.map((c, i) => (
          <a
            key={c.title}
            href="#journeys"
            // Alternate columns rise at different speeds, so the grid moves with depth as you scroll.
            data-rise={i % 2 === 1 ? 160 : 70}
            className={cn('group block', i % 2 === 1 && 'md:mt-24')}
          >
            <div className="overflow-hidden">
              <img
                src={c.image}
                alt=""
                loading="lazy"
                className="aspect-[3/4] w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
              />
            </div>
            <h3 className="mt-5 text-2xl md:text-[1.9rem]">{c.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{c.note}</p>
          </a>
        ))}
      </div>
    </section>
  )
}

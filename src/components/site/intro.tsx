import { brand } from '@/config/brand'
import { refined } from '@/lib/variant'

export function Intro() {
  return refined ? <IntroRefined /> : <IntroOriginal />
}

// /changedversion: left-aligned and set on a 12-column grid, the statement on the left
// and the supporting line low on the right, so the page doesn't centre every section.
function IntroRefined() {
  return (
    <section id="about" className="mx-auto max-w-[1600px] px-6 py-[16svh] md:grid md:grid-cols-12 md:gap-x-6 md:px-10">
      <h2 data-reveal className="type-h2 max-w-[26ch] md:col-span-7">
        The best journeys are planned by someone who has been there: who knows which room catches the sunset,
        which table to ask for, and who answers when you call from the other side of the world.
      </h2>
      <div
        data-reveal
        style={{ '--reveal-delay': '150ms' } as React.CSSProperties}
        className="mt-10 max-w-sm md:col-span-4 md:col-start-9 md:mt-0 md:self-end"
      >
        <p>
          {brand.advisor} has spent more than a decade sending people somewhere extraordinary, and looking after
          them while they are there.
        </p>
        <a href="#enquire" className="caps mt-6 inline-flex min-h-11 items-center">
          <span className="link-line">Enquire with {brand.advisor}</span>
        </a>
      </div>
    </section>
  )
}

function IntroOriginal() {
  return (
    <section id="about" className="mx-auto max-w-[1600px] px-5 py-[16svh] text-center md:px-10">
      <h2 data-reveal className="mx-auto max-w-[24ch] text-[clamp(1.75rem,2.7vw,2.6rem)] leading-[1.3]">
        The best journeys are planned by someone who has been there: who knows which room catches the sunset,
        which table to ask for, and who answers when you call from the other side of the world.
      </h2>
      <p
        data-reveal
        style={{ '--reveal-delay': '150ms' } as React.CSSProperties}
        className="mx-auto mt-10 max-w-md text-lg leading-relaxed"
      >
        {brand.advisor} has spent more than a decade sending people somewhere extraordinary, and looking after
        them while they are there.
      </p>
      <a
        data-reveal
        style={{ '--reveal-delay': '250ms' } as React.CSSProperties}
        href="#enquire"
        className="caps mt-10 inline-block"
      >
        <span className="link-line">Enquire with {brand.advisor}</span>
      </a>
    </section>
  )
}

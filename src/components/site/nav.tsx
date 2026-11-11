import { useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { brandName } from '@/config/brand'
import { cn } from '@/lib/utils'
import { Wordmark } from './wordmark'

const links = [
  { label: 'Journeys', href: '#journeys' },
  { label: 'Collections', href: '#collections' },
  { label: 'About', href: '#about' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Transparent over the hero photo, solid once the section after it reaches the bar.
    // (The hero stays pinned on laptops while the intro slides over it, so we watch the
    // intro, not the hero.) ScrollTrigger only fires when that boundary is crossed.
    const st = ScrollTrigger.create({
      trigger: '[data-after-hero]',
      start: 'top 96px',
      onToggle: (self) => setScrolled(self.isActive),
      end: 'max',
    })
    return () => st.kill()
  }, [])

  const light = !scrolled && !open

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-500',
        scrolled && !open ? 'border-b border-border bg-cream/92 backdrop-blur-sm' : 'bg-transparent',
        light ? 'text-cream' : 'text-espresso',
      )}
    >
      <nav className="mx-auto grid h-20 max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-5 md:h-24 md:px-10">
        <ul className="hidden gap-6 text-[0.72rem] font-medium tracking-[0.22em] uppercase md:flex lg:gap-9">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="link-line">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="justify-self-start text-[0.72rem] font-medium tracking-[0.22em] uppercase md:hidden"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Close' : 'Menu'}
        </button>

        <a href="#top" aria-label={`${brandName}, back to top`} className="text-[0.95rem] md:text-[1.1rem]">
          <Wordmark />
        </a>

        <a
          href="#enquire"
          className={cn(
            'press justify-self-end border px-4 py-2.5 text-[0.75rem] font-medium tracking-[0.22em] whitespace-nowrap uppercase md:px-6 md:py-3',
            light
              ? 'border-cream/70 hover:bg-cream hover:text-espresso'
              : 'border-espresso/80 hover:bg-espresso hover:text-cream',
          )}
        >
          Enquire
        </a>
      </nav>

      {open && (
        <div className="fixed inset-0 top-20 z-40 flex flex-col gap-8 overscroll-contain bg-cream px-5 pt-12 md:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="font-heading text-4xl">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}

import { useEffect, useState } from 'react'
import { brandName } from '@/config/brand'
import { getLenis } from '@/hooks/use-smooth-scroll'
import { cn } from '@/lib/utils'
import { Wordmark } from './wordmark'
import { pick } from '@/lib/variant'

const links = [
  { label: 'Signature journeys', href: '#journeys' },
  { label: 'Collections', href: '#collections' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Enquire', href: '#enquire' },
]

export function Nav() {
  const [compact, setCompact] = useState(false)
  const [open, setOpen] = useState(false)

  // The logo settles smaller once the page moves. A one-pixel sentinel at the top of the
  // page tells us when that happens, without listening to every scroll event.
  useEffect(() => {
    const sentinel = document.getElementById('top-sentinel')
    if (!sentinel) return
    const io = new IntersectionObserver(([e]) => setCompact(!e.isIntersecting))
    io.observe(sentinel)
    return () => io.disconnect()
  }, [])

  // Freeze the page under the open menu, and let Escape close it.
  useEffect(() => {
    const lenis = getLenis()
    if (open) lenis?.stop()
    else lenis?.start()
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 bg-paper transition-[border-color] duration-500',
        compact && !open ? 'border-b border-line' : 'border-b border-transparent',
      )}
    >
      <nav className={pick("px-6", "px-5") + " mx-auto grid h-[72px] max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center md:px-10"}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="site-menu"
          className={pick("caps inline-flex min-h-11 items-center justify-self-start", "caps justify-self-start py-3")}
        >
          <span className="link-line">{open ? 'Close' : 'Menu'}</span>
        </button>

        <a
          href="#top"
          onClick={() => setOpen(false)}
          aria-label={`${brandName}, back to top`}
          className={cn(
            'origin-top transition-transform duration-700 ease-[var(--ease-out)]',
            compact ? 'scale-100' : 'scale-[1.18] md:scale-[1.3]',
          )}
        >
          <Wordmark className="text-[0.9rem]" />
        </a>

        <a href="#enquire" onClick={() => setOpen(false)} className={pick("caps inline-flex min-h-11 items-center justify-self-end", "caps justify-self-end py-3")}>
          <span className="link-line">Enquire</span>
        </a>
      </nav>

      {open && (
        <div
          id="site-menu"
          className="fixed inset-x-0 top-[72px] bottom-0 flex flex-col items-center justify-center gap-6 overscroll-contain bg-paper animate-in fade-in duration-500"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={pick("type-display", "text-[clamp(2rem,4vw,3.25rem)]") + " font-light transition-opacity duration-300 hover:opacity-60"}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}

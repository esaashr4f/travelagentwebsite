import { brand, brandName } from '@/config/brand'
import { Wordmark } from './wordmark'
import { pick, refined } from '@/lib/variant'

const YEAR = new Date().getFullYear()

const links = [
  { label: 'Journeys', href: '#journeys' },
  { label: 'Collections', href: '#collections' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Enquire', href: '#enquire' },
  { label: 'Instagram', href: brand.instagram },
  { label: brand.email, href: `mailto:${brand.email}` },
]

export function Footer() {
  return (
    <footer className={pick("px-6", "px-5") + " border-t border-line pt-20 pb-10 text-center md:px-10"}>
      <Wordmark className="text-[1.1rem]" />
      <ul className={pick("mt-10 gap-x-8", "mt-12 gap-x-10 gap-y-4") + " flex flex-wrap justify-center"}>
        {links.map((l) => (
          <li key={l.label}>
            {refined ? (
              <a href={l.href} className="inline-flex min-h-11 items-center">
                <span className="link-line">{l.label}</span>
              </a>
            ) : (
              <a href={l.href} className="link-line">
                {l.label}
              </a>
            )}
          </li>
        ))}
      </ul>
      <div className={pick("type-small", "text-sm") + " mt-16 flex flex-col gap-2 md:flex-row md:justify-center md:gap-6"}>
        <p>
          © {YEAR} {brandName}. {brand.legal}
        </p>
        <p>{brand.protection}</p>
      </div>
    </footer>
  )
}

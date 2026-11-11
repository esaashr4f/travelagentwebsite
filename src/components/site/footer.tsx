import { brand, brandName } from '@/config/brand'
import { Wordmark } from './wordmark'

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
    <footer className="border-t border-line px-5 pt-20 pb-10 text-center md:px-10">
      <Wordmark className="text-[1.1rem]" />
      <ul className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-4">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="link-line">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-16 flex flex-col gap-2 text-sm md:flex-row md:justify-center md:gap-6">
        <p>
          © {YEAR} {brandName}. {brand.legal}
        </p>
        <p>{brand.protection}</p>
      </div>
    </footer>
  )
}

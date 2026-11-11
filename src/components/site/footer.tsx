import { brand, brandName } from '@/config/brand'
import { Wordmark } from './wordmark'

const YEAR = new Date().getFullYear()

const columns = [
  {
    title: 'Explore',
    links: [
      { label: 'Signature journeys', href: '#journeys' },
      { label: 'Collections', href: '#collections' },
      { label: 'About', href: '#about' },
      { label: 'Enquire', href: '#enquire' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: brand.email, href: `mailto:${brand.email}` },
      { label: 'WhatsApp', href: brand.whatsapp },
    ],
  },
  {
    title: 'Follow',
    links: [{ label: 'Instagram', href: brand.instagram }],
  },
]

export function Footer() {
  return (
    <footer className="bg-espresso text-cream">
      <div className="mx-auto max-w-[1600px] px-5 pt-24 pb-10 md:px-10">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Wordmark className="text-2xl" />
          </div>
          {columns.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <p className="eyebrow text-cream/50">{col.title}</p>
              <ul className="mt-5 grid gap-3 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="link-line break-words"
                      {...(l.href.startsWith('http') && { target: '_blank', rel: 'noreferrer' })}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-24 flex flex-col gap-4 border-t border-cream/15 pt-8 text-xs text-cream/50 md:flex-row md:justify-between">
          <p>
            © {YEAR} {brandName}. {brand.legal}
          </p>
          <p>{brand.protection}</p>
        </div>
      </div>
    </footer>
  )
}

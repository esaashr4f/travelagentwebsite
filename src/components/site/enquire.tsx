import { useState, type FormEvent } from 'react'
import { brand } from '@/config/brand'

const field =
  'w-full border-0 border-b border-input bg-transparent px-0 py-3 text-base text-espresso placeholder:text-muted-foreground/70 focus:border-espresso focus:outline-none [&>option]:bg-cream [&>option]:text-espresso'

export function Enquire() {
  const [sent, setSent] = useState(false)
  const [children, setChildren] = useState(0)

  // Demo only: no backend yet. Wire to Formspree, Netlify Forms or email before launch.
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="enquire" className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-40">
      <div className="grid gap-14 md:grid-cols-12 md:items-center md:gap-10">
        <div className="order-2 md:order-1 md:col-span-6">
          {sent ? (
            <div role="status" className="py-16 text-center">
              <h2 className="text-4xl">Thank you.</h2>
              <p className="mt-4 text-muted-foreground">{brand.advisor} will be in touch within one working day.</p>
            </div>
          ) : (
            <>
              <p className="eyebrow">Begin here</p>
              <h2 className="mt-5 text-[clamp(2.2rem,3.6vw,3.4rem)] leading-[1.05]">
                Tell {brand.advisor} where you are <em>dreaming</em> of.
              </h2>

              <form onSubmit={onSubmit} className="mt-10 grid gap-6 sm:grid-cols-2">
                <input required name="name" autoComplete="name" aria-label="Your name" placeholder="Your name…" className={field} />
                <input required type="email" name="email" autoComplete="email" spellCheck={false} aria-label="Email" placeholder="Email…" className={field} />
                <input name="destination" autoComplete="off" aria-label="Destination" placeholder="Where to? e.g. Amalfi Coast" className={field} />
                <input name="when" autoComplete="off" aria-label="When" placeholder="When? e.g. June 2027" className={field} />
                <select name="adults" defaultValue="2" aria-label="Adults" className={field}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'adult' : 'adults'}
                    </option>
                  ))}
                </select>
                <select
                  name="children"
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                  aria-label="Children"
                  className={field}
                >
                  {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n === 0 ? 'No children' : `${n} ${n === 1 ? 'child' : 'children'}`}
                    </option>
                  ))}
                </select>
                {children > 0 && (
                  <input
                    name="childrenAges"
                    autoComplete="off"
                    aria-label="Children’s ages"
                    placeholder="Children’s ages, e.g. 4 and 9"
                    className={field + ' sm:col-span-2 animate-in fade-in duration-500'}
                  />
                )}
                <select name="budget" defaultValue="" aria-label="Budget per person" className={field + ' sm:col-span-2'}>
                  <option value="" disabled>
                    Budget per person
                  </option>
                  <option>Under £2,000</option>
                  <option>£2,000 – £5,000</option>
                  <option>£5,000 – £10,000</option>
                  <option>£10,000+</option>
                </select>
                <textarea
                  name="message"
                  rows={3}
                  aria-label="Message"
                  placeholder="Anything she should know — occasions, the trip you can’t stop thinking about…"
                  className={field + ' resize-none sm:col-span-2'}
                />
                <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    className="bg-terracotta px-9 py-4 text-[0.7rem] font-medium tracking-[0.22em] text-cream uppercase transition-colors duration-300 hover:bg-espresso"
                  >
                    Send enquiry
                  </button>
                  <a href={brand.whatsapp} className="link-line self-start text-sm text-muted-foreground sm:self-auto">
                    Or message on WhatsApp
                  </a>
                </div>
              </form>
            </>
          )}
        </div>

        <div className="order-1 overflow-hidden md:order-2 md:col-span-5 md:col-start-8">
          <img
            data-parallax="6"
            src="/images/enquire-breakfast.webp"
            alt="Breakfast on a terrace above the caldera in Santorini"
            loading="lazy"
            className="aspect-[4/3] w-full object-cover md:aspect-[4/5]"
          />
        </div>
      </div>
    </section>
  )
}

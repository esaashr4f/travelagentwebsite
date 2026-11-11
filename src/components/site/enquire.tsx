import { useState, type FormEvent, type ReactNode } from 'react'
import { brand } from '@/config/brand'

// Focus thickens the underline in the ink colour instead of drawing an outline.
const field =
  'w-full border-0 border-b border-line bg-transparent px-0 py-2.5 text-base text-ink placeholder:text-ink/70 focus:border-ink focus:shadow-[0_1px_0_0_var(--ink)] focus:outline-none focus-visible:outline-none [&>option]:bg-paper [&>option]:text-ink'

function Field({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <label className={'grid gap-1 ' + (className ?? '')}>
      <span className="text-sm">{label}</span>
      {children}
    </label>
  )
}

export function Enquire() {
  const [sent, setSent] = useState(false)
  const [children, setChildren] = useState(0)

  // Demo only: no backend yet. Wire to Formspree, Netlify Forms or email before launch.
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="enquire" className="grid border-t border-line md:min-h-svh md:grid-cols-2">
      <div className="relative min-h-[50svh] overflow-hidden bg-tint">
        <img
          data-parallax
          src="/images/enquire-breakfast.webp"
          alt="Breakfast on a terrace above the caldera in Santorini"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div data-reveal className="flex items-center px-5 py-20 md:px-[6vw] md:py-[12svh]">
        <div className="w-full max-w-xl">
          {sent ? (
            <div role="status" className="py-16 text-center">
              <h2 className="text-4xl">Thank you.</h2>
              <p className="mt-4">{brand.advisor} will be in touch within one working day.</p>
            </div>
          ) : (
            <>
              <h2 className="text-[clamp(2rem,3vw,2.75rem)] leading-[1.15]">
                Tell {brand.advisor} where you would like to go.
              </h2>

              <form onSubmit={onSubmit} className="mt-8 grid gap-x-6 gap-y-6 sm:grid-cols-2 md:mt-[4svh] md:grid-cols-6 md:gap-y-[2.6svh]">
                <Field label="Name" className="md:col-span-3">
                  <input required name="name" autoComplete="name" placeholder="e.g. Sofia Reyes" className={field} />
                </Field>
                <Field label="Email" className="md:col-span-3">
                  <input
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    spellCheck={false}
                    placeholder="you@example.com"
                    className={field}
                  />
                </Field>
                <Field label="Where to?" className="md:col-span-3">
                  <input name="destination" autoComplete="off" placeholder="e.g. Amalfi Coast" className={field} />
                </Field>
                <Field label="When?" className="md:col-span-3">
                  <input name="when" autoComplete="off" placeholder="e.g. June 2027" className={field} />
                </Field>
                <Field label="Adults" className="md:col-span-2">
                  <select name="adults" defaultValue="2" className={field}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Children" className="md:col-span-2">
                  <select
                    name="children"
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className={field}
                  >
                    {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n === 0 ? 'None' : n}
                      </option>
                    ))}
                  </select>
                </Field>
                {children > 0 && (
                  <Field label="Children’s ages" className="animate-in fade-in duration-300 sm:col-span-2 md:order-1 md:col-span-6">
                    <input name="childrenAges" autoComplete="off" placeholder="e.g. 4 and 9" className={field} />
                  </Field>
                )}
                <Field label="Budget per person" className="sm:col-span-2 md:col-span-2">
                  <select name="budget" defaultValue="" className={field}>
                    <option value="">Not sure yet</option>
                    <option>Under £2,000</option>
                    <option>£2,000 - £5,000</option>
                    <option>£5,000 - £10,000</option>
                    <option>£10,000+</option>
                  </select>
                </Field>
                <Field label="Anything else?" className="sm:col-span-2 md:order-2 md:col-span-6">
                  <textarea
                    name="message"
                    rows={2}
                    placeholder="Occasions, who is coming, the trip you can’t stop thinking about…"
                    className={field + ' resize-none'}
                  />
                </Field>
                <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between md:order-3 md:col-span-6">
                  <button
                    type="submit"
                    className="press caps border border-ink bg-ink px-9 py-4 text-paper hover:bg-paper hover:text-ink"
                  >
                    Send enquiry
                  </button>
                  <a href={brand.whatsapp} className="self-start text-sm sm:self-auto">
                    <span className="link-line">Or message on WhatsApp</span>
                  </a>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

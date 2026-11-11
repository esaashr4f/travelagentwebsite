import { useState, type FormEvent, type ReactNode } from 'react'
import { brand } from '@/config/brand'

// The field's focus state is a full-strength underline in the accent colour, replacing the outline.
const field =
  'w-full border-0 border-b border-input bg-transparent px-0 py-2.5 text-base text-espresso placeholder:text-muted-foreground focus:border-terracotta focus:shadow-[0_1px_0_0_var(--terracotta)] focus:outline-none focus-visible:outline-none [&>option]:bg-cream [&>option]:text-espresso'

function Field({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <label className={'grid gap-1 ' + (className ?? '')}>
      <span className="text-sm text-muted-foreground">{label}</span>
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
    <section id="enquire" data-scene className="relative z-50 bg-background md:-mt-[100svh] md:flex md:min-h-svh md:items-center md:shadow-[0_-20px_50px_rgba(42,28,21,0.3)]">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-24 md:px-10 md:pt-32 md:pb-16">
      <div className="grid gap-14 md:grid-cols-12 md:items-center md:gap-10">
        <div data-rise="80" className="order-2 md:order-1 md:col-span-6">
          {sent ? (
            <div role="status" className="py-16 text-center">
              <h2 className="text-4xl">Thank you.</h2>
              <p className="mt-4 text-muted-foreground">{brand.advisor} will be in touch within one working day.</p>
            </div>
          ) : (
            <>
              <h2 className="text-[clamp(2.2rem,3.6vw,3.4rem)] leading-[1.05]">
                Tell {brand.advisor} where you are dreaming of.
              </h2>

              <form onSubmit={onSubmit} className="mt-10 grid gap-x-6 gap-y-7 sm:grid-cols-2">
                <Field label="Name">
                  <input required name="name" autoComplete="name" placeholder="e.g. Sofia Reyes" className={field} />
                </Field>
                <Field label="Email">
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
                <Field label="Where to?">
                  <input name="destination" autoComplete="off" placeholder="e.g. Amalfi Coast" className={field} />
                </Field>
                <Field label="When?">
                  <input name="when" autoComplete="off" placeholder="e.g. June 2027" className={field} />
                </Field>
                <Field label="Adults">
                  <select name="adults" defaultValue="2" className={field}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Children">
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
                  <Field label="Children’s ages" className="sm:col-span-2 animate-in fade-in duration-300">
                    <input name="childrenAges" autoComplete="off" placeholder="e.g. 4 and 9" className={field} />
                  </Field>
                )}
                <Field label="Budget per person" className="sm:col-span-2">
                  <select name="budget" defaultValue="" className={field}>
                    <option value="">Not sure yet</option>
                    <option>Under £2,000</option>
                    <option>£2,000 - £5,000</option>
                    <option>£5,000 - £10,000</option>
                    <option>£10,000+</option>
                  </select>
                </Field>
                <Field label="Anything else?" className="sm:col-span-2">
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Occasions, who is coming, the trip you can’t stop thinking about…"
                    className={field + ' resize-none'}
                  />
                </Field>
                <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    className="press bg-terracotta px-9 py-4 text-[0.75rem] font-medium tracking-[0.22em] text-cream uppercase hover:bg-espresso"
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

        <div data-unveil className="order-1 overflow-hidden md:order-2 md:col-span-5 md:col-start-8">
          <div className="overflow-hidden">
          <img
            src="/images/enquire-breakfast.webp"
            alt="Breakfast on a terrace above the caldera in Santorini"
            decoding="async"
            className="aspect-[4/3] w-full object-cover md:aspect-auto md:h-[68svh]"
          />
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}

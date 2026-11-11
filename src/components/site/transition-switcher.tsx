import { TRANSITIONS, transition, type Transition } from '@/lib/transition'
import { cn } from '@/lib/utils'

// Comparison aid, shown only when the address has ?transition=… or ?compare. Each choice
// reloads the page so every scene starts fresh in the new mode.
export function TransitionSwitcher() {
  const params = new URLSearchParams(window.location.search)
  if (!params.has('transition') && !params.has('compare')) return null

  const choose = (t: Transition) => {
    params.set('transition', t)
    params.delete('compare')
    window.location.search = params.toString()
  }

  return (
    <div className="fixed bottom-4 left-4 z-[70] hidden max-w-[calc(100vw-2rem)] border border-espresso/15 bg-cream/95 p-1.5 text-espresso shadow-[0_8px_30px_rgba(42,28,21,0.18)] md:block">
      <p className="px-2 pt-1 pb-2 text-[0.75rem] text-muted-foreground">{TRANSITIONS[transition]}</p>
      <div className="flex gap-1">
        {(Object.keys(TRANSITIONS) as Transition[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => choose(t)}
            aria-pressed={t === transition}
            className={cn(
              'press px-3 py-2 text-[0.75rem] font-medium tracking-[0.18em] uppercase',
              t === transition ? 'bg-espresso text-cream' : 'hover:bg-sand',
            )}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  )
}

import { brand } from '@/config/brand'
import { cn } from '@/lib/utils'

// Type-only stand-in until the client's logo is supplied.
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex flex-col items-center leading-none', className)}>
      <span className="font-heading text-[1.65em] tracking-[0.18em] uppercase">{brand.name}</span>
      <span className="mt-[0.35em] pl-[0.55em] text-[0.5em] font-medium tracking-[0.55em] uppercase">
        {brand.descriptor}
      </span>
    </span>
  )
}

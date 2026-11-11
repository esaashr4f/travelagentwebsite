import { brand } from '@/config/brand'
import { cn } from '@/lib/utils'

// Type-only stand-in until the client's logo is supplied.
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex flex-col items-center leading-none', className)}>
      <span className="pl-[0.2em] text-[1.55em] font-normal tracking-[0.2em] uppercase">{brand.name}</span>
      <span className="mt-[0.4em] pl-[0.4em] text-[max(0.5em,11px)] tracking-[0.4em] uppercase">{brand.descriptor}</span>
    </span>
  )
}

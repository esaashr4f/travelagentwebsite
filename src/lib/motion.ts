import { brand } from '@/config/brand'

// Whether to honour the visitor's "reduce motion" setting is a per-client decision, made
// once in src/config/brand.ts.
const respect = brand.respectReducedMotion

export const reducedMotion = () =>
  respect && typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const MOTION_OK = respect ? '(prefers-reduced-motion: no-preference)' : 'all'

// Photo drift runs on laptops and up.
export const DESKTOP_MOTION = respect ? '(min-width: 768px) and (prefers-reduced-motion: no-preference)' : '(min-width: 768px)'

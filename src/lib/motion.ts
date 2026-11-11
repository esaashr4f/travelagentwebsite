import { brand } from '@/config/brand'

// Whether to honour the visitor's "reduce motion" setting is a per-client decision, made
// once in src/config/brand.ts. When it is off, the full experience runs for everyone, the
// way the pinned journeys row always has.
const respect = brand.respectReducedMotion

export const reducedMotion = () =>
  respect && typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const MOTION_OK = respect ? '(prefers-reduced-motion: no-preference)' : 'all'

// Full-screen scroll scenes (pinning, covering, scrubbed reveals) run on laptops and up.
export const SCENES = respect ? '(min-width: 768px) and (prefers-reduced-motion: no-preference)' : '(min-width: 768px)'

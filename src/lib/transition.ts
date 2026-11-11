import { brand } from '@/config/brand'

// How one scene hands over to the next on laptops. Chosen per client in
// src/config/brand.ts, and overridable for comparison with ?transition=… in the address.
export const TRANSITIONS = {
  slide: 'Each scene slides up over the last',
  dissolve: 'Each scene fades up in place over the last',
  canvas: 'One continuous page; the background shifts colour between sections',
  signature: 'The hero photo shrinks into the intro’s frame, then flows like canvas',
} as const

export type Transition = keyof typeof TRANSITIONS

const isTransition = (v: string | null): v is Transition => !!v && v in TRANSITIONS

function read(): Transition {
  const fromUrl = typeof window === 'undefined' ? null : new URLSearchParams(window.location.search).get('transition')
  return isTransition(fromUrl) ? fromUrl : brand.transition
}

export const transition: Transition = read()

// Scenes stacked on top of each other (sticky frames that overlap) vs one flowing page.
export const layered = transition === 'slide' || transition === 'dissolve'

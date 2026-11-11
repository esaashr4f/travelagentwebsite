// Visitors who ask their OS for less motion get still pages: no auto-advancing
// carousels, no parallax and no slide-in reveals (opacity fades are kept).
export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const MOTION_OK = '(prefers-reduced-motion: no-preference)'

// Full-screen scroll scenes (pinning, covering, scrubbed reveals): laptops and up, motion allowed.
export const SCENES = '(min-width: 768px) and (prefers-reduced-motion: no-preference)'

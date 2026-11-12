// Two versions of the page live side by side for comparison:
//   /                 the current design
//   /changedversion   the same design tightened to the layout guidelines (one type scale,
//                     fixed photo shapes, 44px tap targets, 24px phone margins, and some
//                     sections left-aligned)
// Once one is chosen, delete the other branch of each `refined ? … : …`.
export const refined =
  typeof window !== 'undefined' && window.location.pathname.replace(/\/+$/, '') === '/changedversion'

export const pick = (refinedClass: string, originalClass: string) => (refined ? refinedClass : originalClass)

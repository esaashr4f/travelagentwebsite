// Sample content for the template. Destinations, trip lengths, copy and reviews are
// placeholders to be replaced with each client's own.

export type HeroSlide = { src: string; place: string }

export const heroSlides: HeroSlide[] = [
  { src: '/images/hero-santorini.webp', place: 'Oia, Santorini' },
  { src: '/images/hero-dubai.webp', place: 'Dubai, United Arab Emirates' },
  { src: '/images/hero-maldives.webp', place: 'North Malé Atoll, Maldives' },
  { src: '/images/hero-namibia.webp', place: 'Deadvlei, Namibia' },
  { src: '/images/hero-amalfi.webp', place: 'The Amalfi Coast, Italy' },
]

export type Collection = { title: string; note: string; image: string }

export const collections: Collection[] = [
  { title: 'City Glamour', note: 'Skyline suites, rooftop dinners', image: '/images/city-dubai.webp' },
  { title: 'Into the Wild', note: 'Desert, savannah, silence', image: '/images/wild-sossusvlei.webp' },
  { title: 'Sun & Sea', note: 'Long lunches by the water', image: '/images/sea-positano.webp' },
  { title: 'Grand Occasions', note: 'Formula 1, festivals, firsts', image: '/images/events-singapore.webp' },
]

export type Journey = { place: string; title: string; length: string; image: string }

export const journeys: Journey[] = [
  { place: 'Singapore', title: 'The Formula 1 Night Race Weekend', length: '5 nights', image: '/images/j-singapore.webp' },
  { place: 'Namibia', title: 'Dunes, Salt Pans and Desert Stars', length: '11 nights', image: '/images/hero-namibia.webp' },
  { place: 'Dubai', title: 'High Above the Marina', length: '4 nights', image: '/images/hero-dubai.webp' },
  { place: 'Maldives', title: 'An Overwater Villa, and Nowhere to Be', length: '7 nights', image: '/images/j-maldives.webp' },
  { place: 'Amalfi Coast', title: 'Positano, Slowly', length: '6 nights', image: '/images/j-positano.webp' },
  { place: 'Santorini', title: 'Caldera Sunsets in Oia', length: '5 nights', image: '/images/j-santorini.webp' },
]

// Sample reviews, labelled as such on the page. Replace with the client's real reviews
// (with their clients' permission) before launch.
export const reviews = [
  {
    trip: 'Greek islands, 2025',
    image: '/images/review-corfu.webp',
    quote:
      'Every detail was taken care of, right down to the table on our last night. We didn’t have to think about a thing.',
  },
  {
    trip: 'Mallorca, 2025',
    image: '/images/review-mallorca.webp',
    quote:
      'The hotel was exactly right for us, and the list of beaches and restaurants beat any guidebook.',
  },
  {
    trip: 'Mediterranean cruise, 2025',
    image: '/images/review-cruise.webp',
    quote:
      'Flights, connections and the ship all fitted together perfectly. Our most relaxed trip yet.',
  },
]

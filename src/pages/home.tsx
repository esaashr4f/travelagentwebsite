import { useEffect, useRef } from 'react'
import { brand, brandName } from '@/config/brand'
import { Collections } from '@/components/site/collections'
import { Enquire } from '@/components/site/enquire'
import { Hero } from '@/components/site/hero'
import { Intro } from '@/components/site/intro'
import { Journeys } from '@/components/site/journeys'
import { Reviews } from '@/components/site/reviews'
import { useSceneCovers } from '@/hooks/use-scene-covers'
import { useScrollMotion } from '@/hooks/use-scroll-motion'

export default function Home() {
  const root = useRef<HTMLElement>(null)
  useScrollMotion(root)
  useSceneCovers(root)

  useEffect(() => {
    document.title = `${brandName} | Bespoke holidays by ${brand.advisorFullName}`
  }, [])

  return (
    <main id="main" ref={root} tabIndex={-1} className="relative z-10 bg-background outline-none md:mb-[var(--footer-h)]">
      <Hero />
      <Intro />
      <Collections />
      <Journeys />
      <Reviews />
      <Enquire />
    </main>
  )
}

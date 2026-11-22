import { useEffect, useRef } from 'react'
import { brandName } from '@/config/brand'
import { Collections } from '@/components/site/collections'
import { Enquire } from '@/components/site/enquire'
import { Hero } from '@/components/site/hero'
import { HeroScrub } from '@/components/site/hero-scrub'
import { Intro } from '@/components/site/intro'
import { Journeys } from '@/components/site/journeys'
import { Reviews } from '@/components/site/reviews'
import { useScrollMotion } from '@/hooks/use-scroll-motion'
import { refined } from '@/lib/variant'

export default function Home() {
  const root = useRef<HTMLElement>(null)
  useScrollMotion(root)

  useEffect(() => {
    document.title = `${brandName} | Bespoke holidays`
  }, [])

  return (
    <main id="main" ref={root} tabIndex={-1} className="outline-none">
      {refined ? <HeroScrub /> : <Hero />}
      <Intro />
      <Collections />
      <Journeys />
      <Reviews />
      <Enquire />
    </main>
  )
}

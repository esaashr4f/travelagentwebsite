import { Footer } from '@/components/site/footer'
import { Nav } from '@/components/site/nav'
import { TransitionSwitcher } from '@/components/site/transition-switcher'
import { useSmoothScroll } from '@/hooks/use-smooth-scroll'
import Home from '@/pages/home'

export default function App() {
  useSmoothScroll()

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] bg-espresso px-5 py-3 text-sm text-cream focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <Nav />
      <Home />
      <Footer />
      <TransitionSwitcher />
    </>
  )
}

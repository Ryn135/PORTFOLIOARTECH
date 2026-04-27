import { useEffect } from 'react'
import Lenis from 'lenis'
import { ScrollTrigger } from './hooks/useGSAP'

import ProceduralGroundBackground from './components/ui/procedural-ground-background'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import Mission from './sections/Mission'
import Philosophy from './sections/Philosophy'
import Process from './sections/Process'
import Work from './sections/Work'
import Clients from './sections/Clients'
import Team from './sections/Team'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    lenis.on('scroll', ScrollTrigger.update)

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative min-h-screen">
      {/* WebGL procedural background */}
      <ProceduralGroundBackground />

      {/* Noise texture overlay */}
      <div className="noise" />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <Hero />
        <Mission />
        <Philosophy />
        <Process />
        <Work />
        <Clients />
        <Team />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

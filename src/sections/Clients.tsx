import { useEffect, useRef } from 'react'
import { gsap } from '../hooks/useGSAP'

const clients = [
  'BarberBox', 'RGB Estudio Arq.', 'Futures Barber', 'ARTECH+',
  'BarberBox', 'RGB Estudio Arq.', 'Futures Barber', 'ARTECH+',
]

export default function Clients() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.clients-content', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.clients-content', start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      <div className="separator mb-16" />

      <div className="clients-content px-8 md:px-12 lg:px-20 mb-16">
        <div className="max-w-7xl mx-auto">
          <p className="text-white/30 text-sm font-medium tracking-widest uppercase">Proyectos realizados</p>
        </div>
      </div>

      <div className="relative overflow-hidden py-4">
        <div className="flex overflow-hidden">
          <div className="marquee-track">
            {clients.map((client, i) => (
              <span key={i} className="inline-flex items-center gap-6 mr-16">
                <span className="text-white/15 font-black text-2xl md:text-3xl tracking-tighter whitespace-nowrap hover:text-violet-400/60 transition-colors cursor-default">
                  {client}
                </span>
                <span className="text-violet-500/30 text-2xl">+</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="separator mt-16" />
    </section>
  )
}

import { useEffect, useRef } from 'react'
import { gsap } from '../hooks/useGSAP'

export default function Mission() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const ctx = gsap.context(() => {
      const words = textRef.current!.querySelectorAll('.word')

      gsap.fromTo(
        words,
        { color: 'rgba(255,255,255,0.12)' },
        {
          color: 'rgba(255,255,255,1)',
          stagger: 0.04,
          ease: 'none',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 70%',
            end: 'bottom 40%',
            scrub: 1,
          },
        }
      )

      gsap.fromTo(
        '.mission-tag',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const missionText =
    'Construir valor de marca es nuestra misión singular. Adoptamos un enfoque integrado porque no existe una solución mágica para construir una marca.'

  return (
    <section ref={sectionRef} className="relative px-8 md:px-12 lg:px-20 py-32 md:py-48 overflow-hidden">
      <div className="separator mb-24" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          <div className="lg:w-1/3">
            <p className="mission-tag text-violet-400 text-sm font-medium tracking-widest uppercase mb-6">
              Nuestra Misión
            </p>
            <div className="flex flex-wrap gap-3">
              {['Estrategia', 'Diseño', 'Tecnología', 'Crecimiento'].map((tag) => (
                <span
                  key={tag}
                  className="mission-tag border border-violet-500/30 text-violet-300 text-xs font-medium px-4 py-2 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:w-2/3">
            <p
              ref={textRef}
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight"
            >
              {missionText.split(' ').map((word, i) => (
                <span key={i} className="word" style={{ color: 'rgba(255,255,255,0.12)' }}>
                  {word}{' '}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

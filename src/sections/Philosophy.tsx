import { useEffect, useRef } from 'react'
import { gsap } from '../hooks/useGSAP'

const pillars = [
  {
    number: '01',
    title: 'Estrategia con claridad',
    description:
      'Estrategia con propósito que atraviesa el ruido. Definimos la dirección correcta antes de tocar un pixel o escribir una línea de código.',
  },
  {
    number: '02',
    title: 'Diseño sin límites',
    description:
      'Diseño funcional y audaz que conquista la atención. Creamos identidades y experiencias que las personas recuerdan y a las que regresan.',
  },
  {
    number: '03',
    title: 'Tecnología sin fronteras',
    description:
      'Construimos con las mejores herramientas disponibles. De React a renderizado 3D — si la experiencia lo exige, nosotros lo entregamos.',
  },
]

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.philosophy-title',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.philosophy-title',
            start: 'top 85%',
          },
        }
      )

      gsap.fromTo(
        '.pillar-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.pillar-card',
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="studio" className="relative px-8 md:px-12 lg:px-20 py-32 md:py-48 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-8">
          Nuestra Filosofía
        </p>

        <h2 className="philosophy-title text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-tightest text-white mb-24 max-w-4xl">
          Unir las piezas está en nuestro ADN
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
          {pillars.map(({ number, title, description }) => (
            <div
              key={number}
              className="pillar-card group bg-dark-800 hover:bg-dark-700 transition-all duration-500 p-10 flex flex-col justify-between min-h-[320px]"
            >
              <span className="text-violet-500/50 font-mono text-sm">{number}</span>
              <div>
                <h3 className="text-white font-bold text-xl leading-snug mb-4 group-hover:text-violet-300 transition-colors duration-300">
                  {title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Big statement */}
        <div className="mt-32">
          <div className="separator mb-16" />
          <p className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tightest leading-none text-white/20 hover:text-white/80 transition-colors duration-700 cursor-default">
            Estrategia sin claridad,
            <br />
            <span className="text-violet-500/30 hover:text-violet-400 transition-colors duration-700">
              comunicación sin propósito,
            </span>
            <br />
            y creatividad sin identidad
            <br />
            <span className="text-white">simplemente no funcionan.</span>
          </p>
        </div>
      </div>
    </section>
  )
}

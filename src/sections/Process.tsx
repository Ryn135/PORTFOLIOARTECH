import { useEffect, useRef } from 'react'
import { gsap } from '../hooks/useGSAP'

const steps = [
  {
    id: '01',
    label: 'Descubrimiento',
    title: 'Entendiendo tu mundo',
    body: 'Nos sumergimos en tu marca, tu audiencia y tu panorama competitivo para definir un camino claro hacia adelante.',
    tags: ['Investigación', 'Entrevistas', 'Auditoría'],
  },
  {
    id: '02',
    label: 'Estrategia',
    title: 'Trazando la ruta correcta',
    body: 'Arquitectura de marca, frameworks de mensajería y planes de go-to-market construidos alrededor de tus objetivos — no de plantillas genéricas.',
    tags: ['Estrategia de Marca', 'Posicionamiento', 'Mensajería'],
  },
  {
    id: '03',
    label: 'Diseño',
    title: 'Creando la experiencia',
    body: 'Sistemas de identidad, UI/UX, motion — cada punto de contacto diseñado para comunicar con intención y precisión.',
    tags: ['Identidad', 'UI/UX', 'Motion'],
  },
  {
    id: '04',
    label: 'Desarrollo',
    title: 'Dándole vida',
    body: 'Construimos productos digitales rápidos y escalables con React, TypeScript e infraestructura moderna. Pixel-perfect y performantes.',
    tags: ['React', 'TypeScript', 'Web3'],
  },
]

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.process-header',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.process-header',
            start: 'top 85%',
          },
        }
      )

      gsap.fromTo(
        '.process-step',
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: '.process-step',
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative px-8 md:px-12 lg:px-20 py-32 md:py-48"
    >
      <div className="separator mb-24" />
      <div className="max-w-7xl mx-auto">
        <div className="process-header flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-24">
          <div>
            <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-6">
              Nuestro Proceso
            </p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-tightest text-white max-w-lg">
              Nuestro proceso no convencional genera resultados extraordinarios
            </h2>
          </div>
          <p className="text-white/40 text-base leading-relaxed max-w-xs">
            Usamos nuestra creatividad, experiencia y tecnología para impulsar resultados — y también tenemos la capacidad de invertir capital.
          </p>
        </div>

        <div className="space-y-0">
          {steps.map(({ id, label, title, body, tags }) => (
            <div
              key={id}
              className="process-step group grid grid-cols-12 gap-6 py-10 border-t border-white/8 hover:border-violet-500/30 transition-colors duration-500 cursor-default"
            >
              <div className="col-span-1 pt-1">
                <span className="text-violet-500/50 font-mono text-xs">{id}</span>
              </div>
              <div className="col-span-2 pt-1">
                <span className="text-white/30 text-sm font-medium tracking-wider uppercase">
                  {label}
                </span>
              </div>
              <div className="col-span-5">
                <h3 className="text-white font-bold text-xl group-hover:text-violet-300 transition-colors duration-300 mb-3">
                  {title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">{body}</p>
              </div>
              <div className="col-span-4 flex flex-wrap gap-2 items-start justify-end">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-violet-500/20 bg-violet-500/5 text-violet-300/60 text-xs px-3 py-1.5 rounded-full group-hover:border-violet-500/40 group-hover:text-violet-300 transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <div className="border-t border-white/8" />
        </div>
      </div>
    </section>
  )
}

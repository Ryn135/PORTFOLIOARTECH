import { useEffect, useRef, useState } from 'react'
import { gsap } from '../hooks/useGSAP'

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-content',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.contact-content',
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
      id="contact"
      className="relative px-8 md:px-12 lg:px-20 py-32 md:py-48 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center bottom, rgba(91,79,233,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="separator mb-24" />

      <div className="max-w-7xl mx-auto">
        <div className="contact-content">
          <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-8">
            Sumate
          </p>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 mb-24">
            <h2 className="text-5xl md:text-6xl lg:text-8xl font-black leading-none tracking-tightest text-white max-w-3xl">
              Valoramos la
              <br />
              <span className="text-violet-400">innovación</span> +
              <br />
              colaboración
              <br />+ ejecución
            </h2>

            <div className="lg:w-1/3 lg:pt-6">
              <p className="text-white/40 text-base leading-relaxed mb-10">
                Siempre estamos buscando personas talentosas y apasionadas para unirse a nuestro equipo en crecimiento. Si te interesa, contactanos — nos encantaría conocerte.
              </p>

              <a
                href="mailto:araminger12@gmail.com"
                className="group inline-flex items-center gap-4 bg-violet-600 hover:bg-violet-500 text-white font-bold px-10 py-5 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-violet-600/30 text-base"
              >
                Iniciar un proyecto
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M3 8H13M8 3L13 8L8 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Big email link */}
          <div className="separator mb-16" />
          <a
            href="mailto:araminger12@gmail.com"
            className="block group"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <p className="text-white/10 group-hover:text-white/20 text-xs tracking-widest uppercase mb-3 transition-colors">
              Escribinos
            </p>
            <p
              className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tightest transition-all duration-500"
              style={{
                color: hovering ? '#8B7FF5' : 'rgba(255,255,255,0.15)',
              }}
            >
              araminger12@gmail.com
            </p>
          </a>
        </div>
      </div>
    </section>
  )
}

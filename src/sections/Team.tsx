import { useEffect, useRef } from 'react'
import { gsap } from '../hooks/useGSAP'

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.team-card', { y: 60, opacity: 0, scale: 0.97 }, {
        y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.team-card', start: 'top 85%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative px-8 md:px-12 lg:px-20 py-32 md:py-48">
      <div className="max-w-7xl mx-auto">
        <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-6">
          Las Personas
        </p>
        <h2 className="text-5xl md:text-6xl font-black leading-none tracking-tightest text-white mb-20">
          Conocé al
          <br />
          <span style={{ background: 'linear-gradient(135deg, #8B7FF5, #5B4FE9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            equipo
          </span>
        </h2>

        <div className="max-w-sm">
          <div className="team-card group relative bg-dark-800 hover:bg-dark-700 rounded-2xl p-10 transition-all duration-500 overflow-hidden cursor-default">
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'radial-gradient(circle at top left, rgba(91,79,233,0.08) 0%, transparent 60%)' }}
            />

            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-xl mb-6 transition-transform duration-300 group-hover:scale-110" style={{ background: '#5B4FE9' }}>
              AR
            </div>

            <h3 className="text-white font-bold text-xl mb-1 group-hover:text-violet-300 transition-colors duration-300">
              Agustín Raminger
            </h3>
            <p className="text-violet-400/70 text-xs font-medium tracking-wider uppercase mb-5">
              Founder · React Developer
            </p>
            <p className="text-white/30 text-sm leading-relaxed">
              Diseño, desarrollo y estrategia digital. Construyo productos desde cero — del concepto al deploy.
            </p>

            <div className="flex gap-3 mt-8">
              <a href="mailto:araminger12@gmail.com" className="text-white/20 hover:text-violet-400 text-xs tracking-widest uppercase transition-colors">
                Email
              </a>
              <span className="text-white/10">·</span>
              <a href="https://github.com/Ryn135" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-violet-400 text-xs tracking-widest uppercase transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

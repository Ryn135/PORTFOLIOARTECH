import { useEffect, useRef, useState } from 'react'
import { gsap } from '../hooks/useGSAP'

const projects = [
  {
    id: 1,
    category: 'Software · SaaS',
    title: 'BarberBox',
    description: 'Software integral de gestión para barberías. Turnos, punto de venta, dashboard financiero, cierre de caja, CRM de clientes y web de reservas para clientes — todo desde un mismo lugar.',
    tags: ['React', 'TypeScript', 'Zustand', 'Recharts'],
    color: '#8B7FF5',
    year: '2025',
    link: 'https://ryn135.github.io/BARBERBOX/',
    screenshots: ['/barberbox-calendar.png', '/barberbox-landing.png'],
  },
  {
    id: 2,
    category: 'Landing Page · Arquitectura',
    title: 'RGB Estudio Arq.',
    description: 'Landing page de alto impacto visual para estudio de arquitectura. Diseño minimalista flotante con identidad RGB, menús no convencionales y presentación dinámica de portfolio.',
    tags: ['React', 'Vite', 'Tailwind', 'Motion'],
    color: '#FDC830',
    year: '2025',
    link: '#',
    screenshots: [],
  },
]

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeScreenshot, setActiveScreenshot] = useState<Record<number, number>>({ 1: 0 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.work-header', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.2, ease: 'power4.out',
        scrollTrigger: { trigger: '.work-header', start: 'top 85%' },
      })
      gsap.fromTo('.work-card', { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.15,
        scrollTrigger: { trigger: '.work-card', start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="work" className="relative px-8 md:px-12 lg:px-20 py-32 md:py-48">
      <div className="separator mb-24" />
      <div className="max-w-7xl mx-auto">

        <div className="work-header flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
          <div>
            <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-6">Trabajo Selecto</p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-tightest text-white">
              Proyectos que
              <br />
              <span style={{ background: 'linear-gradient(135deg, #8B7FF5, #5B4FE9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                mueven personas
              </span>
            </h2>
          </div>
          <span className="text-white/20 text-sm font-mono self-start lg:self-auto">0{projects.length} proyectos</span>
        </div>

        <div className="space-y-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="work-card group rounded-3xl overflow-hidden border border-white/8 hover:border-violet-500/30 transition-all duration-500"
            >
              {/* Top bar */}
              <div className="flex items-center justify-between px-8 md:px-12 py-5 border-b border-white/8">
                <div className="flex items-center gap-4">
                  <span className="text-white/20 font-mono text-xs">0{project.id}</span>
                  <span className="text-white/30 text-xs uppercase tracking-wider">{project.category}</span>
                </div>
                <span className="text-white/20 text-xs font-mono">{project.year}</span>
              </div>

              {/* Body */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

                {/* Left — info */}
                <div className="p-8 md:p-12 flex flex-col justify-between gap-8 border-b lg:border-b-0 lg:border-r border-white/8">
                  <div>
                    <h3
                      className="text-white font-black text-4xl md:text-5xl tracking-tightest mb-5 group-hover:transition-colors duration-400"
                      style={{ color: undefined }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-white/40 text-base leading-relaxed">{project.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="border border-violet-500/25 bg-violet-500/5 text-violet-300/70 text-xs px-4 py-2 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.link !== '#' && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 bg-violet-600 hover:bg-violet-500 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-violet-600/30 w-fit text-sm"
                    >
                      Ver demo en vivo
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8H13M8 3L13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  )}
                </div>

                {/* Right — screenshots */}
                <div className="relative p-8 md:p-10 flex items-center justify-center min-h-[380px] overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at center, ${project.color}10 0%, transparent 70%)` }} />

                  {project.screenshots.length > 0 ? (
                    <div className="relative w-full">
                      {/* Screenshot tabs */}
                      {project.screenshots.length > 1 && (
                        <div className="flex gap-2 mb-4">
                          {['App', 'Landing'].map((label, i) => (
                            <button
                              key={i}
                              onClick={() => setActiveScreenshot(prev => ({ ...prev, [project.id]: i }))}
                              className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                                (activeScreenshot[project.id] ?? 0) === i
                                  ? 'bg-violet-500/30 text-violet-300'
                                  : 'bg-white/5 text-white/30 hover:text-white/60'
                              }`}
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Browser frame */}
                      <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden shadow-2xl shadow-violet-900/20">
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8 bg-white/5">
                          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                          <span className="ml-3 text-white/20 text-xs font-mono">ryn135.github.io/BARBERBOX</span>
                        </div>
                        <img
                          src={project.screenshots[activeScreenshot[project.id] ?? 0]}
                          alt={`${project.title} screenshot`}
                          className="w-full object-cover object-top"
                          style={{ maxHeight: '320px' }}
                        />
                      </div>
                    </div>
                  ) : (
                    /* Placeholder para RGBARCH */
                    <div className="w-full rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8 bg-white/5">
                        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                        <span className="ml-3 text-white/20 text-xs font-mono">rgbarch.studio</span>
                      </div>
                      <div className="h-64 flex items-center justify-center">
                        <div className="text-center">
                          <div className="flex gap-2 justify-center mb-3">
                            <span className="w-3 h-3 rounded-full bg-yellow-400/60" />
                            <span className="w-3 h-3 rounded-full bg-red-500/60" />
                            <span className="w-3 h-3 rounded-full bg-blue-800/60" />
                          </div>
                          <p className="text-white/20 text-xs tracking-widest uppercase">RGB Estudio Arq.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

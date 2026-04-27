import { useEffect, useRef } from 'react'
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
  },
]

function BarberBoxMockup() {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0a0a0f] overflow-hidden shadow-2xl shadow-violet-900/20 w-full text-[11px]">
      {/* Browser bar */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/8 bg-white/5">
        <span className="w-2 h-2 rounded-full bg-white/15" />
        <span className="w-2 h-2 rounded-full bg-white/15" />
        <span className="w-2 h-2 rounded-full bg-white/15" />
        <span className="ml-2 text-white/20 font-mono" style={{ fontSize: 9 }}>ryn135.github.io/BARBERBOX</span>
      </div>

      {/* App layout */}
      <div className="flex h-[280px]">
        {/* Sidebar */}
        <div className="w-10 border-r border-white/8 flex flex-col items-center pt-3 gap-3 bg-black/40 flex-shrink-0">
          <div className="w-5 h-5 rounded bg-violet-600/80 flex items-center justify-center">
            <div className="w-2.5 h-0.5 bg-white rounded-full" />
          </div>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-4 h-4 rounded bg-white/5" />
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-3 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="w-16 h-2 bg-white/60 rounded mb-1" />
              <div className="w-10 h-1.5 bg-white/20 rounded" />
            </div>
            <div className="w-14 h-5 rounded-full bg-violet-600/60 flex items-center justify-center">
              <div className="w-8 h-1.5 bg-white/60 rounded" />
            </div>
          </div>

          {/* KPI row */}
          <div className="grid grid-cols-3 gap-1.5 mb-3">
            {[
              { label: 'Ingresos', val: '$48.200' },
              { label: 'Turnos', val: '24' },
              { label: 'Ticket prom.', val: '$2.008' },
            ].map(({ label, val }) => (
              <div key={label} className="bg-white/5 rounded-lg p-2 border border-white/8">
                <div className="text-white/30 mb-1" style={{ fontSize: 8 }}>{label}</div>
                <div className="text-white font-bold" style={{ fontSize: 10 }}>{val}</div>
              </div>
            ))}
          </div>

          {/* Chart mock */}
          <div className="bg-white/5 rounded-lg border border-white/8 p-2 mb-3" style={{ height: 68 }}>
            <div className="text-white/30 mb-1.5" style={{ fontSize: 8 }}>Ingresos — últimos 7 días</div>
            <div className="flex items-end gap-1 h-8">
              {[30, 55, 40, 70, 45, 85, 60].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${h}%`,
                    background: i === 5 ? '#6B5CE7' : 'rgba(107,92,231,0.25)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Appointments list */}
          <div className="space-y-1">
            {[
              { name: 'Marcos R.', service: 'Corte + barba', time: '10:00', status: 'bg-green-500/60' },
              { name: 'Julián P.', service: 'Corte', time: '11:30', status: 'bg-violet-500/60' },
              { name: 'Tomás G.', service: 'Barba', time: '13:00', status: 'bg-white/20' },
            ].map(({ name, service, time, status }) => (
              <div key={name} className="flex items-center gap-2 bg-white/5 rounded px-2 py-1 border border-white/5">
                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${status}`} />
                <span className="text-white/70 flex-1">{name}</span>
                <span className="text-white/30">{service}</span>
                <span className="text-white/20 font-mono">{time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function RgbMockup() {
  return (
    <div className="w-full rounded-xl border border-white/10 bg-[#0a0a0a] overflow-hidden">
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/8 bg-white/5">
        <span className="w-2 h-2 rounded-full bg-white/15" />
        <span className="w-2 h-2 rounded-full bg-white/15" />
        <span className="w-2 h-2 rounded-full bg-white/15" />
        <span className="ml-2 text-white/20 font-mono" style={{ fontSize: 9 }}>rgbarch.studio</span>
      </div>
      <div className="h-[280px] flex flex-col items-center justify-center gap-4 p-6">
        <div className="flex gap-2 justify-center">
          <span className="w-3 h-3 rounded-full bg-yellow-400/60" />
          <span className="w-3 h-3 rounded-full bg-red-500/60" />
          <span className="w-3 h-3 rounded-full bg-blue-800/60" />
        </div>
        <div className="text-center space-y-2">
          <div className="w-32 h-3 bg-white/60 rounded mx-auto" />
          <div className="w-20 h-2 bg-white/20 rounded mx-auto" />
        </div>
        <div className="grid grid-cols-2 gap-2 w-full max-w-[200px]">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-video bg-white/5 rounded border border-white/8" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null)

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
                    <h3 className="text-white font-black text-4xl md:text-5xl tracking-tightest mb-5">
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

                {/* Right — mockup */}
                <div className="relative p-8 md:p-10 flex items-center justify-center min-h-[380px] overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at center, ${project.color}10 0%, transparent 70%)` }} />
                  <div className="relative w-full">
                    {project.id === 1 ? <BarberBoxMockup /> : <RgbMockup />}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

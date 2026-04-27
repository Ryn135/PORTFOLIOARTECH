import { useEffect, useRef } from 'react'
import { gsap } from '../hooks/useGSAP'
import { AnimatedText } from '@/components/ui/animated-shiny-text'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })

      tl.fromTo(badgeRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
      )
      .fromTo('.hero-word',
        { y: '110%' },
        { y: '0%', duration: 1.1, ease: 'power4.out', stagger: 0.06 },
        '-=0.3'
      )
      .fromTo('.hero-artech',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power4.out' },
        '-=0.5'
      )
      .fromTo(subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo('.hero-cta',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.1 },
        '-=0.4'
      )
      .fromTo(scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        '-=0.2'
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-start px-8 md:px-12 lg:px-20 pt-32 pb-20 overflow-hidden grid-overlay"
    >
      {/* Background — CSS only, sin JS */}
      <div className="absolute inset-0 -z-10" style={{ background: '#07070D' }} />
      <div className="absolute inset-0 -z-10" style={{
        background: 'radial-gradient(ellipse 80% 60% at 15% 10%, rgba(91,79,233,0.2) 0%, transparent 55%)',
      }} />
      <div className="absolute inset-0 -z-10" style={{
        background: 'radial-gradient(ellipse 55% 45% at 88% 25%, rgba(67,56,202,0.12) 0%, transparent 50%)',
      }} />
      <div className="absolute inset-0 -z-10" style={{
        background: 'linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.85) 100%)',
      }} />
      <div className="absolute inset-0 -z-10" style={{
        background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(91,79,233,0.06) 0%, transparent 70%)',
        animation: 'bgPulse 9s ease-in-out infinite',
      }} />

      <div className="relative z-10 max-w-7xl w-full">
        {/* Badge */}
        <div ref={badgeRef} className="flex items-center gap-3 mb-10">
          <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
          <span className="text-violet-400 text-sm font-medium tracking-widest uppercase">
            Estudio de Diseño y Tecnología
          </span>
        </div>

        {/* "Somos" */}
        <div className="font-black leading-none tracking-tightest text-white mb-2">
          <span className="reveal-line inline-block mr-[0.25em]">
            <span className="hero-word inline-block" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}>
              Somos
            </span>
          </span>
        </div>

        {/* ARTECH+ — CSS gradient animation */}
        <div className="hero-artech">
          <AnimatedText
            text="ARTECH+"
            gradientColors="linear-gradient(90deg, #4338CA, #8B7FF5, #ffffff, #8B7FF5, #5B4FE9, #4338CA)"
            gradientAnimationDuration={4}
            className="justify-start py-0 mb-8"
            textClassName="font-black tracking-tightest"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)' } as React.CSSProperties}
          />
        </div>

        {/* Subtitle + CTAs */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
          <p
            ref={subtitleRef}
            className="text-white/50 text-lg md:text-xl font-light leading-relaxed max-w-md"
          >
            Estudio creativo integral y asesor estratégico — nos asociamos con visionarios para
            resolver sus desafíos de diseño más complejos.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#work"
              className="hero-cta group flex items-center gap-3 bg-white text-dark-900 font-bold text-sm px-8 py-4 rounded-full hover:bg-violet-500 hover:text-white transition-all duration-300"
            >
              Ver Proyectos
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M8 3L13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href="#studio"
              className="hero-cta text-white/50 hover:text-white text-sm font-medium underline underline-offset-4 transition-colors"
            >
              Nuestra historia
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-white/30 text-xs tracking-widest uppercase">Deslizá</span>
        <div className="w-px h-12 bg-gradient-to-b from-violet-500/60 to-transparent animate-pulse" />
      </div>
    </section>
  )
}

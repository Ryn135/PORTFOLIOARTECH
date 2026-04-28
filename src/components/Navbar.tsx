import { useEffect, useRef, useState } from 'react'
import { gsap } from '../hooks/useGSAP'

const links = [
  { label: 'Proyectos', href: 'work' },
  { label: 'Estudio', href: 'studio' },
  { label: 'Servicios', href: 'services' },
  { label: 'Contacto', href: 'contact' },
]

const CV_HREF = '?p=%2Fcv'

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.5 }
    )

    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 px-8 md:px-12 py-6 flex items-center justify-between transition-all duration-500 ${
        scrolled ? 'backdrop-blur-md bg-dark-900/70 border-b border-white/5' : ''
      }`}
    >
      <a href="#" className="text-white font-black text-xl tracking-tightest">
        ARTECH<span className="text-violet-500">+</span>
      </a>

      <div className="hidden md:flex items-center gap-10">
        {links.map(({ label, href }) => (
          <a
            key={label}
            href={`#${href}`}
            className="text-sm text-white/60 hover:text-white transition-colors duration-300 tracking-wider uppercase font-medium"
          >
            {label}
          </a>
        ))}
        <a
          href={CV_HREF}
          className="text-sm text-violet-400 hover:text-violet-300 transition-colors duration-300 tracking-wider uppercase font-medium flex items-center gap-1.5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
          Mi CV
        </a>
      </div>

      <a
        href="#contact"
        className="hidden md:inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-violet-600/25"
      >
        Hablemos
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 7H12M7 2L12 7L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>

      <button
        className="md:hidden text-white/70 hover:text-white"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Abrir menú"
      >
        <div className={`w-6 h-0.5 bg-current mb-1.5 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <div className={`w-4 h-0.5 bg-current mb-1.5 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
        <div className={`w-6 h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-dark-800/95 backdrop-blur-lg border-b border-white/5 px-8 py-8 flex flex-col gap-6 md:hidden">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={`#${href}`}
              className="text-2xl font-bold text-white/80 hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            href={CV_HREF}
            className="text-2xl font-bold text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            Mi CV
          </a>
        </div>
      )}
    </nav>
  )
}

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Matrix rain canvas ───────────────────────────────────────────────────────
function MatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const cols = Math.floor(canvas.width / 22)
    const drops = new Array(cols).fill(1)
    const chars = '01アイウエオカキクケコサシスセタチツテトナニヌ</>{}[]#$'

    const draw = () => {
      ctx.fillStyle = 'rgba(7,7,13,0.06)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const alpha = Math.random() * 0.25 + 0.05
        ctx.fillStyle = `rgba(91,79,233,${alpha})`
        ctx.font = '13px monospace'
        ctx.fillText(char, i * 22, y * 22)
        if (y * 22 > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      })
    }

    const id = setInterval(draw, 55)
    return () => {
      clearInterval(id)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.18 }} />
}

// ─── Floating particles ───────────────────────────────────────────────────────
function Particles() {
  const items = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    dur: Math.random() * 8 + 6,
    delay: Math.random() * 5,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-violet-500"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.size}px`, height: `${p.size}px`, opacity: 0.3 }}
          animate={{ y: [0, -30, 0], opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// ─── Typewriter hook ──────────────────────────────────────────────────────────
function useTypewriter(text: string, speed = 55, startDelay = 800) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    let i = 0
    const start = setTimeout(() => {
      const timer = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, ++i))
        } else {
          clearInterval(timer)
        }
      }, speed)
      return () => clearInterval(timer)
    }, startDelay)
    return () => clearTimeout(start)
  }, [text, speed, startDelay])
  return displayed
}

// ─── Scroll fade-in wrapper ───────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = '', direction = 'up' }: {
  children: React.ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'left' | 'right'
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // Always include x AND y in both initial and animate to avoid framer-motion
  // calling .startsWith() on undefined when a property is missing from initial
  const initial =
    direction === 'left' ? { opacity: 0, x: -40, y: 0 }
    : direction === 'right' ? { opacity: 0, x: 40, y: 0 }
    : { opacity: 0, y: 40, x: 0 }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : initial}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Section header ───────────────────────────────────────────────────────────
function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-14">
      <span className="text-violet-500/50 font-mono text-xs tracking-widest">{number}</span>
      <div className="h-px flex-1 bg-gradient-to-r from-violet-500/40 to-transparent" />
      <h2 className="text-white font-black tracking-tight" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
        {title}
      </h2>
      <div className="h-px flex-1 bg-gradient-to-l from-violet-500/40 to-transparent" />
    </div>
  )
}

// ─── Timeline item ────────────────────────────────────────────────────────────
function TimelineItem({ title, org, date, items, delay = 0, last = false }: {
  title: string; org: string; date: string
  items?: string[]; delay?: number; last?: boolean
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.65, delay }}
      className={`relative pl-8 ${last ? 'pb-0' : 'pb-10'} group`}
    >
      {/* Vertical line */}
      {!last && (
        <div className="absolute left-[4px] top-3 bottom-0 w-px bg-violet-500/20 group-hover:bg-violet-500/40 transition-colors" />
      )}
      {/* Dot */}
      <motion.div
        whileHover={{ scale: 1.8 }}
        className="absolute left-0 top-[6px] w-[9px] h-[9px] rounded-full bg-violet-500 transition-all"
        style={{ boxShadow: '0 0 10px rgba(91,79,233,0.7)' }}
      />

      <div className="border border-white/8 rounded-2xl p-6 hover:border-violet-500/35 hover:bg-white/[0.025] transition-all duration-400 group/card"
        style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(8px)' }}>
        <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
          <h3 className="text-white font-bold text-lg group-hover/card:text-violet-200 transition-colors">{title}</h3>
          <span className="text-violet-400 text-xs font-mono bg-violet-500/10 px-3 py-1.5 rounded-full border border-violet-500/20 whitespace-nowrap">
            {date}
          </span>
        </div>
        <p className="text-white/40 text-sm font-mono mb-4">{org}</p>
        {items && (
          <ul className="space-y-2">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-white/60 text-sm leading-relaxed">
                <span className="text-violet-400 text-xs mt-1 shrink-0">▸</span>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  )
}

// ─── Animated skill bar ────────────────────────────────────────────────────────
function SkillBar({ name, level, delay = 0 }: { name: string; level: number; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-2">
        <span className="text-white/75 text-sm font-mono group-hover:text-white transition-colors">{name}</span>
        <motion.span
          className="text-violet-400 text-xs font-mono"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: delay + 0.8 }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-[3px] bg-white/8 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #4338CA, #8B7FF5)',
            boxShadow: '0 0 8px rgba(91,79,233,0.9)',
          }}
          initial={{ width: '0%' }}
          animate={inView ? { width: `${level}%` } : { width: '0%' }}
          transition={{ duration: 1.3, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  )
}

// ─── Skill tag ─────────────────────────────────────────────────────────────────
function SkillTag({ label }: { label: string }) {
  return (
    <motion.span
      whileHover={{ scale: 1.06 }}
      className="px-4 py-2 border border-violet-500/25 rounded-full text-sm text-violet-300/90 bg-violet-500/5 cursor-default hover:border-violet-400/60 hover:text-white hover:shadow-[0_0_18px_rgba(91,79,233,0.35)] transition-all duration-300 font-mono"
    >
      {label}
    </motion.span>
  )
}

// ─── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -3 }}
      className="bg-white/[0.03] border border-white/8 rounded-2xl p-5 transition-all duration-300 cursor-default"
    >
      <p className="text-white/35 text-xs font-mono tracking-widest uppercase mb-2">{label}</p>
      <p className="text-white font-black text-2xl mb-0.5">{value}</p>
      <p className="text-white/40 text-xs font-mono">{sub}</p>
    </motion.div>
  )
}

// ─── Course card ───────────────────────────────────────────────────────────────
function CourseCard({ title, platform, accentColor, delay }: {
  title: string; platform: string; accentColor: string; delay: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <FadeIn delay={delay}>
      <motion.div
        whileHover={{ y: -6 }}
        className="border border-white/8 rounded-2xl p-7 transition-all duration-300 cursor-default group"
        style={{ background: 'rgba(255,255,255,0.02)' }}
      >
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="text-white font-bold text-lg group-hover:text-violet-200 transition-colors">{title}</h3>
            <p className="text-white/35 text-sm font-mono mt-1">{platform}</p>
          </div>
          <span className="flex items-center gap-1.5 text-xs font-mono text-green-400 bg-green-400/8 border border-green-400/20 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            En curso
          </span>
        </div>
        <div className="h-[3px] bg-white/6 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${accentColor}60, ${accentColor})` }}
            initial={{ width: '0%' }}
            animate={inView ? { width: '55%' } : { width: '0%' }}
            transition={{ duration: 1.2, delay: delay + 0.3, ease: 'easeOut' }}
          />
        </div>
        <p className="text-white/20 text-xs font-mono mt-2">55% completado</p>
      </motion.div>
    </FadeIn>
  )
}

// ─── Language bar card ────────────────────────────────────────────────────────
function LangCard({ lang, level, pct, color }: { lang: string; level: string; pct: number; color: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref} className="border border-white/8 rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.02)' }}>
      <div className="flex justify-between items-center mb-4">
        <span className="text-white font-bold">{lang}</span>
        <span className="text-xs font-mono px-3 py-1 rounded-full border"
          style={{ color, borderColor: `${color}40`, background: `${color}10` }}>{level}</span>
      </div>
      <div className="h-[3px] bg-white/8 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
          initial={{ width: '0%' }}
          animate={inView ? { width: `${pct}%` } : { width: '0%' }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  )
}

// Defined outside the component so the setInterval closure always captures
// the same stable reference — avoids stale-closure undefined entries in Strict Mode
const TERMINAL_SCRIPT = [
  'C:\\Users\\ARTECH> whoami',
  '→ Agustín Raminger | 19 años | Los Polvorines, BA',
  'C:\\Users\\ARTECH> type status.txt',
  '→ Disponible para oportunidades 🟢',
  'C:\\Users\\ARTECH> type github.txt',
  '→ github.com/Ryn135',
  'C:\\Users\\ARTECH> dir stack\\',
  '→ react  typescript  javascript  html  css  tailwind  git',
  'C:\\Users\\ARTECH> dir tools\\',
  '→ vscode  github  vite  figma  windows  linux',
  'C:\\Users\\ARTECH> echo %IDIOMAS%',
  '→ Español (nativo)  |  Inglés (intermedio)',
  'C:\\Users\\ARTECH> echo Listo para colaborar.',
  '→ Listo para colaborar. ✓',
]

// ─── Main CV component ─────────────────────────────────────────────────────────
export default function CV() {
  const subtitle = useTypewriter('Estudiante Lic. Sistemas · Técnico IT · 19 años', 55, 900)
  const [termLines, setTermLines] = useState<string[]>([])

  useEffect(() => {
    setTermLines([])
    let i = 0
    const id = setInterval(() => {
      if (i < TERMINAL_SCRIPT.length) {
        setTermLines(prev => [...prev, TERMINAL_SCRIPT[i++]])
      } else {
        clearInterval(id)
      }
    }, 350)
    return () => { clearInterval(id); setTermLines([]) }
  }, [])

  // Scroll to section helper
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative min-h-screen bg-[#07070D] text-white overflow-x-hidden">

      {/* ── Global styles ── */}
      <style>{`
        @keyframes glitch-a {
          0%,100%{clip-path:inset(0 0 97% 0);transform:translate(-4px,0)}
          15%{clip-path:inset(20% 0 60% 0);transform:translate(4px,0)}
          30%{clip-path:inset(60% 0 20% 0);transform:translate(-2px,0)}
          50%{clip-path:inset(5% 0 85% 0);transform:translate(4px,0)}
          70%{clip-path:inset(80% 0 5% 0);transform:translate(0,0)}
          85%{clip-path:inset(40% 0 40% 0);transform:translate(-4px,0)}
        }
        @keyframes glitch-b {
          0%,100%{clip-path:inset(95% 0 0 0);transform:translate(4px,0)}
          15%{clip-path:inset(60% 0 20% 0);transform:translate(-4px,0)}
          30%{clip-path:inset(20% 0 60% 0);transform:translate(2px,0)}
          50%{clip-path:inset(85% 0 5% 0);transform:translate(-4px,0)}
          70%{clip-path:inset(5% 0 80% 0);transform:translate(0,0)}
          85%{clip-path:inset(40% 0 40% 0);transform:translate(4px,0)}
        }
        @keyframes scan {
          0%{transform:translateY(-100%)}
          100%{transform:translateY(100vh)}
        }
        @keyframes blink {
          0%,100%{opacity:1} 50%{opacity:0}
        }
        .glitch{position:relative;display:inline-block}
        .glitch::before{
          content:attr(data-text);
          position:absolute;left:0;top:0;width:100%;
          color:#818cf8;
          animation:glitch-a 4s infinite;
          pointer-events:none;
        }
        .glitch::after{
          content:attr(data-text);
          position:absolute;left:0;top:0;width:100%;
          color:#22d3ee;
          animation:glitch-b 4s infinite;
          pointer-events:none;
        }
        .scanline{
          position:fixed;top:0;left:0;right:0;height:3px;
          background:linear-gradient(transparent,rgba(91,79,233,0.25),transparent);
          animation:scan 10s linear infinite;
          pointer-events:none;z-index:999;
        }
        .cursor::after{content:'▌';animation:blink 1s step-end infinite;color:#5B4FE9;margin-left:2px}
        .hex-bg{
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V16L28 0l28 16v34L28 66zm0-2l26-15V18L28 2 2 18v31l26 15z' fill='%235B4FE9' fill-opacity='0.03'/%3E%3C/svg%3E");
        }
        .term-cmd{color:#8b7ff5;font-weight:600}
        .term-out{color:#94a3b8;padding-left:0.5rem}
      `}</style>

      {/* Scanline */}
      <div className="scanline" />
      {/* Noise */}
      <div className="noise" />

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden grid-overlay">
        <MatrixCanvas />
        <Particles />

        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 75% 55% at 50% 40%, rgba(91,79,233,0.18) 0%, transparent 65%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent 60%, #07070D 100%)' }} />

        <div className="relative z-10 text-center max-w-5xl w-full">

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-10 px-5 py-2 border border-green-500/25 rounded-full bg-green-500/5"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-xs font-mono tracking-widest uppercase">
              Disponible para oportunidades
            </span>
          </motion.div>

          {/* Name — glitch */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5"
          >
            <h1
              className="glitch font-black text-white leading-none tracking-tight select-none"
              data-text="AGUSTÍN RAMINGER"
              style={{ fontSize: 'clamp(2.6rem, 9vw, 7.5rem)' }}
            >
              AGUSTÍN RAMINGER
            </h1>
          </motion.div>

          {/* Typewriter role */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className={`text-violet-300/75 font-mono mb-12 ${subtitle.length < 51 ? 'cursor' : ''}`}
            style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)' }}
          >
            {subtitle}
          </motion.p>

          {/* Quick contact chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.7 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {[
              { icon: '✉', label: 'araminger12@gmail.com', href: 'mailto:araminger12@gmail.com' },
              { icon: '☎', label: '1139337326', href: 'tel:+541139337326' },
              { icon: '◎', label: 'Los Polvorines, BA', href: '#' },
              { icon: '⌥', label: 'github.com/Ryn135', href: 'https://github.com/Ryn135' },
            ].map(({ icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-5 py-2.5 border border-white/10 rounded-full text-white/55 text-sm hover:text-white hover:border-violet-500/50 transition-all duration-300 font-mono group"
              >
                <span className="text-violet-400 group-hover:scale-125 transition-transform">{icon}</span>
                {label}
              </motion.a>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.button
              onClick={() => scrollTo('experiencia')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 bg-violet-600 hover:bg-violet-500 text-white font-bold px-8 py-3.5 rounded-full transition-colors text-sm"
              style={{ boxShadow: '0 0 30px rgba(91,79,233,0.4)' }}
            >
              Ver experiencia
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M8 3v10M3 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
            <motion.a
              href="mailto:araminger12@gmail.com"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 border border-white/15 hover:border-violet-500/50 text-white/70 hover:text-white font-mono px-8 py-3.5 rounded-full transition-all text-sm"
            >
              Contactar
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/20 text-xs font-mono tracking-widest">SCROLL</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-12 bg-gradient-to-b from-violet-500/60 to-transparent"
          />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CONTENT
      ══════════════════════════════════════════════════════ */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-24 space-y-36">

        {/* ── 01 PERFIL ── */}
        <section id="perfil">
          <FadeIn><SectionHeader number="01" title="Perfil" /></FadeIn>

          <div className="grid md:grid-cols-5 gap-8">
            {/* Terminal — ocupa 3 cols */}
            <FadeIn delay={0.1} className="md:col-span-3">
              <div className="rounded-2xl overflow-hidden border border-white/8 font-mono text-sm"
                style={{ background: '#0B0B16' }}>
                {/* Window bar */}
                <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/8"
                  style={{ background: 'rgba(255,255,255,0.025)' }}>
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                  <span className="ml-3 text-white/25 text-xs">C:\Users\Agustin — cmd</span>
                </div>
                {/* Lines */}
                <div className="p-6 space-y-1.5 min-h-[220px]">
                  {termLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25 }}
                      className={line?.startsWith('C:\\') ? 'term-cmd' : 'term-out'}
                    >
                      {line}
                    </motion.div>
                  ))}
                  {termLines.length < TERMINAL_SCRIPT.length && (
                    <span className="text-violet-400 animate-pulse">█</span>
                  )}
                </div>
              </div>
            </FadeIn>

            {/* Stats — ocupa 2 cols */}
            <div className="md:col-span-2 grid grid-cols-2 gap-4 content-start">
              {[
                { label: 'Edad', value: '19', sub: 'años' },
                { label: 'Universidad', value: 'UNGS', sub: 'Lic. Sistemas' },
                { label: 'Experiencia IT', value: '3+', sub: 'años práctica' },
                { label: 'Proyectos', value: '2+', sub: 'en producción' },
                { label: 'GitHub', value: 'Ryn135', sub: 'github.com' },
                { label: 'Estado', value: 'Open', sub: 'to work' },
              ].map((s, i) => (
                <FadeIn key={s.label} delay={0.1 + i * 0.07}>
                  <StatCard {...s} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── 02 EXPERIENCIA ── */}
        <section id="experiencia">
          <FadeIn><SectionHeader number="02" title="Experiencia" /></FadeIn>

          <TimelineItem
            title="Técnico en Hardware & Software"
            org="Rol práctico — soporte freelance"
            date="Actualidad"
            delay={0.1}
            last
            items={[
              'Soporte técnico integral presencial y remoto: diagnóstico de problemas de hardware y software',
              'Mantenimiento y reparación de componentes computacionales (RAM, HDD/SSD, fuentes, etc.)',
              'Instalación, configuración y actualización de sistemas operativos y software diverso',
              'Gestión de backups y restauración de datos críticos para usuarios y pequeñas empresas',
            ]}
          />
        </section>

        {/* ── 03 FORMACIÓN ── */}
        <section id="formacion">
          <FadeIn><SectionHeader number="03" title="Formación" /></FadeIn>

          <div>
            <TimelineItem
              title="Lic. en Sistemas"
              org="Universidad General Sarmiento (UNGS)"
              date="may 2025 – Actual"
              delay={0.1}
            />
            <TimelineItem
              title="Curso de Guardavidas"
              org="Escuela de Guardavidas de Malvinas Argentinas · Educación Terciaria"
              date="2025 – 2026 (Finalizado)"
              delay={0.2}
            />
            <TimelineItem
              title="Bachiller en Economía"
              org="Colegio Monseñor Terrero"
              date="nov 2019 – nov 2025"
              delay={0.3}
              last
            />
          </div>
        </section>

        {/* ── 04 HABILIDADES ── */}
        <section id="habilidades">
          <FadeIn><SectionHeader number="04" title="Habilidades" /></FadeIn>

          <div className="grid md:grid-cols-2 gap-14">
            {/* Tech */}
            <FadeIn delay={0.1}>
              <h3 className="text-white/30 text-xs font-mono tracking-widest uppercase mb-7">Técnicas</h3>
              <div className="space-y-5">
                <SkillBar name="Soporte Técnico IT" level={90} delay={0.1} />
                <SkillBar name="Reparación de Hardware" level={85} delay={0.2} />
                <SkillBar name="Sistemas Operativos" level={85} delay={0.3} />
                <SkillBar name="Gestión de Backups" level={80} delay={0.4} />
                <SkillBar name="JavaScript / TypeScript" level={65} delay={0.5} />
                <SkillBar name="React" level={60} delay={0.6} />
                <SkillBar name="Microsoft Office" level={80} delay={0.7} />
              </div>
            </FadeIn>

            {/* Soft */}
            <FadeIn delay={0.2}>
              <h3 className="text-white/30 text-xs font-mono tracking-widest uppercase mb-7">Competencias</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  'Soporte al Cliente',
                  'Colaboración',
                  'Co-Working',
                  'Comunicación Técnica',
                  'Resolución de Problemas',
                  'Trabajo en Equipo',
                  'Adaptabilidad',
                  'Atención al Detalle',
                  'Proactividad',
                ].map(s => <SkillTag key={s} label={s} />)}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── 05 STACK TECNOLÓGICO ── */}
        <section id="stack">
          <FadeIn><SectionHeader number="05" title="Stack" /></FadeIn>

          <div className="space-y-8">
            {[
              {
                category: 'Frontend',
                items: [
                  { name: 'React', color: '#61DAFB' },
                  { name: 'TypeScript', color: '#3178C6' },
                  { name: 'JavaScript', color: '#F7DF1E' },
                  { name: 'HTML5', color: '#E34F26' },
                  { name: 'CSS3', color: '#1572B6' },
                  { name: 'Tailwind CSS', color: '#06B6D4' },
                ],
              },
              {
                category: 'Herramientas',
                items: [
                  { name: 'Git', color: '#F05032' },
                  { name: 'GitHub', color: '#ffffff' },
                  { name: 'VSCode', color: '#007ACC' },
                  { name: 'Vite', color: '#646CFF' },
                  { name: 'Framer Motion', color: '#BB4AFF' },
                  { name: 'GSAP', color: '#88CE02' },
                ],
              },
              {
                category: 'Sistemas & Seguridad',
                items: [
                  { name: 'Windows', color: '#0078D4' },
                  { name: 'Linux (básico)', color: '#FCC624' },
                  { name: 'VMware', color: '#607078' },
                  { name: 'Virtualización', color: '#9CA3AF' },
                  { name: 'Ciberseguridad', color: '#EF4444' },
                  { name: 'Redes', color: '#10B981' },
                  { name: 'Python', color: '#3776AB' },
                  { name: 'Office 365', color: '#D83B01' },
                ],
              },
            ].map(({ category, items }, gi) => (
              <FadeIn key={category} delay={gi * 0.1}>
                <div>
                  <p className="text-white/30 text-xs font-mono tracking-widest uppercase mb-4">{category}</p>
                  <div className="flex flex-wrap gap-3">
                    {items.map(({ name, color }, i) => (
                      <motion.div
                        key={name}
                        initial={{ opacity: 0, y: 10, x: 0 }}
                        whileInView={{ opacity: 1, y: 0, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                        whileHover={{ y: -3 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/8 text-sm font-mono cursor-default"
                        style={{ background: 'rgba(255,255,255,0.03)' }}
                      >
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
                        <span className="text-white/70">{name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── 06 PROYECTOS ── */}
        <section id="proyectos">
          <FadeIn><SectionHeader number="06" title="Proyectos" /></FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Futures Barber Studio',
                desc: 'Sistema full-stack para barberías: landing page, panel de gestión con POS, sistema de turnos, historial de clientes y app de escritorio. Monorepo con web, panel y servidor.',
                tags: ['React', 'TypeScript', 'Tailwind', 'Node.js', 'Monorepo'],
                link: 'https://github.com/Ryn135/Futures-barber-studio',
                live: '',
                status: 'En desarrollo',
                statusColor: '#F59E0B',
              },
              {
                title: 'RGB Architecture',
                desc: 'Landing page para estudio de arquitectura con diseño moderno, galería de proyectos y formulario de contacto.',
                tags: ['React', 'TypeScript', 'Tailwind'],
                link: 'https://github.com/Ryn135',
                live: '',
                status: 'En desarrollo',
                statusColor: '#F59E0B',
              },
              {
                title: 'ARTECH+ Portfolio',
                desc: 'Portfolio de estudio creativo con animaciones GSAP y Framer Motion, smooth scroll con Lenis y formulario de contacto funcional.',
                tags: ['React', 'TypeScript', 'Tailwind', 'GSAP', 'Framer Motion'],
                link: 'https://github.com/Ryn135/PORTFOLIOARTECH',
                live: 'https://ryn135.github.io/PORTFOLIOARTECH/',
                status: 'Live',
                statusColor: '#10B981',
              },
              {
                title: 'CV Interactivo',
                desc: 'CV personal con efectos futuristas: matrix rain en canvas, glitch CSS, terminal animada y scroll-triggered animations.',
                tags: ['React', 'TypeScript', 'Framer Motion', 'Canvas API'],
                link: 'https://github.com/Ryn135/PORTFOLIOARTECH',
                live: 'https://ryn135.github.io/PORTFOLIOARTECH/?p=%2Fcv',
                status: 'Live',
                statusColor: '#10B981',
              },
            ].map(({ title, desc, tags, live, status, statusColor }, i) => (
              <FadeIn key={title} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="border border-white/8 rounded-2xl p-7 flex flex-col gap-5 group"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-white font-bold text-lg group-hover:text-violet-200 transition-colors">{title}</h3>
                    <span
                      className="text-xs font-mono px-2.5 py-1 rounded-full border shrink-0"
                      style={{ color: statusColor, borderColor: `${statusColor}40`, background: `${statusColor}10` }}
                    >
                      ● {status}
                    </span>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(t => (
                      <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/20">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-auto pt-2 border-t border-white/5">
                    {live && (
                      <a href={live} target="_blank" rel="noopener noreferrer"
                        className="text-xs font-mono text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1.5">
                        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                          <path d="M1 6a5 5 0 1010 0A5 5 0 001 6zM6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                        </svg>
                        Ver en vivo
                      </a>
                    )}
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── 07 IDIOMAS ── */}
        <section id="idiomas">
          <FadeIn><SectionHeader number="07" title="Idiomas" /></FadeIn>

          <div className="grid sm:grid-cols-2 gap-6 max-w-lg">
            <LangCard lang="Español" level="Nativo" pct={100} color="#8B7FF5" />
            <LangCard lang="Inglés" level="Intermedio (B1)" pct={55} color="#22D3EE" />
          </div>
        </section>

        {/* ── 08 CURSOS ── */}
        <section id="cursos">
          <FadeIn><SectionHeader number="08" title="Cursos" /></FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <CourseCard title="React" platform="Udemy" accentColor="#61DAFB" delay={0.1} />
            <CourseCard title="JavaScript y TypeScript" platform="Udemy" accentColor="#F7DF1E" delay={0.15} />
            <CourseCard title="Python" platform="Udemy" accentColor="#3776AB" delay={0.2} />
            <CourseCard title="Ciberseguridad" platform="Udemy" accentColor="#EF4444" delay={0.25} />
            <CourseCard title="VMware & Virtualización" platform="Udemy" accentColor="#607078" delay={0.3} />
          </div>
        </section>

        {/* ── 09 CONTACTO ── */}
        <section id="contacto" className="pb-10">
          <FadeIn><SectionHeader number="09" title="Contacto" /></FadeIn>

          <FadeIn delay={0.1}>
            <div className="border border-white/8 rounded-3xl p-10 md:p-16 text-center hex-bg overflow-hidden relative"
              style={{ background: 'rgba(255,255,255,0.015)' }}>
              {/* Glow blob */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(91,79,233,0.08) 0%, transparent 70%)' }} />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-white/50 text-lg max-w-md mx-auto mb-10 leading-relaxed"
              >
                Abierto a nuevas oportunidades, proyectos y colaboraciones. Escribime sin dudas.
              </motion.p>

              <div className="flex flex-wrap justify-center gap-4">
                <motion.a
                  href="mailto:araminger12@gmail.com"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(91,79,233,0.5)' }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 bg-violet-600 hover:bg-violet-500 text-white font-bold px-8 py-4 rounded-full transition-colors text-sm"
                  style={{ boxShadow: '0 0 25px rgba(91,79,233,0.35)' }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  araminger12@gmail.com
                </motion.a>
                <motion.a
                  href="https://wa.me/541139337326"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 border border-white/15 hover:border-green-500/50 hover:text-green-400 text-white/70 font-mono px-8 py-4 rounded-full transition-all text-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </motion.a>
                <motion.a
                  href="https://github.com/Ryn135"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 border border-white/15 hover:border-white/40 text-white/70 hover:text-white font-mono px-8 py-4 rounded-full transition-all text-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </motion.a>
              </div>
            </div>
          </FadeIn>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 text-center">
        <p className="text-white/15 text-xs font-mono tracking-widest">
          AGUSTÍN RAMINGER · 2025 · LOS POLVORINES, BUENOS AIRES
        </p>
      </footer>
    </div>
  )
}

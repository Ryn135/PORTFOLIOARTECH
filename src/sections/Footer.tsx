export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative px-8 md:px-12 lg:px-20 py-12 border-t border-white/8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          <span className="text-white font-black text-lg tracking-tightest">
            ARTECH<span className="text-violet-500">+</span>
          </span>
          <span className="text-white/20 text-xs">© {year} ARTECH Studio. Todos los derechos reservados.</span>
        </div>

        <div className="flex items-center gap-8">
          {['Twitter', 'Instagram', 'LinkedIn', 'Behance'].map((s) => (
            <a
              key={s}
              href="#"
              className="text-white/25 hover:text-white text-xs tracking-widest uppercase transition-colors"
            >
              {s}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6 text-xs text-white/20">
          <a href="#" className="hover:text-white/40 transition-colors">Términos</a>
          <a href="#" className="hover:text-white/40 transition-colors">Privacidad</a>
        </div>
      </div>
    </footer>
  )
}

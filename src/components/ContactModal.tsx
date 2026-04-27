import { useState } from 'react'

interface Props {
  open: boolean
  onClose: () => void
}

export function ContactModal({ open, onClose }: Props) {
  const [fields, setFields] = useState({ name: '', email: '', service: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  if (!open) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://formsubmit.co/ajax/araminger12@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Nuevo proyecto — ${fields.name}`,
          nombre: fields.name,
          email: fields.email,
          servicio: fields.service,
          mensaje: fields.message,
        }),
      })
      if (res.ok) {
        setStatus('sent')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const set = (k: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFields(prev => ({ ...prev, [k]: e.target.value }))

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Card */}
      <div className="relative w-full max-w-lg bg-[#0D0D18] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-violet-900/30">

        {/* Top accent */}
        <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg, #5B4FE9, #8B7FF5, #5B4FE9)' }} />

        <div className="p-8 md:p-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <p className="text-violet-400 text-xs tracking-widest uppercase mb-2">Nuevo proyecto</p>
              <h2 className="text-white font-black text-2xl tracking-tightest">Hablemos</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white/30 hover:text-white transition-colors mt-1"
              aria-label="Cerrar"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {status === 'sent' ? (
            <div className="py-10 text-center">
              <div className="w-14 h-14 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13L9 17L19 7" stroke="#8B7FF5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">¡Mensaje enviado!</h3>
              <p className="text-white/40 text-sm">Te respondo a la brevedad. Gracias por escribirme.</p>
              <button
                onClick={onClose}
                className="mt-8 text-white/30 hover:text-white text-sm underline underline-offset-4 transition-colors"
              >
                Cerrar
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/40 text-xs tracking-widest uppercase mb-2">Nombre</label>
                  <input
                    required
                    value={fields.name}
                    onChange={set('name')}
                    placeholder="Juan García"
                    className="w-full bg-white/5 border border-white/10 focus:border-violet-500/60 outline-none rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white/40 text-xs tracking-widest uppercase mb-2">Email</label>
                  <input
                    required
                    type="email"
                    value={fields.email}
                    onChange={set('email')}
                    placeholder="juan@email.com"
                    className="w-full bg-white/5 border border-white/10 focus:border-violet-500/60 outline-none rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 transition-colors"
                  />
                </div>
              </div>

              {/* Service */}
              <div>
                <label className="block text-white/40 text-xs tracking-widest uppercase mb-2">¿Qué necesitás?</label>
                <select
                  value={fields.service}
                  onChange={set('service')}
                  className="w-full bg-white/5 border border-white/10 focus:border-violet-500/60 outline-none rounded-xl px-4 py-3 text-white text-sm transition-colors appearance-none"
                  style={{ colorScheme: 'dark' }}
                >
                  <option value="">Seleccioná un servicio...</option>
                  <option value="Landing page">Landing page</option>
                  <option value="Software a medida">Software a medida</option>
                  <option value="Diseño de marca">Diseño de marca</option>
                  <option value="Consultoría">Consultoría</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-white/40 text-xs tracking-widest uppercase mb-2">Contame tu proyecto</label>
                <textarea
                  required
                  value={fields.message}
                  onChange={set('message')}
                  rows={4}
                  placeholder="Breve descripción de lo que querés construir..."
                  className="w-full bg-white/5 border border-white/10 focus:border-violet-500/60 outline-none rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 transition-colors resize-none"
                />
              </div>

              {status === 'error' && (
                <p className="text-red-400/70 text-xs">Algo salió mal. Intentá de nuevo o escribime directo.</p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-bold py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-violet-600/30 text-sm"
              >
                {status === 'sending' ? 'Enviando...' : 'Enviar mensaje →'}
              </button>

              <p className="text-white/20 text-xs text-center">
                También podés escribirme por{' '}
                <a
                  href="https://wa.me/5491139337326"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400/70 hover:text-green-400 transition-colors"
                >
                  WhatsApp
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

import React from 'react'

interface State { hasError: boolean; message: string }

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  state: State = { hasError: false, message: '' }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-8">
          <div className="max-w-md text-center">
            <p className="text-violet-400 text-xs tracking-widest uppercase mb-4">Error</p>
            <h1 className="text-2xl font-black mb-3">Algo salió mal</h1>
            <p className="text-white/40 text-sm font-mono">{this.state.message}</p>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

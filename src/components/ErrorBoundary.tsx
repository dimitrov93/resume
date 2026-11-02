import { Component, type ErrorInfo, type ReactNode } from 'react'

// Last-resort fallback: a runtime error shows a message and a reload button instead of a blank page.
// Kept free of context/hooks so it still renders when a provider is what failed.
export default class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled UI error', error, info.componentStack)
  }

  render() {
    if (!this.state.failed) return this.props.children
    const bg = document.documentElement.lang === 'bg'
    return (
      <div role="alert" className="min-h-screen flex flex-col items-center justify-center gap-4 bg-bg text-paragraph p-5 text-center">
        <h1 className="text-xl font-semibold text-heading">
          {bg ? 'Нещо се обърка' : 'Something went wrong'}
        </h1>
        <p className="text-sm text-muted">
          {bg ? 'Моля, презаредете страницата.' : 'Please reload the page.'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="cursor-pointer px-6 py-2.5 rounded-xl border-none bg-linear-to-br from-accent to-accent-2 text-accent-text text-sm font-semibold"
        >
          {bg ? 'Презареди' : 'Reload'}
        </button>
      </div>
    )
  }
}

import { ArrowRight, FileText } from 'lucide-react'
import { KoraMark } from './Logo'

export function ChatPanel({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex w-[300px] flex-col overflow-hidden rounded-2xl border border-kora-border bg-white shadow-panel ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-kora-border px-4 py-3">
        <div className="flex items-center gap-2">
          <KoraMark className="h-5 w-5 text-kora-accent" />
          <span className="text-sm font-semibold text-kora-text">Kora Assistant</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-xs text-kora-muted">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-3 bg-[#FAFAF8] px-4 py-4">
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-2xl rounded-br-md bg-kora-chip px-4 py-2.5 text-sm font-medium text-kora-text">
            Can I return my order?
          </div>
        </div>

        <div className="flex justify-start">
          <div className="max-w-[95%] rounded-2xl rounded-bl-md border border-kora-border bg-white px-4 py-3 text-sm leading-relaxed text-kora-text shadow-sm">
            Yes. You have 30 days from the delivery date to request a return. Items
            must be in their original condition and packaging.
            <div className="mt-3">
              <button
                type="button"
                className="group inline-flex items-center gap-1.5 rounded-full border border-kora-border bg-kora-bg px-3 py-1.5 text-xs font-medium text-kora-text transition-colors hover:border-kora-accent hover:text-kora-accent"
              >
                <FileText className="h-3.5 w-3.5 text-kora-muted group-hover:text-kora-accent" />
                Source · Return Policy
                <ArrowRight className="h-3 w-3 text-kora-muted transition-transform group-hover:translate-x-0.5 group-hover:text-kora-accent" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-kora-border p-3">
        <div className="flex items-center gap-2 rounded-full border border-kora-border bg-white px-4 py-2.5 transition-shadow focus-within:border-kora-accent focus-within:shadow-sm">
          <input
            type="text"
            placeholder="Ask anything..."
            className="flex-1 bg-transparent text-sm text-kora-text placeholder:text-kora-muted focus:outline-none"
          />
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-full text-kora-muted transition-colors hover:bg-kora-chip hover:text-kora-accent"
            aria-label="Send"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

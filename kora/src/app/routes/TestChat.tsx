import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Send, BookOpen, Palette, Loader2 } from 'lucide-react'
import { useAppState, type Message } from '../state'

const answers: Record<string, { text: string; source: string }> = {
  'Can I return my order?': {
    text: 'Yes. You have 30 days from the delivery date to request a return. Items must be in their original condition and packaging.',
    source: 'Return Policy',
  },
  'How long does shipping take?': {
    text: 'Standard shipping takes 5–7 business days. Express shipping is 2–3 business days.',
    source: 'Shipping Info',
  },
  'Do you ship internationally?': {
    text: 'Yes, we ship internationally. Delivery times vary by country and customs processing.',
    source: 'Shipping Info',
  },
  'Can I change my order?': {
    text: 'You can change your order within 2 hours of placing it. After that, we begin processing and changes may not be possible.',
    source: 'FAQ',
  },
  'Where can I track my order?': {
    text: 'You can track your order in your account dashboard or through the shipping confirmation email.',
    source: 'FAQ',
  },
}

const allSuggestions = [
  'How long does shipping take?',
  'Do you ship internationally?',
  'Can I change my order?',
  'Where can I track my order?',
]

function findBestAnswer(text: string) {
  const lower = text.toLowerCase()
  for (const key of Object.keys(answers)) {
    if (lower.includes(key.toLowerCase().replace(/\?/g, ''))) return answers[key]
  }
  return {
    text: "I don't have a specific answer for that yet. Try asking about returns, shipping, or order changes.",
    source: 'Knowledge base',
  }
}

export function TestChat() {
  const { assistant, sources, messages, addMessage } = useAppState()
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const readyCount = sources.filter((s) => s.status === 'Ready').length
  const chunksIndexed = readyCount > 0 ? readyCount * 60 + 2 : 0

  const asked = new Set(messages.filter((m) => m.role === 'user').map((m) => m.text))
  const suggestions = allSuggestions.filter((s) => !asked.has(s)).slice(0, 3)

  const send = (text: string) => {
    if (!text.trim() || thinking) return
    addMessage({ role: 'user', text: text.trim() })
    setInput('')
    setThinking(true)
    setTimeout(() => {
      const answer = findBestAnswer(text.trim())
      addMessage({ role: 'assistant', text: answer.text, source: answer.source })
      setThinking(false)
    }, 600)
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, thinking])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send(input)
    }
  }

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`
  }, [input])

  return (
    <div className="flex h-[calc(100svh-4rem)] flex-col lg:h-svh lg:flex-row">
      {/* Chat area */}
      <div className="flex flex-1 flex-col bg-white">
        <div className="border-b border-kora-border px-6 py-3">
          <h1 className="text-lg font-semibold tracking-tight text-kora-text">Test your assistant</h1>
          <p className="text-sm text-kora-muted">Ask questions the way your customers would.</p>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pt-3 pb-5 sm:px-6">
          <div className="mx-auto max-w-2xl space-y-4">
            {messages.map((msg, i) => (
              <MessageBubble key={i} message={msg} />
            ))}

            {thinking && (
              <div className="flex items-center gap-2 text-sm text-kora-muted">
                <Loader2 className="h-4 w-4 animate-spin" />
                Kora is thinking…
              </div>
            )}

            {!thinking && (
              <div className="flex flex-wrap gap-2 pt-1">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="rounded-full border border-kora-border bg-kora-bg px-4 py-2 text-sm font-medium text-kora-text transition-colors hover:border-kora-accent hover:text-kora-accent"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>

        <div className="border-t border-kora-border bg-kora-bg px-4 py-3 sm:px-6">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
            className="mx-auto flex max-w-2xl items-end gap-3 rounded-2xl border border-kora-border bg-white px-4 py-2.5 shadow-sm focus-within:border-kora-accent focus-within:ring-2 focus-within:ring-kora-accent/10"
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              placeholder="Ask anything..."
              className="max-h-[120px] min-h-[40px] flex-1 resize-none bg-transparent px-2 py-2 text-sm text-kora-text placeholder:text-kora-muted focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || thinking}
              className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-kora-accent text-white transition-colors hover:bg-kora-accent-hover disabled:opacity-50"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          <p className="mx-auto mt-1.5 max-w-2xl text-center text-xs text-kora-muted">
            Press Enter to send, Shift + Enter for a new line
          </p>
        </div>
      </div>

      {/* Settings panel */}
      <aside className="hidden w-80 overflow-y-auto border-l border-kora-border bg-[#FAFAF8] p-5 lg:block">
        <h2 className="text-base font-semibold text-kora-text">Assistant settings</h2>
        <div className="mt-5 space-y-5">
          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-kora-muted">Name</label>
            <p className="mt-1 text-sm font-medium text-kora-text">{assistant.name}</p>
          </div>
          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-kora-muted">Tone</label>
            <p className="mt-1 text-sm font-medium text-kora-text">{assistant.tone}</p>
          </div>
          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-kora-muted">Knowledge status</label>
            <div className="mt-1 flex items-center gap-2 text-sm font-medium text-emerald-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {readyCount} source{readyCount === 1 ? '' : 's'} ready
            </div>
            <p className="mt-1 text-xs text-kora-muted">{chunksIndexed} chunks indexed</p>
          </div>
          <div className="flex flex-col gap-2">
            <Link
              to="/app/knowledge"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-kora-border bg-white px-4 py-2 text-sm font-semibold text-kora-text transition-colors hover:border-kora-accent hover:text-kora-accent"
            >
              <BookOpen className="h-4 w-4" />
              Edit knowledge
            </Link>
            <Link
              to="/app/widget"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-kora-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-kora-accent-hover"
            >
              <Palette className="h-4 w-4" />
              Open widget builder
            </Link>
          </div>
        </div>
      </aside>
    </div>
  )
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] ${isUser ? 'rounded-2xl rounded-br-md bg-kora-chip px-4 py-2.5' : 'rounded-2xl rounded-bl-md border border-kora-border bg-white px-4 py-3 shadow-sm'}`}>
        <p className={`text-sm leading-relaxed ${isUser ? 'font-medium text-kora-text' : 'text-kora-text'}`}>
          {message.text}
        </p>
        {!isUser && message.source && (
          <button
            type="button"
            className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-kora-border bg-white px-3 py-1.5 text-xs font-medium text-kora-text transition-colors hover:border-kora-accent hover:text-kora-accent"
          >
            <BookOpen className="h-3.5 w-3.5 text-kora-muted" />
            Source · {message.source}
          </button>
        )}
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Copy,
  Check,
  Lock,
  MessageCircle,
  X,
  Send,
  ShoppingBag,
  Search,
  Menu,
  HelpCircle,
  Package,
  Truck,
  ChevronDown,
} from 'lucide-react'
import { useAppState, type WidgetColor, type WidgetPosition, type LauncherStyle, type Message } from '../state'
import { PageHeader } from '../components/PageHeader'
import { Modal } from '../components/Modal'
import { KoraMark } from '../../components/Logo'

const colorMap: Record<WidgetColor, string> = {
  coral: '#FF5C35',
  slate: '#475569',
  teal: '#0D9488',
  indigo: '#6366F1',
}

const colorOptions: { value: WidgetColor; label: string }[] = [
  { value: 'coral', label: 'Coral' },
  { value: 'slate', label: 'Slate' },
  { value: 'teal', label: 'Teal' },
  { value: 'indigo', label: 'Indigo' },
]

const widgetSuggestions = [
  'Can I return my order?',
  'How long does shipping take?',
]

export function WidgetBuilder() {
  const { widget, setWidget, plan } = useAppState()
  const [tab, setTab] = useState<'appearance' | 'install'>('appearance')
  const [copied, setCopied] = useState(false)
  const [upgradeOpen, setUpgradeOpen] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(true)
  const [widgetMessages, setWidgetMessages] = useState<Message[]>([])
  const [widgetInput, setWidgetInput] = useState('')
  const [widgetThinking, setWidgetThinking] = useState(false)

  const accent = colorMap[widget.accentColor]
  const isGated = plan !== 'Growth' && plan !== 'Scale'

  const snippet = `<script
  src="https://widget.kora.ai/embed.js"
  data-assistant="acme-support"
  data-position="${widget.position}"
></script>`

  const copy = async () => {
    await navigator.clipboard.writeText(snippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const sendWidgetMessage = (text: string) => {
    if (!text.trim() || widgetThinking) return
    setWidgetMessages((prev) => [...prev, { role: 'user', text: text.trim() }])
    setWidgetInput('')
    setWidgetThinking(true)
    setTimeout(() => {
      const lower = text.toLowerCase()
      let answer = "I don't have a specific answer for that yet. Try asking about returns or shipping."
      if (lower.includes('return')) answer = 'Yes. You have 30 days from the delivery date to request a return. Items must be in their original condition and packaging.'
      else if (lower.includes('ship')) answer = 'Standard shipping takes 5–7 business days. Express shipping is 2–3 business days.'
      setWidgetMessages((prev) => [...prev, { role: 'assistant', text: answer, source: 'Knowledge base' }])
      setWidgetThinking(false)
    }, 600)
  }

  useEffect(() => {
    if (!isGated && widget.showBranding) return
    if (isGated) setWidget({ showBranding: true })
  }, [isGated, setWidget, widget.showBranding])

  return (
    <div className="flex h-[calc(100svh-4rem)] flex-col lg:h-svh lg:flex-row">
      {/* Settings */}
      <aside className="w-full overflow-y-auto border-r border-kora-border bg-[#FAFAF8] p-5 lg:w-96">
        <PageHeader title="Widget" subtitle="Make Kora feel at home on your website." />

        <div className="mb-6 inline-flex rounded-full border border-kora-border bg-white p-1">
          <button
            type="button"
            onClick={() => setTab('appearance')}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              tab === 'appearance' ? 'bg-kora-chip text-kora-accent' : 'text-kora-muted hover:text-kora-text'
            }`}
          >
            Appearance
          </button>
          <button
            type="button"
            onClick={() => setTab('install')}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              tab === 'install' ? 'bg-kora-chip text-kora-accent' : 'text-kora-muted hover:text-kora-text'
            }`}
          >
            Install
          </button>
        </div>

        {tab === 'appearance' ? (
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-kora-text">Widget position</label>
              <div className="grid grid-cols-2 gap-3">
                <PositionOption
                  value="bottom-right"
                  label="Bottom right"
                  current={widget.position}
                  onChange={(v) => setWidget({ position: v })}
                />
                <PositionOption
                  value="bottom-left"
                  label="Bottom left"
                  current={widget.position}
                  onChange={(v) => setWidget({ position: v })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="widget-name" className="mb-1.5 block text-sm font-medium text-kora-text">
                Assistant name
              </label>
              <input
                id="widget-name"
                type="text"
                value={widget.assistantName}
                onChange={(e) => setWidget({ assistantName: e.target.value })}
                className="w-full rounded-xl border border-kora-border bg-white px-4 py-2.5 text-sm text-kora-text focus:border-kora-accent focus:outline-none focus:ring-2 focus:ring-kora-accent/10"
              />
            </div>

            <div>
              <label htmlFor="widget-welcome" className="mb-1.5 block text-sm font-medium text-kora-text">
                Welcome message
              </label>
              <textarea
                id="widget-welcome"
                rows={3}
                value={widget.welcomeMessage}
                onChange={(e) => setWidget({ welcomeMessage: e.target.value })}
                className="w-full resize-none rounded-xl border border-kora-border bg-white px-4 py-2.5 text-sm text-kora-text focus:border-kora-accent focus:outline-none focus:ring-2 focus:ring-kora-accent/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-kora-text">Accent color</label>
              <div className="flex flex-wrap gap-3">
                {colorOptions.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setWidget({ accentColor: c.value })}
                    className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                      widget.accentColor === c.value
                        ? 'border-kora-accent bg-kora-chip text-kora-accent'
                        : 'border-kora-border bg-white text-kora-text hover:border-kora-accent/40'
                    }`}
                  >
                    <span
                      className="h-4 w-4 rounded-full border border-black/10"
                      style={{ backgroundColor: colorMap[c.value] }}
                    />
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-kora-text">Launcher style</label>
              <div className="grid grid-cols-2 gap-3">
                <StyleOption
                  value="kora"
                  label="Kora mark"
                  current={widget.launcherStyle}
                  onChange={(v) => setWidget({ launcherStyle: v })}
                />
                <StyleOption
                  value="bubble"
                  label="Chat bubble"
                  current={widget.launcherStyle}
                  onChange={(v) => setWidget({ launcherStyle: v })}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => document.getElementById('widget-preview')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-kora-border bg-white py-2.5 text-sm font-semibold text-kora-text transition-colors hover:border-kora-accent hover:text-kora-accent md:hidden"
            >
              Preview widget
              <ChevronDown className="h-4 w-4" />
            </button>

            {isGated ? (
              <button
                type="button"
                onClick={() => setUpgradeOpen(true)}
                className="flex w-full items-center justify-between rounded-xl border border-kora-border bg-white p-4 text-left transition-colors hover:border-kora-accent/30"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-kora-bg text-kora-muted">
                    <Lock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-kora-text">Remove Kora branding</p>
                    <p className="text-xs text-kora-muted">Hide the “Powered by Kora” badge</p>
                  </div>
                </div>
                <span className="shrink-0 rounded-full bg-kora-bg px-2.5 py-1 text-xs font-semibold text-kora-muted">
                  Growth plan
                </span>
              </button>
            ) : (
              <div className="flex items-center justify-between rounded-xl border border-kora-border bg-white p-4">
                <div>
                  <p className="text-sm font-semibold text-kora-text">Remove Kora branding</p>
                  <p className="text-xs text-kora-muted">Hide the “Powered by Kora” badge</p>
                </div>
                <button
                  type="button"
                  onClick={() => setWidget({ showBranding: !widget.showBranding })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    widget.showBranding ? 'bg-kora-accent' : 'bg-kora-border'
                  }`}
                  aria-pressed={widget.showBranding}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      widget.showBranding ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-5">
            <p className="text-sm text-kora-muted">
              Paste this snippet before the closing <code className="rounded bg-kora-bg px-1 py-0.5 text-kora-text">&lt;/body&gt;</code> tag on your website.
            </p>
            <div className="relative overflow-hidden rounded-xl border border-kora-border bg-[#1A1A1A] p-4">
              <pre className="overflow-x-auto text-xs leading-relaxed text-white">
                <code>{snippet}</code>
              </pre>
            </div>
            <button
              type="button"
              onClick={copy}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-kora-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-kora-accent-hover"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied!' : 'Copy code'}
            </button>
            <p className="text-xs text-kora-muted">
              Works with any website, including Shopify, Webflow, and WordPress.
            </p>
          </div>
        )}
      </aside>

      {/* Preview */}
      <section id="widget-preview" className="relative isolate flex-1 overflow-hidden bg-kora-bg">
        <div className="absolute inset-0 flex flex-col">
          {/* Sample website header */}
          <div className="flex h-14 items-center justify-between border-b border-kora-border bg-white px-6">
            <div className="flex items-center gap-2 text-kora-text">
              <ShoppingBag className="h-5 w-5" />
              <span className="font-semibold">Acme Store</span>
            </div>
            <div className="hidden items-center gap-5 text-sm text-kora-muted sm:flex">
              <span>Products</span>
              <span>Support</span>
              <span>Account</span>
            </div>
            <button type="button" className="sm:hidden" aria-label="Menu">
              <Menu className="h-5 w-5 text-kora-text" />
            </button>
          </div>

          {/* Sample content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mx-auto max-w-3xl space-y-5">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-kora-text">Support center</h2>
                <p className="mt-1 text-sm text-kora-muted">Find answers about orders, shipping, and returns.</p>
                <div className="mt-4 flex items-center gap-2 rounded-full border border-kora-border bg-kora-bg px-4 py-2 text-sm text-kora-muted">
                  <Search className="h-4 w-4" />
                  Search help articles…
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-white p-5 shadow-sm">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-kora-chip text-kora-accent">
                    <Package className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-kora-text">Orders</h3>
                  <p className="mt-1 text-xs text-kora-muted">Tracking, changes, and cancellations.</p>
                </div>
                <div className="rounded-xl bg-white p-5 shadow-sm">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-kora-chip text-kora-accent">
                    <Truck className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-kora-text">Shipping</h3>
                  <p className="mt-1 text-xs text-kora-muted">Delivery times and international rates.</p>
                </div>
                <div className="rounded-xl bg-white p-5 shadow-sm">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-kora-chip text-kora-accent">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-kora-text">Returns</h3>
                  <p className="mt-1 text-xs text-kora-muted">Policies, timelines, and refunds.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Widget preview */}
        {previewOpen && (
          <div
            className={`absolute bottom-24 z-10 flex w-80 max-w-[calc(100%-3rem)] flex-col overflow-hidden rounded-2xl border border-kora-border bg-white shadow-2xl ${
              widget.position === 'bottom-right' ? 'right-6' : 'left-6'
            }`}
            style={{ maxHeight: 'calc(100% - 6rem)' }}
          >
            <div
              className="flex shrink-0 items-center justify-between px-4 py-3"
              style={{ backgroundColor: accent }}
            >
              <div className="flex items-center gap-2.5">
                <KoraMark className="h-5 w-5 text-white" />
                <div>
                  <p className="text-sm font-semibold leading-none text-white">{widget.assistantName}</p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
                    <span className="text-[10px] font-medium text-white/90">Online</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPreviewOpen(false)}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full text-white/80 hover:bg-white/10"
                aria-label="Close widget"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto bg-[#FAFAF8] p-4">
              <div className="rounded-2xl rounded-tl-md border border-kora-border bg-white px-4 py-3 text-sm leading-relaxed text-kora-text shadow-sm">
                {widget.welcomeMessage}
              </div>
              {widgetMessages.map((msg, i) => (
                <div key={i} className={`mt-3 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'rounded-2xl rounded-br-md bg-kora-chip px-3.5 py-2 font-medium text-kora-text'
                        : 'rounded-2xl rounded-bl-md border border-kora-border bg-white px-3.5 py-2.5 text-kora-text shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {widgetThinking && (
                <div className="mt-3 flex items-center gap-2 text-xs text-kora-muted">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-kora-muted" />
                  Kora is thinking…
                </div>
              )}
            </div>
            <div className="flex shrink-0 flex-wrap gap-2 border-t border-kora-border bg-white px-4 py-2.5">
              {widgetSuggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => sendWidgetMessage(s)}
                  className="rounded-full border border-kora-border bg-kora-bg px-3 py-1 text-xs font-medium text-kora-text transition-colors hover:border-kora-accent hover:text-kora-accent"
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="shrink-0 border-t border-kora-border p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  sendWidgetMessage(widgetInput)
                }}
                className="flex items-center gap-2 rounded-full border border-kora-border bg-white px-3 py-2"
              >
                <input
                  type="text"
                  value={widgetInput}
                  onChange={(e) => setWidgetInput(e.target.value)}
                  placeholder="Ask anything..."
                  className="flex-1 bg-transparent text-sm text-kora-text placeholder:text-kora-muted focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!widgetInput.trim() || widgetThinking}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-kora-muted transition-colors hover:bg-kora-chip hover:text-kora-accent disabled:opacity-50"
                  aria-label="Send"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
            {widget.showBranding && (
              <div className="shrink-0 border-t border-kora-border bg-white px-3 py-1.5 text-center text-[10px] text-kora-muted">
                Powered by Kora
              </div>
            )}
          </div>
        )}

        {/* Launcher */}
        <button
          type="button"
          onClick={() => setPreviewOpen((s) => !s)}
          className={`absolute bottom-6 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 ${
            widget.position === 'bottom-right' ? 'right-6' : 'left-6'
          }`}
          style={{ backgroundColor: accent }}
          aria-label={previewOpen ? 'Close chat' : 'Open chat'}
        >
          {widget.launcherStyle === 'kora' ? (
            <KoraMark className="h-6 w-6 text-white" />
          ) : (
            <MessageCircle className="h-6 w-6 text-white" />
          )}
        </button>
      </section>

      <Modal open={upgradeOpen} onClose={() => setUpgradeOpen(false)} title="Remove Kora branding">
        <div className="space-y-4">
          <p className="text-sm text-kora-muted">
            Upgrade to Growth to use a fully branded widget.
          </p>
          <div className="flex flex-col gap-2">
            <Link
              to="/app/billing"
              onClick={() => setUpgradeOpen(false)}
              className="inline-flex items-center justify-center rounded-full bg-kora-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-kora-accent-hover"
            >
              View plans
            </Link>
            <button
              type="button"
              onClick={() => setUpgradeOpen(false)}
              className="inline-flex items-center justify-center rounded-full border border-kora-border bg-white px-5 py-2.5 text-sm font-semibold text-kora-text transition-colors hover:bg-kora-bg"
            >
              Not now
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

function PositionOption({
  value,
  label,
  current,
  onChange,
}: {
  value: WidgetPosition
  label: string
  current: WidgetPosition
  onChange: (v: WidgetPosition) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
        current === value
          ? 'border-kora-accent bg-kora-chip text-kora-accent'
          : 'border-kora-border bg-white text-kora-text hover:border-kora-accent/40'
      }`}
    >
      {label}
    </button>
  )
}

function StyleOption({
  value,
  label,
  current,
  onChange,
}: {
  value: LauncherStyle
  label: string
  current: LauncherStyle
  onChange: (v: LauncherStyle) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
        current === value
          ? 'border-kora-accent bg-kora-chip text-kora-accent'
          : 'border-kora-border bg-white text-kora-text hover:border-kora-accent/40'
      }`}
    >
      {label}
    </button>
  )
}

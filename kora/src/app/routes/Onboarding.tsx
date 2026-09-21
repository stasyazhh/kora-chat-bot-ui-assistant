import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { useAppState, type Tone } from '../state'
import { PageHeader } from '../components/PageHeader'

const tones: { value: Tone; label: Tone; description: string }[] = [
  { value: 'Helpful', label: 'Helpful', description: 'Clear, supportive answers that guide customers.' },
  { value: 'Professional', label: 'Professional', description: 'Polished and concise for formal brands.' },
  { value: 'Friendly', label: 'Friendly', description: 'Warm and conversational, like a teammate.' },
]

export function Onboarding() {
  const navigate = useNavigate()
  const { assistant, setAssistant } = useAppState()
  const [name, setName] = useState(assistant.name)
  const [description, setDescription] = useState(assistant.description)
  const [tone, setTone] = useState<Tone>(assistant.tone)

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    setAssistant({ name, description, tone })
    navigate('/app/knowledge')
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-10 lg:py-16">
      <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-kora-muted">
        Create your assistant
      </p>
      <PageHeader title="Let’s give your knowledge a voice." />

      <form onSubmit={handleCreate} className="space-y-6">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-kora-text">
            Assistant name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-kora-border bg-white px-4 py-3 text-sm text-kora-text placeholder:text-kora-muted focus:border-kora-accent focus:outline-none focus:ring-2 focus:ring-kora-accent/10"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-kora-text">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full resize-none rounded-xl border border-kora-border bg-white px-4 py-3 text-sm text-kora-text placeholder:text-kora-muted focus:border-kora-accent focus:outline-none focus:ring-2 focus:ring-kora-accent/10"
          />
        </div>

        <div>
          <span className="mb-3 block text-sm font-medium text-kora-text">Tone</span>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {tones.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setTone(t.value)}
                className={`relative flex flex-col items-start rounded-xl border p-4 text-left transition-all ${
                  tone === t.value
                    ? 'border-kora-accent bg-kora-chip/60'
                    : 'border-kora-border bg-white hover:border-kora-accent/40'
                }`}
              >
                {tone === t.value && (
                  <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-kora-accent text-white">
                    <Check className="h-3 w-3" />
                  </span>
                )}
                <span className="text-sm font-semibold text-kora-text">{t.label}</span>
                <span className="mt-1 text-xs leading-relaxed text-kora-muted">{t.description}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-kora-accent px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-kora-accent-hover hover:shadow-md sm:w-auto"
        >
          Create assistant
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
        </button>

        <p className="text-sm text-kora-muted">You can change these details anytime.</p>
      </form>
    </div>
  )
}

import { useState } from 'react'
import { Check, Sparkles, Building2, Zap } from 'lucide-react'
import { useAppState, type Plan } from '../state'
import { PageHeader } from '../components/PageHeader'

const plans: { value: Plan; name: string; price: string; description: string; features: string[]; recommended?: boolean }[] = [
  {
    value: 'Starter',
    name: 'Starter',
    price: '$29',
    description: 'Perfect for trying Kora with one assistant.',
    features: ['1 assistant', '500 messages / month', '3 knowledge sources', 'Kora branding included'],
  },
  {
    value: 'Growth',
    name: 'Growth',
    price: '$79',
    description: 'For growing teams that need a branded experience.',
    features: ['3 assistants', '5,000 messages / month', 'Unlimited knowledge sources', 'Custom widget colors', 'Remove Kora branding'],
    recommended: true,
  },
  {
    value: 'Scale',
    name: 'Scale',
    price: '$199',
    description: 'For organizations with advanced needs.',
    features: ['Unlimited assistants', '25,000 messages / month', 'Team members', 'Advanced analytics', 'Priority support'],
  },
]

export function Billing() {
  const { plan, setPlan } = useAppState()
  const [toast, setToast] = useState<string | null>(null)

  const selectPlan = (value: Plan) => {
    setPlan(value)
    setToast(`You’re now on the ${value} plan.`)
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-8 lg:py-10">
      <PageHeader
        title="Choose a plan that grows with you."
        subtitle="Upgrade anytime as your assistant usage grows."
      />

      <div className="mb-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-kora-border bg-white p-5 shadow-sm sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-kora-muted">Current plan</p>
          <p className="text-lg font-semibold text-kora-text">{plan}</p>
        </div>
        <div className="w-full sm:w-auto sm:min-w-[260px]">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm">
            <span className="text-kora-text">124 / 500 messages used this month</span>
            <span className="shrink-0 text-kora-muted">25%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-kora-bg">
            <div className="h-full w-1/4 rounded-full bg-kora-accent" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((p) => {
          const isCurrent = plan === p.value
          return (
            <div
              key={p.value}
              className={`relative flex flex-col rounded-2xl border bg-white p-6 shadow-sm transition-all hover:shadow-md ${
                p.recommended ? 'border-kora-accent' : 'border-kora-border'
              }`}
            >
              {p.recommended && (
                <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-kora-accent px-3 py-1 text-xs font-semibold text-white">
                  <Sparkles className="h-3 w-3" />
                  Recommended
                </span>
              )}
              <div className="mb-4 flex items-center gap-2 text-kora-text">
                {p.value === 'Starter' && <Zap className="h-5 w-5 text-kora-muted" />}
                {p.value === 'Growth' && <Sparkles className="h-5 w-5 text-kora-accent" />}
                {p.value === 'Scale' && <Building2 className="h-5 w-5 text-kora-muted" />}
                <h3 className="text-lg font-semibold">{p.name}</h3>
              </div>
              <div className="mb-1 flex items-baseline gap-1">
                <span className="text-3xl font-semibold text-kora-text">{p.price}</span>
                <span className="text-sm text-kora-muted">/ month</span>
              </div>
              <p className="mb-5 text-sm text-kora-muted">{p.description}</p>
              <ul className="mb-6 flex-1 space-y-3">
                {p.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-kora-text">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => selectPlan(p.value)}
                disabled={isCurrent}
                className={`w-full rounded-full py-2.5 text-sm font-semibold transition-colors ${
                  isCurrent
                    ? 'cursor-default border border-kora-border bg-kora-bg text-kora-muted'
                    : p.recommended
                      ? 'bg-kora-accent text-white hover:bg-kora-accent-hover'
                      : 'border border-kora-border bg-white text-kora-text hover:border-kora-accent hover:text-kora-accent'
                }`}
              >
                {isCurrent
                  ? 'Current plan'
                  : p.value === 'Scale'
                    ? 'Talk to sales'
                    : `Upgrade to ${p.name}`}
              </button>
            </div>
          )
        })}
      </div>

      {toast && (
        <div className="fixed top-6 right-6 z-50 rounded-full border border-kora-border bg-white px-5 py-3 text-sm font-medium text-kora-text shadow-lg transition-opacity">
          {toast}
        </div>
      )}
    </div>
  )
}

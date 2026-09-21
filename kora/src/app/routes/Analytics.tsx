import { PageHeader } from '../components/PageHeader'

export function Analytics() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10 text-center">
      <PageHeader title="Analytics" subtitle="Detailed analytics are coming soon." />
      <div className="mt-8 rounded-2xl border border-kora-border bg-white p-12 shadow-sm">
        <p className="text-kora-muted">Track message volume, popular questions, and resolution rates.</p>
      </div>
    </div>
  )
}

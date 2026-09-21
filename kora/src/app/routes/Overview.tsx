import { PageHeader } from '../components/PageHeader'

export function Overview() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10 text-center">
      <PageHeader title="Overview" subtitle="A high-level dashboard is coming soon." />
      <div className="mt-8 rounded-2xl border border-kora-border bg-white p-12 shadow-sm">
        <p className="text-kora-muted">Check back for insights about conversations, sources, and widget usage.</p>
      </div>
    </div>
  )
}

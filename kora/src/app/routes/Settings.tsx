import { PageHeader } from '../components/PageHeader'

export function Settings() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10 text-center">
      <PageHeader title="Settings" subtitle="Account and assistant settings are coming soon." />
      <div className="mt-8 rounded-2xl border border-kora-border bg-white p-12 shadow-sm">
        <p className="text-kora-muted">Manage team members, integrations, and notifications here.</p>
      </div>
    </div>
  )
}

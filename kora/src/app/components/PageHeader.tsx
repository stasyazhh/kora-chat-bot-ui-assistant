export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-semibold tracking-tight text-kora-text sm:text-3xl">{title}</h1>
      {subtitle && <p className="mt-1 text-kora-muted">{subtitle}</p>}
    </div>
  )
}

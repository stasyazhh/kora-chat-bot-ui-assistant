import type { ReactNode } from 'react'

interface KnowledgeCardProps {
  icon: ReactNode
  title: string
  subtitle: string
  rotation?: string
  className?: string
}

export function KnowledgeCard({
  icon,
  title,
  subtitle,
  rotation = 'rotate-0',
  className = '',
}: KnowledgeCardProps) {
  return (
    <div
      className={`group flex w-48 flex-col gap-3 rounded-2xl border border-kora-border bg-white p-4 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover ${rotation} ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold leading-tight text-kora-text">
            {title}
          </h3>
          <p className="text-[11px] leading-tight text-kora-muted">{subtitle}</p>
        </div>
      </div>
      <div className="flex flex-col gap-1.5 pt-1">
        <div className="h-1.5 w-full rounded-full bg-kora-bg" />
        <div className="h-1.5 w-[85%] rounded-full bg-kora-bg" />
        <div className="h-1.5 w-[60%] rounded-full bg-kora-bg" />
      </div>
    </div>
  )
}

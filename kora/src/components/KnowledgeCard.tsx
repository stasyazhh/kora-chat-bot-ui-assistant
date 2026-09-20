import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { HeroStage } from '../hooks/useHeroAnimation'

interface KnowledgeCardProps {
  icon: ReactNode
  title: string
  subtitle: string
  fragments: string[]
  rotation?: string
  className?: string
  stage?: HeroStage
  index?: number
}

export function KnowledgeCard({
  icon,
  title,
  subtitle,
  fragments,
  rotation = 'rotate-0',
  className = '',
  stage = 'complete',
  index = 0,
}: KnowledgeCardProps) {
  const visible = stage !== 'idle'
  const instant = stage === 'complete'

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={
        visible
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 14, scale: 0.98 }
      }
      transition={{
        duration: instant ? 0 : 0.55,
        ease: [0.25, 0.1, 0.25, 1],
        delay: instant ? 0 : index * 0.1,
      }}
      className={`group flex w-full flex-col gap-3 rounded-2xl border border-kora-border bg-white p-4 shadow-[0_2px_14px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] sm:w-48 ${rotation} ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold leading-tight text-kora-text">
            {title}
          </h3>
          <p className="text-[11px] leading-tight text-kora-muted">{subtitle}</p>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        {fragments.map((fragment) => (
          <p
            key={fragment}
            className="truncate text-[11px] leading-snug text-kora-muted/80 transition-colors group-hover:text-kora-muted"
          >
            {fragment}
          </p>
        ))}
      </div>
    </motion.div>
  )
}

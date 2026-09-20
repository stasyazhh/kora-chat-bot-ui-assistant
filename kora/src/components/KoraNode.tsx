import { KoraMark } from './Logo'

export function KoraNode({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-center justify-center ${className}`}
    >
      <KoraMark className="h-8 w-8 text-kora-accent" />
      <span className="mt-1 text-xs font-semibold tracking-tight text-kora-accent">
        Kora
      </span>

      {/* Subtle surrounding node dots */}
      <span className="absolute -left-3 -top-1 h-1.5 w-1.5 rounded-full bg-kora-accent/25" />
      <span className="absolute -right-2 -top-2 h-1 w-1 rounded-full bg-kora-accent/20" />
      <span className="absolute -bottom-2 -left-2 h-1 w-1 rounded-full bg-kora-accent/20" />
      <span className="absolute -bottom-1 -right-3 h-1.5 w-1.5 rounded-full bg-kora-accent/15" />
    </div>
  )
}

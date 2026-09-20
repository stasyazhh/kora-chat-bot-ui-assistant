import type { SVGProps } from 'react'

export function KoraMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7 4V28M7 12L25 4M7 12L25 28"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <a
      href="#"
      className={`flex items-center gap-2 text-kora-text hover:opacity-80 transition-opacity ${className}`}
    >
      <KoraMark className="h-7 w-7 text-kora-accent" />
      <span className="text-xl font-semibold tracking-tight">Kora</span>
    </a>
  )
}

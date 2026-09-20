export function Connectors() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="connector" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C8C6BE" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#C8C6BE" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* FAQ → Kora */}
      <path
        d="M 18 26 Q 30 34 44 48"
        fill="none"
        stroke="url(#connector)"
        strokeWidth="1"
        strokeDasharray="3 3"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />

      {/* Product Guide → Kora */}
      <path
        d="M 66 20 Q 56 34 48 44"
        fill="none"
        stroke="url(#connector)"
        strokeWidth="1"
        strokeDasharray="3 3"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />

      {/* Return Policy → Kora */}
      <path
        d="M 16 58 Q 30 58 40 54"
        fill="none"
        stroke="url(#connector)"
        strokeWidth="1"
        strokeDasharray="3 3"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />

      {/* Pricing → Kora */}
      <path
        d="M 64 82 Q 56 68 50 56"
        fill="none"
        stroke="url(#connector)"
        strokeWidth="1"
        strokeDasharray="3 3"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />

      {/* Kora → Chat panel */}
      <path
        d="M 52 50 Q 56 50 60 50"
        fill="none"
        stroke="url(#connector)"
        strokeWidth="1"
        strokeDasharray="3 3"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

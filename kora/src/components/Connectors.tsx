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
          <stop offset="0%" stopColor="#D7D5CE" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#D7D5CE" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* FAQ */}
      <path
        d="M 18 26 Q 30 30 44 46"
        fill="none"
        stroke="url(#connector)"
        strokeWidth="0.4"
        strokeDasharray="1.5 1.5"
        vectorEffect="non-scaling-stroke"
      />
      {/* Product Guide */}
      <path
        d="M 66 18 Q 56 32 48 44"
        fill="none"
        stroke="url(#connector)"
        strokeWidth="0.4"
        strokeDasharray="1.5 1.5"
        vectorEffect="non-scaling-stroke"
      />
      {/* Return Policy */}
      <path
        d="M 16 58 Q 30 56 40 52"
        fill="none"
        stroke="url(#connector)"
        strokeWidth="0.4"
        strokeDasharray="1.5 1.5"
        vectorEffect="non-scaling-stroke"
      />
      {/* Pricing */}
      <path
        d="M 66 80 Q 56 66 48 56"
        fill="none"
        stroke="url(#connector)"
        strokeWidth="0.4"
        strokeDasharray="1.5 1.5"
        vectorEffect="non-scaling-stroke"
      />
      {/* Center to chat panel */}
      <path
        d="M 52 50 Q 66 50 80 50"
        fill="none"
        stroke="url(#connector)"
        strokeWidth="0.4"
        strokeDasharray="1.5 1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

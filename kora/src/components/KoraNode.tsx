import { motion } from 'framer-motion'
import { KoraMark } from './Logo'
import type { HeroStage } from '../hooks/useHeroAnimation'

const stageOrder: HeroStage[] = [
  'idle',
  'cardsVisible',
  'connectorsVisible',
  'signalsMoving',
  'koraActivated',
  'chatConnected',
  'questionVisible',
  'answerVisible',
  'sourceVisible',
  'complete',
]

function stageIndex(stage: HeroStage) {
  return stageOrder.indexOf(stage)
}

export function KoraNode({
  className = '',
  stage = 'complete',
}: {
  className?: string
  stage?: HeroStage
}) {
  const visible = stage !== 'idle'
  const instant = stage === 'complete'
  const activated = stageIndex(stage) >= stageIndex('koraActivated')

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: activated && !instant ? [1, 1.08, 1] : visible ? 1 : 0.92,
      }}
      transition={{
        opacity: { duration: instant ? 0 : 0.5 },
        scale: activated && !instant
          ? { duration: 0.35, ease: 'easeOut' }
          : { duration: instant ? 0 : 0.5 },
      }}
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
    </motion.div>
  )
}

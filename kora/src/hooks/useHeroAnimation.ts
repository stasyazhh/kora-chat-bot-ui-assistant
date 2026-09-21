import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

export type HeroStage =
  | 'idle'
  | 'cardsVisible'
  | 'connectorsVisible'
  | 'signalsMoving'
  | 'koraActivated'
  | 'chatConnected'
  | 'questionVisible'
  | 'answerVisible'
  | 'sourceVisible'
  | 'complete'

export const heroStageOrder: HeroStage[] = [
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

export function getStageIndex(stage: HeroStage): number {
  return heroStageOrder.indexOf(stage)
}

export function isStageAtLeast(stage: HeroStage, target: HeroStage): boolean {
  return getStageIndex(stage) >= getStageIndex(target)
}

const TIMELINE: { stage: HeroStage; delay: number }[] = [
  { stage: 'cardsVisible', delay: 350 },
  { stage: 'connectorsVisible', delay: 1150 },
  { stage: 'signalsMoving', delay: 1950 },
  { stage: 'koraActivated', delay: 2850 },
  { stage: 'chatConnected', delay: 3250 },
  { stage: 'questionVisible', delay: 3950 },
  { stage: 'answerVisible', delay: 4350 },
  { stage: 'sourceVisible', delay: 5900 },
  { stage: 'complete', delay: 6250 },
]

export function useHeroAnimation() {
  const reduced = useReducedMotion()
  const [stage, setStage] = useState<HeroStage>(reduced ? 'complete' : 'idle')

  useEffect(() => {
    if (reduced) {
      setStage('complete')
      return
    }

    const timers: number[] = []

    TIMELINE.forEach(({ stage: nextStage, delay }) => {
      timers.push(
        window.setTimeout(() => {
          setStage(nextStage)
        }, delay),
      )
    })

    return () => {
      timers.forEach((id) => clearTimeout(id))
    }
  }, [reduced])

  return stage
}

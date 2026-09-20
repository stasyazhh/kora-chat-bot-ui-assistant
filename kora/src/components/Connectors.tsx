import { motion } from 'framer-motion'
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

const cardPaths = [
  { id: 'path-faq', d: 'M 18 26 Q 30 34 44 48' },
  { id: 'path-guide', d: 'M 66 20 Q 56 34 48 44' },
  { id: 'path-return', d: 'M 16 58 Q 30 58 40 54' },
  { id: 'path-pricing', d: 'M 64 82 Q 56 68 50 56' },
]

export function Connectors({ stage = 'complete' }: { stage?: HeroStage }) {
  const connectorsVisible = stageIndex(stage) >= stageIndex('connectorsVisible')
  const signalsMoving = stageIndex(stage) >= stageIndex('signalsMoving')
  const chatConnected = stageIndex(stage) >= stageIndex('chatConnected')
  const instant = stage === 'complete'

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

      {cardPaths.map(({ id, d }, index) => (
        <g key={id}>
          <motion.path
            id={id}
            d={d}
            fill="none"
            stroke="url(#connector)"
            strokeWidth="1"
            strokeDasharray="3 3"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: connectorsVisible ? 1 : 0 }}
            transition={{
              duration: instant ? 0 : 0.7,
              ease: 'easeInOut',
              delay: instant ? 0 : index * 0.08,
            }}
          />
          {signalsMoving && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: instant ? 0 : [0, 1, 1, 0] }}
              transition={{
                duration: instant ? 0 : 1.2,
                times: [0, 0.08, 0.7, 1],
                ease: 'linear',
                delay: index * 0.06,
              }}
            >
              <circle r="1.2" fill="#FF5C35" fillOpacity="0.6">
                <animateMotion
                  dur="0.7s"
                  fill="freeze"
                  calcMode="linear"
                  keyPoints="0;1"
                  keyTimes="0;1"
                >
                  <mpath href={`#${id}`} />
                </animateMotion>
              </circle>
            </motion.g>
          )}
        </g>
      ))}

      {/* Kora → Chat panel */}
      <g>
        <motion.path
          id="path-chat"
          d="M 52 50 Q 56 50 60 50"
          fill="none"
          stroke="url(#connector)"
          strokeWidth="1"
          strokeDasharray="3 3"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: chatConnected ? 1 : 0 }}
          transition={{
            duration: instant ? 0 : 0.6,
            ease: 'easeInOut',
          }}
        />
        {chatConnected && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: instant ? 0 : [0, 1, 1, 0] }}
            transition={{
              duration: instant ? 0 : 1.1,
              times: [0, 0.1, 0.7, 1],
              ease: 'linear',
            }}
          >
            <circle r="1.2" fill="#FF5C35" fillOpacity="0.6">
              <animateMotion
                dur="0.6s"
                fill="freeze"
                calcMode="linear"
                keyPoints="0;1"
                keyTimes="0;1"
              >
                <mpath href="#path-chat" />
              </animateMotion>
            </circle>
          </motion.g>
        )}
      </g>
    </svg>
  )
}

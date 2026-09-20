import { ArrowRight, BookOpen, CircleDollarSign, FileText, ShieldCheck } from 'lucide-react'
import { ChatPanel } from './ChatPanel'
import { Connectors } from './Connectors'
import { KnowledgeCard } from './KnowledgeCard'
import { KoraMark } from './Logo'

const knowledgeCards = [
  {
    icon: <FileText className="h-5 w-5" style={{ color: '#4F8CFF' }} />,
    iconBg: 'rgba(79, 140, 255, 0.12)',
    title: 'FAQ',
    subtitle: '128 questions',
    rotation: '-rotate-3',
    position: 'left-[6%] top-[18%]',
  },
  {
    icon: <BookOpen className="h-5 w-5" style={{ color: '#3CC17E' }} />,
    iconBg: 'rgba(60, 193, 126, 0.12)',
    title: 'Product Guide',
    subtitle: '42 sections',
    rotation: 'rotate-2',
    position: 'left-[58%] top-[12%]',
  },
  {
    icon: <ShieldCheck className="h-5 w-5" style={{ color: '#8A6CFF' }} />,
    iconBg: 'rgba(138, 108, 255, 0.12)',
    title: 'Return Policy',
    subtitle: 'Updated Aug 12',
    rotation: '-rotate-2',
    position: 'left-[4%] top-[50%]',
  },
  {
    icon: <CircleDollarSign className="h-5 w-5" style={{ color: '#FFB347' }} />,
    iconBg: 'rgba(255, 179, 71, 0.12)',
    title: 'Pricing',
    subtitle: '12 plans & options',
    rotation: 'rotate-3',
    position: 'left-[58%] top-[74%]',
  },
]

export function Hero() {
  return (
    <section className="mx-auto max-w-content px-6 pb-10 pt-10 lg:pt-16">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,500px)_1fr] lg:gap-10">
        {/* Left side */}
        <div className="max-w-xl">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-kora-muted">
            AI ASSISTANT FOR YOUR BUSINESS
          </p>
          <h1 className="text-[40px] font-medium leading-[1.05] tracking-tight text-kora-text sm:text-5xl lg:text-[48px]">
            Turn your knowledge
            <br />
            into an{' '}
            <span className="text-kora-accent">AI assistant.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-kora-muted">
            Upload your company knowledge and give your customers instant, accurate
            answers — without writing code.
          </p>
          <div className="mt-8">
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-full bg-kora-accent px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-kora-accent-hover hover:shadow-md"
            >
              Build your assistant
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
          <p className="mt-4 text-xs text-kora-muted">No code · Set up in minutes</p>
        </div>

        {/* Right side — desktop */}
        <div className="relative hidden min-h-[720px] w-full lg:block">
          <p className="absolute left-1/2 top-[4%] -translate-x-1/2 text-[10px] font-medium uppercase tracking-[0.18em] text-kora-muted">
            YOUR KNOWLEDGE
          </p>

          <Connectors />

          {knowledgeCards.map((card) => (
            <KnowledgeCard
              key={card.title}
              icon={
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: card.iconBg }}
                >
                  {card.icon}
                </div>
              }
              title={card.title}
              subtitle={card.subtitle}
              rotation={card.rotation}
              className={`absolute ${card.position} z-20`}
            />
          ))}

          {/* Central Kora element */}
          <div className="absolute left-[44%] top-1/2 z-10 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-gradient-to-br from-[#FFEFEA] to-[#FFE0D6] shadow-sm">
            <KoraMark className="h-10 w-10 text-kora-accent" />
            <span className="mt-1 text-base font-semibold text-kora-accent">Kora</span>
          </div>

          <ChatPanel className="absolute right-0 top-1/2 z-20 -translate-y-1/2" />
        </div>

        {/* Right side — mobile */}
        <div className="flex flex-col items-center gap-6 lg:hidden">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-kora-muted">
            YOUR KNOWLEDGE
          </p>
          <div className="grid grid-cols-2 gap-3">
            {knowledgeCards.map((card) => (
              <KnowledgeCard
                key={card.title}
                icon={
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: card.iconBg }}
                  >
                    {card.icon}
                  </div>
                }
                title={card.title}
                subtitle={card.subtitle}
                rotation="rotate-0"
              />
            ))}
          </div>
          <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-gradient-to-br from-[#FFEFEA] to-[#FFE0D6] shadow-sm">
            <KoraMark className="h-8 w-8 text-kora-accent" />
            <span className="mt-0.5 text-base font-semibold text-kora-accent">Kora</span>
          </div>
          <ChatPanel />
        </div>
      </div>
    </section>
  )
}

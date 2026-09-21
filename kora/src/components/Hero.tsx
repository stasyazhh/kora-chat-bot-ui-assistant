import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ChatPanel } from './ChatPanel'

export function Hero() {
  return (
    <section id="hero" className="mx-auto max-w-content px-6 pb-4 pt-10 lg:pt-16">
      <div className="grid grid-cols-1 items-center gap-12 xl:grid-cols-[minmax(0,560px)_1fr] desk:grid-cols-[minmax(0,540px)_1fr] xl:gap-4">
        {/* Left side */}
        <div>
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
            <Link
              to="/app/onboarding"
              className="group inline-flex items-center gap-2 rounded-full bg-kora-accent px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-kora-accent-hover hover:shadow-md"
            >
              Build your assistant
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <p className="mt-4 text-xs text-kora-muted">No code · Set up in minutes</p>
        </div>

        {/* Right visual — image + ChatPanel */}
        <div className="flex flex-col items-center gap-2 xl:flex-row xl:justify-center">
          <img
            src="/knowledge-flow.png"
            alt="Company knowledge flowing into Kora"
            className="h-auto w-full max-w-[380px] object-contain xl:flex-1"
          />
          <ChatPanel stage="complete" className="!w-[270px] flex-shrink-0" />
        </div>
      </div>
    </section>
  )
}

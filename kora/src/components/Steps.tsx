import { ArrowRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Upload',
    description: 'Bring your docs, guides and FAQs.',
  },
  {
    number: '02',
    title: 'Test',
    description: 'Chat with your assistant before you launch.',
  },
  {
    number: '03',
    title: 'Embed',
    description: 'Add it to any website with one snippet.',
  },
]

export function Steps() {
  return (
    <section id="steps" className="mx-auto max-w-content px-6 pb-24 pt-10">
      <p className="mb-12 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-kora-muted">
        EVERYTHING YOUR ASSISTANT NEEDS TO ANSWER WITH CONFIDENCE.
      </p>

      <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center gap-5">
            <div className="flex shrink-0 flex-col">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-kora-chip text-xs font-semibold text-kora-accent">
                {step.number}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-kora-text">{step.title}</h3>
              <p className="text-sm text-kora-muted">{step.description}</p>
            </div>
            {index < steps.length - 1 && (
              <ArrowRight className="hidden h-5 w-5 text-kora-muted/40 lg:ml-6 lg:block" />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

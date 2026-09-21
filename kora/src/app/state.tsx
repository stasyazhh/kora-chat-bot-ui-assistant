import { createContext, useContext, useMemo, useState, useCallback } from 'react'

export type Tone = 'Helpful' | 'Professional' | 'Friendly'
export type SourceStatus = 'Ready' | 'Processing'
export type WidgetPosition = 'bottom-right' | 'bottom-left'
export type WidgetColor = 'coral' | 'slate' | 'teal' | 'indigo'
export type LauncherStyle = 'kora' | 'bubble'
export type Plan = 'Starter' | 'Growth' | 'Scale'

export interface Source {
  id: string
  name: string
  meta: string
  status: SourceStatus
  type?: string
}

export interface Message {
  role: 'user' | 'assistant'
  text: string
  source?: string
}

export interface AppState {
  assistant: {
    name: string
    description: string
    tone: Tone
  }
  sources: Source[]
  messages: Message[]
  widget: {
    position: WidgetPosition
    assistantName: string
    welcomeMessage: string
    accentColor: WidgetColor
    launcherStyle: LauncherStyle
    showBranding: boolean
  }
  plan: Plan
}

interface AppContextValue extends AppState {
  setAssistant: (assistant: Partial<AppState['assistant']>) => void
  addSource: (source: Omit<Source, 'id'>) => void
  addSampleSources: () => void
  updateSourceStatus: (id: string, status: SourceStatus) => void
  addMessage: (message: Message) => void
  setMessages: (messages: Message[]) => void
  setWidget: (widget: Partial<AppState['widget']>) => void
  setPlan: (plan: Plan) => void
  resetOnboarding: () => void
}

const defaultSources: Source[] = [
  { id: 'faq', name: 'FAQ', meta: '128 questions', status: 'Ready', type: 'Help center' },
  { id: 'product-guide', name: 'Product Guide', meta: '42 sections', status: 'Ready', type: 'Docs' },
  { id: 'return-policy', name: 'Return Policy', meta: 'Updated Aug 12', status: 'Ready', type: 'PDF' },
]

const defaultMessages: Message[] = [
  { role: 'assistant', text: 'Hi — I’m the Acme Support Assistant. What can I help with?' },
  { role: 'user', text: 'Can I return my order?' },
  {
    role: 'assistant',
    text: 'Yes. You have 30 days from the delivery date to request a return. Items must be in their original condition and packaging.',
    source: 'Return Policy',
  },
]

const defaultState: AppState = {
  assistant: {
    name: 'Acme Support Assistant',
    description: 'Answers questions about orders, products, and returns.',
    tone: 'Helpful',
  },
  sources: defaultSources,
  messages: defaultMessages,
  widget: {
    position: 'bottom-right',
    assistantName: 'Acme Support Assistant',
    welcomeMessage: 'Hi — I\'m the Acme Support Assistant. What can I help with?',
    accentColor: 'coral',
    launcherStyle: 'kora',
    showBranding: true,
  },
  plan: 'Starter',
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('kora-app-state') : null
    if (saved) {
      try {
        const parsed: Partial<AppState> = JSON.parse(saved)
        return {
          ...defaultState,
          ...parsed,
          assistant: { ...defaultState.assistant, ...parsed.assistant },
          sources: parsed.sources?.length ? parsed.sources : defaultSources,
          messages: parsed.messages?.length ? parsed.messages : defaultMessages,
          widget: { ...defaultState.widget, ...parsed.widget },
        }
      } catch {
        // ignore
      }
    }
    return defaultState
  })

  const persist = useCallback(
    (next: AppState | ((prev: AppState) => AppState)) => {
      setState((prev) => {
        const updated = typeof next === 'function' ? next(prev) : next
        try {
          localStorage.setItem('kora-app-state', JSON.stringify(updated))
        } catch {
          // ignore
        }
        return updated
      })
    },
    []
  )

  const setAssistant = useCallback(
    (assistant: Partial<AppState['assistant']>) => {
      persist((prev) => {
        const nextAssistant = { ...prev.assistant, ...assistant }
        return {
          ...prev,
          assistant: nextAssistant,
          widget: { ...prev.widget, assistantName: nextAssistant.name },
        }
      })
    },
    [persist]
  )

  const addSource = useCallback(
    (source: Omit<Source, 'id'>) => {
      const id = Math.random().toString(36).slice(2)
      persist((prev) => ({ ...prev, sources: [{ ...source, id }, ...prev.sources] }))
      if (source.status === 'Processing') {
        setTimeout(() => {
          persist((prev) => ({
            ...prev,
            sources: prev.sources.map((s) => (s.id === id ? { ...s, status: 'Ready' } : s)),
          }))
        }, 1500)
      }
    },
    [persist]
  )

  const addSampleSources = useCallback(() => {
    persist((prev) => ({
      ...prev,
      sources: defaultSources.map((s) => ({ ...s })),
      messages: defaultMessages.map((m) => ({ ...m })),
    }))
  }, [persist])

  const updateSourceStatus = useCallback(
    (id: string, status: SourceStatus) => {
      persist((prev) => ({
        ...prev,
        sources: prev.sources.map((s) => (s.id === id ? { ...s, status } : s)),
      }))
    },
    [persist]
  )

  const addMessage = useCallback(
    (message: Message) => {
      persist((prev) => ({ ...prev, messages: [...prev.messages, message] }))
    },
    [persist]
  )

  const setMessages = useCallback(
    (messages: Message[]) => {
      persist((prev) => ({ ...prev, messages }))
    },
    [persist]
  )

  const setWidget = useCallback(
    (widget: Partial<AppState['widget']>) => {
      persist((prev) => ({ ...prev, widget: { ...prev.widget, ...widget } }))
    },
    [persist]
  )

  const setPlan = useCallback(
    (plan: Plan) => {
      persist((prev) => ({ ...prev, plan }))
    },
    [persist]
  )

  const resetOnboarding = useCallback(() => {
    persist((prev) => ({
      ...prev,
      assistant: defaultState.assistant,
      sources: [],
      messages: [],
    }))
  }, [persist])

  const value = useMemo(
    () => ({
      ...state,
      setAssistant,
      addSource,
      addSampleSources,
      updateSourceStatus,
      addMessage,
      setMessages,
      setWidget,
      setPlan,
      resetOnboarding,
    }),
    [state, setAssistant, addSource, addSampleSources, updateSourceStatus, addMessage, setMessages, setWidget, setPlan, resetOnboarding]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppState() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider')
  }
  return context
}

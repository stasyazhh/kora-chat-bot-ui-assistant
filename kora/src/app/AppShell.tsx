import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  LayoutGrid,
  BookOpen,
  MessageSquare,
  Palette,
  BarChart3,
  Settings,
  CreditCard,
  HelpCircle,
  Menu,
  X,
  ChevronDown,
  Bot,
} from 'lucide-react'
import { KoraMark } from '../components/Logo'
import { useAppState } from './state'

const navItems = [
  { label: 'Overview', path: '/app/overview', icon: LayoutGrid },
  { label: 'Knowledge', path: '/app/knowledge', icon: BookOpen },
  { label: 'Test chat', path: '/app/test', icon: MessageSquare },
  { label: 'Widget', path: '/app/widget', icon: Palette },
  { label: 'Analytics', path: '/app/analytics', icon: BarChart3 },
  { label: 'Settings', path: '/app/settings', icon: Settings },
]

function StatusDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
    </span>
  )
}

function AssistantSelector({ expanded = true }: { expanded?: boolean }) {
  const { assistant } = useAppState()
  return (
    <div className="flex items-center gap-3 rounded-xl border border-kora-border bg-white px-3 py-2.5 shadow-sm">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-kora-chip text-kora-accent">
        <Bot className="h-4 w-4" />
      </div>
      {expanded && (
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-kora-text">{assistant.name}</p>
          <div className="flex items-center gap-1.5">
            <StatusDot />
            <span className="text-xs text-kora-muted">Ready</span>
          </div>
        </div>
      )}
      {expanded && <ChevronDown className="h-4 w-4 shrink-0 text-kora-muted" />}
    </div>
  )
}

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-1 flex-col gap-1 px-3">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-kora-chip text-kora-accent'
                : 'text-kora-muted hover:bg-white hover:text-kora-text'
            }`
          }
        >
          <item.icon className="h-[18px] w-[18px] shrink-0" />
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}

function SidebarFooter({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex flex-col gap-1 border-t border-kora-border px-3 pt-3">
      <NavLink
        to="/app/billing"
        onClick={onNavigate}
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            isActive
              ? 'bg-kora-chip text-kora-accent'
              : 'text-kora-muted hover:bg-white hover:text-kora-text'
          }`
        }
      >
        <CreditCard className="h-[18px] w-[18px] shrink-0" />
        Billing
      </NavLink>
      <button
        type="button"
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-kora-muted transition-colors hover:bg-white hover:text-kora-text"
      >
        <HelpCircle className="h-[18px] w-[18px] shrink-0" />
        Help
      </button>
      <div className="mt-2 flex items-center gap-3 rounded-xl bg-white px-3 py-2.5 shadow-sm">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-kora-border text-kora-muted">
          <span className="text-xs font-semibold">AJ</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-kora-text">Alex Johnson</p>
          <p className="truncate text-xs text-kora-muted">alex@acme.com</p>
        </div>
      </div>
    </div>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isAppRoot = location.pathname === '/app' || location.pathname === '/app/'

  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  return (
    <div className="flex min-h-svh bg-kora-bg">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-svh w-64 flex-col border-r border-kora-border bg-[#FAFAF8] lg:flex">
        <div className="flex h-16 items-center gap-2 px-5">
          <Link to="/" className="flex items-center gap-2 text-kora-text hover:opacity-80 transition-opacity">
            <KoraMark className="h-7 w-7 text-kora-accent" />
            <span className="text-xl font-semibold tracking-tight">Kora</span>
          </Link>
        </div>
        <div className="px-3 py-4">
          <AssistantSelector />
        </div>
        <SidebarNav />
        <div className="mt-auto pb-4">
          <SidebarFooter />
        </div>
      </aside>

      {/* Mobile header */}
      <div className="fixed inset-x-0 top-0 z-30 flex h-16 items-center justify-between border-b border-kora-border bg-kora-bg px-4 lg:hidden">
        <Link to="/" className="flex items-center gap-2 text-kora-text">
          <KoraMark className="h-6 w-6 text-kora-accent" />
          <span className="text-lg font-semibold tracking-tight">Kora</span>
        </Link>
        <div className="flex items-center gap-3">
          <AssistantSelector expanded={false} />
          <button
            type="button"
            onClick={() => setMobileOpen((s) => !s)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-kora-text"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-30 bg-black/20 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-kora-border bg-[#FAFAF8] p-4 lg:hidden">
            <div className="mb-4 px-1">
              <AssistantSelector />
            </div>
            <SidebarNav onNavigate={() => setMobileOpen(false)} />
            <div className="mt-auto pt-3">
              <SidebarFooter onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>
        </>
      )}

      {/* Main content */}
      <main className="flex-1 pt-16 lg:pt-0">
        {isAppRoot ? (
          <div className="flex min-h-svh flex-col items-center justify-center p-6 text-center">
            <h1 className="text-2xl font-semibold text-kora-text">Welcome to Kora</h1>
            <p className="mt-2 text-kora-muted">Choose a section from the sidebar to get started.</p>
            <Link
              to="/app/knowledge"
              className="mt-6 inline-flex items-center rounded-full bg-kora-accent px-6 py-2.5 text-sm font-semibold text-white hover:bg-kora-accent-hover"
            >
              Go to Knowledge
            </Link>
          </div>
        ) : (
          children
        )}
      </main>
    </div>
  )
}

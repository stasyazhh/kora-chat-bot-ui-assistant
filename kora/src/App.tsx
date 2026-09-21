import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppStateProvider } from './app/state'
import { AppShell } from './app/AppShell'
import { Onboarding } from './app/routes/Onboarding'
import { Knowledge } from './app/routes/Knowledge'
import { TestChat } from './app/routes/TestChat'
import { WidgetBuilder } from './app/routes/Widget'
import { Billing } from './app/routes/Billing'
import { Overview } from './app/routes/Overview'
import { Analytics } from './app/routes/Analytics'
import { Settings } from './app/routes/Settings'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Steps } from './components/Steps'

function LandingPage() {
  return (
    <div className="flex min-h-svh flex-col bg-kora-bg">
      <Header />
      <main className="flex-1">
        <Hero />
        <Steps />
      </main>
    </div>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/app" element={<Navigate to="/app/overview" replace />} />
      <Route path="/app/overview" element={<AppShell><Overview /></AppShell>} />
      <Route path="/app/onboarding" element={<Onboarding />} />
      <Route path="/app/knowledge" element={<AppShell><Knowledge /></AppShell>} />
      <Route path="/app/test" element={<AppShell><TestChat /></AppShell>} />
      <Route path="/app/widget" element={<AppShell><WidgetBuilder /></AppShell>} />
      <Route path="/app/billing" element={<AppShell><Billing /></AppShell>} />
      <Route path="/app/analytics" element={<AppShell><Analytics /></AppShell>} />
      <Route path="/app/settings" element={<AppShell><Settings /></AppShell>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <AppStateProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppStateProvider>
  )
}

export default App

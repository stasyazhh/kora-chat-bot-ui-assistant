import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Steps } from './components/Steps'

function App() {
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

export default App

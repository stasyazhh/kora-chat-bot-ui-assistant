import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'
import { Logo } from './Logo'

type NavLinkItem =
  | { label: string; href: string }
  | { label: string; to: string }

const navLinks: NavLinkItem[] = [
  { label: 'Product', href: '#hero' },
  { label: 'How it works', href: '#steps' },
  { label: 'Pricing', to: '/app/billing' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="w-full">
      <div className="mx-auto max-w-content px-6">
        <nav className="flex h-20 items-center justify-between">
          <Logo />

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) =>
              'to' in link ? (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-sm font-medium text-kora-text/80 transition-colors hover:text-kora-text"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-kora-text/80 transition-colors hover:text-kora-text"
                >
                  {link.label}
                </a>
              )
            )}
          </div>

          <div className="hidden items-center gap-6 md:flex">
            <a
              href="#"
              className="text-sm font-medium text-kora-text transition-colors hover:text-kora-accent"
            >
              Log in
            </a>
            <Link
              to="/app/onboarding"
              className="group inline-flex items-center gap-1.5 rounded-full bg-kora-accent px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-kora-accent-hover"
            >
              Get started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-kora-text md:hidden"
            onClick={() => setMobileOpen((s) => !s)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-b border-kora-border bg-kora-bg md:hidden">
          <div className="mx-auto max-w-content px-6 py-5">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) =>
                'to' in link ? (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="text-base font-medium text-kora-text"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-base font-medium text-kora-text"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              )}
              <hr className="border-kora-border" />
              <a
                href="#"
                className="text-base font-medium text-kora-text"
                onClick={() => setMobileOpen(false)}
              >
                Log in
              </a>
              <Link
                to="/app/onboarding"
                className="group inline-flex items-center justify-center gap-1.5 rounded-full bg-kora-accent px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-kora-accent-hover"
                onClick={() => setMobileOpen(false)}
              >
                Get started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

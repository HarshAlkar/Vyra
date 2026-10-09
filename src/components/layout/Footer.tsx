import { ArrowUp } from 'lucide-react'
import { Link } from 'react-router-dom'

const shopLinks = [
  { to: '/collection', label: 'All Frames' },
  { to: '/collection?category=Sunglasses', label: 'Sunglasses' },
  { to: '/collection?category=Optical%20Frames', label: 'Optical' },
  { to: '/cart', label: 'Cart' },
]

const categoryLinks = [
  { to: '/collection?category=Aviator', label: 'Aviator' },
  { to: '/collection?category=Wayfarer', label: 'Wayfarer' },
  { to: '/collection?category=Round%20Frames', label: 'Round' },
  { to: '/collection?category=Geometric%20Frames', label: 'Geometric' },
  { to: '/collection?category=Blue-Light%20Glasses', label: 'Blue-Light' },
]

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <Link to="/" className="font-display text-2xl font-bold tracking-[0.28em]">
            VYRA
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-silver">
            See Beyond Ordinary. Contemporary eyewear for people who treat
            personal style as an extension of identity.
          </p>
          <a
            href="mailto:hello@vyra.demo"
            className="mt-4 inline-block text-sm text-paper underline-offset-4 hover:underline"
          >
            hello@vyra.demo
          </a>
        </div>

        <div>
          <h2 className="editorial-caption text-silver">Shop</h2>
          <ul className="mt-4 space-y-2">
            {shopLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-sm text-silver transition-colors hover:text-paper"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="editorial-caption text-silver">Frames</h2>
          <ul className="mt-4 space-y-2">
            {categoryLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-sm text-silver transition-colors hover:text-paper"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-silver sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} VYRA. Demo storefront — no real payments.</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 self-start text-paper transition-colors hover:text-cobalt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt sm:self-auto"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  )
}

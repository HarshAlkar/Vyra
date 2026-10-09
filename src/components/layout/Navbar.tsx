import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

const navLinks = [
  { to: '/collection', label: 'Shop' },
  { to: '/collection?category=Sunglasses', label: 'Sunglasses' },
  { to: '/collection?category=Optical%20Frames', label: 'Optical' },
  { to: '/#story', label: 'Our Story' },
]

export function Navbar() {
  const { itemCount } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const reduceMotion = useReducedMotion()
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const overHero = isHome && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
  }, [location.pathname, location.search, location.hash])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleSearch = (event: FormEvent) => {
    event.preventDefault()
    const trimmed = query.trim()
    navigate(
      trimmed
        ? `/collection?q=${encodeURIComponent(trimmed)}`
        : '/collection',
    )
    setSearchOpen(false)
  }

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        overHero
          ? 'border-transparent bg-transparent text-paper'
          : 'border-b border-line bg-paper/95 text-ink backdrop-blur-md',
      ].join(' ')}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="font-display text-xl font-bold tracking-[0.28em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
          aria-label="VYRA home"
        >
          VYRA
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                [
                  'text-xs font-medium tracking-[0.16em] uppercase transition-colors duration-200',
                  overHero
                    ? 'text-paper/80 hover:text-paper'
                    : 'text-ink/70 hover:text-ink',
                  isActive && !link.to.includes('#') ? 'text-cobalt' : '',
                ].join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setSearchOpen((open) => !open)}
            className="rounded-sm p-2 transition-colors hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
            aria-label={searchOpen ? 'Close search' : 'Open search'}
            aria-expanded={searchOpen}
          >
            <Search className="h-5 w-5" />
          </button>

          <Link
            to="/cart"
            className="relative rounded-sm p-2 transition-colors hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
            aria-label={`Shopping cart, ${itemCount} items`}
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center bg-cobalt px-1 text-[10px] font-semibold text-paper">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            ) : null}
          </Link>

          <button
            type="button"
            className="rounded-sm p-2 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen ? (
          <motion.div
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={[
              'overflow-hidden border-t',
              overHero
                ? 'border-white/15 bg-ink/90 text-paper'
                : 'border-line bg-paper text-ink',
            ].join(' ')}
          >
            <form
              onSubmit={handleSearch}
              className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8"
            >
              <Search className="h-4 w-4 shrink-0 opacity-60" aria-hidden="true" />
              <label htmlFor="nav-search" className="sr-only">
                Search frames
              </label>
              <input
                id="nav-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search frames…"
                autoFocus
                className="w-full bg-transparent text-sm placeholder:opacity-50 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 text-xs font-medium tracking-[0.14em] uppercase text-cobalt"
              >
                Search
              </button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              className="fixed inset-0 z-40 bg-ink/50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 right-0 z-50 flex w-[min(100%,20rem)] flex-col bg-ink text-paper shadow-2xl md:hidden"
              initial={reduceMotion ? false : { x: '100%' }}
              animate={{ x: 0 }}
              exit={reduceMotion ? undefined : { x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
                <span className="font-display text-lg tracking-[0.28em]">VYRA</span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-1 p-4" aria-label="Mobile">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="px-3 py-3 text-sm tracking-[0.14em] uppercase"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/cart"
                  className="px-3 py-3 text-sm tracking-[0.14em] uppercase"
                  onClick={() => setMenuOpen(false)}
                >
                  Cart ({itemCount})
                </Link>
              </nav>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

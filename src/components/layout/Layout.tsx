import { AnimatePresence } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { PageTransition } from './PageTransition'
import { ScrollToTop } from './ScrollToTop'

export function Layout() {
  const location = useLocation()

  return (
    <div className="flex min-h-dvh flex-col bg-paper text-ink">
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <Outlet />
        </PageTransition>
      </AnimatePresence>
      <Footer />
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: 'font-sans',
          style: {
            background: '#0B0B0C',
            color: '#F3EFE7',
            border: '1px solid #1F4BFF',
          },
        }}
      />
    </div>
  )
}

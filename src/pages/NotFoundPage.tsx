import { Link } from 'react-router-dom'
import { Button } from '../components/common/Button'

export function NotFoundPage() {
  return (
    <main className="mx-auto flex max-w-7xl flex-col items-center px-4 pb-24 pt-28 text-center sm:px-6 lg:px-8">
      <p className="editorial-caption text-cobalt">404</p>
      <h1 className="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-silver">
        The page you requested does not exist. Return to the collection to
        continue browsing frames.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/">
          <Button>Back to home</Button>
        </Link>
        <Link to="/collection">
          <Button variant="secondary">View collection</Button>
        </Link>
      </div>
    </main>
  )
}

import { AlertTriangle } from 'lucide-react'
import { Button } from './Button'

interface ErrorStateProps {
  title?: string
  message: string
  onRetry?: () => void
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center border border-line bg-surface px-6 py-16 text-center"
    >
      <AlertTriangle className="mb-4 h-8 w-8 text-cobalt" aria-hidden="true" />
      <h3 className="font-display text-2xl font-bold text-ink">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-silver">{message}</p>
      {onRetry ? (
        <div className="mt-6">
          <Button onClick={onRetry} variant="secondary">
            Try again
          </Button>
        </div>
      ) : null}
    </div>
  )
}

interface LoadingSkeletonProps {
  count?: number
}

function CardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden border border-line bg-surface">
      <div className="aspect-[4/5] bg-line/60" />
      <div className="space-y-3 p-4">
        <div className="h-3 w-20 bg-line" />
        <div className="h-4 w-3/4 bg-line" />
        <div className="flex items-center justify-between pt-1">
          <div className="h-4 w-16 bg-line" />
          <div className="h-4 w-12 bg-line" />
        </div>
      </div>
    </div>
  )
}

export function LoadingSkeleton({ count = 8 }: LoadingSkeletonProps) {
  return (
    <div
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      aria-busy="true"
      aria-label="Loading products"
    >
      {Array.from({ length: count }, (_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}

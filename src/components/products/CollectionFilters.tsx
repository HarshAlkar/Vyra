import { RotateCcw } from 'lucide-react'
import type { SortOption } from '../../types/product'

interface CollectionFiltersProps {
  categories: string[]
  frameShapes: string[]
  selectedCategory: string
  selectedShape: string
  sort: SortOption
  onCategoryChange: (category: string) => void
  onShapeChange: (shape: string) => void
  onSortChange: (sort: SortOption) => void
  hasActiveFilters: boolean
  onClearFilters: () => void
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'New Arrivals' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Highest Rated' },
]

export function CollectionFilters({
  categories,
  frameShapes,
  selectedCategory,
  selectedShape,
  sort,
  onCategoryChange,
  onShapeChange,
  onSortChange,
  hasActiveFilters,
  onClearFilters,
}: CollectionFiltersProps) {
  return (
    <div className="space-y-5 border border-line bg-surface p-4 sm:p-5">
      <div>
        <p className="editorial-caption mb-3">Category</p>
        <div className="flex flex-wrap gap-2">
          {['All', ...categories].map((category) => {
            const active = selectedCategory === category
            return (
              <button
                key={category}
                type="button"
                onClick={() => onCategoryChange(category)}
                aria-pressed={active}
                className={[
                  'border px-3 py-1.5 text-xs tracking-[0.08em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt',
                  active
                    ? 'border-ink bg-ink text-paper'
                    : 'border-line text-ink hover:border-ink',
                ].join(' ')}
              >
                {category}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <p className="editorial-caption mb-3">Frame shape</p>
        <div className="flex flex-wrap gap-2">
          {['All', ...frameShapes].map((shape) => {
            const active = selectedShape === shape
            return (
              <button
                key={shape}
                type="button"
                onClick={() => onShapeChange(shape)}
                aria-pressed={active}
                className={[
                  'border px-3 py-1.5 text-xs tracking-[0.08em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt',
                  active
                    ? 'border-cobalt bg-cobalt text-paper'
                    : 'border-line text-ink hover:border-ink',
                ].join(' ')}
              >
                {shape}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <label htmlFor="sort-select" className="sr-only">
            Sort products
          </label>
          <select
            id="sort-select"
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="h-11 border border-line bg-paper px-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {hasActiveFilters ? (
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex h-11 items-center gap-1.5 px-3 text-xs tracking-[0.12em] uppercase text-silver transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Clear filters
          </button>
        ) : null}
      </div>
    </div>
  )
}

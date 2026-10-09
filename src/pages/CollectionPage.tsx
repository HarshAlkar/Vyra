import { PackageSearch } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { EmptyState } from '../components/common/EmptyState'
import { ErrorState } from '../components/common/ErrorState'
import { LoadingSkeleton } from '../components/common/LoadingSkeleton'
import { CollectionFilters } from '../components/products/CollectionFilters'
import { ProductGrid } from '../components/products/ProductGrid'
import { SearchBar } from '../components/products/SearchBar'
import { useProducts } from '../hooks/useProducts'
import type { SortOption } from '../types/product'

function isSortOption(value: string | null): value is SortOption {
  return (
    value === 'featured' ||
    value === 'newest' ||
    value === 'price-asc' ||
    value === 'price-desc' ||
    value === 'rating-desc'
  )
}

export function CollectionPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('q') ?? '')
  const [category, setCategory] = useState(searchParams.get('category') ?? 'All')
  const [frameShape, setFrameShape] = useState(
    searchParams.get('shape') ?? 'All',
  )
  const [style, setStyle] = useState(searchParams.get('style') ?? 'All')
  const [sort, setSort] = useState<SortOption>(
    isSortOption(searchParams.get('sort'))
      ? (searchParams.get('sort') as SortOption)
      : 'featured',
  )

  const filters = useMemo(
    () => ({ search, category, frameShape, style, sort }),
    [search, category, frameShape, style, sort],
  )

  const { categories, frameShapes, loading, error, filteredProducts } =
    useProducts(filters)

  useEffect(() => {
    setSearch(searchParams.get('q') ?? '')
    setCategory(searchParams.get('category') ?? 'All')
    setFrameShape(searchParams.get('shape') ?? 'All')
    setStyle(searchParams.get('style') ?? 'All')
    const sortParam = searchParams.get('sort')
    if (isSortOption(sortParam)) setSort(sortParam)
  }, [searchParams])

  const syncParams = (next: {
    q?: string
    category?: string
    shape?: string
    style?: string
    sort?: SortOption
  }) => {
    const params = new URLSearchParams()
    const q = next.q ?? search
    const cat = next.category ?? category
    const shape = next.shape ?? frameShape
    const st = next.style ?? style
    const s = next.sort ?? sort

    if (q.trim()) params.set('q', q.trim())
    if (cat !== 'All') params.set('category', cat)
    if (shape !== 'All') params.set('shape', shape)
    if (st !== 'All') params.set('style', st)
    if (s !== 'featured') params.set('sort', s)

    setSearchParams(params, { replace: true })
  }

  const hasActiveFilters =
    search.trim().length > 0 ||
    category !== 'All' ||
    frameShape !== 'All' ||
    style !== 'All' ||
    sort !== 'featured'

  const clearFilters = () => {
    setSearch('')
    setCategory('All')
    setFrameShape('All')
    setStyle('All')
    setSort('featured')
    setSearchParams({})
  }

  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <p className="editorial-caption">Collection</p>
        <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
          The full edit.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-silver sm:text-base">
          Search, filter, and sort every VYRA frame and accessory in the local
          catalogue.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <SearchBar
          value={search}
          onChange={(value) => {
            setSearch(value)
            syncParams({ q: value })
          }}
        />
        <p className="text-sm text-silver" aria-live="polite">
          {loading
            ? 'Loading…'
            : `${filteredProducts.length} ${filteredProducts.length === 1 ? 'product' : 'products'}`}
        </p>
      </div>

      <div className="mb-8">
        <CollectionFilters
          categories={categories}
          frameShapes={frameShapes}
          selectedCategory={category}
          selectedShape={frameShape}
          sort={sort}
          onCategoryChange={(value) => {
            setCategory(value)
            syncParams({ category: value })
          }}
          onShapeChange={(value) => {
            setFrameShape(value)
            syncParams({ shape: value })
          }}
          onSortChange={(value) => {
            setSort(value)
            syncParams({ sort: value })
          }}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearFilters}
        />
      </div>

      {style !== 'All' ? (
        <p className="mb-4 text-xs tracking-[0.12em] text-cobalt uppercase">
          Style filter: {style}
        </p>
      ) : null}

      {loading ? <LoadingSkeleton /> : null}

      {!loading && error ? (
        <ErrorState message={error} onRetry={() => window.location.reload()} />
      ) : null}

      {!loading && !error && filteredProducts.length === 0 ? (
        <EmptyState
          icon={PackageSearch}
          title="No frames found"
          description="Try adjusting your search or filters to find something in the collection."
          actionLabel="Clear filters"
          onAction={clearFilters}
        />
      ) : null}

      {!loading && !error && filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : null}
    </main>
  )
}

import { useEffect, useMemo, useState } from 'react'
import productsData from '../data/products.json'
import type { FrameStyle, Product, SortOption } from '../types/product'

export interface ProductFiltersState {
  search: string
  category: string
  frameShape: string
  style: string
  sort: SortOption
}

interface UseProductsResult {
  products: Product[]
  categories: string[]
  frameShapes: string[]
  loading: boolean
  error: string | null
  filteredProducts: Product[]
}

function isValidProduct(item: unknown): item is Product {
  if (typeof item !== 'object' || item === null) return false
  const p = item as Record<string, unknown>
  return (
    typeof p.id === 'string' &&
    typeof p.name === 'string' &&
    typeof p.slug === 'string' &&
    typeof p.description === 'string' &&
    typeof p.price === 'number' &&
    typeof p.category === 'string' &&
    typeof p.frameShape === 'string' &&
    typeof p.frameMaterial === 'string' &&
    typeof p.frameColor === 'string' &&
    typeof p.lensType === 'string' &&
    typeof p.gender === 'string' &&
    typeof p.style === 'string' &&
    typeof p.rating === 'number' &&
    typeof p.reviewCount === 'number' &&
    typeof p.image === 'string' &&
    Array.isArray(p.images) &&
    typeof p.stock === 'number' &&
    typeof p.featured === 'boolean' &&
    typeof p.isNew === 'boolean'
  )
}

export function loadProducts(): Product[] {
  if (!Array.isArray(productsData)) {
    throw new Error('Product data is not a valid array.')
  }

  const products = productsData.filter(isValidProduct)
  if (products.length === 0) {
    throw new Error('No valid products found in local data.')
  }

  return products
}

export function filterProducts(
  products: Product[],
  filters: ProductFiltersState,
): Product[] {
  const query = filters.search.trim().toLowerCase()

  let result = products.filter((product) => {
    const matchesCategory =
      filters.category === 'All' || product.category === filters.category
    const matchesShape =
      filters.frameShape === 'All' || product.frameShape === filters.frameShape
    const matchesStyle =
      filters.style === 'All' || product.style === filters.style
    const matchesSearch =
      query.length === 0 ||
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    return matchesCategory && matchesShape && matchesStyle && matchesSearch
  })

  result = [...result].sort((a, b) => {
    switch (filters.sort) {
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'rating-desc':
        return b.rating - a.rating
      case 'newest':
        if (a.isNew === b.isNew) return a.name.localeCompare(b.name)
        return a.isNew ? -1 : 1
      case 'featured':
      default:
        if (a.featured === b.featured) return a.name.localeCompare(b.name)
        return a.featured ? -1 : 1
    }
  })

  return result
}

export function useProducts(filters: ProductFiltersState): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const initialise = () => {
      try {
        const data = loadProducts()
        if (!cancelled) {
          setProducts(data)
          setError(null)
        }
      } catch (err) {
        if (!cancelled) {
          setProducts([])
          setError(
            err instanceof Error
              ? err.message
              : 'Failed to load product catalogue.',
          )
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    const frame = requestAnimationFrame(initialise)
    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
    }
  }, [])

  const categories = useMemo(() => {
    const unique = [...new Set(products.map((p) => p.category))]
    return unique.sort((a, b) => a.localeCompare(b))
  }, [products])

  const frameShapes = useMemo(() => {
    const unique = [
      ...new Set(
        products
          .map((p) => p.frameShape)
          .filter((shape) => shape !== 'Accessory'),
      ),
    ]
    return unique.sort((a, b) => a.localeCompare(b))
  }, [products])

  const filteredProducts = useMemo(
    () => filterProducts(products, filters),
    [products, filters],
  )

  return { products, categories, frameShapes, loading, error, filteredProducts }
}

export function useProductBySlug(slugOrId: string | undefined) {
  const [product, setProduct] = useState<Product | null | undefined>(undefined)
  const [related, setRelated] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const all = loadProducts()
      if (!slugOrId) {
        setProduct(null)
        setRelated([])
        return
      }

      const found =
        all.find((p) => p.slug === slugOrId || p.id === slugOrId) ?? null
      setProduct(found)
      setRelated(
        found
          ? all
              .filter(
                (p) =>
                  p.id !== found.id &&
                  (p.category === found.category ||
                    p.frameShape === found.frameShape),
              )
              .slice(0, 4)
          : [],
      )
      setError(null)
    } catch (err) {
      setProduct(null)
      setRelated([])
      setError(
        err instanceof Error ? err.message : 'Failed to load product.',
      )
    }
  }, [slugOrId])

  return { product, related, error, loading: product === undefined }
}

export function getFeaturedProducts(limit = 6): Product[] {
  try {
    return loadProducts()
      .filter((p) => p.featured)
      .slice(0, limit)
  } catch {
    return []
  }
}

export function getProductsByStyle(style: FrameStyle): Product[] {
  try {
    return loadProducts().filter((p) => p.style === style && p.category !== 'Accessories')
  } catch {
    return []
  }
}

import { useEffect, useState } from 'react'
import { BrandStory } from '../components/home/BrandStory'
import { FeaturedEdit } from '../components/home/FeaturedEdit'
import { FinalCTA } from '../components/home/FinalCTA'
import { FrameFinder } from '../components/home/FrameFinder'
import { HeroVideo } from '../components/home/HeroVideo'
import { ShopByFrame } from '../components/home/ShopByFrame'
import { SignatureCollection } from '../components/home/SignatureCollection'
import { ErrorState } from '../components/common/ErrorState'
import { loadProducts } from '../hooks/useProducts'
import type { Product } from '../types/product'

export function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      setProducts(loadProducts())
      setError(null)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load catalogue.',
      )
    }
  }, [])

  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return
    const el = document.querySelector(hash)
    if (el) {
      window.setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth' })
      }, 80)
    }
  }, [])

  if (error) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
        <ErrorState message={error} onRetry={() => window.location.reload()} />
      </main>
    )
  }

  return (
    <main>
      <HeroVideo />
      <FeaturedEdit products={products.filter((p) => p.featured).slice(0, 3)} />
      <ShopByFrame />
      <SignatureCollection products={products} />
      <FrameFinder />
      <BrandStory />
      <FinalCTA />
    </main>
  )
}

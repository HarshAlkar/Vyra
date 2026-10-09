import type { Product } from '../../types/product'
import { ProductGrid } from './ProductGrid'

interface RelatedProductsProps {
  products: Product[]
  heading?: string
}

export function RelatedProducts({
  products,
  heading = 'Related frames',
}: RelatedProductsProps) {
  if (products.length === 0) return null

  return (
    <section className="mt-20 border-t border-line pt-16">
      <h2 className="font-display text-2xl font-bold sm:text-3xl">{heading}</h2>
      <p className="mt-2 text-sm text-silver">Continue the edit</p>
      <div className="mt-8">
        <ProductGrid products={products} />
      </div>
    </section>
  )
}

import type { Product } from '../../types/product'

interface ProductSpecificationsProps {
  product: Product
}

export function ProductSpecifications({ product }: ProductSpecificationsProps) {
  const rows = [
    { label: 'Frame shape', value: product.frameShape },
    { label: 'Material', value: product.frameMaterial },
    { label: 'Color', value: product.frameColor },
    { label: 'Lens', value: product.lensType },
    { label: 'Fit', value: product.gender },
    { label: 'Style', value: product.style },
  ]

  return (
    <section className="border border-line bg-surface">
      <h2 className="border-b border-line px-4 py-3 font-display text-lg font-semibold sm:px-5">
        Specifications
      </h2>
      <dl>
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-2 gap-3 border-b border-line px-4 py-3 text-sm last:border-b-0 sm:px-5"
          >
            <dt className="text-silver">{row.label}</dt>
            <dd className="text-right capitalize text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

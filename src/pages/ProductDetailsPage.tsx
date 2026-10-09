import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '../components/common/Button'
import { ErrorState } from '../components/common/ErrorState'
import { LoadingSkeleton } from '../components/common/LoadingSkeleton'
import { ProductGallery } from '../components/products/ProductGallery'
import { ProductSpecifications } from '../components/products/ProductSpecifications'
import { QuantitySelector } from '../components/products/QuantitySelector'
import { RelatedProducts } from '../components/products/RelatedProducts'
import { useCart } from '../context/CartContext'
import { useProductBySlug } from '../hooks/useProducts'
import { formatINR } from '../utils/currency'

export function ProductDetailsPage() {
  const { slug } = useParams()
  const { product, related, error, loading } = useProductBySlug(slug)
  const { addItem, getItemQuantity } = useCart()
  const [quantity, setQuantity] = useState(1)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    setQuantity(1)
  }, [slug])

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <LoadingSkeleton count={4} />
      </main>
    )
  }

  if (error) {
    return (
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <ErrorState message={error} />
      </main>
    )
  }

  if (!product) {
    return (
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <div className="border border-line bg-surface px-6 py-16 text-center">
          <h1 className="font-display text-3xl font-bold">Frame not found</h1>
          <p className="mt-3 text-sm text-silver">
            This product does not exist or is no longer in the catalogue.
          </p>
          <div className="mt-6">
            <Link to="/collection">
              <Button>Back to collection</Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const inCart = getItemQuantity(product.id)
  const maxQty = Math.max(1, product.stock - inCart)
  const canAdd = product.stock > 0 && inCart < product.stock

  const handleAdd = () => {
    const result = addItem(product, quantity)
    if (result.ok) {
      toast.success(result.message)
      setQuantity(1)
    } else {
      toast.error(result.message)
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-silver">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link to="/collection" className="hover:text-ink">
              Collection
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              to={`/collection?category=${encodeURIComponent(product.category)}`}
              className="hover:text-ink"
            >
              {product.category}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="truncate text-ink" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <ProductGallery name={product.name} images={product.images} />
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="lg:sticky lg:top-24 lg:self-start"
        >
          <p className="editorial-caption">{product.category}</p>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-ink text-ink" aria-hidden="true" />
              <span className="font-medium tabular-nums">
                {product.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-silver">{product.reviewCount} reviews</span>
            {product.isNew ? (
              <span className="bg-cobalt px-2 py-0.5 text-[10px] font-semibold tracking-[0.12em] text-paper uppercase">
                New
              </span>
            ) : null}
          </div>

          <p className="mt-6 text-2xl font-medium tabular-nums">
            {formatINR(product.price)}
          </p>

          <p className="mt-5 text-base leading-relaxed text-silver">
            {product.description}
          </p>

          <p
            className={[
              'mt-4 text-sm font-medium',
              product.stock > 5
                ? 'text-ink'
                : product.stock > 0
                  ? 'text-amber-700'
                  : 'text-red-600',
            ].join(' ')}
          >
            {product.stock > 0
              ? `${product.stock} in stock`
              : 'Out of stock'}
            {inCart > 0 ? ` · ${inCart} in your cart` : ''}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end">
            <div>
              <label
                htmlFor="detail-qty"
                className="mb-2 block text-[10px] font-semibold tracking-[0.14em] text-silver uppercase"
              >
                Quantity
              </label>
              <QuantitySelector
                id="detail-qty"
                value={Math.min(quantity, maxQty)}
                max={maxQty}
                onChange={setQuantity}
              />
            </div>
            <Button
              size="lg"
              onClick={handleAdd}
              disabled={!canAdd}
              className="w-full sm:w-auto"
            >
              Add to Cart
            </Button>
          </div>

          <div className="mt-10 space-y-6">
            <ProductSpecifications product={product} />

            <div className="border border-line bg-paper px-4 py-4 text-sm text-silver sm:px-5">
              <p className="font-medium text-ink">Shipping & returns</p>
              <p className="mt-2 leading-relaxed">
                Demo storefront only. Shipping estimates and returns are shown
                for interface completeness and are not real fulfilment policies.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Link
              to="/collection"
              className="inline-flex items-center gap-2 text-sm text-silver transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to collection
            </Link>
          </div>
        </motion.div>
      </div>

      <RelatedProducts products={related} />
    </main>
  )
}

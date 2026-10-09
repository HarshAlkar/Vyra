import { motion, useReducedMotion } from 'framer-motion'
import { Check, Star } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { useCart } from '../../context/CartContext'
import type { Product } from '../../types/product'
import { staggerItem } from '../../utils/animations'
import { formatINR } from '../../utils/currency'
import { Button } from '../common/Button'
import { ProductImage } from '../common/ProductImage'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const reduceMotion = useReducedMotion()

  const handleQuickAdd = () => {
    const result = addItem(product, 1)
    if (result.ok) {
      toast.success(result.message)
      setAdded(true)
      window.setTimeout(() => setAdded(false), 1400)
    } else {
      toast.error(result.message)
    }
  }

  return (
    <motion.article
      variants={reduceMotion ? undefined : staggerItem}
      className="group flex flex-col"
    >
      <Link
        to={`/products/${product.slug}`}
        className="relative aspect-[4/5] overflow-hidden bg-line/40"
      >
        <ProductImage
          src={product.image}
          alt={product.name}
          className="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1">
          {product.isNew ? (
            <span className="bg-cobalt px-2 py-1 text-[10px] font-semibold tracking-[0.14em] text-paper uppercase">
              New
            </span>
          ) : null}
          {product.featured ? (
            <span className="bg-ink px-2 py-1 text-[10px] font-semibold tracking-[0.14em] text-paper uppercase">
              Featured
            </span>
          ) : null}
        </div>
        <span className="absolute right-3 top-3 font-display text-xs text-ink/40">
          {String(index + 1).padStart(2, '0')}
        </span>
      </Link>

      <div className="flex flex-1 flex-col border border-t-0 border-line bg-surface p-4">
        <p className="editorial-caption">{product.category}</p>
        <Link
          to={`/products/${product.slug}`}
          className="mt-2 font-display text-lg font-semibold leading-snug text-ink hover:text-cobalt"
        >
          {product.name}
        </Link>

        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="text-sm font-medium tabular-nums">{formatINR(product.price)}</p>
          <div className="flex items-center gap-1 text-xs text-silver">
            <Star className="h-3.5 w-3.5 fill-ink text-ink" aria-hidden="true" />
            <span className="tabular-nums text-ink">{product.rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Button
            fullWidth
            size="sm"
            onClick={handleQuickAdd}
            disabled={added}
          >
            {added ? (
              <>
                <Check className="h-3.5 w-3.5" /> Added
              </>
            ) : (
              'Quick Add'
            )}
          </Button>
          <Link to={`/products/${product.slug}`} className="shrink-0">
            <Button variant="secondary" size="sm">
              View
            </Button>
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

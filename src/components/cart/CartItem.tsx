import { motion, useReducedMotion } from 'framer-motion'
import { Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { useCart } from '../../context/CartContext'
import type { CartItem as CartItemType } from '../../types/product'
import { formatINR } from '../../utils/currency'
import { ProductImage } from '../common/ProductImage'
import { QuantitySelector } from '../products/QuantitySelector'

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()
  const reduceMotion = useReducedMotion()
  const { product, quantity } = item
  const lineTotal = product.price * quantity

  const handleRemove = () => {
    removeItem(product.id)
    toast.message(`${product.name} removed from cart.`)
  }

  return (
    <motion.li
      layout={!reduceMotion}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, x: -24 }}
      transition={{ duration: 0.28 }}
      className="flex flex-col gap-4 border-b border-line py-6 last:border-b-0 sm:flex-row sm:items-center"
    >
      <Link
        to={`/products/${product.slug}`}
        className="aspect-square w-28 shrink-0 overflow-hidden border border-line sm:h-28 sm:w-28"
      >
        <ProductImage src={product.image} alt={product.name} />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="editorial-caption">{product.category}</p>
            <Link
              to={`/products/${product.slug}`}
              className="mt-1 block font-display text-lg font-semibold leading-snug text-ink hover:text-cobalt"
            >
              {product.name}
            </Link>
            <p className="mt-1 text-sm tabular-nums text-silver">
              {formatINR(product.price)} each
            </p>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="shrink-0 p-2 text-silver transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
            aria-label={`Remove ${product.name} from cart`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <QuantitySelector
            value={quantity}
            max={product.stock}
            onChange={(next) => updateQuantity(product.id, next)}
          />
          <p className="text-base font-medium tabular-nums">
            {formatINR(lineTotal)}
          </p>
        </div>
      </div>
    </motion.li>
  )
}

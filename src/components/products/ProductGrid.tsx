import { motion, useReducedMotion } from 'framer-motion'
import type { Product } from '../../types/product'
import { staggerContainer } from '../../utils/animations'
import { ProductCard } from './ProductCard'

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      variants={reduceMotion ? undefined : staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </motion.div>
  )
}

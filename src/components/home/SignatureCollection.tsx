import { motion, useReducedMotion } from 'framer-motion'
import type { Product } from '../../types/product'
import { fadeUp, staggerContainer } from '../../utils/animations'
import { ProductCard } from '../products/ProductCard'

interface SignatureCollectionProps {
  products: Product[]
}

export function SignatureCollection({ products }: SignatureCollectionProps) {
  const reduceMotion = useReducedMotion()
  const featured = products.filter((p) => p.featured).slice(0, 4)

  if (featured.length === 0) return null

  return (
    <section className="border-b border-line bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <motion.div
          variants={reduceMotion ? undefined : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="mb-10 max-w-2xl"
        >
          <p className="editorial-caption">03 / Signature</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Signature collection.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-silver sm:text-base">
            A short edit of campaign frames — proportion-led, distinctive, and
            ready for everyday wear.
          </p>
        </motion.div>

        <motion.div
          variants={reduceMotion ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {featured.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

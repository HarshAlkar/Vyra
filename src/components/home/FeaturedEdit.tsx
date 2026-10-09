import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Product } from '../../types/product'
import { fadeUp } from '../../utils/animations'
import { formatINR } from '../../utils/currency'
import { ProductImage } from '../common/ProductImage'

interface FeaturedEditProps {
  products: Product[]
}

export function FeaturedEdit({ products }: FeaturedEditProps) {
  const reduceMotion = useReducedMotion()
  const [hero, second, third] = products

  if (!hero) return null

  return (
    <section id="featured" className="scroll-mt-20 border-b border-line bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <motion.div
          variants={reduceMotion ? undefined : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <p className="editorial-caption">01 / The Collection</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-tight">
              Frames for your own frequency.
            </h2>
          </div>
          <Link
            to="/collection"
            className="text-xs font-medium tracking-[0.16em] uppercase text-cobalt underline-offset-4 hover:underline"
          >
            View all frames
          </Link>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-12 md:grid-rows-2 md:gap-5">
          <Link
            to={`/products/${hero.slug}`}
            className="group relative overflow-hidden bg-ink md:col-span-7 md:row-span-2"
          >
            <div className="aspect-[4/5] md:aspect-auto md:h-full md:min-h-[36rem]">
              <ProductImage
                src={hero.image}
                alt={hero.name}
                className="transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/70 to-transparent p-6 text-paper">
              <p className="editorial-caption text-silver">{hero.category}</p>
              <h3 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
                {hero.name}
              </h3>
              <p className="mt-1 text-sm text-silver">{formatINR(hero.price)}</p>
            </div>
          </Link>

          {second ? (
            <Link
              to={`/products/${second.slug}`}
              className="group relative overflow-hidden bg-line/30 md:col-span-5"
            >
              <div className="aspect-[5/4]">
                <ProductImage
                  src={second.image}
                  alt={second.name}
                  className="transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="border border-t-0 border-line bg-surface p-4">
                <p className="editorial-caption">{second.frameShape}</p>
                <h3 className="mt-1 font-display text-lg font-semibold">
                  {second.name}
                </h3>
                <p className="mt-1 text-sm tabular-nums">{formatINR(second.price)}</p>
              </div>
            </Link>
          ) : null}

          {third ? (
            <Link
              to={`/products/${third.slug}`}
              className="group relative overflow-hidden bg-line/30 md:col-span-5"
            >
              <div className="aspect-[5/4]">
                <ProductImage
                  src={third.image}
                  alt={third.name}
                  className="transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="border border-t-0 border-line bg-surface p-4">
                <p className="editorial-caption">{third.frameShape}</p>
                <h3 className="mt-1 font-display text-lg font-semibold">
                  {third.name}
                </h3>
                <p className="mt-1 text-sm tabular-nums">{formatINR(third.price)}</p>
              </div>
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  )
}

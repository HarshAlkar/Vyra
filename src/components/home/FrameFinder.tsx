import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProductsByStyle } from '../../hooks/useProducts'
import type { FrameStyle } from '../../types/product'
import { fadeUp } from '../../utils/animations'
import { formatINR } from '../../utils/currency'
import { ProductImage } from '../common/ProductImage'

const styles: { id: FrameStyle; label: string; blurb: string }[] = [
  { id: 'minimal', label: 'Minimal', blurb: 'Thin lines. Quiet presence.' },
  { id: 'bold', label: 'Bold', blurb: 'Strong brows. Statement scale.' },
  { id: 'classic', label: 'Classic', blurb: 'Familiar silhouettes, refined.' },
  {
    id: 'experimental',
    label: 'Experimental',
    blurb: 'Geometry that breaks the grid.',
  },
]

export function FrameFinder() {
  const reduceMotion = useReducedMotion()
  const [selected, setSelected] = useState<FrameStyle | null>(null)

  const matches = useMemo(
    () => (selected ? getProductsByStyle(selected).slice(0, 4) : []),
    [selected],
  )

  return (
    <section id="finder" className="scroll-mt-20 border-b border-line bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <motion.div
          variants={reduceMotion ? undefined : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="max-w-2xl"
        >
          <p className="editorial-caption">04 / Frame Finder</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Find your frame.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-silver sm:text-base">
            Pick a style preference. We surface matching frames from the local
            catalogue — not a face-shape diagnosis or prescription tool.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {styles.map((style) => {
            const active = selected === style.id
            return (
              <button
                key={style.id}
                type="button"
                onClick={() => setSelected(style.id)}
                aria-pressed={active}
                className={[
                  'border px-5 py-6 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt',
                  active
                    ? 'border-cobalt bg-cobalt text-paper'
                    : 'border-line bg-paper text-ink hover:border-ink',
                ].join(' ')}
              >
                <p className="font-display text-xl font-semibold">{style.label}</p>
                <p
                  className={[
                    'mt-2 text-sm',
                    active ? 'text-paper/80' : 'text-silver',
                  ].join(' ')}
                >
                  {style.blurb}
                </p>
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={selected}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              className="mt-10"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-sm text-silver">
                  {matches.length} matching{' '}
                  {matches.length === 1 ? 'frame' : 'frames'}
                </p>
                <Link
                  to={`/collection?style=${selected}`}
                  className="text-xs tracking-[0.14em] uppercase text-cobalt underline-offset-4 hover:underline"
                >
                  See all matches
                </Link>
              </div>

              {matches.length === 0 ? (
                <p className="border border-dashed border-line px-4 py-10 text-center text-sm text-silver">
                  No frames in this style yet. Try another preference.
                </p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {matches.map((product) => (
                    <Link
                      key={product.id}
                      to={`/products/${product.slug}`}
                      className="group border border-line bg-paper"
                    >
                      <div className="aspect-[4/5] overflow-hidden">
                        <ProductImage
                          src={product.image}
                          alt={product.name}
                          className="transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-3">
                        <p className="font-display text-base font-semibold">
                          {product.name}
                        </p>
                        <p className="mt-1 text-sm tabular-nums">
                          {formatINR(product.price)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  )
}

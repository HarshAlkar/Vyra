import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { ProductImage } from '../common/ProductImage'

interface ProductGalleryProps {
  name: string
  images: string[]
}

export function ProductGallery({ name, images }: ProductGalleryProps) {
  const reduceMotion = useReducedMotion()
  const gallery = images.length > 0 ? images : []
  const [active, setActive] = useState(0)
  const current = gallery[active] ?? gallery[0]

  if (!current) {
    return (
      <div className="aspect-[4/5] border border-line bg-line/40" aria-hidden="true" />
    )
  }

  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden border border-line bg-line/30">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <ProductImage src={current} alt={`${name} view ${active + 1}`} eager />
          </motion.div>
        </AnimatePresence>
      </div>

      {gallery.length > 1 ? (
        <div
          className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5"
          role="listbox"
          aria-label="Product images"
        >
          {gallery.map((src, index) => {
            const selected = index === active
            return (
              <button
                key={`${src}-${index}`}
                type="button"
                role="option"
                aria-selected={selected}
                aria-label={`Show image ${index + 1}`}
                onClick={() => setActive(index)}
                className={[
                  'aspect-square overflow-hidden border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt',
                  selected ? 'border-ink' : 'border-line hover:border-ink/50',
                ].join(' ')}
              >
                <ProductImage src={src} alt="" />
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

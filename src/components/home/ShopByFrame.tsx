import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { fadeUp } from '../../utils/animations'
import { ProductImage } from '../common/ProductImage'

const categories = [
  {
    label: 'Optical Frames',
    query: 'Optical Frames',
    image:
      'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&h=1000&fit=crop',
  },
  {
    label: 'Sunglasses',
    query: 'Sunglasses',
    image:
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&h=1000&fit=crop',
  },
  {
    label: 'Aviator',
    query: 'Aviator',
    image:
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=1000&fit=crop',
  },
  {
    label: 'Wayfarer',
    query: 'Wayfarer',
    image:
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&h=1000&fit=crop',
  },
  {
    label: 'Round Frames',
    query: 'Round Frames',
    image:
      'https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=800&h=1000&fit=crop',
  },
  {
    label: 'Geometric Frames',
    query: 'Geometric Frames',
    image:
      'https://images.unsplash.com/photo-1625591340248-6d289ad13a74?w=800&h=1000&fit=crop',
  },
  {
    label: 'Blue-Light Glasses',
    query: 'Blue-Light Glasses',
    image:
      'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=800&h=1000&fit=crop',
  },
]

export function ShopByFrame() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="border-b border-line bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <motion.div
          variants={reduceMotion ? undefined : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <p className="editorial-caption text-silver">02 / Shop by Frame</p>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-bold sm:text-4xl">
            Choose a silhouette.
          </h2>
        </motion.div>

        <div className="mt-10 flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-4 md:overflow-visible md:pb-0 lg:grid-cols-7">
          {categories.map((category, index) => (
            <Link
              key={category.label}
              to={`/collection?category=${encodeURIComponent(category.query)}`}
              className="group relative min-w-[9.5rem] snap-start overflow-hidden md:min-w-0"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <ProductImage
                  src={category.image}
                  alt={category.label}
                  className="opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-3">
                <p className="text-[10px] tracking-[0.16em] text-silver uppercase">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <p className="mt-1 text-sm font-medium leading-snug">
                  {category.label}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp } from '../../utils/animations'
import { ProductImage } from '../common/ProductImage'

export function BrandStory() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="story" className="scroll-mt-20 border-b border-line bg-paper">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-2 lg:gap-16 lg:px-8 lg:py-28">
        <motion.div
          variants={reduceMotion ? undefined : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="relative overflow-hidden"
        >
          <div className="aspect-[4/5]">
            <ProductImage
              src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1000&h=1250&fit=crop"
              alt="Close study of a metal eyewear frame"
            />
          </div>
          <p className="absolute left-4 top-4 bg-ink px-2 py-1 text-[10px] tracking-[0.16em] text-paper uppercase">
            Form study
          </p>
        </motion.div>

        <motion.div
          variants={reduceMotion ? undefined : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <p className="editorial-caption">05 / Our Story</p>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.05]">
            Not made to blend in.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-silver">
            Designed around form, proportion, and the details that make a frame
            unmistakably yours. VYRA is a fictional eyewear label built for this
            assessment — focused on silhouette, material, and how a frame sits
            in a portrait.
          </p>
          <div className="mt-8 h-px w-16 bg-cobalt" aria-hidden="true" />
          <p className="mt-6 text-sm tracking-[0.08em] text-ink uppercase">
            See Beyond Ordinary.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

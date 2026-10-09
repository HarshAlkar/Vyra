import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { fadeUp } from '../../utils/animations'
import { Button } from '../common/Button'

export function FinalCTA() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="bg-ink text-paper">
      <motion.div
        variants={reduceMotion ? undefined : fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
      >
        <p className="editorial-caption text-silver">06 / Next</p>
        <h2 className="max-w-3xl font-display text-[clamp(2.4rem,6vw,5rem)] font-bold leading-[1.05]">
          Your next point of view starts here.
        </h2>
        <Link to="/collection">
          <Button variant="primary" size="lg">
            Enter the collection
          </Button>
        </Link>
      </motion.div>
    </section>
  )
}

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { pageVariants, reducedMotionVariants } from '../../utils/animations'

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      variants={reduceMotion ? reducedMotionVariants : pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex-1"
    >
      {children}
    </motion.div>
  )
}

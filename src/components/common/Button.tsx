import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'inverse' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  form?: string
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-cobalt text-paper hover:bg-cobalt-dark focus-visible:ring-cobalt',
  secondary:
    'bg-transparent text-ink border border-ink hover:bg-ink hover:text-paper focus-visible:ring-ink',
  ghost:
    'bg-transparent text-ink hover:bg-ink/5 focus-visible:ring-ink',
  inverse:
    'bg-paper text-ink hover:bg-white focus-visible:ring-paper',
  danger:
    'bg-transparent text-red-600 hover:bg-red-50 focus-visible:ring-red-600',
}

const sizeClasses: Record<Size, string> = {
  sm: 'h-9 px-3 text-xs tracking-wide',
  md: 'h-11 px-5 text-sm tracking-wide',
  lg: 'h-12 px-6 text-sm tracking-wide',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  type = 'button',
  onClick,
  form,
}: ButtonProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.button
      type={type}
      form={form}
      onClick={onClick}
      whileTap={disabled || reduceMotion ? undefined : { scale: 0.98 }}
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center gap-2 font-medium uppercase transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:cursor-not-allowed disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
    >
      {children}
    </motion.button>
  )
}

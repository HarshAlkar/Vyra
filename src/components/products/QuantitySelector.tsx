import { Minus, Plus } from 'lucide-react'

interface QuantitySelectorProps {
  value: number
  min?: number
  max: number
  onChange: (value: number) => void
  id?: string
}

export function QuantitySelector({
  value,
  min = 1,
  max,
  onChange,
  id,
}: QuantitySelectorProps) {
  return (
    <div className="inline-flex items-center border border-line bg-surface">
      <button
        type="button"
        onClick={() => {
          if (value > min) onChange(value - 1)
        }}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className="flex h-10 w-10 items-center justify-center text-ink transition-colors hover:bg-paper disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cobalt"
      >
        <Minus className="h-4 w-4" />
      </button>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={value}
        aria-label="Quantity"
        onChange={(e) => {
          const next = Number(e.target.value)
          if (Number.isNaN(next)) return
          onChange(Math.max(min, Math.min(max, next)))
        }}
        className="h-10 w-12 border-x border-line bg-transparent text-center text-sm tabular-nums text-ink focus:outline-none"
      />
      <button
        type="button"
        onClick={() => {
          if (value < max) onChange(value + 1)
        }}
        disabled={value >= max}
        aria-label="Increase quantity"
        className="flex h-10 w-10 items-center justify-center text-ink transition-colors hover:bg-paper disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cobalt"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )
}

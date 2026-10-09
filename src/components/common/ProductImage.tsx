import { useEffect, useState } from 'react'

interface ProductImageProps {
  src: string
  alt: string
  className?: string
  eager?: boolean
}

const FALLBACK =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
      <rect width="800" height="1000" fill="#D9D4C8"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#A8ADB8" font-family="sans-serif" font-size="28">Image unavailable</text>
    </svg>`,
  )

export function ProductImage({
  src,
  alt,
  className = '',
  eager = false,
}: ProductImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src)

  useEffect(() => {
    setCurrentSrc(src)
  }, [src])

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => {
        if (currentSrc !== FALLBACK) setCurrentSrc(FALLBACK)
      }}
      className={`h-full w-full object-cover ${className}`}
    />
  )
}

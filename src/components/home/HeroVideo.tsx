import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../common/Button'

const VIDEO_SRC = '/videos/vyra-hero.mp4'
const POSTER_SRC = '/images/hero-poster.jpg'

export function HeroVideo() {
  const reduceMotion = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoFailed, setVideoFailed] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video || videoFailed) return

    // React's muted attribute can miss the DOM property; set it before play().
    video.muted = true
    video.defaultMuted = true
    video.playsInline = true

    const tryPlay = () => {
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay can be blocked until a gesture; keep poster visible via video.poster
        })
      }
    }

    if (video.readyState >= 2) {
      tryPlay()
    } else {
      video.addEventListener('canplay', tryPlay, { once: true })
    }

    return () => {
      video.removeEventListener('canplay', tryPlay)
    }
  }, [videoFailed])

  return (
    <section className="relative flex min-h-dvh items-end overflow-hidden bg-ink text-paper">
      {!videoFailed ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          poster={POSTER_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={() => setVideoFailed(true)}
          aria-hidden="true"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      ) : (
        <img
          src={POSTER_SRC}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        />
      )}

      <div
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="editorial-caption text-silver"
        >
          Optical Study / 001
        </motion.p>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mt-6 font-display text-[clamp(3.5rem,14vw,9rem)] font-bold leading-[0.9] tracking-tight"
        >
          VYRA
        </motion.p>

        <h1 className="mt-4 max-w-xl overflow-hidden font-display text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-tight">
          <motion.span
            className="block"
            initial={reduceMotion ? false : { y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            A different point
          </motion.span>
          <motion.span
            className="block text-silver"
            initial={reduceMotion ? false : { y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          >
            of view.
          </motion.span>
        </h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mt-5 max-w-md text-sm leading-relaxed text-silver sm:text-base"
        >
          Contemporary frames for people who treat personal style as an
          extension of identity — not a uniform.
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Link to="/collection">
            <Button variant="primary" size="lg">
              Explore the collection
            </Button>
          </Link>
          <Link to="/#finder">
            <Button
              variant="secondary"
              size="lg"
              className="border-paper text-paper hover:bg-paper hover:text-ink"
            >
              Find your frame
            </Button>
          </Link>
        </motion.div>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="mt-10 max-w-xs text-[11px] leading-relaxed tracking-[0.12em] text-silver uppercase"
        >
          Campaign film — light, proportion, and the line of the face.
        </motion.p>
      </div>

      <a
        href="#featured"
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-silver transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
        aria-label="Scroll to collection"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <ChevronDown
          className={reduceMotion ? 'h-4 w-4' : 'h-4 w-4 animate-bounce'}
          aria-hidden="true"
        />
      </a>
    </section>
  )
}

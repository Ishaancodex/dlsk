'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
    },
  }

  return (
    <section ref={containerRef} className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 scale-110"
      >
        <img
          src="/images/hero-image.jpg"
          alt="DLSK, Elegant Indian Traditional Wear"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-ink/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/50 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            {/* Eyebrow */}
            <motion.div variants={itemVariants}>
              <span className="inline-block font-sans text-xs tracking-[0.3em] text-gold uppercase mb-6">
                New Collection 2026
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-ivory leading-[0.95] mb-6"
            >
              Elegance Rooted{' '}
              <em className="italic text-gold-light">in Tradition</em>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="font-sans text-base md:text-lg text-ivory/80 leading-relaxed mb-10 max-w-lg"
            >
              Discover handcrafted Indian suits for the modern woman — where centuries of artisan heritage meet contemporary elegance.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
              <Link
                href="/collections"
                className="inline-flex items-center justify-center px-8 py-4 bg-rose text-ivory font-sans font-medium text-sm tracking-wide rounded-sm hover:bg-rose-dark transition-all duration-200 shadow-rose/30 shadow-lg"
              >
                Shop Now
              </Link>
              <Link
                href="/collections"
                className="inline-flex items-center justify-center px-8 py-4 border border-ivory/50 text-ivory font-sans font-medium text-sm tracking-wide rounded-sm hover:bg-ivory/10 hover:border-ivory transition-all duration-200 backdrop-blur-sm"
              >
                Explore Collections
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-sans text-xs tracking-widest text-ivory/50 uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-ivory/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}

'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const touchStartX = useRef<number>(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 50) {
      if (delta > 0) {
        setActiveIndex((prev) => Math.min(prev + 1, images.length - 1))
      } else {
        setActiveIndex((prev) => Math.max(prev - 1, 0))
      }
    }
  }

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-[600px] pb-1 md:pb-0 scrollbar-hide">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`shrink-0 w-16 h-20 md:w-20 md:h-24 rounded-sm overflow-hidden border-2 transition-all duration-200 ${
              activeIndex === i ? 'border-rose' : 'border-transparent opacity-60 hover:opacity-90'
            }`}
          >
            <img
              src={img}
              alt={`${productName} view ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div
        className="relative flex-1 aspect-[4/5] rounded-sm overflow-hidden bg-ivory-dark"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 group"
          >
            <img
              src={images[activeIndex]}
              alt={`${productName} — view ${activeIndex + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            {activeIndex > 0 && (
              <button
                onClick={() => setActiveIndex((prev) => prev - 1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-ivory/80 backdrop-blur-sm rounded-full flex items-center justify-center text-ink hover:bg-white transition-colors shadow-soft"
                aria-label="Previous image"
              >
                <ChevronLeft size={18} />
              </button>
            )}
            {activeIndex < images.length - 1 && (
              <button
                onClick={() => setActiveIndex((prev) => prev + 1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-ivory/80 backdrop-blur-sm rounded-full flex items-center justify-center text-ink hover:bg-white transition-colors shadow-soft"
                aria-label="Next image"
              >
                <ChevronRight size={18} />
              </button>
            )}
          </>
        )}

        {/* Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`rounded-full transition-all duration-200 ${
                  activeIndex === i ? 'w-4 h-1.5 bg-ivory' : 'w-1.5 h-1.5 bg-ivory/50'
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

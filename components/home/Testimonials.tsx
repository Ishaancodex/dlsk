'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    city: 'Delhi',
    rating: 5,
    quote:
      "I wore the Crimson Jacquard Suit to my cousin's wedding and received so many compliments. The fabric quality is absolutely exceptional — you can feel the difference from the first touch. DLSK has become my go-to for every celebration.",
  },
  {
    id: 2,
    name: 'Meena Iyer',
    city: 'Bangalore',
    rating: 5,
    quote:
      "As someone who's particular about authentic Indian craftsmanship, I'm genuinely impressed. The Phulkari embroidery on my suit is so detailed and precise. The artisans at DLSK truly know their craft. Worth every rupee.",
  },
  {
    id: 3,
    name: 'Ananya Gupta',
    city: 'Mumbai',
    rating: 5,
    quote:
      "Ordered the Saffron Bloom Cotton Suit for a casual family gathering and it was perfect. The fabric is so breathable and the fit was exactly as described. The packaging was beautiful too — felt like receiving a luxury gift.",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? 'text-gold fill-gold' : 'text-ink-light'}
        />
      ))}
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-sans text-xs tracking-[0.3em] text-gold uppercase">Reviews</span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-ink mt-3 mb-4">
            Loved by Women Across India
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto" />
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-ivory p-8 rounded-sm border border-ivory-darker hover:border-gold/30 hover:shadow-soft transition-all duration-300 flex flex-col"
            >
              <StarRating rating={testimonial.rating} />
              <blockquote className="font-serif text-lg font-medium italic text-ink leading-relaxed mt-4 mb-6 flex-1">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <footer className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-pale flex items-center justify-center">
                  <span className="font-serif text-rose font-medium">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-sans text-sm font-medium text-ink">{testimonial.name}</p>
                  <p className="font-sans text-xs text-ink-warm">{testimonial.city}</p>
                </div>
              </footer>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

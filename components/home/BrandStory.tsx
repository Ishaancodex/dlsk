'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function BrandStory() {
  return (
    <section className="py-20 md:py-28 bg-ivory-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <img
                src="/images/founder.jpg"
                alt="DLSK Brand Story — Aditya Aggarwal"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative gold border offset */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-gold/30 rounded-sm -z-10" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="font-sans text-xs tracking-[0.3em] text-gold uppercase mb-4 block">
              Our Story
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-ink mb-8 leading-tight">
              Born from Passion,{' '}
              <em className="italic text-rose">Built with Heritage</em>
            </h2>

            <div className="space-y-4 mb-8">
              <p className="font-sans text-base text-ink-warm leading-relaxed">
                DLSK was born from a simple yet profound belief — that the extraordinary craftsmanship of Indian artisans deserves to be celebrated, not archived. Founded by Aditya Aggarwal in 2019, the brand bridges centuries of tradition with the sensibilities of the modern Indian woman.
              </p>
              <p className="font-sans text-base text-ink-warm leading-relaxed">
                Every suit in our collection is the result of hundreds of hours of meticulous craft — from hand-block printing in Jaipur to delicate zardosi embroidery from Lucknow. We work directly with artisan communities, ensuring fair wages and preserving techniques that have been passed down for generations.
              </p>
            </div>

            {/* Quote */}
            <blockquote className="relative border-l-2 border-gold pl-6 mb-8">
              <p className="font-serif text-xl font-medium italic text-ink leading-relaxed mb-3">
                &ldquo;I started DLSK because I believe every Indian woman deserves to wear something that carries the weight of our heritage — and the lightness of modern joy.&rdquo;
              </p>
              <footer className="font-sans text-sm text-ink-warm">
                — Aditya Aggarwal, Founder
              </footer>
            </blockquote>

            <Link
              href="/founder"
              className="inline-flex items-center gap-2 font-sans text-sm font-medium text-rose hover:text-rose-dark transition-colors group"
            >
              Meet the Founder
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

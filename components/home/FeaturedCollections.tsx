'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { COLLECTIONS } from '@/data/products'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
}

export function FeaturedCollections() {
  return (
    <section className="py-20 md:py-28 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-sans text-xs tracking-[0.3em] text-gold uppercase">Explore</span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-ink mt-3 mb-4">
            Our Collections
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto" />
        </motion.div>

        {/* Collection Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {COLLECTIONS.map((collection) => (
            <motion.div key={collection.slug} variants={cardVariants}>
              <Link href={`/collection/${collection.slug}`} className="group block">
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-sm aspect-[3/4] bg-ivory-dark">
                  <motion.img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent transition-opacity duration-300 group-hover:from-ink/60" />

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="font-sans text-xs tracking-widest text-gold uppercase mb-2">
                      {collection.theme}
                    </p>
                    <h3 className="font-serif text-2xl font-medium text-ivory mb-2">
                      {collection.name}
                    </h3>
                    <p className="font-sans text-sm text-ivory/70 mb-4 leading-relaxed">
                      {collection.description}
                    </p>
                    <div className="flex items-center gap-2 text-gold font-sans text-sm font-medium group-hover:gap-3 transition-all duration-200">
                      Explore
                      <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

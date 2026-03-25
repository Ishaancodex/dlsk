'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { getBestsellers } from '@/data/products'
import { ProductCard } from '@/components/product/ProductCard'

export function BestSellers() {
  const bestsellers = getBestsellers()

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4"
        >
          <div>
            <span className="font-sans text-xs tracking-[0.3em] text-gold uppercase">Most Loved</span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-ink mt-2 mb-3">
              Bestsellers
            </h2>
            <div className="w-16 h-0.5 bg-gold" />
          </div>
          <Link
            href="/collections"
            className="flex items-center gap-2 font-sans text-sm text-rose hover:text-rose-dark transition-colors group"
          >
            View All
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {bestsellers.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

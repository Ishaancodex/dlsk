'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Store, MapPin, Tag } from 'lucide-react'

const stats = [
  { icon: <Store size={18} />, value: '200+', label: 'Retail Partners' },
  { icon: <MapPin size={18} />, value: '15+', label: 'States Covered' },
  { icon: <Tag size={18} />, value: '40%', label: 'Wholesale Discount' },
]

export function BulkOrderBanner() {
  return (
    <section className="py-20 md:py-28 bg-ink overflow-hidden relative">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose rounded-full translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block font-sans text-xs tracking-[0.3em] text-gold uppercase mb-6 px-3 py-1.5 border border-gold/30 rounded-sm">
              B2B & Wholesale
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-ivory mb-6 leading-tight">
              Stock DLSK in{' '}
              <em className="text-gold italic">Your Store</em>
            </h2>
            <p className="font-sans text-base text-ivory/70 leading-relaxed mb-8 max-w-lg">
              Join our growing network of retailers across India. We offer competitive wholesale pricing, minimum order flexibility, and dedicated account support to help your business thrive.
            </p>
            <p className="font-sans text-sm text-ivory/50 mb-8">
              MOQ starts at 50 pieces with up to 40% wholesale pricing.
            </p>
            <Link
              href="/contact?type=wholesale"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-ink font-sans font-medium text-sm tracking-wide rounded-sm hover:bg-gold-light transition-all duration-200 group"
            >
              Enquire for Wholesale
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Right: Stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-1 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-6 p-6 bg-ivory/5 border border-ivory/10 rounded-sm hover:border-gold/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold/20 transition-colors">
                  {stat.icon}
                </div>
                <div>
                  <p className="font-serif text-3xl font-medium text-ivory">{stat.value}</p>
                  <p className="font-sans text-sm text-ivory/50">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { getProductsByCollection, getCollectionBySlug, Product } from '@/data/products'
import { ProductCard } from '@/components/product/ProductCard'
import { ProductFilters, FilterState } from '@/components/product/ProductFilters'
import { ProductGridSkeleton } from '@/components/ui/SkeletonLoader'

const DEFAULT_FILTERS: FilterState = {
  priceMin: 0,
  priceMax: 20000,
  sizes: [],
  fabrics: [],
  occasions: [],
  sort: 'popularity',
}

function sortProducts(products: Product[], sort: string): Product[] {
  const sorted = [...products]
  switch (sort) {
    case 'price-low': return sorted.sort((a, b) => a.price - b.price)
    case 'price-high': return sorted.sort((a, b) => b.price - a.price)
    case 'newest': return sorted.sort((a, b) => (a.isNew ? -1 : 1) - (b.isNew ? -1 : 1))
    case 'rating': return sorted.sort((a, b) => b.rating - a.rating)
    default: return sorted.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0))
  }
}

export default function CollectionPage() {
  const params = useParams()
  const slug = params.slug as string
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)

  const collection = getCollectionBySlug(slug)
  const allProducts = useMemo(() => getProductsByCollection(slug as 'summer' | 'winter' | 'fancy'), [slug])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter((p) => {
      if (p.price < filters.priceMin || p.price > filters.priceMax) return false
      if (filters.sizes.length > 0 && !filters.sizes.some((s) => p.sizes.includes(s))) return false
      if (filters.fabrics.length > 0 && !filters.fabrics.includes(p.fabric)) return false
      if (filters.occasions.length > 0 && !filters.occasions.includes(p.occasion)) return false
      return true
    })
    return sortProducts(filtered, filters.sort)
  }, [allProducts, filters])

  if (!collection) {
    return (
      <div className="pt-40 pb-20 text-center">
        <p className="font-serif text-2xl text-ink mb-4">Collection not found</p>
        <Link href="/collections" className="btn-primary">View All Collections</Link>
      </div>
    )
  }

  return (
    <div className="pt-20">
      {/* Collection Hero */}
      <div className="relative overflow-hidden bg-ink py-20 md:py-28">
        <div className="absolute inset-0 opacity-20">
          <img
            src={collection.image}
            alt={collection.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-ivory/40 font-sans text-xs mb-6">
            <Link href="/" className="hover:text-ivory transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/collections" className="hover:text-ivory transition-colors">Collections</Link>
            <ChevronRight size={12} />
            <span className="text-gold">{collection.name}</span>
          </div>
          <span className="font-sans text-xs tracking-[0.3em] text-gold uppercase mb-4 block">
            {collection.theme}
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-medium text-ivory mb-4">
            {collection.name}
          </h1>
          <p className="font-sans text-base text-ivory/60 max-w-xl">
            {collection.longDescription}
          </p>
          <p className="font-sans text-sm text-ivory/40 mt-3">
            {allProducts.length} pieces
          </p>
        </div>
      </div>

      {/* Products Section */}
      <div className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-10">
            {/* Filters Sidebar */}
            <ProductFilters
              filters={filters}
              onChange={setFilters}
              totalProducts={allProducts.length}
              filteredCount={filteredProducts.length}
            />

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {loading ? (
                <ProductGridSkeleton count={4} />
              ) : filteredProducts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <p className="font-serif text-2xl text-ink mb-3">No products found</p>
                  <p className="font-sans text-sm text-ink-warm mb-6">
                    Try adjusting your filters to see more options.
                  </p>
                  <button
                    onClick={() => setFilters(DEFAULT_FILTERS)}
                    className="btn-primary"
                  >
                    Clear Filters
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
                >
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <ProductCard product={product} showCollection={false} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

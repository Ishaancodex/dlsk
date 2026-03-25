'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, SlidersHorizontal, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface FilterState {
  priceMin: number
  priceMax: number
  sizes: string[]
  fabrics: string[]
  occasions: string[]
  sort: string
}

interface ProductFiltersProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
  totalProducts: number
  filteredCount: number
}

const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const ALL_FABRICS = ['Pure Cotton', 'Georgette', 'Linen', 'Chanderi', 'Velvet', 'Wool Blend', 'Jacquard', 'Pashmina', 'Net + Silk', 'Georgette + Silk', 'Cotton Silk', 'Raw Silk']
const ALL_OCCASIONS = ['Casual', 'Party', 'Office', 'Festival', 'Wedding', 'Reception', 'Engagement']
const SORT_OPTIONS = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'rating', label: 'Highest Rated' },
]

export function ProductFilters({ filters, onChange, totalProducts, filteredCount }: ProductFiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onChange({ ...filters, [key]: value })
  }

  const toggleArray = (arr: string[], value: string) =>
    arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]

  const clearAll = () => {
    onChange({
      priceMin: 0,
      priceMax: 20000,
      sizes: [],
      fabrics: [],
      occasions: [],
      sort: 'popularity',
    })
  }

  const hasActiveFilters =
    filters.sizes.length > 0 ||
    filters.fabrics.length > 0 ||
    filters.occasions.length > 0 ||
    filters.priceMin > 0 ||
    filters.priceMax < 20000

  const FiltersContent = () => (
    <div className="space-y-8">
      {/* Sort */}
      <div>
        <h3 className="font-sans text-xs font-medium tracking-widest text-ink-warm uppercase mb-3">Sort By</h3>
        <div className="relative">
          <select
            value={filters.sort}
            onChange={(e) => updateFilter('sort', e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-ivory-darker rounded-sm font-sans text-sm text-ink appearance-none focus:outline-none focus:border-gold"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-warm pointer-events-none" />
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-sans text-xs font-medium tracking-widest text-ink-warm uppercase mb-3">Price Range</h3>
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={filters.priceMin}
            onChange={(e) => updateFilter('priceMin', Number(e.target.value))}
            placeholder="Min"
            min={0}
            className="w-full px-3 py-2 bg-white border border-ivory-darker rounded-sm font-sans text-sm text-ink focus:outline-none focus:border-gold"
          />
          <span className="text-ink-warm text-sm">—</span>
          <input
            type="number"
            value={filters.priceMax}
            onChange={(e) => updateFilter('priceMax', Number(e.target.value))}
            placeholder="Max"
            max={50000}
            className="w-full px-3 py-2 bg-white border border-ivory-darker rounded-sm font-sans text-sm text-ink focus:outline-none focus:border-gold"
          />
        </div>
      </div>

      {/* Size */}
      <div>
        <h3 className="font-sans text-xs font-medium tracking-widest text-ink-warm uppercase mb-3">Size</h3>
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.map((size) => (
            <button
              key={size}
              onClick={() => updateFilter('sizes', toggleArray(filters.sizes, size))}
              className={cn(
                'px-3 py-1.5 text-xs font-sans font-medium rounded-sm border transition-all duration-150',
                filters.sizes.includes(size)
                  ? 'bg-rose text-ivory border-rose'
                  : 'bg-white text-ink-mid border-ivory-darker hover:border-rose/50'
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Occasion */}
      <div>
        <h3 className="font-sans text-xs font-medium tracking-widest text-ink-warm uppercase mb-3">Occasion</h3>
        <div className="space-y-2">
          {ALL_OCCASIONS.map((occ) => (
            <label key={occ} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.occasions.includes(occ)}
                onChange={() => updateFilter('occasions', toggleArray(filters.occasions, occ))}
                className="w-4 h-4 accent-rose rounded-sm"
              />
              <span className="font-sans text-sm text-ink-mid group-hover:text-rose transition-colors">{occ}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Fabric */}
      <div>
        <h3 className="font-sans text-xs font-medium tracking-widest text-ink-warm uppercase mb-3">Fabric</h3>
        <div className="space-y-2">
          {ALL_FABRICS.slice(0, 6).map((fabric) => (
            <label key={fabric} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.fabrics.includes(fabric)}
                onChange={() => updateFilter('fabrics', toggleArray(filters.fabrics, fabric))}
                className="w-4 h-4 accent-rose rounded-sm"
              />
              <span className="font-sans text-sm text-ink-mid group-hover:text-rose transition-colors">{fabric}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear All */}
      {hasActiveFilters && (
        <button
          onClick={clearAll}
          className="w-full py-2.5 border border-rose/30 text-rose font-sans text-sm font-medium rounded-sm hover:bg-rose-pale transition-colors"
        >
          Clear All Filters
        </button>
      )}
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-lg font-medium text-ink">Filters</h2>
            <span className="font-sans text-xs text-ink-warm">{filteredCount} of {totalProducts}</span>
          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mb-6">
              {filters.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => updateFilter('sizes', filters.sizes.filter((v) => v !== s))}
                  className="flex items-center gap-1 px-2 py-1 bg-rose-pale text-rose text-xs font-sans rounded-sm"
                >
                  {s} <X size={10} />
                </button>
              ))}
              {filters.occasions.map((o) => (
                <button
                  key={o}
                  onClick={() => updateFilter('occasions', filters.occasions.filter((v) => v !== o))}
                  className="flex items-center gap-1 px-2 py-1 bg-rose-pale text-rose text-xs font-sans rounded-sm"
                >
                  {o} <X size={10} />
                </button>
              ))}
            </div>
          )}

          <FiltersContent />
        </div>
      </aside>

      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4 flex items-center justify-between">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 border border-ivory-darker rounded-sm font-sans text-sm text-ink-mid hover:border-rose transition-colors"
        >
          <SlidersHorizontal size={16} />
          Filters {hasActiveFilters && <span className="w-4 h-4 bg-rose text-ivory text-[10px] rounded-full flex items-center justify-center">{filters.sizes.length + filters.occasions.length + filters.fabrics.length}</span>}
        </button>
        <div className="relative">
          <select
            value={filters.sort}
            onChange={(e) => updateFilter('sort', e.target.value)}
            className="pl-3 pr-8 py-2.5 bg-white border border-ivory-darker rounded-sm font-sans text-sm text-ink appearance-none focus:outline-none focus:border-gold"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-warm pointer-events-none" />
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-ink/50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-80 bg-ivory shadow-strong overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-ivory-darker">
                <h2 className="font-serif text-xl font-medium text-ink">Filters</h2>
                <button onClick={() => setMobileOpen(false)} className="p-2 text-ink-warm hover:text-rose">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6">
                <FiltersContent />
              </div>
              <div className="p-6 border-t border-ivory-darker">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-full py-3 bg-rose text-ivory font-sans text-sm font-medium rounded-sm"
                >
                  Show {filteredCount} Products
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { Product } from '@/data/products'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'
import { formatPrice } from '@/lib/utils'

interface StickyAddToCartProps {
  product: Product
  triggerRef: React.RefObject<HTMLElement>
}

export function StickyAddToCart({ product, triggerRef }: StickyAddToCartProps) {
  const [visible, setVisible] = useState(false)
  const [selectedSize, setSelectedSize] = useState(product.sizes[2] || product.sizes[0])
  const { addItem } = useCart()
  const { showToast } = useToast()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting)
      },
      { threshold: 0, rootMargin: '0px 0px 0px 0px' }
    )

    const el = triggerRef.current
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [triggerRef])

  const handleAdd = () => {
    addItem(product, 1, selectedSize)
    showToast(`${product.name} added to cart`, 'success')
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-ivory/95 backdrop-blur-md border-t border-ivory-darker shadow-strong"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-4">
              {/* Product Mini Info */}
              <div className="hidden sm:flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-12 rounded-sm overflow-hidden shrink-0">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-sans text-sm font-medium text-ink truncate">{product.name}</p>
                  <p className="font-sans text-sm font-semibold text-rose">{formatPrice(product.price)}</p>
                </div>
              </div>

              {/* Size Selector */}
              <div className="flex items-center gap-2">
                <span className="font-sans text-xs text-ink-warm hidden sm:block">Size:</span>
                <div className="flex items-center gap-1">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-2.5 py-1 text-xs font-sans font-medium rounded-sm border transition-all duration-150 ${
                        selectedSize === size
                          ? 'bg-rose text-ivory border-rose'
                          : 'bg-white text-ink-mid border-ivory-darker hover:border-rose/50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-6 py-2.5 bg-rose text-ivory font-sans text-sm font-medium rounded-sm hover:bg-rose-dark transition-colors whitespace-nowrap"
              >
                <ShoppingBag size={15} />
                Add to Cart
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

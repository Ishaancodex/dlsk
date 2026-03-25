'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, Star, ShoppingBag } from 'lucide-react'
import { Product } from '@/data/products'
import { useWishlist } from '@/context/WishlistContext'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'
import { Badge } from '@/components/ui/Badge'
import { formatPrice, discount } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  showCollection?: boolean
}

export function ProductCard({ product, showCollection = true }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const { isWishlisted, toggle } = useWishlist()
  const { addItem } = useCart()
  const { showToast } = useToast()
  const wishlisted = isWishlisted(product.id)

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggle(product.id)
    showToast(
      wishlisted ? 'Removed from wishlist' : 'Added to wishlist',
      wishlisted ? 'info' : 'success'
    )
  }

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, 1, product.sizes[2]) // Default to M size
    showToast(`${product.name} added to cart`, 'success')
  }

  const discountPct =
    product.originalPrice ? discount(product.price, product.originalPrice) : null

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative flex flex-col"
    >
      <Link href={`/product/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-sm aspect-[3/4] bg-ivory-dark">
          {/* Primary Image */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            style={{ opacity: hovered && product.images[1] ? 0 : 1, transition: 'opacity 0.4s ease, transform 0.7s ease' }}
          />
          {/* Secondary Image */}
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={product.name}
              className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.4s ease, transform 0.7s ease' }}
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isBestseller && <Badge variant="bestseller">Bestseller</Badge>}
            {product.isNew && <Badge variant="new">New</Badge>}
          </div>

          {/* Discount Badge */}
          {discountPct && (
            <div className="absolute top-3 right-3">
              <Badge variant="discount">{discountPct}% off</Badge>
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-ivory/90 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-white"
            style={{ top: discountPct ? '2.5rem' : '0.75rem' }}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              size={14}
              className={wishlisted ? 'fill-rose text-rose' : 'text-ink-warm'}
            />
          </button>

          {/* Quick Add */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={hovered ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute bottom-0 left-0 right-0 p-3"
          >
            <button
              onClick={handleQuickAdd}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-ivory/90 backdrop-blur-sm text-ink font-sans text-xs font-medium tracking-wide rounded-sm hover:bg-white transition-colors"
            >
              <ShoppingBag size={13} />
              Quick Add
            </button>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="mt-3 space-y-1.5">
          {showCollection && (
            <p className="font-sans text-xs tracking-widest text-gold uppercase">
              {product.collection === 'fancy' ? 'Fancy Wear' : `${product.collection.charAt(0).toUpperCase()}${product.collection.slice(1)}`}
            </p>
          )}
          <h3 className="font-serif text-base font-medium text-ink leading-snug group-hover:text-rose transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="font-sans text-sm font-semibold text-ink">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="font-sans text-xs text-ink-light line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={11}
                  className={
                    i < Math.floor(product.rating)
                      ? 'fill-gold text-gold'
                      : 'text-ink-light'
                  }
                />
              ))}
            </div>
            <span className="font-sans text-xs text-ink-warm">({product.reviews})</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

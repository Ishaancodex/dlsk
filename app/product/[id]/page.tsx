'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronRight, Minus, Plus, ShoppingBag, Zap, Package, MessageCircle } from 'lucide-react'
import { getProductById, getRelatedProducts } from '@/data/products'
import { ProductGallery } from '@/components/product/ProductGallery'
import { StickyAddToCart } from '@/components/product/StickyAddToCart'
import { ProductCard } from '@/components/product/ProductCard'
import { Badge } from '@/components/ui/Badge'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'
import { formatPrice, discount } from '@/lib/utils'

const TABS = ['Description', 'Fabric & Care', 'Size Guide', 'Reviews']

export default function ProductPage() {
  const params = useParams()
  const id = params.id as string
  const product = getProductById(id)

  const [selectedSize, setSelectedSize] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [isBulk, setIsBulk] = useState(false)
  const [activeTab, setActiveTab] = useState('Description')
  const [addedToCart, setAddedToCart] = useState(false)
  const [sizeError, setSizeError] = useState(false)

  const addToCartRef = useRef<HTMLElement>(null)
  const { addItem } = useCart()
  const { showToast } = useToast()

  if (!product) {
    return (
      <div className="pt-40 pb-20 text-center">
        <p className="font-serif text-2xl text-ink mb-4">Product not found</p>
        <Link href="/collections" className="btn-primary">Browse Collections</Link>
      </div>
    )
  }

  const relatedProducts = getRelatedProducts(product)
  const discountPct = product.originalPrice ? discount(product.price, product.originalPrice) : null
  const minQty = isBulk ? 50 : 1
  const maxQty = isBulk ? 999 : 10

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true)
      setTimeout(() => setSizeError(false), 2000)
      return
    }
    addItem(product, quantity, selectedSize)
    setAddedToCart(true)
    showToast(`${product.name} added to cart`, 'success')
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const collectionLabel = product.collection === 'fancy'
    ? 'Fancy Wear'
    : product.collection.charAt(0).toUpperCase() + product.collection.slice(1) + ' Collection'

  return (
    <>
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-ink-warm font-sans text-xs mb-8">
            <Link href="/" className="hover:text-rose transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/collections" className="hover:text-rose transition-colors">Collections</Link>
            <ChevronRight size={12} />
            <Link href={`/collection/${product.collection}`} className="hover:text-rose transition-colors">
              {collectionLabel}
            </Link>
            <ChevronRight size={12} />
            <span className="text-ink truncate max-w-[150px]">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Gallery */}
            <ProductGallery images={product.images} productName={product.name} />

            {/* Product Info */}
            <div>
              {/* Collection Badge */}
              <Badge variant="new" className="mb-4">{collectionLabel}</Badge>

              {/* Name */}
              <h1 className="font-serif text-3xl md:text-4xl font-medium text-ink mb-3">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-ink-light'} />
                  ))}
                </div>
                <span className="font-sans text-sm text-ink-warm">{product.rating} ({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-4">
                <span className="font-serif text-3xl font-medium text-rose">
                  {formatPrice(isBulk ? Math.round(product.price * 0.6) : product.price)}
                </span>
                {product.originalPrice && !isBulk && (
                  <span className="font-sans text-base text-ink-light line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {discountPct && !isBulk && (
                  <Badge variant="discount">{discountPct}% off</Badge>
                )}
                {isBulk && (
                  <Badge variant="bestseller">40% Wholesale</Badge>
                )}
              </div>

              {/* Short Description */}
              <p className="font-sans text-sm text-ink-warm leading-relaxed mb-6">
                {product.description.slice(0, 160)}...
              </p>

              {/* Info Chips */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1.5 bg-ivory-dark rounded-sm font-sans text-xs text-ink-mid">
                  {product.fabric}
                </span>
                <span className="px-3 py-1.5 bg-ivory-dark rounded-sm font-sans text-xs text-ink-mid">
                  {product.occasion}
                </span>
                <span className="px-3 py-1.5 bg-ivory-dark rounded-sm font-sans text-xs text-ink-mid flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: product.colorHex }} />
                  {product.color}
                </span>
              </div>

              {/* Order Type Toggle */}
              <div className="mb-6">
                <p className="label-text mb-2">Order Type</p>
                <div className="flex rounded-sm border border-ivory-darker overflow-hidden w-fit">
                  <button
                    onClick={() => { setIsBulk(false); setQuantity(1) }}
                    className={`px-4 py-2 font-sans text-sm transition-colors ${!isBulk ? 'bg-rose text-ivory' : 'bg-white text-ink-mid hover:bg-ivory'}`}
                  >
                    Single Order
                  </button>
                  <button
                    onClick={() => { setIsBulk(true); setQuantity(50) }}
                    className={`px-4 py-2 font-sans text-sm transition-colors ${isBulk ? 'bg-rose text-ivory' : 'bg-white text-ink-mid hover:bg-ivory'}`}
                  >
                    Bulk (50+ pieces)
                  </button>
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-6" ref={addToCartRef as React.RefObject<HTMLDivElement>}>
                <div className="flex items-center justify-between mb-2">
                  <p className="label-text">Select Size</p>
                  <button className="font-sans text-xs text-rose hover:underline">Size Guide</button>
                </div>
                <AnimatePresence>
                  {sizeError && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="font-sans text-xs text-red-500 mb-2"
                    >
                      Please select a size before adding to cart
                    </motion.p>
                  )}
                </AnimatePresence>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => { setSelectedSize(size); setSizeError(false) }}
                      className={`w-12 h-10 font-sans text-sm font-medium rounded-sm border-2 transition-all duration-150 ${
                        selectedSize === size
                          ? 'bg-rose text-ivory border-rose'
                          : sizeError
                          ? 'border-red-300 text-ink-mid hover:border-rose/50'
                          : 'border-ivory-darker text-ink-mid hover:border-rose/50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <p className="label-text mb-2">Quantity {isBulk && '(Min. 50)'}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-ivory-darker rounded-sm overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(minQty, q - (isBulk ? 10 : 1)))}
                      className="w-10 h-10 flex items-center justify-center text-ink-warm hover:bg-ivory transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-12 text-center font-sans text-sm font-medium text-ink">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(maxQty, q + (isBulk ? 10 : 1)))}
                      className="w-10 h-10 flex items-center justify-center text-ink-warm hover:bg-ivory transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  {isBulk && (
                    <span className="font-sans text-sm text-ink-warm">
                      Total: {formatPrice(Math.round(product.price * 0.6) * quantity)}
                    </span>
                  )}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 py-4 bg-rose text-ivory font-sans font-medium text-sm tracking-wide rounded-sm hover:bg-rose-dark transition-colors"
                >
                  <AnimatePresence mode="wait">
                    {addedToCart ? (
                      <motion.span key="added" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        ✓ Added to Cart
                      </motion.span>
                    ) : (
                      <motion.span key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        <ShoppingBag size={16} />
                        Add to Cart
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
                <Link
                  href="/checkout"
                  className="flex-1 flex items-center justify-center gap-2 py-4 bg-ink text-ivory font-sans font-medium text-sm tracking-wide rounded-sm hover:bg-ink/90 transition-colors"
                >
                  <Zap size={16} />
                  Buy Now
                </Link>
              </div>

              {/* Bulk Order CTA */}
              {!isBulk && (
                <div className="border border-gold/40 rounded-sm p-4 bg-gold-pale mb-6">
                  <div className="flex items-start gap-3">
                    <Package size={18} className="text-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="font-sans text-sm font-medium text-ink mb-1">
                        Looking for wholesale pricing?
                      </p>
                      <p className="font-sans text-xs text-ink-warm mb-3">
                        Order 50+ pieces and get up to 40% off wholesale rates.
                      </p>
                      <Link
                        href="/contact?type=wholesale"
                        className="flex items-center gap-1.5 font-sans text-xs font-medium text-rose hover:text-rose-dark transition-colors"
                      >
                        <MessageCircle size={12} />
                        Contact us for bulk pricing
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Tabs */}
          <div className="mt-16 md:mt-24">
            <div className="border-b border-ivory-darker mb-8">
              <div className="flex gap-0 overflow-x-auto scrollbar-hide">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`shrink-0 px-6 py-4 font-sans text-sm font-medium border-b-2 transition-all duration-200 ${
                      activeTab === tab
                        ? 'border-rose text-rose'
                        : 'border-transparent text-ink-warm hover:text-ink'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="max-w-3xl"
              >
                {activeTab === 'Description' && (
                  <div className="space-y-4">
                    <p className="font-sans text-base text-ink-warm leading-relaxed">{product.description}</p>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      {[
                        { label: 'Fabric', value: product.fabric },
                        { label: 'Occasion', value: product.occasion },
                        { label: 'Color', value: product.color },
                        { label: 'Available Sizes', value: product.sizes.join(', ') },
                      ].map((detail) => (
                        <div key={detail.label} className="p-4 bg-ivory-dark rounded-sm">
                          <p className="font-sans text-xs text-ink-warm uppercase tracking-wider mb-1">{detail.label}</p>
                          <p className="font-sans text-sm font-medium text-ink">{detail.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === 'Fabric & Care' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-serif text-xl font-medium text-ink mb-3">Fabric Details</h3>
                      <p className="font-sans text-sm text-ink-warm leading-relaxed">
                        This piece is crafted from <strong>{product.fabric}</strong> — carefully sourced for quality, durability, and comfort. Our fabric procurement process ensures ethical sourcing and supports traditional Indian textile industries.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-medium text-ink mb-3">Care Instructions</h3>
                      <p className="font-sans text-sm text-ink-warm leading-relaxed">{product.careInstructions}</p>
                    </div>
                  </div>
                )}
                {activeTab === 'Size Guide' && (
                  <div>
                    <h3 className="font-serif text-xl font-medium text-ink mb-4">Size Chart</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full font-sans text-sm text-left">
                        <thead>
                          <tr className="border-b border-ivory-darker">
                            {['Size', 'Chest (in)', 'Waist (in)', 'Hip (in)', 'Length (in)'].map((h) => (
                              <th key={h} className="pb-3 pr-4 font-medium text-ink-warm text-xs uppercase tracking-wider">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="text-ink-mid">
                          {[
                            ['XS', '32–34', '26–28', '34–36', '52'],
                            ['S', '34–36', '28–30', '36–38', '53'],
                            ['M', '36–38', '30–32', '38–40', '54'],
                            ['L', '38–40', '32–34', '40–42', '54'],
                            ['XL', '40–42', '34–36', '42–44', '55'],
                            ['XXL', '42–44', '36–38', '44–46', '55'],
                          ].map(([size, ...dims]) => (
                            <tr key={size} className="border-b border-ivory-dark hover:bg-ivory">
                              <td className="py-3 pr-4 font-medium text-ink">{size}</td>
                              {dims.map((d, i) => <td key={i} className="py-3 pr-4">{d}</td>)}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {activeTab === 'Reviews' && (
                  <div>
                    <div className="flex items-center gap-6 mb-8">
                      <div className="text-center">
                        <p className="font-serif text-5xl font-medium text-ink">{product.rating}</p>
                        <div className="flex items-center justify-center gap-0.5 my-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-ink-light'} />
                          ))}
                        </div>
                        <p className="font-sans text-xs text-ink-warm">{product.reviews} reviews</p>
                      </div>
                    </div>
                    <p className="font-sans text-sm text-ink-warm italic">
                      Verified customer reviews coming soon. Be the first to review this product.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-20 md:mt-28">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-serif text-3xl font-medium text-ink">You May Also Like</h2>
                <Link href={`/collection/${product.collection}`} className="font-sans text-sm text-rose hover:text-rose-dark transition-colors">
                  View Collection
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {relatedProducts.map((related) => (
                  <ProductCard key={related.id} product={related} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <StickyAddToCart product={product} triggerRef={addToCartRef as React.RefObject<HTMLElement>} />
    </>
  )
}

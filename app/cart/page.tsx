'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus, X, ShoppingBag, Tag, ArrowRight } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { getBestsellers } from '@/data/products'
import { ProductCard } from '@/components/product/ProductCard'
import { formatPrice } from '@/lib/utils'

const SHIPPING_THRESHOLD = 999
const SHIPPING_COST = 99

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart()
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const suggestedProducts = getBestsellers().slice(0, 4)

  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const total = subtotal + shipping

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'DLSK10') {
      setPromoApplied(true)
    }
  }

  if (items.length === 0) {
    return (
      <div className="pt-20">
        <div className="max-w-2xl mx-auto px-4 py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-24 h-24 bg-ivory-dark rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={40} className="text-ink-light" />
            </div>
            <h1 className="font-serif text-3xl font-medium text-ink mb-3">
              Your Cart is Empty
            </h1>
            <p className="font-sans text-sm text-ink-warm mb-8">
              Discover our beautiful collections and find pieces that speak to your soul.
            </p>
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 px-8 py-4 bg-rose text-ivory font-sans text-sm font-medium rounded-sm hover:bg-rose-dark transition-colors"
            >
              Start Shopping
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Suggestions */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <h2 className="font-serif text-2xl font-medium text-ink mb-8">You Might Love These</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {suggestedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <h1 className="font-serif text-3xl md:text-4xl font-medium text-ink mb-10">
          Your Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={`${item.product.id}-${item.size}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-4 p-4 bg-white rounded-sm border border-ivory-darker"
                >
                  <Link href={`/product/${item.product.id}`} className="shrink-0">
                    <div className="w-20 h-28 md:w-24 md:h-32 rounded-sm overflow-hidden bg-ivory-dark">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-sans text-xs tracking-widest text-gold uppercase mb-1">
                          {item.product.collection}
                        </p>
                        <Link href={`/product/${item.product.id}`}>
                          <h3 className="font-serif text-base md:text-lg font-medium text-ink hover:text-rose transition-colors">
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="font-sans text-xs text-ink-warm mt-1">Size: {item.size}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.size)}
                        className="shrink-0 p-1 text-ink-light hover:text-rose transition-colors"
                        aria-label="Remove item"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-ivory-darker rounded-sm overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-ink-warm hover:bg-ivory transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-10 text-center font-sans text-sm text-ink">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-ink-warm hover:bg-ivory transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <motion.p
                        key={item.quantity}
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        className="font-sans text-sm font-semibold text-ink"
                      >
                        {formatPrice(item.product.price * item.quantity)}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white border border-ivory-darker rounded-sm p-6">
              <h2 className="font-serif text-xl font-medium text-ink mb-6">Order Summary</h2>

              {/* Promo Code */}
              <div className="flex gap-2 mb-6">
                <div className="flex-1 relative">
                  <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-warm" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code"
                    disabled={promoApplied}
                    className="w-full pl-9 pr-3 py-2.5 border border-ivory-darker rounded-sm font-sans text-sm text-ink placeholder:text-ink-light focus:outline-none focus:border-gold"
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  disabled={promoApplied}
                  className="px-4 py-2.5 bg-ink text-ivory font-sans text-sm font-medium rounded-sm hover:bg-ink/90 disabled:opacity-50 transition-colors"
                >
                  {promoApplied ? '✓' : 'Apply'}
                </button>
              </div>

              {promoApplied && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-sans text-xs text-emerald-600 mb-4"
                >
                  Promo code DLSK10 applied — 10% off!
                </motion.p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between font-sans text-sm">
                  <span className="text-ink-warm">Subtotal</span>
                  <span className="text-ink">{formatPrice(subtotal)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between font-sans text-sm text-emerald-600">
                    <span>Discount (10%)</span>
                    <span>-{formatPrice(Math.round(subtotal * 0.1))}</span>
                  </div>
                )}
                <div className="flex justify-between font-sans text-sm">
                  <span className="text-ink-warm">Shipping</span>
                  <span className={shipping === 0 ? 'text-emerald-600 font-medium' : 'text-ink'}>
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="font-sans text-xs text-ink-warm">
                    Add {formatPrice(SHIPPING_THRESHOLD - subtotal)} more for free shipping
                  </p>
                )}
                <div className="flex justify-between font-sans text-sm text-ink-warm">
                  <span>Taxes</span>
                  <span>Included</span>
                </div>
                <div className="border-t border-ivory-darker pt-3 flex justify-between">
                  <span className="font-sans font-semibold text-ink">Total</span>
                  <span className="font-serif text-xl font-medium text-rose">
                    {formatPrice(promoApplied ? total - Math.round(subtotal * 0.1) : total)}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="flex items-center justify-center gap-2 w-full py-4 bg-rose text-ivory font-sans text-sm font-medium rounded-sm hover:bg-rose-dark transition-colors"
              >
                Proceed to Checkout
                <ArrowRight size={14} />
              </Link>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                {['UPI', 'Cards', 'COD'].map((method) => (
                  <span key={method} className="font-sans text-xs text-ink-light px-2 py-1 border border-ivory-darker rounded-sm">
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* You May Also Like */}
        <div className="mt-20">
          <h2 className="font-serif text-2xl font-medium text-ink mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {suggestedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

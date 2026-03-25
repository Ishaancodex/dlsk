'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { ShoppingBag, Heart, Search, Menu, X, ChevronDown } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { cn } from '@/lib/utils'

const navLinks = [
  {
    label: 'Collections',
    href: '/collections',
    children: [
      { label: 'All Collections', href: '/collections' },
      { label: 'Summer Wear', href: '/collection/summer' },
      { label: 'Winter Wear', href: '/collection/winter' },
      { label: 'Fancy Wear', href: '/collection/fancy' },
    ],
  },
  { label: 'Summer', href: '/collection/summer' },
  { label: 'Winter', href: '/collection/winter' },
  { label: 'Fancy Wear', href: '/collection/fancy' },
  { label: 'Founder', href: '/founder' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { totalItems, toggleCart } = useCart()
  const { productIds } = useWishlist()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 60)
  })

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-ivory/95 backdrop-blur-md shadow-soft border-b border-ivory-darker'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex flex-col leading-none">
              <span
                className={cn(
                  'font-serif text-2xl md:text-3xl font-semibold tracking-tight transition-colors duration-300',
                  scrolled ? 'text-ink' : 'text-ivory'
                )}
              >
                DLSK
              </span>
              <span
                className={cn(
                  'font-sans text-xs tracking-widest transition-colors duration-300',
                  scrolled ? 'text-ink-warm' : 'text-ivory/70'
                )}
              >
                by Aditya Aggarwal
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'flex items-center gap-1 font-sans text-sm tracking-wide transition-colors duration-200',
                      scrolled
                        ? 'text-ink-mid hover:text-rose'
                        : 'text-ivory/90 hover:text-ivory'
                    )}
                  >
                    {link.label}
                    {link.children && <ChevronDown size={12} />}
                  </Link>
                  {link.children && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-ivory border border-ivory-darker shadow-medium rounded-sm overflow-hidden"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-3 font-sans text-sm text-ink-mid hover:bg-ivory-dark hover:text-rose transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className={cn(
                  'p-2 transition-colors duration-200',
                  scrolled ? 'text-ink-mid hover:text-rose' : 'text-ivory/90 hover:text-ivory'
                )}
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {/* Wishlist */}
              <Link
                href="/cart"
                className={cn(
                  'relative p-2 transition-colors duration-200',
                  scrolled ? 'text-ink-mid hover:text-rose' : 'text-ivory/90 hover:text-ivory'
                )}
                aria-label="Wishlist"
              >
                <Heart size={20} />
                {productIds.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose text-ivory text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    {productIds.length}
                  </motion.span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={toggleCart}
                className={cn(
                  'relative p-2 transition-colors duration-200',
                  scrolled ? 'text-ink-mid hover:text-rose' : 'text-ivory/90 hover:text-ivory'
                )}
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      key={totalItems}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose text-ivory text-[10px] font-bold rounded-full flex items-center justify-center"
                    >
                      {totalItems > 9 ? '9+' : totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile Menu */}
              <button
                onClick={() => setMobileOpen(true)}
                className={cn(
                  'md:hidden p-2 transition-colors duration-200',
                  scrolled ? 'text-ink-mid hover:text-rose' : 'text-ivory/90 hover:text-ivory'
                )}
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-ink/50 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 z-[70] w-80 bg-ivory shadow-strong overflow-y-auto md:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-ivory-darker">
                <div>
                  <p className="font-serif text-2xl font-semibold text-ink">DLSK</p>
                  <p className="font-sans text-xs text-ink-warm tracking-widest">by Aditya Aggarwal</p>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-ink-warm hover:text-rose"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>
              <nav className="p-6 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <div key={link.label}>
                    <Link
                      href={link.href}
                      className="block py-3 font-sans text-base text-ink-mid hover:text-rose transition-colors border-b border-ivory-darker"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <div className="pl-4">
                        {link.children.slice(1).map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block py-2 font-sans text-sm text-ink-warm hover:text-rose transition-colors"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
              <div className="p-6 border-t border-ivory-darker">
                <Link
                  href="/cart"
                  className="flex items-center gap-3 py-3 font-sans text-sm text-ink-mid hover:text-rose"
                  onClick={() => setMobileOpen(false)}
                >
                  <ShoppingBag size={18} />
                  Cart {totalItems > 0 && <span className="text-xs bg-rose text-ivory px-1.5 py-0.5 rounded-full">{totalItems}</span>}
                </Link>
                <Link
                  href="/track-order"
                  className="flex items-center gap-3 py-3 font-sans text-sm text-ink-mid hover:text-rose"
                  onClick={() => setMobileOpen(false)}
                >
                  Track Order
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80] bg-ink/50"
              onClick={() => setSearchOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 z-[90] w-full max-w-2xl px-4"
            >
              <div className="bg-ivory rounded-sm shadow-strong border border-ivory-darker p-4">
                <div className="flex items-center gap-3">
                  <Search size={18} className="text-ink-warm shrink-0" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search for suits, fabrics, occasions..."
                    className="flex-1 bg-transparent font-sans text-base text-ink placeholder:text-ink-light focus:outline-none"
                  />
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="p-1 text-ink-warm hover:text-rose"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  )
}

function CartDrawer() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, subtotal } = useCart()
  const { formatPrice } = require('@/lib/utils')

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/50"
            onClick={toggleCart}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 z-[70] w-full max-w-sm bg-ivory shadow-strong flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-ivory-darker">
              <h2 className="font-serif text-xl font-medium text-ink">Your Cart</h2>
              <button onClick={toggleCart} className="p-2 text-ink-warm hover:text-rose">
                <X size={20} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <ShoppingBag size={48} className="text-ink-light mb-4" />
                <p className="font-serif text-xl text-ink mb-2">Your cart is empty</p>
                <p className="font-sans text-sm text-ink-warm mb-6">Add some beautiful pieces to get started</p>
                <Link
                  href="/collections"
                  onClick={toggleCart}
                  className="btn-primary"
                >
                  Explore Collections
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.size}`} className="flex gap-3 bg-white p-3 rounded-sm">
                      <div className="w-16 h-20 bg-ivory-dark rounded-sm overflow-hidden shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-sans text-sm font-medium text-ink truncate">{item.product.name}</p>
                        <p className="font-sans text-xs text-ink-warm">Size: {item.size}</p>
                        <p className="font-sans text-sm font-semibold text-rose mt-1">
                          {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(item.product.price)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                            className="w-6 h-6 rounded-full border border-ivory-darker flex items-center justify-center text-ink-warm hover:border-rose hover:text-rose"
                          >
                            −
                          </button>
                          <span className="font-sans text-sm w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                            className="w-6 h-6 rounded-full border border-ivory-darker flex items-center justify-center text-ink-warm hover:border-rose hover:text-rose"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeItem(item.product.id, item.size)}
                            className="ml-auto text-ink-light hover:text-rose"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-ivory-darker">
                  <div className="flex justify-between font-sans text-sm mb-1">
                    <span className="text-ink-warm">Subtotal</span>
                    <span className="font-semibold text-ink">
                      {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(subtotal)}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-ink-light mb-4">Shipping calculated at checkout</p>
                  <Link
                    href="/checkout"
                    onClick={toggleCart}
                    className="btn-primary w-full text-center block py-3"
                  >
                    Proceed to Checkout
                  </Link>
                  <Link
                    href="/cart"
                    onClick={toggleCart}
                    className="block text-center font-sans text-sm text-ink-warm hover:text-rose mt-3 transition-colors"
                  >
                    View Full Cart
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

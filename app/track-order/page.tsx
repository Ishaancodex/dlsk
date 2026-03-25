'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Package, CheckCircle2, Truck, MapPin, Clock, Search, Phone, ArrowRight, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const DEMO_ORDERS: Record<string, DemoOrder> = {
  'DLSK-2024001': {
    id: 'DLSK-2024001',
    date: 'Nov 18, 2024',
    estimatedDelivery: 'Nov 24, 2024',
    status: 3,
    address: '42, Sector 14, Gurgaon, Haryana 122001',
    items: [
      { name: 'Saffron Bloom Cotton Suit', size: 'M', qty: 1, price: '₹2,499' },
    ],
    carrier: 'BlueDart',
    trackingNo: 'BD98765432100',
  },
  'DLSK-2024002': {
    id: 'DLSK-2024002',
    date: 'Nov 20, 2024',
    estimatedDelivery: 'Nov 26, 2024',
    status: 1,
    address: '5, Jubilee Hills, Hyderabad, Telangana 500033',
    items: [
      { name: 'Midnight Velvet Suit', size: 'L', qty: 1, price: '₹5,999' },
      { name: 'Classic Dress Belt', size: 'One Size', qty: 2, price: '₹2,999' },
    ],
    carrier: 'Delhivery',
    trackingNo: 'DLVRY234567890',
  },
}

interface DemoOrder {
  id: string
  date: string
  estimatedDelivery: string
  status: number // 0-4
  address: string
  items: { name: string; size: string; qty: number; price: string }[]
  carrier: string
  trackingNo: string
}

const TIMELINE_STEPS = [
  {
    icon: Package,
    label: 'Order Placed',
    desc: 'Your order has been received and confirmed.',
  },
  {
    icon: Clock,
    label: 'Being Packed',
    desc: 'Our team is carefully packing your items.',
  },
  {
    icon: Truck,
    label: 'Shipped',
    desc: 'Your order is on its way with our delivery partner.',
  },
  {
    icon: MapPin,
    label: 'Out for Delivery',
    desc: 'The delivery partner is on the way to your address.',
  },
  {
    icon: CheckCircle2,
    label: 'Delivered',
    desc: 'Your order has been delivered. Enjoy your DLSK outfit!',
  },
]

export default function TrackOrderPage() {
  const [query, setQuery] = useState('')
  const [searched, setSearched] = useState(false)
  const [order, setOrder] = useState<DemoOrder | null>(null)
  const [loading, setLoading] = useState(false)

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    setSearched(false)

    setTimeout(() => {
      const q = query.trim().toUpperCase()
      const found = DEMO_ORDERS[q] || null

      // Show a demo order for any DLSK-XXXXXX pattern
      if (!found && /^DLSK-\d+$/i.test(q)) {
        setOrder({
          id: q,
          date: 'Nov 22, 2024',
          estimatedDelivery: 'Nov 28, 2024',
          status: 2,
          address: 'Your saved address',
          items: [{ name: 'DLSK Order', size: 'As selected', qty: 1, price: '—' }],
          carrier: 'BlueDart',
          trackingNo: 'BD000000000',
        })
      } else {
        setOrder(found)
      }

      setSearched(true)
      setLoading(false)
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-ivory pt-20">
      {/* Hero */}
      <section className="bg-ivory-dark border-b border-ivory-darker py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3"
          >
            Order Status
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl font-semibold text-ink mb-4"
          >
            Track Your Order
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-ink-mid text-base md:text-lg max-w-xl mx-auto"
          >
            Enter your Order ID or registered phone number to get real-time updates on your DLSK delivery.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-3xl">

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-soft p-8 mb-10"
        >
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-ink-warm mb-2">
                Order ID or Phone Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="e.g. DLSK-2024001 or 9876543210"
                  className="w-full pl-12 pr-4 py-4 border border-ivory-darker rounded-xl text-ink placeholder-ink-light bg-ivory focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-warm w-5 h-5" />
              </div>
              <p className="text-xs text-ink-warm mt-2">
                Try <span className="font-semibold cursor-pointer text-rose hover:underline" onClick={() => setQuery('DLSK-2024001')}>DLSK-2024001</span> or <span className="font-semibold cursor-pointer text-rose hover:underline" onClick={() => setQuery('DLSK-2024002')}>DLSK-2024002</span> to see a demo
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="w-full bg-rose text-white py-4 rounded-xl font-semibold text-sm tracking-wider uppercase hover:bg-rose-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Track Order
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {searched && (
            <motion.div
              key={order ? order.id : 'not-found'}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {order ? (
                <OrderResult order={order} />
              ) : (
                <NotFound query={query} />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Help */}
        <div className="mt-12 bg-gold-pale border border-gold/20 rounded-2xl p-6 text-center">
          <p className="font-serif text-xl font-semibold text-ink mb-2">Need Help?</p>
          <p className="text-ink-mid text-sm mb-4">Can't find your order? Our support team is ready to assist.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-rose text-white rounded-full text-sm font-semibold hover:bg-rose-dark transition-colors"
            >
              Contact Support <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+911234567890"
              className="inline-flex items-center gap-2 px-6 py-3 border border-ink/20 text-ink rounded-full text-sm font-semibold hover:border-ink hover:bg-white transition-all"
            >
              <Phone className="w-4 h-4" /> Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function OrderResult({ order }: { order: DemoOrder }) {
  const statusLabels = ['Order Placed', 'Being Packed', 'Shipped', 'Out for Delivery', 'Delivered']

  return (
    <div className="space-y-6">
      {/* Order Header */}
      <div className="bg-white rounded-2xl shadow-soft p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-1">
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-1">Order ID</p>
            <p className="font-serif text-2xl font-semibold text-ink">{order.id}</p>
          </div>
          <span className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wide uppercase',
            order.status === 4 ? 'bg-green-100 text-green-700' : 'bg-rose-pale text-rose'
          )}>
            {order.status === 4 ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Truck className="w-3.5 h-3.5" />}
            {statusLabels[order.status]}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5 pt-5 border-t border-ivory-dark text-sm">
          <div>
            <p className="text-xs text-ink-warm uppercase tracking-wide mb-1">Ordered On</p>
            <p className="font-semibold text-ink">{order.date}</p>
          </div>
          <div>
            <p className="text-xs text-ink-warm uppercase tracking-wide mb-1">Est. Delivery</p>
            <p className="font-semibold text-rose">{order.estimatedDelivery}</p>
          </div>
          <div>
            <p className="text-xs text-ink-warm uppercase tracking-wide mb-1">Carrier</p>
            <p className="font-semibold text-ink">{order.carrier}</p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl shadow-soft p-6">
        <h3 className="font-serif text-xl font-semibold text-ink mb-6">Delivery Timeline</h3>
        <div className="relative">
          {TIMELINE_STEPS.map((step, i) => {
            const isDone = i < order.status
            const isActive = i === order.status
            const isUpcoming = i > order.status
            const Icon = step.icon

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 pb-8 last:pb-0 relative"
              >
                {/* Vertical line */}
                {i < TIMELINE_STEPS.length - 1 && (
                  <div className="absolute left-5 top-10 bottom-0 w-px">
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: isDone ? 1 : 0 }}
                      transition={{ delay: i * 0.12 + 0.3, duration: 0.4 }}
                      style={{ transformOrigin: 'top' }}
                      className="w-full h-full bg-rose"
                    />
                    <div className={cn('w-full h-full absolute inset-0', isDone ? 'opacity-0' : 'bg-ivory-darker')} />
                  </div>
                )}

                {/* Icon */}
                <div className={cn(
                  'relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300',
                  isDone ? 'bg-rose text-white' :
                  isActive ? 'bg-rose text-white ring-4 ring-rose-pale' :
                  'bg-ivory-dark text-ink-light'
                )}>
                  {isDone ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: i * 0.1 }}>
                      <CheckCircle2 className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                  {isActive && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-gold rounded-full border-2 border-white animate-pulse" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <p className={cn(
                    'font-semibold text-sm mb-1',
                    isDone || isActive ? 'text-ink' : 'text-ink-light'
                  )}>
                    {step.label}
                  </p>
                  {(isDone || isActive) && (
                    <p className="text-xs text-ink-warm leading-relaxed">{step.desc}</p>
                  )}
                  {isUpcoming && (
                    <p className="text-xs text-ink-light">Pending</p>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Items + Address */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-soft p-6">
          <h3 className="font-serif text-lg font-semibold text-ink mb-4">Order Items</h3>
          <div className="space-y-3">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between items-start text-sm">
                <div>
                  <p className="font-semibold text-ink">{item.name}</p>
                  <p className="text-ink-warm text-xs">Size: {item.size} · Qty: {item.qty}</p>
                </div>
                <span className="font-semibold text-ink">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-soft p-6">
          <h3 className="font-serif text-lg font-semibold text-ink mb-4">Delivery Address</h3>
          <div className="flex gap-3">
            <MapPin className="w-4 h-4 text-rose flex-shrink-0 mt-0.5" />
            <p className="text-sm text-ink-mid leading-relaxed">{order.address}</p>
          </div>
          {order.trackingNo && (
            <div className="mt-4 pt-4 border-t border-ivory-dark">
              <p className="text-xs text-ink-warm uppercase tracking-wide mb-1">Carrier Tracking</p>
              <p className="text-sm font-mono font-semibold text-ink">{order.trackingNo}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function NotFound({ query }: { query: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-soft p-10 text-center">
      <div className="w-16 h-16 bg-rose-pale rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="w-8 h-8 text-rose" />
      </div>
      <h3 className="font-serif text-2xl font-semibold text-ink mb-2">Order Not Found</h3>
      <p className="text-ink-mid text-sm max-w-sm mx-auto mb-6">
        We couldn't find an order matching <strong>"{query}"</strong>. Please double-check your Order ID or contact support.
      </p>
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 px-6 py-3 bg-rose text-white rounded-full text-sm font-semibold hover:bg-rose-dark transition-colors"
      >
        Contact Support <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}

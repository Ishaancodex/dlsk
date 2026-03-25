'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronRight, Package, CreditCard, FileText, MapPin } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Puducherry',
]

const STEPS = [
  { id: 1, label: 'Shipping', icon: MapPin },
  { id: 2, label: 'Order Type', icon: Package },
  { id: 3, label: 'Payment', icon: CreditCard },
  { id: 4, label: 'Review', icon: FileText },
]

interface ShippingForm {
  name: string; phone: string; email: string
  address: string; city: string; state: string; pincode: string
}

function generateOrderId() {
  return 'DLSK-' + Math.random().toString(36).substr(2, 6).toUpperCase()
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [isBulk, setIsBulk] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi')
  const [orderId, setOrderId] = useState('')
  const [placing, setPlacing] = useState(false)
  const [shipping, setShipping] = useState<ShippingForm>({
    name: '', phone: '', email: '', address: '', city: '', state: '', pincode: '',
  })
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '', name: '' })

  const total = subtotal + (subtotal >= 999 ? 0 : 99)

  const handlePlaceOrder = () => {
    setPlacing(true)
    setTimeout(() => {
      const id = generateOrderId()
      setOrderId(id)
      clearCart()
      setPlacing(false)
    }, 1500)
  }

  // Order Confirmation
  if (orderId) {
    return (
      <div className="pt-20">
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check size={36} className="text-emerald-600" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h1 className="font-serif text-4xl font-medium text-ink mb-3">Order Placed!</h1>
            <p className="font-sans text-sm text-ink-warm mb-2">Thank you for shopping with DLSK.</p>
            <div className="inline-block px-4 py-2 bg-gold-pale border border-gold/30 rounded-sm mb-6">
              <p className="font-sans text-xs text-ink-warm">Order ID</p>
              <p className="font-serif text-xl font-medium text-ink">{orderId}</p>
            </div>
            <p className="font-sans text-sm text-ink-warm mb-8">
              Estimated delivery: <strong className="text-ink">5–7 business days</strong>.<br />
              You'll receive a confirmation SMS and email shortly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/track-order" className="px-6 py-3 bg-rose text-ivory font-sans text-sm font-medium rounded-sm hover:bg-rose-dark transition-colors">
                Track My Order
              </Link>
              <Link href="/collections" className="px-6 py-3 border border-ivory-darker text-ink font-sans text-sm font-medium rounded-sm hover:bg-ivory transition-colors">
                Continue Shopping
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <h1 className="font-serif text-3xl font-medium text-ink mb-10">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Steps */}
          <div className="lg:col-span-2">
            {/* Stepper */}
            <div className="flex items-center mb-10">
              {STEPS.map((s, i) => (
                <React.Fragment key={s.id}>
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                      step > s.id ? 'bg-rose border-rose text-ivory' :
                      step === s.id ? 'border-rose text-rose' : 'border-ivory-darker text-ink-light'
                    }`}>
                      {step > s.id ? <Check size={16} /> : <s.icon size={16} />}
                    </div>
                    <p className={`font-sans text-xs mt-1.5 hidden sm:block ${step === s.id ? 'text-rose font-medium' : 'text-ink-warm'}`}>
                      {s.label}
                    </p>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 transition-colors duration-200 ${step > s.id ? 'bg-rose' : 'bg-ivory-darker'}`} />
                  )}
                </React.Fragment>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* Step 1: Shipping */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-serif text-2xl font-medium text-ink mb-6">Shipping Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: 'Full Name', key: 'name', placeholder: 'Priya Sharma', col: 1 },
                      { label: 'Phone Number', key: 'phone', placeholder: '+91 98765 43210', col: 1 },
                      { label: 'Email Address', key: 'email', placeholder: 'priya@email.com', col: 2 },
                      { label: 'Delivery Address', key: 'address', placeholder: '123, MG Road, Apartment 4B', col: 2 },
                      { label: 'City', key: 'city', placeholder: 'Delhi', col: 1 },
                      { label: 'Pincode', key: 'pincode', placeholder: '110001', col: 1 },
                    ].map((field) => (
                      <div key={field.key} className={field.col === 2 ? 'sm:col-span-2' : ''}>
                        <label className="label-text">{field.label}</label>
                        <input
                          type="text"
                          value={shipping[field.key as keyof ShippingForm]}
                          onChange={(e) => setShipping(prev => ({ ...prev, [field.key]: e.target.value }))}
                          placeholder={field.placeholder}
                          className="input-field"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="label-text">State</label>
                      <select
                        value={shipping.state}
                        onChange={(e) => setShipping(prev => ({ ...prev, state: e.target.value }))}
                        className="input-field"
                      >
                        <option value="">Select State</option>
                        {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    disabled={!shipping.name || !shipping.phone || !shipping.address || !shipping.city || !shipping.state || !shipping.pincode}
                    className="mt-8 flex items-center gap-2 px-8 py-3 bg-rose text-ivory font-sans text-sm font-medium rounded-sm hover:bg-rose-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Continue <ChevronRight size={14} />
                  </button>
                </motion.div>
              )}

              {/* Step 2: Order Type */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-serif text-2xl font-medium text-ink mb-6">Order Type</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {[
                      { key: false, title: 'Single Purchase', desc: 'Regular retail pricing for personal use.', price: total },
                      { key: true, title: 'Bulk / Wholesale', desc: 'For retailers & resellers. Min. 50 pieces, 40% off.', price: Math.round(total * 0.6) },
                    ].map((option) => (
                      <button
                        key={String(option.key)}
                        onClick={() => setIsBulk(option.key)}
                        className={`p-5 border-2 rounded-sm text-left transition-all ${isBulk === option.key ? 'border-rose bg-rose-pale' : 'border-ivory-darker hover:border-rose/40'}`}
                      >
                        <p className="font-serif text-lg font-medium text-ink mb-1">{option.title}</p>
                        <p className="font-sans text-xs text-ink-warm mb-3">{option.desc}</p>
                        <p className="font-sans text-sm font-semibold text-rose">{formatPrice(option.price)}</p>
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="px-6 py-3 border border-ivory-darker text-ink-mid font-sans text-sm rounded-sm hover:bg-ivory">Back</button>
                    <button onClick={() => setStep(3)} className="flex items-center gap-2 px-8 py-3 bg-rose text-ivory font-sans text-sm font-medium rounded-sm hover:bg-rose-dark">Continue <ChevronRight size={14} /></button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-serif text-2xl font-medium text-ink mb-6">Payment Method</h2>
                  <div className="space-y-3 mb-6">
                    {[
                      { key: 'upi', label: 'UPI Payment', desc: 'Pay via UPI QR code or UPI ID' },
                      { key: 'card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay' },
                      { key: 'cod', label: 'Cash on Delivery', desc: 'Pay when your order arrives (₹29 extra)' },
                    ].map((method) => (
                      <button
                        key={method.key}
                        onClick={() => setPaymentMethod(method.key as 'upi' | 'card' | 'cod')}
                        className={`w-full flex items-center gap-4 p-4 border-2 rounded-sm text-left transition-all ${paymentMethod === method.key ? 'border-rose bg-rose-pale' : 'border-ivory-darker hover:border-rose/40'}`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.key ? 'border-rose' : 'border-ivory-darker'}`}>
                          {paymentMethod === method.key && <div className="w-2.5 h-2.5 bg-rose rounded-full" />}
                        </div>
                        <div>
                          <p className="font-sans text-sm font-medium text-ink">{method.label}</p>
                          <p className="font-sans text-xs text-ink-warm">{method.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  {paymentMethod === 'upi' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-ivory-dark rounded-sm mb-6">
                      <div className="w-36 h-36 bg-white border border-ivory-darker rounded-sm mx-auto flex items-center justify-center mb-3">
                        <div className="text-xs text-ink-warm text-center p-2">UPI QR<br/>Code<br/>(Demo)</div>
                      </div>
                      <p className="font-sans text-sm text-center text-ink-warm">Or pay to UPI ID: <strong className="text-ink">dlsk@upi</strong></p>
                    </motion.div>
                  )}

                  {paymentMethod === 'card' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3 mb-6">
                      <div>
                        <label className="label-text">Card Number</label>
                        <input type="text" value={cardDetails.number} onChange={(e) => setCardDetails(p => ({ ...p, number: e.target.value }))} placeholder="1234 5678 9012 3456" maxLength={19} className="input-field" />
                      </div>
                      <div>
                        <label className="label-text">Name on Card</label>
                        <input type="text" value={cardDetails.name} onChange={(e) => setCardDetails(p => ({ ...p, name: e.target.value }))} placeholder="Priya Sharma" className="input-field" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="label-text">Expiry</label>
                          <input type="text" value={cardDetails.expiry} onChange={(e) => setCardDetails(p => ({ ...p, expiry: e.target.value }))} placeholder="MM / YY" className="input-field" />
                        </div>
                        <div>
                          <label className="label-text">CVV</label>
                          <input type="password" value={cardDetails.cvv} onChange={(e) => setCardDetails(p => ({ ...p, cvv: e.target.value }))} placeholder="***" maxLength={3} className="input-field" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex gap-3">
                    <button onClick={() => setStep(2)} className="px-6 py-3 border border-ivory-darker text-ink-mid font-sans text-sm rounded-sm hover:bg-ivory">Back</button>
                    <button onClick={() => setStep(4)} className="flex items-center gap-2 px-8 py-3 bg-rose text-ivory font-sans text-sm font-medium rounded-sm hover:bg-rose-dark">Review Order <ChevronRight size={14} /></button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Review */}
              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-serif text-2xl font-medium text-ink mb-6">Review Order</h2>
                  <div className="space-y-4 mb-6">
                    {/* Shipping */}
                    <div className="p-4 bg-ivory rounded-sm border border-ivory-darker">
                      <p className="font-sans text-xs font-medium text-ink-warm uppercase tracking-wider mb-2">Shipping To</p>
                      <p className="font-sans text-sm text-ink">{shipping.name}</p>
                      <p className="font-sans text-sm text-ink-warm">{shipping.address}, {shipping.city}, {shipping.state} — {shipping.pincode}</p>
                      <p className="font-sans text-sm text-ink-warm">{shipping.phone}</p>
                    </div>
                    {/* Items */}
                    <div className="p-4 bg-ivory rounded-sm border border-ivory-darker">
                      <p className="font-sans text-xs font-medium text-ink-warm uppercase tracking-wider mb-3">Order Items</p>
                      {items.map((item) => (
                        <div key={`${item.product.id}-${item.size}`} className="flex items-center gap-3 py-2">
                          <div className="w-10 h-14 rounded-sm overflow-hidden bg-ivory-dark shrink-0">
                            <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <p className="font-sans text-sm text-ink">{item.product.name}</p>
                            <p className="font-sans text-xs text-ink-warm">Size: {item.size} · Qty: {item.quantity}</p>
                          </div>
                          <p className="font-sans text-sm font-medium text-ink">{formatPrice(item.product.price * item.quantity)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(3)} className="px-6 py-3 border border-ivory-darker text-ink-mid font-sans text-sm rounded-sm hover:bg-ivory">Back</button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={placing}
                      className="flex items-center gap-2 px-8 py-3 bg-rose text-ivory font-sans text-sm font-medium rounded-sm hover:bg-rose-dark disabled:opacity-70 transition-colors"
                    >
                      {placing ? (
                        <><span className="w-4 h-4 border-2 border-ivory/30 border-t-ivory rounded-full animate-spin" />Processing...</>
                      ) : (
                        <>Place Order — {formatPrice(isBulk ? Math.round(total * 0.6) : total)}</>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white border border-ivory-darker rounded-sm p-6">
              <h3 className="font-serif text-lg font-medium text-ink mb-4">Order Summary</h3>
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex items-center gap-3 py-2 border-b border-ivory-dark last:border-0">
                  <div className="w-10 h-14 rounded-sm overflow-hidden bg-ivory-dark shrink-0">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-xs text-ink truncate">{item.product.name}</p>
                    <p className="font-sans text-xs text-ink-warm">×{item.quantity}</p>
                  </div>
                  <p className="font-sans text-xs font-medium text-ink">{formatPrice(item.product.price * item.quantity)}</p>
                </div>
              ))}
              <div className="pt-4 space-y-2">
                <div className="flex justify-between font-sans text-sm">
                  <span className="text-ink-warm">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {isBulk && (
                  <div className="flex justify-between font-sans text-sm text-emerald-600">
                    <span>Wholesale (40%)</span>
                    <span>-{formatPrice(Math.round(subtotal * 0.4))}</span>
                  </div>
                )}
                <div className="flex justify-between font-sans text-sm">
                  <span className="text-ink-warm">Shipping</span>
                  <span>{subtotal >= 999 ? 'FREE' : formatPrice(99)}</span>
                </div>
                <div className="flex justify-between font-serif text-base font-medium text-rose pt-2 border-t border-ivory-darker">
                  <span>Total</span>
                  <span>{formatPrice(isBulk ? Math.round(total * 0.6) : total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

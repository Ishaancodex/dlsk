'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Instagram, Facebook, Send, CheckCircle, Package, Users, MessageSquare, Newspaper } from 'lucide-react'
import Link from 'next/link'

const INQUIRY_TYPES = [
  { value: 'general', label: 'General Inquiry', icon: MessageSquare },
  { value: 'wholesale', label: 'Wholesale / Bulk Order', icon: Package },
  { value: 'returns', label: 'Returns & Exchanges', icon: CheckCircle },
  { value: 'press', label: 'Press & Collaborations', icon: Newspaper },
]

const WHOLESALE_BENEFITS = [
  { stat: '200+', label: 'Retail Partners' },
  { stat: '15+', label: 'States Covered' },
  { stat: '40%', label: 'Wholesale Discount' },
  { stat: '50 pcs', label: 'Min. Order Qty' },
]

type InquiryType = 'general' | 'wholesale' | 'returns' | 'press'

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'general' as InquiryType,
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate() {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  function handleChange(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  return (
    <div className="min-h-screen bg-ivory pt-20">

      {/* Hero */}
      <section className="bg-ivory-dark border-b border-ivory-darker py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3"
          >
            We'd Love to Hear From You
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl font-semibold text-ink mb-4"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-ink-mid text-base md:text-lg max-w-xl mx-auto"
          >
            Whether you're a customer, retailer, or press — we're here.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid lg:grid-cols-5 gap-12 items-start">

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl shadow-soft p-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="w-20 h-20 bg-rose-pale rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-rose" />
                  </motion.div>
                  <h3 className="font-serif text-3xl font-semibold text-ink mb-3">Message Sent!</h3>
                  <p className="text-ink-mid mb-2">
                    Thank you, <strong>{form.name}</strong>. We've received your message and will respond within 24 hours.
                  </p>
                  {form.inquiryType === 'wholesale' && (
                    <p className="text-rose text-sm font-semibold mb-6">
                      Our wholesale team will reach out within 2 business hours.
                    </p>
                  )}
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', inquiryType: 'general', message: '' }) }}
                    className="px-6 py-3 border border-ink/20 text-ink rounded-full text-sm font-semibold hover:border-ink hover:bg-ink hover:text-white transition-all"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-soft p-8"
                >
                  <h2 className="font-serif text-2xl font-semibold text-ink mb-6">Send a Message</h2>

                  {/* Inquiry Type Selector */}
                  <div className="mb-6">
                    <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-ink-warm mb-3">
                      What's this about?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {INQUIRY_TYPES.map(type => {
                        const Icon = type.icon
                        return (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => handleChange('inquiryType', type.value)}
                            className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all text-left ${
                              form.inquiryType === type.value
                                ? 'border-rose bg-rose-pale text-rose'
                                : 'border-ivory-darker text-ink-mid hover:border-rose/40'
                            }`}
                          >
                            <Icon className="w-4 h-4 flex-shrink-0" />
                            <span className="leading-tight">{type.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-ink-warm mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={e => handleChange('name', e.target.value)}
                          placeholder="Priya Sharma"
                          className={`w-full px-4 py-3.5 border rounded-xl text-ink placeholder-ink-light bg-ivory focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all ${errors.name ? 'border-red-400' : 'border-ivory-darker'}`}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-ink-warm mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={e => handleChange('phone', e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3.5 border border-ivory-darker rounded-xl text-ink placeholder-ink-light bg-ivory focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-ink-warm mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => handleChange('email', e.target.value)}
                        placeholder="priya@example.com"
                        className={`w-full px-4 py-3.5 border rounded-xl text-ink placeholder-ink-light bg-ivory focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all ${errors.email ? 'border-red-400' : 'border-ivory-darker'}`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    {form.inquiryType === 'wholesale' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-gold-pale border border-gold/30 rounded-xl p-4"
                      >
                        <p className="text-sm font-semibold text-ink mb-1">Wholesale Inquiry Selected</p>
                        <p className="text-xs text-ink-mid">Please mention your store name, location, and the collections/quantities you're interested in. Our wholesale team responds within 2 hours on business days.</p>
                      </motion.div>
                    )}

                    <div>
                      <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-ink-warm mb-2">
                        Your Message *
                      </label>
                      <textarea
                        value={form.message}
                        onChange={e => handleChange('message', e.target.value)}
                        rows={5}
                        placeholder={
                          form.inquiryType === 'wholesale'
                            ? 'Store name, location, interested collections, approximate order quantity...'
                            : 'How can we help you?'
                        }
                        className={`w-full px-4 py-3.5 border rounded-xl text-ink placeholder-ink-light bg-ivory focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all resize-none ${errors.message ? 'border-red-400' : 'border-ivory-darker'}`}
                      />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-rose text-white py-4 rounded-xl font-semibold text-sm tracking-wider uppercase hover:bg-rose-dark transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Details */}
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <h3 className="font-serif text-xl font-semibold text-ink mb-5">Contact Details</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-rose-pale rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-rose" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-ink-warm uppercase tracking-wide mb-1">Address</p>
                    <p className="text-sm text-ink-mid leading-relaxed">
                      DLSK Pvt. Ltd.<br />
                      42, Phase-II, Industrial Area<br />
                      Ludhiana, Punjab 141003
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-rose-pale rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-rose" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-ink-warm uppercase tracking-wide mb-1">Phone</p>
                    <a href="tel:+911234567890" className="text-sm text-ink-mid hover:text-rose transition-colors">+91 12345 67890</a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-rose-pale rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-rose" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-ink-warm uppercase tracking-wide mb-1">Email</p>
                    <a href="mailto:hello@dlsk.in" className="text-sm text-ink-mid hover:text-rose transition-colors">hello@dlsk.in</a>
                    <br />
                    <a href="mailto:wholesale@dlsk.in" className="text-sm text-gold hover:text-gold-dark transition-colors">wholesale@dlsk.in</a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-rose-pale rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-rose" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-ink-warm uppercase tracking-wide mb-1">Working Hours</p>
                    <p className="text-sm text-ink-mid">Mon–Sat: 9:00 AM – 7:00 PM IST</p>
                    <p className="text-sm text-ink-light">Sunday: Closed</p>
                  </div>
                </div>
              </div>
              {/* Social */}
              <div className="mt-5 pt-5 border-t border-ivory-dark">
                <p className="text-xs font-semibold text-ink-warm uppercase tracking-wide mb-3">Follow DLSK</p>
                <div className="flex gap-3">
                  <a href="#" className="w-9 h-9 bg-ivory-dark rounded-full flex items-center justify-center text-ink-warm hover:bg-rose hover:text-white transition-all">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-9 h-9 bg-ivory-dark rounded-full flex items-center justify-center text-ink-warm hover:bg-rose hover:text-white transition-all">
                    <Facebook className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-ivory-dark rounded-2xl overflow-hidden shadow-soft h-48 relative flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-rose mx-auto mb-2" />
                <p className="text-sm font-semibold text-ink">Ludhiana, Punjab</p>
                <p className="text-xs text-ink-warm">Industrial Area, Phase-II</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-ivory-dark via-ivory-darker/50 to-rose-pale/30" />
            </div>
          </div>
        </div>

        {/* Wholesale Section */}
        <div className="mt-20 bg-rose-dark rounded-3xl overflow-hidden">
          <div className="p-10 md:p-14">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold tracking-[0.15em] uppercase px-4 py-2 rounded-full mb-6">
                  <Users className="w-3.5 h-3.5" />
                  For Retailers & Boutiques
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-white font-semibold mb-4 leading-tight">
                  Stock DLSK in<br />Your Store
                </h2>
                <p className="text-ivory-dark text-base leading-relaxed mb-8">
                  Join our growing network of 200+ retail partners across India. Get access to exclusive wholesale pricing, seasonal lookbooks, marketing support, and priority new-collection access.
                </p>
                <a
                  href="mailto:wholesale@dlsk.in"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-ink-dark rounded-full font-semibold text-sm tracking-wide hover:bg-gold-light transition-all"
                >
                  <Mail className="w-4 h-4" />
                  wholesale@dlsk.in
                </a>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {WHOLESALE_BENEFITS.map((b, i) => (
                  <div key={i} className="bg-white/10 rounded-2xl p-6 text-center">
                    <p className="font-serif text-3xl font-bold text-gold mb-1">{b.stat}</p>
                    <p className="text-white/70 text-xs font-semibold tracking-wide uppercase">{b.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

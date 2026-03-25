'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NewsletterProps {
  dark?: boolean
}

export function Newsletter({ dark = false }: NewsletterProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
    }, 800)
  }

  return (
    <section className={cn('py-16 md:py-20', dark ? 'bg-ink' : 'bg-ivory')}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={cn('font-sans text-xs tracking-[0.3em] uppercase mb-4 block', dark ? 'text-gold' : 'text-gold')}>
            Stay Connected
          </span>
          <h2 className={cn('font-serif text-3xl md:text-4xl font-medium mb-4', dark ? 'text-ivory' : 'text-ink')}>
            Join the DLSK Family
          </h2>
          <p className={cn('font-sans text-sm leading-relaxed mb-8', dark ? 'text-ivory/60' : 'text-ink-warm')}>
            Get exclusive previews of new collections, early access to sales, and stories from our artisan communities — delivered to your inbox.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={cn('flex items-center justify-center gap-3 py-4', dark ? 'text-gold' : 'text-rose')}
            >
              <div className="w-8 h-8 rounded-full bg-current/10 flex items-center justify-center">
                <Check size={16} />
              </div>
              <p className="font-sans text-sm font-medium">Welcome to the DLSK family!</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className={cn(
                  'flex-1 px-4 py-3 font-sans text-sm rounded-sm border focus:outline-none transition-colors',
                  dark
                    ? 'bg-ivory/10 border-ivory/20 text-ivory placeholder:text-ivory/40 focus:border-gold'
                    : 'bg-white border-ivory-darker text-ink placeholder:text-ink-light focus:border-gold'
                )}
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-rose text-ivory font-sans text-sm font-medium rounded-sm hover:bg-rose-dark transition-colors disabled:opacity-70 flex items-center gap-2 whitespace-nowrap"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-ivory/30 border-t-ivory rounded-full animate-spin" />
                ) : (
                  <>
                    Subscribe
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>
          )}

          <p className={cn('font-sans text-xs mt-4', dark ? 'text-ivory/30' : 'text-ink-light')}>
            No spam, ever. Unsubscribe anytime. We respect your privacy.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

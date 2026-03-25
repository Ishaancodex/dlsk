import React from 'react'
import { Truck, RotateCcw, ShieldCheck, Lock } from 'lucide-react'

const badges = [
  {
    icon: <Truck size={20} />,
    title: 'Free Shipping',
    subtitle: 'On orders above ₹999',
  },
  {
    icon: <RotateCcw size={20} />,
    title: 'Easy Returns',
    subtitle: '7-day hassle-free returns',
  },
  {
    icon: <ShieldCheck size={20} />,
    title: '100% Authentic',
    subtitle: 'Genuine handcrafted pieces',
  },
  {
    icon: <Lock size={20} />,
    title: 'Secure Payments',
    subtitle: 'UPI, Cards, COD accepted',
  },
]

export function TrustBadges() {
  return (
    <section className="bg-white border-y border-ivory-darker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto md:grid md:grid-cols-4 divide-x divide-ivory-darker scrollbar-hide">
          {badges.map((badge) => (
            <div
              key={badge.title}
              className="flex items-center gap-4 px-6 py-5 min-w-[220px] md:min-w-0"
            >
              <div className="shrink-0 w-10 h-10 rounded-full bg-rose-pale flex items-center justify-center text-rose">
                {badge.icon}
              </div>
              <div>
                <p className="font-sans text-sm font-medium text-ink">{badge.title}</p>
                <p className="font-sans text-xs text-ink-warm">{badge.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

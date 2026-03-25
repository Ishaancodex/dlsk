import React from 'react'
import Link from 'next/link'
import { Instagram, Facebook } from 'lucide-react'
import { Newsletter } from '@/components/home/Newsletter'

const shopLinks = [
  { label: 'All Collections', href: '/collections' },
  { label: 'Summer Wear', href: '/collection/summer' },
  { label: 'Winter Wear', href: '/collection/winter' },
  { label: 'Fancy Wear', href: '/collection/fancy' },
  { label: 'New Arrivals', href: '/collections' },
  { label: 'Bestsellers', href: '/collections' },
]

const companyLinks = [
  { label: 'Our Story', href: '/founder' },
  { label: 'The Founder', href: '/founder' },
  { label: 'Sustainability', href: '/founder' },
  { label: 'Press', href: '/contact' },
]

const supportLinks = [
  { label: 'Track Order', href: '/track-order' },
  { label: 'Shipping Policy', href: '/contact' },
  { label: 'Returns & Exchanges', href: '/contact' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Bulk Orders', href: '/contact?type=wholesale' },
]

const trustBadges = [
  '100% Authentic',
  'Free Returns',
  'Secure Payment',
  'Handcrafted',
]

export function Footer() {
  return (
    <footer className="bg-ink text-ivory/80">
      {/* Newsletter */}
      <Newsletter dark />

      {/* Trust Badges Strip */}
      <div className="border-t border-ivory/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            {trustBadges.map((badge) => (
              <span key={badge} className="font-sans text-xs tracking-wider text-ivory/50 flex items-center gap-2">
                <span className="w-1 h-1 bg-gold rounded-full" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="border-t border-ivory/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div>
              <div className="mb-6">
                <p className="font-serif text-3xl font-semibold text-ivory">DLSK</p>
                <p className="font-sans text-xs tracking-widest text-ivory/50 mt-1">by Aditya Aggarwal</p>
              </div>
              <p className="font-sans text-sm text-ivory/60 leading-relaxed mb-6">
                Premium Indian traditional women's wear, rooted in heritage and crafted for the modern woman.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory/50 hover:text-gold transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory/50 hover:text-gold transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                {/* Pinterest */}
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory/50 hover:text-gold transition-colors"
                  aria-label="Pinterest"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                  </svg>
                </a>
              </div>
              <div className="mt-6 inline-flex items-center gap-2 px-3 py-2 bg-ivory/5 rounded-sm border border-ivory/10">
                <span className="text-gold text-lg">🇮🇳</span>
                <span className="font-sans text-xs text-ivory/50">Made in India</span>
              </div>
            </div>

            {/* Shop */}
            <div>
              <h4 className="font-sans text-xs font-medium tracking-widest text-gold uppercase mb-6">Shop</h4>
              <ul className="flex flex-col gap-3">
                {shopLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-ivory/60 hover:text-ivory transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-sans text-xs font-medium tracking-widest text-gold uppercase mb-6">Company</h4>
              <ul className="flex flex-col gap-3">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-ivory/60 hover:text-ivory transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-sans text-xs font-medium tracking-widest text-gold uppercase mb-6">Support</h4>
              <ul className="flex flex-col gap-3">
                {supportLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-ivory/60 hover:text-ivory transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-ivory/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-sans text-xs text-ivory/40">
              © 2024 DLSK. Made with ♥ in India
            </p>
            <div className="flex items-center gap-6">
              <Link href="/contact" className="font-sans text-xs text-ivory/40 hover:text-ivory/70 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/contact" className="font-sans text-xs text-ivory/40 hover:text-ivory/70 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

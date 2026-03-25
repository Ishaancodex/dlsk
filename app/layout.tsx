import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { ToastProvider } from '@/context/ToastContext'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ToastContainer } from '@/components/ui/Toast'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'DLSK — Elegant Indian Traditional Wear',
  description:
    'Premium handcrafted Indian women\'s suits. Discover our Summer, Winter, and Fancy Wear collections by Aditya Aggarwal — where tradition meets modern elegance.',
  keywords: 'Indian suits, women ethnic wear, salwar kameez, traditional wear, DLSK, Aditya Aggarwal',
  openGraph: {
    title: 'DLSK — Elegant Indian Traditional Wear',
    description: 'Premium handcrafted Indian women\'s suits by Aditya Aggarwal.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-ivory text-ink antialiased">
        <CartProvider>
          <WishlistProvider>
            <ToastProvider>
              <Header />
              <main className="min-h-screen">{children}</main>
              <Footer />
              <ToastContainer />
            </ToastProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  )
}

'use client'

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'

interface WishlistContextValue {
  productIds: string[]
  toggle: (productId: string) => void
  isWishlisted: (productId: string) => boolean
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [productIds, setProductIds] = useState<string[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('dlsk-wishlist')
      if (saved) {
        setProductIds(JSON.parse(saved))
      }
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('dlsk-wishlist', JSON.stringify(productIds))
    } catch {
      // ignore
    }
  }, [productIds])

  const toggle = useCallback((productId: string) => {
    setProductIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    )
  }, [])

  const isWishlisted = useCallback(
    (productId: string) => productIds.includes(productId),
    [productIds]
  )

  return (
    <WishlistContext.Provider value={{ productIds, toggle, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) throw new Error('useWishlist must be used within WishlistProvider')
  return context
}

import React from 'react'
import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'rounded-sm shimmer-bg',
        className
      )}
    />
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {/* Image placeholder */}
      <Skeleton className="w-full aspect-[3/4]" />
      {/* Collection label */}
      <Skeleton className="h-3 w-20" />
      {/* Product name */}
      <Skeleton className="h-5 w-3/4" />
      {/* Price */}
      <Skeleton className="h-4 w-1/3" />
      {/* Rating */}
      <Skeleton className="h-3 w-24" />
    </div>
  )
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

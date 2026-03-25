import React from 'react'
import { cn } from '@/lib/utils'

type BadgeVariant = 'new' | 'bestseller' | 'discount' | 'sale' | 'default'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  new: 'bg-gold text-ink',
  bestseller: 'bg-rose text-ivory',
  discount: 'bg-ink text-ivory',
  sale: 'bg-rose-light text-ivory',
  default: 'bg-ivory-dark text-ink-mid',
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 text-xs font-sans font-medium tracking-wider uppercase rounded-sm',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

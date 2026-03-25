'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  fullWidth?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-rose text-ivory hover:bg-rose-dark border border-transparent shadow-sm hover:shadow-rose/20',
  secondary:
    'bg-gold text-ink hover:bg-gold-dark border border-transparent shadow-sm hover:shadow-gold/20',
  ghost: 'bg-transparent text-ink hover:bg-ivory-dark border border-transparent',
  outline:
    'bg-transparent border border-ink/30 text-ink hover:border-ink hover:bg-ink/5',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  iconLeft,
  iconRight,
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.1 }}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-sans font-medium tracking-wide rounded-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || loading}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : iconLeft ? (
        <span className="shrink-0">{iconLeft}</span>
      ) : null}
      {children}
      {!loading && iconRight && <span className="shrink-0">{iconRight}</span>}
    </motion.button>
  )
}

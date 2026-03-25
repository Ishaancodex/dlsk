'use client'

import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'
import { useToast, ToastType } from '@/context/ToastContext'
import { cn } from '@/lib/utils'

const typeConfig: Record<ToastType, { icon: React.ReactNode; className: string }> = {
  success: {
    icon: <CheckCircle size={18} />,
    className: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  },
  error: {
    icon: <XCircle size={18} />,
    className: 'bg-red-50 border-red-200 text-red-800',
  },
  info: {
    icon: <Info size={18} />,
    className: 'bg-gold-pale border-gold/30 text-ink',
  },
}

export function ToastContainer() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const config = typeConfig[toast.type]
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={cn(
                'flex items-start gap-3 px-4 py-3 rounded-sm border shadow-medium pointer-events-auto',
                config.className
              )}
            >
              <span className="mt-0.5 shrink-0">{config.icon}</span>
              <p className="font-sans text-sm flex-1 leading-relaxed">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
                aria-label="Dismiss"
              >
                <X size={14} />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

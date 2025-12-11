'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Check, AlertCircle, Info, X } from 'lucide-react'
import { useEffect, useState } from 'react'

export type ToastType = 'success' | 'error' | 'info'

export interface ToastMessage {
  id: string
  message: string
  type: ToastType
  duration?: number
}

let toastId = 0

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const addToast = (message: string, type: ToastType = 'info', duration = 3000) => {
    const id = `toast-${toastId++}`
    const toast: ToastMessage = { id, message, type, duration }

    setToasts((prev) => [...prev, toast])

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return { toasts, addToast, removeToast }
}

interface ToastContainerProps {
  toasts: ToastMessage[]
  removeToast: (id: string) => void
}

export function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
  return (
    <div className="fixed top-20 right-4 z-50 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="mb-3 pointer-events-auto"
          >
            <div
              className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg backdrop-blur-md border ${
                toast.type === 'success'
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                  : toast.type === 'error'
                    ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                    : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
              }`}
            >
              {toast.type === 'success' && (
                <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
              )}
              {toast.type === 'error' && (
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
              )}
              {toast.type === 'info' && (
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              )}

              <p
                className={`text-sm font-medium ${
                  toast.type === 'success'
                    ? 'text-green-800 dark:text-green-300'
                    : toast.type === 'error'
                      ? 'text-red-800 dark:text-red-300'
                      : 'text-blue-800 dark:text-blue-300'
                }`}
              >
                {toast.message}
              </p>

              <button
                onClick={() => removeToast(toast.id)}
                className="ml-2 flex-shrink-0 hover:opacity-70 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

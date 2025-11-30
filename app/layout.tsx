import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'
import { CartProvider } from '@/store/cartStore'
import { ToastProvider } from '@/components/ToastProvider'

export const metadata: Metadata = {
  title: 'ElectroStore - Premium Electronics',
  description: 'Shop the latest electronics with fast delivery and 24/7 support',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <CartProvider>
            <ToastProvider>
              <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
                <Navbar />
                <main className="pt-16">
                  {children}
                </main>
                <Footer />
              </div>
            </ToastProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

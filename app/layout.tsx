import type { Metadata, Viewport } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mansa — Where Culture Earns',
  description: 'Discover authentic ethnic restaurants near you. Earn Points every time you eat. Redeem rewards across the entire ecosystem.',
  generator: 'v0.app',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Mansa',
  },
  icons: {
    icon: '/icon-192.png',
    apple: '/icon-192.png',
  },
  openGraph: {
    title: 'Mansa — Where Culture Earns',
    description: 'Discover authentic ethnic restaurants near you. Earn Points every time you eat.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#C8922A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="bg-background">
        <body className="font-sans antialiased min-h-screen bg-background text-foreground">
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </body>
      </html>
    </ClerkProvider>
  )
}

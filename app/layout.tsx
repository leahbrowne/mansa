import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mansa — Where Culture Earns',
  description: 'Discover authentic ethnic restaurants near you. Earn Points every time you eat. Redeem rewards across the entire ecosystem.',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'Mansa' },
}

export const viewport: Viewport = { themeColor: '#C8922A', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#C8922A" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Mansa" />
      </head>
      <body className="font-sans antialiased min-h-screen bg-background text-foreground">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

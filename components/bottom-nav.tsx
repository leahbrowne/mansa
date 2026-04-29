'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Compass, QrCode, Gift, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/discover', label: 'Discover', icon: Compass },
  { href: '/scan', label: 'Scan', icon: QrCode, isCenter: true },
  { href: '/rewards', label: 'Rewards', icon: Gift },
  { href: '/profile', label: 'Profile', icon: User },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border rounded-t-2xl safe-area-pb">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          if (item.isCenter) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center -mt-6"
              >
                <div
                  className={cn(
                    'w-14 h-14 rounded-full flex items-center justify-center transition-all',
                    isActive
                      ? 'bg-primary shadow-lg shadow-primary/30'
                      : 'bg-primary/80 hover:bg-primary'
                  )}
                >
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <span
                  className={cn(
                    'text-xs mt-1 font-medium',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  {item.label}
                </span>
              </Link>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 py-2 px-4 transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

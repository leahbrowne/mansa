'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Crown, MapPin, Copy, Home, Compass, QrCode, Gift, User, Check, TrendingUp, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const restaurants = [
  {
    id: 'cou-cou-co',
    name: 'Cou Cou & Co',
    cuisine: 'Caribbean',
    badge: 'Barbadian Owned',
    distance: '0.3 miles',
    earnRate: 10,
    image: '/images/restaurant-2.jpg',
  },
  {
    id: 'trini-doubles',
    name: 'Trini Doubles Shack',
    cuisine: 'Caribbean',
    distance: '0.6 miles',
    earnRate: 10,
    image: '/images/restaurant-1.jpg',
  },
  {
    id: 'yard-kitchen',
    name: 'Yard Kitchen',
    cuisine: 'Caribbean',
    distance: '0.9 miles',
    earnRate: 10,
    image: '/images/restaurant-3.jpg',
  },
  {
    id: 'spice-route',
    name: 'Spice Route',
    cuisine: 'South Asian',
    distance: '1.2 miles',
    earnRate: 10,
    image: '/images/restaurant-4.jpg',
  },
]

const trendingDishes = [
  { name: 'Pudding & Souse', image: '/images/dish-1.jpg' },
  { name: 'Fishcakes', image: '/images/dish-2.jpg' },
  { name: 'Cou Cou & Flying Fish', image: '/images/dish-3.jpg' },
  { name: 'Conkies', image: '/images/restaurant-5.jpg' },
]

const transactions = [
  { type: 'earn', amount: 340, place: 'Cou Cou & Co', time: '2 days ago' },
  { type: 'earn', amount: 180, place: 'Trini Doubles Shack', time: '4 days ago' },
  { type: 'redeem', amount: 500, place: 'Redeemed at Yard Kitchen', time: '5 days ago' },
  { type: 'earn', amount: 220, place: 'Spice Route', time: '1 week ago' },
  { type: 'earn', amount: 50, place: 'Referral bonus', time: '1 week ago' },
]

const navItems = [
  { href: '/demo-consumer', label: 'Home', icon: Home },
  { href: '/discover', label: 'Discover', icon: Compass },
  { href: '/scan', label: 'Scan', icon: QrCode, isCenter: true },
  { href: '/rewards', label: 'Rewards', icon: Gift },
  { href: '/profile', label: 'Profile', icon: User },
]

export default function DemoConsumerPage() {
  const pathname = usePathname()
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText('https://mansa.app/r/amara-d')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Demo Banner */}
      <div className="bg-surface py-2 px-4 text-center">
        <p className="text-xs text-primary font-medium tracking-wide">
          Demo Mode — explore Mansa as a diner
        </p>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 space-y-8">
        {/* Balance Chip */}
        <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 border border-primary/30 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Crown className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Your Mansas</p>
              <p className="font-mono text-2xl font-semibold text-foreground">2,840</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
            Redeem
          </button>
        </div>

        {/* Near You Section */}
        <section>
          <h2 className="font-serif text-2xl mb-4">Near you</h2>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar -mx-4 px-4">
            {restaurants.map((restaurant) => (
              <Link
                key={restaurant.id}
                href={`/restaurant/${restaurant.id}`}
                className="group shrink-0 w-56 bg-card rounded-lg overflow-hidden"
              >
                <div className="relative h-36">
                  <Image
                    src={restaurant.image}
                    alt={restaurant.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {restaurant.badge && (
                    <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm px-2 py-1">
                      <span className="text-xs font-medium text-primary-foreground">{restaurant.badge}</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-lg font-medium mb-1 truncate group-hover:text-primary transition-colors">
                    {restaurant.name}
                  </h3>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="px-2 py-0.5 bg-accent/20 text-accent text-xs font-medium">
                      {restaurant.cuisine}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground text-xs">
                      <MapPin className="w-3 h-3" />
                      {restaurant.distance}
                    </span>
                  </div>
                  <p className="mt-3 text-xs text-primary font-mono">
                    {restaurant.earnRate} Mansas/£1
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Trending Dishes Section */}
        <section>
          <h2 className="font-serif text-2xl mb-4">Trending Dishes</h2>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar -mx-4 px-4">
            {trendingDishes.map((dish) => (
              <div key={dish.name} className="shrink-0 w-44">
                <div className="relative h-44 rounded-lg overflow-hidden mb-2">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="font-serif text-sm">{dish.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Referrals Section */}
        <section className="bg-card rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-primary" />
            <h2 className="font-serif text-xl">Referrals</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-surface rounded-lg p-3 text-center">
              <p className="font-mono text-2xl text-foreground">3</p>
              <p className="text-xs text-muted-foreground">Referrals Made</p>
            </div>
            <div className="bg-surface rounded-lg p-3 text-center">
              <p className="font-mono text-2xl text-primary">150</p>
              <p className="text-xs text-muted-foreground">Mansas Earned</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 bg-surface rounded-lg px-3 py-2 text-sm text-muted-foreground truncate font-mono">
              mansa.app/r/amara-d
            </div>
            <button
              onClick={handleCopy}
              className="p-2 bg-primary/20 rounded-lg hover:bg-primary/30 transition-colors"
            >
              {copied ? (
                <Check className="w-5 h-5 text-primary" />
              ) : (
                <Copy className="w-5 h-5 text-primary" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Leaderboard position:</span>
            <span className="font-mono text-primary font-medium">#4 this month</span>
          </div>
        </section>

        {/* Recent Transactions Section */}
        <section>
          <h2 className="font-serif text-2xl mb-4">Recent Transactions</h2>
          <div className="space-y-3">
            {transactions.map((tx, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{tx.place}</p>
                  <p className="text-xs text-muted-foreground">{tx.time}</p>
                </div>
                <p
                  className={cn(
                    'font-mono text-sm font-medium',
                    tx.type === 'earn' ? 'text-success' : 'text-accent'
                  )}
                >
                  {tx.type === 'earn' ? '+' : '-'}{tx.amount} Mansas
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border rounded-t-2xl">
        <div className="flex items-center justify-around h-16 safe-area-pb">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href === '/demo-consumer' && pathname === '/demo-consumer')
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
                      'bg-primary shadow-lg shadow-primary/30'
                    )}
                  >
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <span className="text-xs mt-1 font-medium text-muted-foreground">
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
    </div>
  )
}

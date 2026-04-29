'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Crown, ArrowRight, QrCode, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Mock data
const mockBalance = 2840
const minimumRedemption = 500

const partnerRestaurants = [
  { id: '1', name: 'Alara Lagos Kitchen', image: '/images/restaurant-1.jpg', cuisine: 'West African' },
  { id: '2', name: 'Jerk Junction', image: '/images/restaurant-2.jpg', cuisine: 'Caribbean' },
  { id: '3', name: 'Merkato Ethiopian', image: '/images/restaurant-3.jpg', cuisine: 'Ethiopian' },
  { id: '4', name: 'Punjab Grill', image: '/images/restaurant-4.jpg', cuisine: 'South Asian' },
  { id: '5', name: 'Beirut Nights', image: '/images/restaurant-5.jpg', cuisine: 'Levantine' },
]

const recentTransactions = [
  { id: '1', type: 'earn', amount: 340, restaurant: 'Alara Lagos Kitchen', date: 'Today' },
  { id: '2', type: 'earn', amount: 250, restaurant: 'Jerk Junction', date: 'Yesterday' },
  { id: '3', type: 'redeem', amount: -500, restaurant: 'Punjab Grill', date: '3 days ago' },
  { id: '4', type: 'referral', amount: 50, restaurant: 'Referral bonus', date: '1 week ago' },
]

export default function RewardsPage() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null)
  const [redeemAmount, setRedeemAmount] = useState('')
  const [showQR, setShowQR] = useState(false)

  const canRedeem = mockBalance >= minimumRedemption

  const handleRedeem = () => {
    if (selectedRestaurant && parseInt(redeemAmount) >= minimumRedemption) {
      setShowQR(true)
    }
  }

  const handleCloseQR = () => {
    setShowQR(false)
    setSelectedRestaurant(null)
    setRedeemAmount('')
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-6 py-4 border-b border-border">
        <h1 className="font-serif text-2xl text-center">Rewards</h1>
      </header>

      <div className="px-6 py-6 space-y-8">
        {/* Balance Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 border border-primary/20 p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center">
              <Crown className="w-7 h-7 text-primary" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                Your Balance
              </p>
              <p className="font-mono text-4xl font-semibold text-foreground">
                {mockBalance.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              = £{(mockBalance / 100).toFixed(2)} value
            </span>
            <span className={cn(
              'px-2 py-1',
              canRedeem ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'
            )}>
              {canRedeem ? 'Ready to redeem' : `${minimumRedemption - mockBalance} more to redeem`}
            </span>
          </div>
        </div>

        {/* Redeem Section */}
        {canRedeem && !showQR && (
          <section>
            <h2 className="font-serif text-xl mb-4">Redeem at</h2>
            <div className="space-y-3">
              {partnerRestaurants.map((restaurant) => (
                <button
                  key={restaurant.id}
                  onClick={() => setSelectedRestaurant(
                    selectedRestaurant === restaurant.id ? null : restaurant.id
                  )}
                  className={cn(
                    'w-full flex items-center gap-4 p-3 transition-colors',
                    selectedRestaurant === restaurant.id
                      ? 'bg-primary/10 border border-primary'
                      : 'bg-card border border-border hover:border-primary/50'
                  )}
                >
                  <div className="w-16 h-16 relative shrink-0">
                    <Image
                      src={restaurant.image}
                      alt={restaurant.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-serif text-lg">{restaurant.name}</h3>
                    <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
                  </div>
                  <ArrowRight className={cn(
                    'w-5 h-5 transition-colors',
                    selectedRestaurant === restaurant.id ? 'text-primary' : 'text-muted-foreground'
                  )} />
                </button>
              ))}
            </div>

            {selectedRestaurant && (
              <div className="mt-6 space-y-4">
                <label className="block text-sm text-muted-foreground">
                  Points to redeem (min {minimumRedemption})
                </label>
                <input
                  type="number"
                  value={redeemAmount}
                  onChange={(e) => setRedeemAmount(e.target.value)}
                  placeholder={minimumRedemption.toString()}
                  max={mockBalance}
                  className="w-full bg-card border border-border px-4 py-3 text-xl font-mono text-center focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                {redeemAmount && parseInt(redeemAmount) >= minimumRedemption && (
                  <p className="text-center text-muted-foreground">
                    = £{(parseInt(redeemAmount) / 100).toFixed(2)} off your bill
                  </p>
                )}
                <Button
                  onClick={handleRedeem}
                  disabled={!redeemAmount || parseInt(redeemAmount) < minimumRedemption}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none py-6"
                >
                  Generate QR Code
                </Button>
              </div>
            )}
          </section>
        )}

        {/* QR Code Modal */}
        {showQR && (
          <div className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-6">
            <div className="w-full max-w-sm text-center space-y-6">
              <button
                onClick={handleCloseQR}
                className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="font-serif text-2xl">Show this to staff</h2>

              <div className="bg-white p-8 mx-auto w-64 h-64 flex items-center justify-center">
                <QrCode className="w-full h-full text-black" />
              </div>

              <div className="space-y-2">
                <p className="text-2xl font-mono text-primary">
                  -{parseInt(redeemAmount).toLocaleString()} Points
                </p>
                <p className="text-muted-foreground">
                  £{(parseInt(redeemAmount) / 100).toFixed(2)} off at{' '}
                  {partnerRestaurants.find(r => r.id === selectedRestaurant)?.name}
                </p>
              </div>

              <p className="text-sm text-muted-foreground">
                This code expires in 5 minutes
              </p>
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <section>
          <h2 className="font-serif text-xl mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-4 bg-card border border-border"
              >
                <div>
                  <p className="font-medium">{tx.restaurant}</p>
                  <p className="text-sm text-muted-foreground">{tx.date}</p>
                </div>
                <span className={cn(
                  'font-mono font-medium',
                  tx.amount > 0 ? 'text-success' : 'text-accent'
                )}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

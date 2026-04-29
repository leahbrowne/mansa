'use client'

import { useState } from 'react'
import Link from 'next/link'
import { User, Share2, Copy, Check, ChevronRight, Settings, HelpCircle, LogOut, Trophy, Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Mock user data
const mockUser = {
  name: 'Leah Asantewaa',
  email: 'leah@moremidigital.com',
  balance: 2840,
  referralCode: 'LEAH2026',
  referralCount: 7,
  rank: 12,
  cuisinePreferences: ['West African', 'Caribbean', 'Ethiopian'],
}

const topReferrers = [
  { rank: 1, name: 'Kwame A.', referrals: 23 },
  { rank: 2, name: 'Amara O.', referrals: 19 },
  { rank: 3, name: 'Tariq M.', referrals: 15 },
]

const menuItems = [
  { icon: Settings, label: 'Settings', href: '/settings' },
  { icon: HelpCircle, label: 'Help & Support', href: '/help' },
]

export default function ProfilePage() {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://mansa.app/r/${mockUser.referralCode}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join Mansa',
          text: 'Earn rewards for eating authentic food! Use my referral code to get started.',
          url: `https://mansa.app/r/${mockUser.referralCode}`,
        })
      } catch {
        handleCopyLink()
      }
    } else {
      handleCopyLink()
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-6 py-4 border-b border-border">
        <h1 className="font-serif text-2xl text-center">Profile</h1>
      </header>

      <div className="px-6 py-6 space-y-8">
        {/* User Info */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-primary" />
          </div>
          <div>
            <h2 className="font-serif text-2xl">{mockUser.name}</h2>
            <p className="text-muted-foreground">{mockUser.email}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card border border-border p-4 text-center">
            <Crown className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="font-mono text-xl font-semibold">{mockUser.balance.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Points</p>
          </div>
          <div className="bg-card border border-border p-4 text-center">
            <Share2 className="w-5 h-5 text-secondary mx-auto mb-2" />
            <p className="font-mono text-xl font-semibold">{mockUser.referralCount}</p>
            <p className="text-xs text-muted-foreground">Referrals</p>
          </div>
          <div className="bg-card border border-border p-4 text-center">
            <Trophy className="w-5 h-5 text-accent mx-auto mb-2" />
            <p className="font-mono text-xl font-semibold">#{mockUser.rank}</p>
            <p className="text-xs text-muted-foreground">Rank</p>
          </div>
        </div>

        {/* Referral Section */}
        <section className="bg-card border border-border p-6">
          <h3 className="font-serif text-xl mb-4">Refer & Earn</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Earn 50 Points for every friend who makes their first purchase. Earn 100 Points for every restaurant you refer.
          </p>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 bg-background border border-border px-4 py-3 font-mono text-lg">
              {mockUser.referralCode}
            </div>
            <Button
              variant="outline"
              onClick={handleCopyLink}
              className={cn(
                'border-border px-4',
                copied && 'border-success text-success'
              )}
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </Button>
          </div>

          <Button
            onClick={handleShare}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none py-5"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share your link
          </Button>
        </section>

        {/* Leaderboard */}
        <section>
          <h3 className="font-serif text-xl mb-4">Top Referrers This Month</h3>
          <div className="space-y-3">
            {topReferrers.map((referrer) => (
              <div
                key={referrer.rank}
                className={cn(
                  'flex items-center justify-between p-4 border',
                  referrer.rank === 1
                    ? 'bg-primary/10 border-primary'
                    : 'bg-card border-border'
                )}
              >
                <div className="flex items-center gap-4">
                  <span className={cn(
                    'w-8 h-8 flex items-center justify-center font-mono font-semibold',
                    referrer.rank === 1 && 'bg-primary text-primary-foreground'
                  )}>
                    {referrer.rank}
                  </span>
                  <span className="font-medium">{referrer.name}</span>
                </div>
                <span className="text-muted-foreground">
                  {referrer.referrals} referrals
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Cuisine Preferences */}
        <section>
          <h3 className="font-serif text-xl mb-4">Your Cuisines</h3>
          <div className="flex flex-wrap gap-2">
            {mockUser.cuisinePreferences.map((cuisine) => (
              <span
                key={cuisine}
                className="px-4 py-2 bg-primary/10 text-primary text-sm font-medium"
              >
                {cuisine}
              </span>
            ))}
            <button className="px-4 py-2 border border-dashed border-border text-muted-foreground text-sm hover:border-primary hover:text-primary transition-colors">
              + Add more
            </button>
          </div>
        </section>

        {/* Menu */}
        <section className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center justify-between p-4 bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <item.icon className="w-5 h-5 text-muted-foreground" />
                <span>{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
          ))}

          <button className="w-full flex items-center justify-between p-4 bg-card border border-border hover:border-destructive/50 transition-colors text-destructive">
            <div className="flex items-center gap-4">
              <LogOut className="w-5 h-5" />
              <span>Sign out</span>
            </div>
          </button>
        </section>
      </div>
    </main>
  )
}

'use client'

import { useEffect, useMemo, useState } from 'react'
import { Crown, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Tier = { mansas: number; value: string; descriptor: string }
const tiers: Tier[] = [
  { mansas: 500, value: '£5.00', descriptor: 'A taste' },
  { mansas: 1000, value: '£10.00', descriptor: 'A proper meal' },
  { mansas: 2500, value: '£25.00', descriptor: 'Treat yourself' },
]

const partners = [
  { name: 'Cou Cou & Co', distance: '0.4 miles away' },
  { name: 'Habesha Corner', distance: '0.8 miles away' },
  { name: 'Yard Kitchen', distance: '1.1 miles away' },
]

const transactions = [
  ['+340 Mansas', 'Cou Cou & Co · Dining', '2 days ago'],
  ['+180 Mansas', 'Trini Doubles Shack · Dining', '4 days ago'],
  ['-500 Mansas', 'Redeemed · Yard Kitchen', '5 days ago'],
  ['+220 Mansas', 'Spice Route · Dining', '1 week ago'],
  ['+50 Mansas', 'Referral bonus · Amara referred Kwame', '1 week ago'],
  ['+200 Mansas', 'Event bonus · East London Food Festival', '2 weeks ago'],
]

export default function RewardsPage() {
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null)
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(600)

  useEffect(() => {
    if (!selectedTier || !selectedRestaurant) return
    const timer = setInterval(() => setTimeLeft((v) => Math.max(v - 1, 0)), 1000)
    return () => clearInterval(timer)
  }, [selectedTier, selectedRestaurant])

  const progress = useMemo(() => (2840 / 3000) * 100, [])
  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const ss = String(timeLeft % 60).padStart(2, '0')

  if (selectedTier && selectedRestaurant) {
    return (
      <main className="fixed inset-0 z-50 bg-background px-6 py-8 text-center">
        <h2 className="font-serif text-3xl">Show this to restaurant staff</h2>
        <div className="mx-auto mt-8 h-72 w-72 rounded-2xl border-2 border-primary bg-card p-6">
          <div className="h-full w-full rounded-xl border border-primary/40 bg-background animate-pulse" />
        </div>
        <p className="mt-6 font-mono text-3xl text-primary">-{selectedTier.mansas.toLocaleString()} Mansas</p>
        <p className="mt-2 font-mono text-muted-foreground">This code expires in {mm}:{ss}</p>
        <button className="mt-6 text-sm text-muted-foreground" onClick={() => { setSelectedTier(null); setSelectedRestaurant(null); setTimeLeft(600) }}>Cancel</button>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background px-6 py-6">
      <h1 className="font-serif text-4xl">Your Rewards</h1>
      <section className="mt-6 rounded-2xl border border-primary/50 bg-card p-[1px]">
        <div className="rounded-2xl bg-card p-5">
          <div className="flex items-center gap-3"><Crown className="text-primary" /><p className="text-xs uppercase tracking-[0.2em]">Your Mansas</p></div>
          <p className="font-mono text-6xl text-primary">2,840</p>
          <p className="text-sm text-muted-foreground">≈ £28.40 redemption value</p>
          <div className="mt-4 h-2 rounded-full bg-background"><div className="h-2 rounded-full bg-primary" style={{ width: `${progress}%` }} /></div>
          <p className="mt-2 text-xs text-muted-foreground">3,000 Mansas — next milestone</p>
          <p className="text-xs">160 Mansas to go</p>
        </div>
      </section>
      <section className="mt-8">
        <h2 className="font-serif text-3xl">Redeem your Mansas</h2>
        <p className="mt-1 text-sm text-muted-foreground">Minimum redemption: 500 Mansas (£5.00). Redeem at any Mansa partner restaurant.</p>
        <div className="mt-4 space-y-3">
          {tiers.map((tier) => (
            <div key={tier.mansas} className="rounded-xl border border-border bg-card p-4">
              <p className="font-mono text-3xl text-primary">{tier.mansas.toLocaleString()} Mansas</p>
              <p className="text-lg">= {tier.value}</p>
              <p className="font-serif text-lg italic">{tier.descriptor}</p>
              <Button className="mt-3 w-full bg-primary text-primary-foreground" onClick={() => setSelectedTier(tier)}>Redeem</Button>
            </div>
          ))}
        </div>
      </section>

      {selectedTier && (
        <div className="fixed inset-0 z-40 bg-black/70 p-6">
          <div className="mt-20 rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between"><h3 className="font-serif text-2xl">Choose your restaurant</h3><button onClick={() => setSelectedTier(null)}><X /></button></div>
            <div className="mt-4 space-y-3">{partners.map((p) => <div key={p.name} className="rounded-xl border border-border p-3"><p>{p.name}</p><p className="text-xs text-muted-foreground">{p.distance}</p><Button className="mt-2 w-full bg-primary text-primary-foreground" onClick={() => setSelectedRestaurant(p.name)}>Redeem here</Button></div>)}</div>
          </div>
        </div>
      )}

      <section className="mt-10">
        <h2 className="font-serif text-3xl">How you&apos;ve earned</h2>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
          {['12 restaurant visits', '3 referrals', '1 event bonus'].map((s) => <div key={s} className="rounded-full bg-card px-2 py-2">{s}</div>)}
        </div>
        <div className="mt-4 space-y-2">
          {transactions.map(([amount, detail, ago]) => <div key={amount + detail} className="rounded-xl bg-card p-3"><p className={cn('font-mono', amount.startsWith('+') ? 'text-primary' : 'text-accent')}>{amount}</p><p className="text-sm">{detail}</p><p className="text-xs text-muted-foreground">{ago}</p></div>)}
        </div>
      </section>
    </main>
  )
}

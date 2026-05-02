'use client'

import { useState } from 'react'
import { Edit2, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const leaders = [
  '1. K.O. — 850 Mansas',
  '2. T.B. — 720 Mansas',
  '3. M.A. — 640 Mansas',
  '4. Amara D. — 150 Mansas',
  '5. J.K. — 120 Mansas',
]

export default function ProfilePage() {
  const [copied, setCopied] = useState(false)

  return (
    <main className="min-h-screen bg-background px-6 py-6">
      <section className="relative">
        <button className="absolute right-0 top-0 text-muted-foreground"><Edit2 size={18} /></button>
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-background font-semibold">AD</div>
          <div><h1 className="font-serif text-4xl">Amara Diallo</h1><p className="text-sm text-muted-foreground">Member since April 2026</p></div>
        </div>
      </section>
      <section className="mt-8">
        <h2 className="font-serif text-2xl">Your cuisine preferences</h2>
        <div className="mt-3 flex gap-2 overflow-x-auto hide-scrollbar">{['West African','Caribbean','Ethiopian'].map((c)=><span key={c} className="whitespace-nowrap rounded-full bg-primary/20 px-4 py-2 text-primary">{c}</span>)}</div>
        <button className="mt-2 text-sm text-primary">Edit preferences</button>
      </section>
      <section className="mt-8 rounded-2xl border border-primary/50 bg-card p-5">
        <h2 className="font-serif text-3xl">Refer friends. Earn Mansas.</h2>
        <p className="mt-1 text-sm text-muted-foreground">Earn 50 Mansas when a friend makes their first scan. Earn 100 Mansas when you refer a restaurant that activates.</p>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-xl bg-background p-3">Friends referred: <span className="font-mono">3</span></div>
          <div className="rounded-xl bg-background p-3">Mansas from referrals: <span className="font-mono">150</span></div>
          <div className="rounded-xl bg-background p-3">Restaurants referred: <span className="font-mono">0</span></div>
          <div className="rounded-xl bg-background p-3">Potential earnings: <span className="font-mono">300</span></div>
        </div>
        <div className="mt-4 rounded-xl border border-primary/40 bg-background p-3">
          <p className="font-mono">mansa.app/join?ref=AMARA2026</p>
          <Button className="mt-3 w-full bg-primary text-primary-foreground" onClick={async () => { await navigator.clipboard.writeText('mansa.app/join?ref=AMARA2026'); setCopied(true); setTimeout(()=>setCopied(false), 1200)}}><Copy className="mr-2 h-4 w-4" />{copied ? 'Copied!' : 'Copy link'}</Button>
          <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
            <button className="rounded-full bg-green-600 px-3 py-2">WhatsApp</button>
            <button className="rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-3 py-2">Instagram</button>
            <button className="rounded-full bg-primary px-3 py-2 text-primary-foreground">Copy link</button>
          </div>
        </div>
        <h3 className="mt-6 font-serif text-2xl">This month&apos;s top referrers</h3>
        <div className="mt-2 space-y-2">{leaders.map((l)=> <div key={l} className={cn('rounded-lg p-2', l.includes('Amara') ? 'bg-primary/20 text-primary' : 'bg-background')}>{l}</div>)}</div>
        <p className="mt-2 font-serif text-sm italic text-muted-foreground">Top referrer this month earns 500 bonus Mansas</p>
      </section>
      <section className="mt-8 space-y-2">
        {['Notification preferences','Privacy settings','Help & support','Terms and conditions'].map((item)=><button key={item} className="flex w-full items-center justify-between rounded-xl bg-card p-4 text-left">{item}<span>›</span></button>)}
        <button className="pt-2 text-sm text-accent">Sign out</button>
      </section>
    </main>
  )
}

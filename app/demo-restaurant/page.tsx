'use client'

import { useState } from 'react'
import { QrCode, Download, Users, TrendingUp, Utensils, Calendar } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'

const chartData = [
  { day: 'Mon', mansas: 180 },
  { day: 'Tue', mansas: 220 },
  { day: 'Wed', mansas: 195 },
  { day: 'Thu', mansas: 280 },
  { day: 'Fri', mansas: 420 },
  { day: 'Sat', mansas: 510 },
  { day: 'Sun', mansas: 340 },
  { day: 'Mon', mansas: 165 },
  { day: 'Tue', mansas: 210 },
  { day: 'Wed', mansas: 185 },
  { day: 'Thu', mansas: 295 },
  { day: 'Fri', mansas: 445 },
  { day: 'Sat', mansas: 485 },
  { day: 'Sun', mansas: 310 },
]

const topDishes = [
  { rank: 1, name: 'Pudding & Souse', frequency: 100 },
  { rank: 2, name: 'Cou Cou & Flying Fish', frequency: 78 },
  { rank: 3, name: 'Bajan Fishcakes', frequency: 56 },
]

const stats = [
  { label: 'Mansas Issued This Month', value: '3,240', icon: TrendingUp },
  { label: 'Total Redemptions', value: '18', icon: Calendar },
  { label: 'New Customers via Mansa', value: '24', icon: Users },
  { label: 'Active Diners This Week', value: '47', icon: Utensils },
]

export default function DemoRestaurantPage() {
  const [promoActive, setPromoActive] = useState(false)

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Demo Banner */}
      <div className="bg-surface py-2 px-4 text-center">
        <p className="text-xs text-primary font-medium tracking-wide">
          Demo Mode — explore Mansa as a restaurant owner
        </p>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Header */}
        <header>
          <h1 className="font-serif text-3xl text-foreground mb-2">Cou Cou & Co</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full">
              Barbadian Owned
            </span>
            <span className="px-3 py-1 bg-success/20 text-success text-xs font-medium rounded-full">
              Mansa Certified
            </span>
          </div>
          <p className="text-muted-foreground italic text-sm leading-relaxed">
            A Bridgetown family bringing the soul of Bajan cooking to East London. Every dish made from scratch, every recipe passed down.
          </p>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="bg-card rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <p className="font-mono text-2xl text-foreground mb-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            )
          })}
        </section>

        {/* Chart */}
        <section className="bg-card rounded-xl p-4">
          <h2 className="font-serif text-xl mb-4">Mansas Issued — Last 14 Days</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9E9E9E', fontSize: 10 }}
                  interval={1}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9E9E9E', fontSize: 10 }}
                  width={30}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #2a2a2a',
                    borderRadius: '8px',
                    color: '#F5F0E8',
                  }}
                  labelStyle={{ color: '#9E9E9E' }}
                  cursor={{ fill: 'rgba(200, 146, 42, 0.1)' }}
                />
                <Bar 
                  dataKey="mansas" 
                  fill="#C8922A" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Top Dishes */}
        <section className="bg-card rounded-xl p-4">
          <h2 className="font-serif text-xl mb-4">Top Dishes by Scan Frequency</h2>
          <div className="space-y-4">
            {topDishes.map((dish) => (
              <div key={dish.rank} className="flex items-center gap-4">
                <span className="font-mono text-lg text-primary w-6">{dish.rank}.</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground mb-1">{dish.name}</p>
                  <div className="h-2 bg-surface rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${dish.frequency}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Promotion Toggle */}
        <section className="bg-card rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-foreground mb-1">Double Mansas Weekend Promotion</h3>
              <p className="text-xs text-muted-foreground">
                {promoActive ? 'Active — customers earn 2x Mansas' : 'Inactive — tap to enable'}
              </p>
            </div>
            <button
              onClick={() => setPromoActive(!promoActive)}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                promoActive ? 'bg-primary' : 'bg-surface'
              }`}
            >
              <span
                className={`absolute top-1 w-6 h-6 rounded-full bg-foreground transition-transform ${
                  promoActive ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>
        </section>

        {/* QR Code */}
        <section className="bg-card rounded-xl p-6 text-center">
          <div className="w-40 h-40 mx-auto bg-surface rounded-xl flex items-center justify-center mb-4">
            <QrCode className="w-24 h-24 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Your restaurant QR code — customers scan to earn
          </p>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
            <Download className="w-4 h-4" />
            Download QR Code
          </button>
        </section>
      </div>
    </div>
  )
}

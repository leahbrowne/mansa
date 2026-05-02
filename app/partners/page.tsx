'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const cuisineOptions = [
  'West African',
  'Caribbean',
  'South Asian',
  'East Asian',
  'Ethiopian',
  'Levantine',
  'Indo-Caribbean',
  'Persian',
  'North African',
  'Other',
]

const heritageOptions = [
  'Not applicable',
  'Nigerian Owned',
  'Ghanaian Owned',
  'Jamaican Owned',
  'Trinidadian Owned',
  'Barbadian Owned',
  'Ethiopian Owned',
  'Eritrean Owned',
  'Indian Owned',
  'Pakistani Owned',
  'Bangladeshi Owned',
  'Lebanese Owned',
  'Palestinian Owned',
  'Persian Owned',
  'Moroccan Owned',
  'Other',
]

export default function PartnersPage() {
  const [formData, setFormData] = useState({
    restaurantName: '',
    cuisineType: '',
    ownerName: '',
    email: '',
    heritageStatement: '',
    ownedBadge: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-6 py-24 text-center">
          <div className="w-20 h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-8">
            <Check className="w-10 h-10 text-primary" />
          </div>
          <h1 className="font-serif text-4xl mb-4">Welcome to Mansa</h1>
          <p className="text-muted-foreground mb-8">
            We&apos;ve received your application. Our team will review your details and send your QR code pack within 48 hours.
          </p>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none">
            <Link href="/">Return home</Link>
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 leading-tight text-balance">
            List your restaurant.<br />Reward your regulars.
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-10">
            Mansa connects authentic food businesses with a community that values culture as much as cuisine.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-sans font-semibold px-8 py-6 text-lg rounded-none"
            >
              <a href="#join-form">Get started free</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary/10 font-sans font-semibold px-8 py-6 text-lg rounded-none"
            >
              <a href="#how-it-works">See how it works</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-2xl mb-3">Free to list</h3>
              <p className="text-muted-foreground">
                Your restaurant appears in Mansa discovery immediately. No upfront cost.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-2xl mb-3">Keep 100% of your revenue</h3>
              <p className="text-muted-foreground">
                No transaction fees. Ever. We charge restaurants a flat monthly fee, nothing else.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-2xl mb-3">Real customer data</h3>
              <p className="text-muted-foreground">
                See which dishes earn the most Points, when your regulars visit, and how referrals drive new covers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founding Partner Offer */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-card border-2 border-primary p-8 md:p-10">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Founding Partner Offer</h2>
            <p className="text-lg text-foreground/80 mb-4">
              The first 20 restaurants to activate get 3 months free. <span className="text-primary font-medium">Seven spots remaining.</span>
            </p>
            <p className="text-muted-foreground mb-6">
              Founding Partners receive a permanent badge on their Mansa profile and priority placement at Mansa food festival events.
            </p>
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-8 py-6"
            >
              <a href="#join-form">
                Claim your spot
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-card">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-4xl text-center mb-16">How it works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="font-mono text-primary/30 text-sm mb-4">01</div>
              <h3 className="font-serif text-2xl mb-3">Submit your details</h3>
              <p className="text-muted-foreground">
                Tell us about your restaurant and the heritage behind your food. Takes 5 minutes.
              </p>
            </div>
            <div className="relative">
              <div className="font-mono text-primary/30 text-sm mb-4">02</div>
              <h3 className="font-serif text-2xl mb-3">Receive your QR code</h3>
              <p className="text-muted-foreground">
                We send you a printable QR pack. Customers scan to earn Points after paying.
              </p>
            </div>
            <div className="relative">
              <div className="font-mono text-primary/30 text-sm mb-4">03</div>
              <h3 className="font-serif text-2xl mb-3">Watch your community grow</h3>
              <p className="text-muted-foreground">
                Track earnings, redemptions, and new customers in your dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Owned Badge Explainer */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">
            Celebrating ownership, not gatekeeping.
          </h2>
          <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
            Mansa doesn&apos;t restrict who can join. But we do celebrate authenticity. When your restaurant is Caribbean Owned, Ethiopian Owned, or Barbadian Owned — we say so. Subtly. Powerfully. Because your community deserves to know.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="bg-primary/10 text-primary px-4 py-2 text-sm font-medium">
              Barbadian Owned
            </span>
            <span className="bg-primary/10 text-primary px-4 py-2 text-sm font-medium">
              Ethiopian Owned
            </span>
            <span className="bg-primary/10 text-primary px-4 py-2 text-sm font-medium">
              Jamaican Owned
            </span>
          </div>
        </div>
      </section>

      {/* Onboarding Form */}
      <section id="join-form" className="py-20 px-6 bg-card">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-center mb-10">Join Mansa</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Restaurant Name</label>
              <input
                type="text"
                required
                value={formData.restaurantName}
                onChange={(e) => handleInputChange('restaurantName', e.target.value)}
                className="w-full bg-background border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Cuisine Type</label>
              <select
                required
                value={formData.cuisineType}
                onChange={(e) => handleInputChange('cuisineType', e.target.value)}
                className="w-full bg-background border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Select cuisine type</option>
                {cuisineOptions.map((cuisine) => (
                  <option key={cuisine} value={cuisine}>{cuisine}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Owner Name</label>
              <input
                type="text"
                required
                value={formData.ownerName}
                onChange={(e) => handleInputChange('ownerName', e.target.value)}
                className="w-full bg-background border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full bg-background border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Heritage Statement</label>
              <textarea
                value={formData.heritageStatement}
                onChange={(e) => handleInputChange('heritageStatement', e.target.value)}
                placeholder="Tell us the story behind your food..."
                rows={4}
                className="w-full bg-background border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Owned Badge (optional)</label>
              <select
                value={formData.ownedBadge}
                onChange={(e) => handleInputChange('ownedBadge', e.target.value)}
                className="w-full bg-background border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Select your heritage</option>
                {heritageOptions.map((heritage) => (
                  <option key={heritage} value={heritage}>{heritage}</option>
                ))}
              </select>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none py-6 text-lg"
            >
              Join Mansa
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Free to list. £49/month to activate loyalty features. No transaction fees.
            </p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t-2 border-primary">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl text-primary">Mansa</h3>
            <p className="text-muted-foreground italic text-sm">Where culture earns.</p>
          </div>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/events" className="text-muted-foreground hover:text-foreground transition-colors">
              Events
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </nav>
        </div>
        <div className="max-w-4xl mx-auto mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          © 2026 Mansa. East London.
        </div>
      </footer>
    </main>
  )
}

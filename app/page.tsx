'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Search, MapPin, QrCode, Gift, Check, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const cuisines = [
  { name: 'West African', emoji: '🍲', color: 'bg-amber-600' },
  { name: 'Caribbean', emoji: '🥘', color: 'bg-orange-600' },
  { name: 'South Asian', emoji: '🍛', color: 'bg-yellow-600' },
  { name: 'East Asian', emoji: '🥢', color: 'bg-red-600' },
  { name: 'Ethiopian', emoji: '🫓', color: 'bg-amber-700' },
  { name: 'Levantine', emoji: '🧆', color: 'bg-emerald-700' },
  { name: 'Indo-Caribbean', emoji: '🍜', color: 'bg-rose-600' },
  { name: 'Persian', emoji: '🍚', color: 'bg-teal-600' },
  { name: 'North African', emoji: '🥗', color: 'bg-orange-700' },
]

const steps = [
  {
    icon: Search,
    title: 'Discover',
    description: 'Find Mansa Certified authentic restaurants near you',
  },
  {
    icon: QrCode,
    title: 'Eat & Scan',
    description: 'Scan the QR code after paying to earn Mansas',
  },
  {
    icon: Gift,
    title: 'Redeem',
    description: 'Spend your Mansas at any restaurant in the ecosystem',
  },
]

const benefits = [
  'Free to list',
  'Earn from day one',
  'Keep 100% of your revenue',
]

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-food.jpg"
            alt="Authentic ethnic cuisine"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 py-24 text-center">
          {/* Logo */}
          <div className="mb-12">
            <h2 className="font-serif text-2xl text-primary tracking-wide">Mansa</h2>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-semibold mb-6 leading-tight text-balance">
            <span className="block">Eat real food.</span>
            <span className="block text-primary">Earn Mansas.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-10 text-pretty">
            Discover authentic ethnic restaurants in East London. Earn rewards every time you eat.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-sans font-semibold px-8 py-6 text-lg rounded-none"
            >
              <Link href="/home">Start earning</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary/10 font-sans font-semibold px-8 py-6 text-lg rounded-none"
            >
              <Link href="/partners">List your restaurant</Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              Verified authentic
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              Every cuisine
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              East London first
            </span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl text-center mb-16">
            How it works
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="bg-surface-elevated p-8 text-center relative group"
              >
                {/* Step Number */}
                <div className="absolute top-4 left-4 font-mono text-primary/30 text-sm">
                  0{index + 1}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>

                {/* Title */}
                <h3 className="font-serif text-2xl mb-3">{step.title}</h3>

                {/* Description */}
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cuisine Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl text-center mb-4">
            Every cuisine. Every culture.
          </h2>
          <p className="text-muted-foreground text-center mb-16 max-w-xl mx-auto">
            From West African jollof to Persian tahdig, discover authentic flavours from around the world.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {cuisines.map((cuisine) => (
              <div
                key={cuisine.name}
                className={`${cuisine.color} p-6 flex items-center gap-4 group cursor-pointer hover:scale-[1.02] transition-transform`}
              >
                <span className="text-3xl" role="img" aria-label={cuisine.name}>
                  {cuisine.emoji}
                </span>
                <span className="font-sans font-medium text-white">
                  {cuisine.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Restaurants */}
      <section className="py-24 bg-[#080808]">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl text-center mb-16">
            Own an authentic restaurant?
          </h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
            {/* Benefits */}
            <div className="space-y-6">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xl">{benefit}</span>
                </div>
              ))}

              <p className="text-muted-foreground pt-4">
                Join the Mansa ecosystem and get discovered by customers who value authentic cuisine and heritage.
              </p>
            </div>

            {/* Pricing Card */}
            <div className="bg-card p-8 border border-border">
              <div className="text-sm text-primary font-mono uppercase tracking-wider mb-2">
                Activate Plan
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-serif text-5xl">£49</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <div className="bg-primary/10 text-primary px-4 py-2 inline-block mb-6">
                3 months free for founding partners
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Scan to earn loyalty</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Redemption dashboard</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Analytics & insights</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Mansa Certified badge eligibility</span>
                </li>
              </ul>

              <Button
                asChild
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none py-6"
              >
                <Link href="/partners">
                  Become a partner
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-background border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-serif text-3xl text-primary mb-2">Mansa</h3>
              <p className="text-muted-foreground italic">Where culture earns.</p>
            </div>

            <nav className="flex items-center gap-8 text-sm">
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="/partners" className="text-muted-foreground hover:text-foreground transition-colors">
                Partners
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            Launching in East London 2026
          </div>
        </div>
      </footer>
    </main>
  )
}

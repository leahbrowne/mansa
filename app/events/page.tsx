'use client'

import Link from 'next/link'
import { MapPin, Calendar, ArrowRight, Bookmark } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BottomNav } from '@/components/bottom-nav'

const featuredVendors = [
  { name: 'Cou Cou & Co', cuisine: 'Caribbean', badge: 'Barbadian Owned' },
  { name: 'Yard Kitchen', cuisine: 'Caribbean', badge: null },
  { name: 'Trini Doubles Shack', cuisine: 'Caribbean', badge: null },
  { name: 'Habesha Corner', cuisine: 'Ethiopian', badge: 'Ethiopian Owned' },
  { name: 'Jerk Junction', cuisine: 'Caribbean', badge: 'Jamaican Owned' },
  { name: 'Spice Route', cuisine: 'South Asian', badge: null },
]

const upcomingEvents = [
  {
    name: 'Caribbean Street Eats',
    date: 'Saturday 28 June 2026',
    location: 'Brixton Market',
    description: '30 vendors, live music, Points earned at every stall',
  },
  {
    name: 'West African Food Market',
    date: 'Sunday 6 July 2026',
    location: 'Peckham Levels',
    description: 'Celebrating West African culinary heritage. Mansa Certified vendors only.',
  },
  {
    name: 'South Asian Flavours Fair',
    date: 'Saturday 19 July 2026',
    location: 'Southall Broadway',
    description: 'From Kerala to Karachi. Earn Points across 25 participating restaurants.',
  },
]

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 leading-tight">
            Food. Culture. Community.
          </h1>
          <p className="text-primary text-lg md:text-xl max-w-xl mx-auto">
            Earn Points at every vendor. Discover authentic food festivals near you.
          </p>
        </div>
      </section>

      {/* Featured Event */}
      <section className="px-6 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border p-6 md:p-8">
            {/* Double Points Badge */}
            <div className="inline-block bg-primary/10 text-primary px-3 py-1 text-sm font-medium mb-4">
              Double Points Day
            </div>

            <h2 className="font-serif text-3xl md:text-4xl mb-3">
              East London Food Festival
            </h2>

            <div className="flex flex-wrap gap-4 text-muted-foreground mb-4">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Saturday 14 June 2026
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Victoria Park, East London
              </span>
            </div>

            <p className="text-foreground/80 mb-6 max-w-2xl">
              50+ authentic food vendors from across the African and Caribbean diaspora. 
              Earn double Points at every participating vendor all day.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 rounded-none"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Get directions
              </Button>
              <Button
                variant="outline"
                className="border-border hover:border-primary/50 rounded-none"
              >
                <Bookmark className="w-4 h-4 mr-2" />
                Save Event
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Participating Vendors */}
      <section className="px-6 mb-12">
        <div className="max-w-4xl mx-auto">
          <h3 className="font-serif text-2xl mb-6">Participating Vendors</h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {featuredVendors.map((vendor) => (
              <div
                key={vendor.name}
                className="bg-card border border-border p-4"
              >
                <h4 className="font-sans font-medium mb-1">{vendor.name}</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  {vendor.cuisine}
                  {vendor.badge && (
                    <span className="text-primary"> · {vendor.badge}</span>
                  )}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Earn 10 Points/£1
                  </span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5">
                    Mansa Partner
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="px-6 mb-12">
        <div className="max-w-4xl mx-auto">
          <h3 className="font-serif text-2xl mb-6">Upcoming Events</h3>

          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.name}
                className="bg-card border border-border p-5"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h4 className="font-serif text-xl mb-1">{event.name}</h4>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-2">
                      <span>{event.date}</span>
                      <span>·</span>
                      <span>{event.location}</span>
                    </div>
                    <p className="text-sm text-foreground/70">{event.description}</p>
                  </div>
                  <div className="shrink-0">
                    <span className="inline-block bg-primary/10 text-primary px-3 py-1 text-sm">
                      Earn Points here
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner CTA */}
      <section className="px-6 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-surface-elevated p-6 md:p-8 text-center">
            <p className="text-foreground/80 mb-4">
              Own a food business? Join Mansa and get listed at our next event.
            </p>
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none"
            >
              <Link href="/partners">
                Become a Partner
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <BottomNav />
    </main>
  )
}

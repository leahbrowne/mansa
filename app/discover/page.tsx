'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, MapPin, Clock, X, Navigation } from 'lucide-react'
import { BottomNav } from '@/components/bottom-nav'
import { cn } from '@/lib/utils'

const filters = [
  'All',
  'Mansa Certified',
  'Caribbean',
  'West African',
  'South Asian',
  'Ethiopian',
  'Levantine',
  'Open Now',
  'Barbadian Owned',
  'Jamaican Owned',
  'Ethiopian Owned',
]

const restaurants = [
  {
    id: 'cou-cou-co',
    name: 'Cou Cou & Co',
    cuisine: 'Caribbean',
    ownedBadge: 'Barbadian Owned',
    status: 'Certified',
    distance: '0.3 miles',
    isOpen: true,
    earnRate: 10,
    emoji: '🥘',
    heritage: 'A Bridgetown family bringing the soul of Bajan cooking to East London. Every dish made from scratch, every recipe passed down.',
    dishes: ['Pudding & Souse', 'Fishcakes', 'Cou Cou & Flying Fish', 'Conkies'],
  },
  {
    id: 'habesha-corner',
    name: 'Habesha Corner',
    cuisine: 'Ethiopian',
    ownedBadge: 'Ethiopian Owned',
    status: 'Certified',
    distance: '0.5 miles',
    isOpen: true,
    earnRate: 10,
    emoji: '🫓',
    heritage: 'Traditional Ethiopian flavours from Addis Ababa, served with love and injera.',
    dishes: ['Doro Wat', 'Kitfo', 'Tibs', 'Shiro'],
  },
  {
    id: 'yard-kitchen',
    name: 'Yard Kitchen',
    cuisine: 'Caribbean',
    ownedBadge: 'Jamaican Owned',
    status: 'Certified',
    distance: '0.9 miles',
    isOpen: true,
    earnRate: 10,
    emoji: '🥘',
    heritage: 'Authentic Jamaican cuisine from Kingston to London.',
    dishes: ['Jerk Chicken', 'Ackee & Saltfish', 'Curry Goat', 'Festival'],
  },
  {
    id: 'trini-doubles',
    name: 'Trini Doubles Shack',
    cuisine: 'Caribbean',
    ownedBadge: null,
    status: 'Listed',
    distance: '1.1 miles',
    isOpen: true,
    earnRate: 10,
    emoji: '🥘',
    heritage: 'Street food from Trinidad & Tobago.',
    dishes: ['Doubles', 'Bake & Shark', 'Pelau', 'Roti'],
  },
  {
    id: 'jerk-junction',
    name: 'Jerk Junction',
    cuisine: 'Caribbean',
    ownedBadge: 'Jamaican Owned',
    status: 'Certified',
    distance: '1.4 miles',
    isOpen: false,
    earnRate: 10,
    emoji: '🥘',
    heritage: 'The best jerk in East London, smoked low and slow.',
    dishes: ['Jerk Chicken', 'Jerk Pork', 'Rice & Peas', 'Plantain'],
  },
  {
    id: 'spice-route',
    name: 'Spice Route',
    cuisine: 'South Asian',
    ownedBadge: null,
    status: 'Listed',
    distance: '1.8 miles',
    isOpen: true,
    earnRate: 10,
    emoji: '🍛',
    heritage: 'A journey through the flavours of the Indian subcontinent.',
    dishes: ['Butter Chicken', 'Biryani', 'Dosa', 'Samosa'],
  },
]

export default function DiscoverPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')
  const [selectedRestaurant, setSelectedRestaurant] = useState<typeof restaurants[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredRestaurants = restaurants.filter((r) => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'Mansa Certified') return r.status === 'Certified'
    if (activeFilter === 'Open Now') return r.isOpen
    if (activeFilter.includes('Owned')) return r.ownedBadge === activeFilter
    return r.cuisine === activeFilter
  })

  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-6 pt-12 pb-4">
          <h1 className="font-serif text-3xl mb-4">Discover</h1>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search restaurants, cuisines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface pl-12 pr-4 py-3 text-foreground placeholder:text-muted-foreground border border-border focus:border-primary focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Filter Bar */}
        <div className="px-6 pb-4">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-6 px-6">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  'px-4 py-2 text-sm whitespace-nowrap border transition-colors shrink-0',
                  activeFilter === filter
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-surface text-foreground border-primary/50 hover:border-primary'
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* View Toggle */}
        <div className="px-6 pb-4 flex gap-2">
          <button
            onClick={() => setViewMode('list')}
            className={cn(
              'px-4 py-2 text-sm border transition-colors',
              viewMode === 'list'
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-surface text-muted-foreground border-border hover:border-primary'
            )}
          >
            List View
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={cn(
              'px-4 py-2 text-sm border transition-colors',
              viewMode === 'map'
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-surface text-muted-foreground border-border hover:border-primary'
            )}
          >
            Map View
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="px-6 py-6">
        {viewMode === 'map' ? (
          <div className="bg-surface border border-border p-12 flex flex-col items-center justify-center min-h-[400px]">
            <MapPin className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              Map view coming soon — launching with Mapbox at full release
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRestaurants.map((restaurant) => (
              <button
                key={restaurant.id}
                onClick={() => setSelectedRestaurant(restaurant)}
                className="w-full text-left bg-card border border-border hover:border-primary/50 transition-colors overflow-hidden"
              >
                {/* Photo Placeholder */}
                <div className="bg-surface h-40 flex items-center justify-center">
                  <span className="text-6xl">{restaurant.emoji}</span>
                </div>

                {/* Details */}
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif text-xl">{restaurant.name}</h3>
                    <span
                      className={cn(
                        'px-2 py-1 text-xs font-medium shrink-0',
                        restaurant.status === 'Certified'
                          ? 'bg-primary/20 text-primary'
                          : 'bg-muted text-muted-foreground'
                      )}
                    >
                      {restaurant.status}
                    </span>
                  </div>

                  {restaurant.ownedBadge && (
                    <span className="inline-block bg-primary text-primary-foreground px-2 py-1 text-xs font-medium">
                      {restaurant.ownedBadge}
                    </span>
                  )}

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{restaurant.cuisine}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {restaurant.distance}
                    </span>
                    <span
                      className={cn(
                        'flex items-center gap-1',
                        restaurant.isOpen ? 'text-success' : 'text-destructive'
                      )}
                    >
                      <Clock className="w-3 h-3" />
                      {restaurant.isOpen ? 'Open' : 'Closed'}
                    </span>
                  </div>

                  <div className="text-primary font-mono text-sm">
                    {restaurant.earnRate} Mansas per £1
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Restaurant Detail Modal */}
      {selectedRestaurant && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setSelectedRestaurant(null)}
          />
          <div className="relative bg-card w-full max-h-[80vh] overflow-y-auto rounded-t-2xl animate-in slide-in-from-bottom duration-300">
            {/* Close Button */}
            <button
              onClick={() => setSelectedRestaurant(null)}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Content */}
            <div className="p-6 pt-12 space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-serif text-2xl">{selectedRestaurant.name}</h2>
                  {selectedRestaurant.ownedBadge && (
                    <span className="bg-primary text-primary-foreground px-2 py-1 text-xs font-medium">
                      {selectedRestaurant.ownedBadge}
                    </span>
                  )}
                </div>
                <span
                  className={cn(
                    'inline-block px-2 py-1 text-xs font-medium',
                    selectedRestaurant.status === 'Certified'
                      ? 'bg-primary/20 text-primary'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  Mansa {selectedRestaurant.status}
                </span>
              </div>

              {/* Heritage Statement */}
              <p className="text-foreground/80 italic">
                {selectedRestaurant.heritage}
              </p>

              {/* Signature Dishes */}
              <div>
                <h4 className="font-medium text-muted-foreground mb-2">Signature Dishes</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedRestaurant.dishes.map((dish) => (
                    <span
                      key={dish}
                      className="bg-surface px-3 py-1 text-sm"
                    >
                      {dish}
                    </span>
                  ))}
                </div>
              </div>

              {/* Earn Rate */}
              <div className="bg-surface p-4 border border-border">
                <div className="text-muted-foreground text-sm mb-1">Earn Rate</div>
                <div className="text-primary font-mono text-2xl">
                  {selectedRestaurant.earnRate} Mansas per £1
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <Link
                  href="/scan"
                  className="flex-1 bg-primary text-primary-foreground py-4 text-center font-medium hover:bg-primary/90 transition-colors"
                >
                  Scan to earn
                </Link>
                <button className="flex-1 border border-primary text-primary py-4 font-medium hover:bg-primary/10 transition-colors flex items-center justify-center gap-2">
                  <Navigation className="w-4 h-4" />
                  Get directions
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </main>
  )
}

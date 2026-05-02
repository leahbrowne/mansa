'use client'

import { useState } from 'react'
import { Search, SlidersHorizontal, Map, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CuisineFilter } from '@/components/cuisine-filter'
import { RestaurantCard, type Restaurant } from '@/components/restaurant-card'
import { cn } from '@/lib/utils'

// Mock data
const allRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Alara Lagos Kitchen',
    cuisine: 'West African',
    image: '/images/restaurant-1.jpg',
    distance: '0.3 mi',
    earnRate: 10,
    verified: 'certified',
    heritageStatement: 'Third-generation Lagos family recipes',
  },
  {
    id: '2',
    name: 'Jerk Junction',
    cuisine: 'Caribbean',
    image: '/images/restaurant-2.jpg',
    distance: '0.5 mi',
    earnRate: 10,
    verified: 'certified',
    heritageStatement: 'Authentic Jamaican flavors since 1998',
  },
  {
    id: '3',
    name: 'Merkato Ethiopian',
    cuisine: 'Ethiopian',
    image: '/images/restaurant-3.jpg',
    distance: '0.7 mi',
    earnRate: 10,
    verified: 'endorsed',
    heritageStatement: 'Traditional Ethiopian cuisine',
  },
  {
    id: '4',
    name: 'Punjab Grill',
    cuisine: 'South Asian',
    image: '/images/restaurant-4.jpg',
    distance: '0.8 mi',
    earnRate: 10,
    verified: 'certified',
    heritageStatement: 'Family recipes from Amritsar',
  },
  {
    id: '5',
    name: 'Beirut Nights',
    cuisine: 'Levantine',
    image: '/images/restaurant-5.jpg',
    distance: '1.0 mi',
    earnRate: 10,
    verified: 'listed',
    heritageStatement: 'Lebanese home cooking',
  },
  {
    id: '6',
    name: 'Dim Sum House',
    cuisine: 'East Asian',
    image: '/images/restaurant-1.jpg',
    distance: '1.2 mi',
    earnRate: 10,
    verified: 'certified',
    heritageStatement: 'Hong Kong style dim sum',
  },
  {
    id: '7',
    name: 'Caspian Kitchen',
    cuisine: 'Persian',
    image: '/images/restaurant-4.jpg',
    distance: '1.5 mi',
    earnRate: 10,
    verified: 'endorsed',
    heritageStatement: 'Persian home recipes',
  },
  {
    id: '8',
    name: 'Marrakech Express',
    cuisine: 'North African',
    image: '/images/restaurant-3.jpg',
    distance: '1.8 mi',
    earnRate: 10,
    verified: 'certified',
    heritageStatement: 'Moroccan tagines and couscous',
  },
]

export default function DiscoverPage() {
  const [selectedCuisine, setSelectedCuisine] = useState('all')
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredRestaurants = allRestaurants.filter((restaurant) => {
    const matchesCuisine =
      selectedCuisine === 'all' ||
      restaurant.cuisine.toLowerCase().replace(' ', '-') === selectedCuisine

    const matchesSearch =
      searchQuery === '' ||
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCuisine && matchesSearch
  })

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="px-6 py-4 space-y-4">
          {/* Search Bar */}
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search restaurants or cuisines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-card border border-border pl-10 pr-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 border-border"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </Button>
          </div>

          {/* View Toggle & Filters */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'p-2 rounded-md transition-colors',
                  viewMode === 'list'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={cn(
                  'p-2 rounded-md transition-colors',
                  viewMode === 'map'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Map className="w-5 h-5" />
              </button>
            </div>

            <span className="text-sm text-muted-foreground">
              {filteredRestaurants.length} restaurants
            </span>
          </div>
        </div>
      </header>

      <div className="px-6 py-4 space-y-6">
        {/* Cuisine Filter */}
        <CuisineFilter selected={selectedCuisine} onSelect={setSelectedCuisine} />

        {/* Results */}
        {viewMode === 'list' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                variant="large"
              />
            ))}
          </div>
        ) : (
          <div className="bg-card border border-border h-[60vh] flex items-center justify-center">
            <div className="text-center">
              <Map className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Map view coming soon</p>
              <p className="text-sm text-muted-foreground/70">
                Integration with Mapbox in Phase 3
              </p>
            </div>
          </div>
        )}

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No restaurants found</p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Try adjusting your filters
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

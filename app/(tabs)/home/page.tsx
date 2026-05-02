'use client'

import { Bell } from 'lucide-react'
import { MansaBalance } from '@/components/mansa-balance'
import { RestaurantCard, type Restaurant } from '@/components/restaurant-card'
import { DishCard, type Dish } from '@/components/dish-card'

// Mock data - replace with real data from Supabase
const mockBalance = 2840

const nearbyRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Alara Lagos Kitchen',
    cuisine: 'West African',
    image: '/images/restaurant-1.jpg',
    distance: '0.3 mi',
    earnRate: 10,
    verified: 'certified',
  },
  {
    id: '2',
    name: 'Jerk Junction',
    cuisine: 'Caribbean',
    image: '/images/restaurant-2.jpg',
    distance: '0.5 mi',
    earnRate: 10,
    verified: 'certified',
  },
  {
    id: '3',
    name: 'Merkato Ethiopian',
    cuisine: 'Ethiopian',
    image: '/images/restaurant-3.jpg',
    distance: '0.7 mi',
    earnRate: 10,
    verified: 'endorsed',
  },
  {
    id: '4',
    name: 'Punjab Grill',
    cuisine: 'South Asian',
    image: '/images/restaurant-4.jpg',
    distance: '0.8 mi',
    earnRate: 10,
    verified: 'certified',
  },
  {
    id: '5',
    name: 'Beirut Nights',
    cuisine: 'Levantine',
    image: '/images/restaurant-5.jpg',
    distance: '1.0 mi',
    earnRate: 10,
    verified: 'listed',
  },
]

const trendingDishes: Dish[] = [
  {
    id: '1',
    name: 'Jollof Rice',
    restaurant: 'Alara Lagos Kitchen',
    restaurantId: '1',
    image: '/images/dish-1.jpg',
    cuisine: 'West African',
  },
  {
    id: '2',
    name: 'Har Gow',
    restaurant: 'Dim Sum House',
    restaurantId: '6',
    image: '/images/dish-2.jpg',
    cuisine: 'East Asian',
  },
  {
    id: '3',
    name: 'Tahdig',
    restaurant: 'Caspian Kitchen',
    restaurantId: '7',
    image: '/images/dish-3.jpg',
    cuisine: 'Persian',
  },
]

const newRestaurants: Restaurant[] = [
  {
    id: '6',
    name: 'Dim Sum House',
    cuisine: 'East Asian',
    image: '/images/restaurant-1.jpg',
    distance: '1.2 mi',
    earnRate: 10,
    verified: 'listed',
  },
  {
    id: '7',
    name: 'Caspian Kitchen',
    cuisine: 'Persian',
    image: '/images/restaurant-4.jpg',
    distance: '1.5 mi',
    earnRate: 10,
    verified: 'listed',
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="font-serif text-2xl text-primary">Mansa</h1>
          <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
          </button>
        </div>
      </header>

      <div className="px-6 py-6 space-y-8">
        {/* Balance Card */}
        <MansaBalance balance={mockBalance} />

        {/* Near You Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-2xl">Near you</h2>
            <a href="/discover" className="text-sm text-primary hover:underline">
              See all
            </a>
          </div>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar -mx-6 px-6 pb-2">
            {nearbyRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </section>

        {/* Trending Dishes Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-2xl">Trending dishes</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar -mx-6 px-6 pb-2">
            {trendingDishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        </section>

        {/* New to Mansa Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-2xl">New to Mansa</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar -mx-6 px-6 pb-2">
            {newRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Hexagon, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Restaurant {
  id: string
  name: string
  cuisine: string
  image: string
  distance: string
  earnRate: number
  verified: 'certified' | 'endorsed' | 'listed'
  heritageStatement?: string
}

interface RestaurantCardProps {
  restaurant: Restaurant
  variant?: 'default' | 'large'
}

export function RestaurantCard({ restaurant, variant = 'default' }: RestaurantCardProps) {
  const isLarge = variant === 'large'

  return (
    <Link
      href={`/restaurant/${restaurant.id}`}
      className={cn(
        'group block shrink-0 overflow-hidden bg-card',
        isLarge ? 'w-72' : 'w-56'
      )}
    >
      {/* Image */}
      <div className={cn('relative overflow-hidden', isLarge ? 'h-44' : 'h-36')}>
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Verified Badge */}
        {restaurant.verified === 'certified' && (
          <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm px-2 py-1 flex items-center gap-1">
            <Hexagon className="w-3 h-3 fill-primary-foreground text-primary-foreground" />
            <Check className="w-2.5 h-2.5 text-primary-foreground absolute left-[9px] top-[5px]" />
            <span className="text-xs font-medium text-primary-foreground">Certified</span>
          </div>
        )}

        {restaurant.verified === 'endorsed' && (
          <div className="absolute top-3 right-3 bg-secondary/90 backdrop-blur-sm px-2 py-1 flex items-center gap-1">
            <span className="text-xs font-medium text-secondary-foreground">Endorsed</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-serif text-lg font-medium mb-1 truncate group-hover:text-primary transition-colors">
          {restaurant.name}
        </h3>

        <div className="flex items-center gap-3 text-sm">
          {/* Cuisine Tag */}
          <span className="px-2 py-0.5 bg-accent/20 text-accent text-xs font-medium">
            {restaurant.cuisine}
          </span>

          {/* Distance */}
          <span className="flex items-center gap-1 text-muted-foreground text-xs">
            <MapPin className="w-3 h-3" />
            {restaurant.distance}
          </span>
        </div>

        {/* Earn Rate */}
        <p className="mt-3 text-xs text-primary font-mono">
          {restaurant.earnRate} Mansas per £1
        </p>
      </div>
    </Link>
  )
}

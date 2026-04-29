'use client'

import Image from 'next/image'
import Link from 'next/link'

export interface Dish {
  id: string
  name: string
  restaurant: string
  restaurantId: string
  image: string
  cuisine: string
}

interface DishCardProps {
  dish: Dish
}

export function DishCard({ dish }: DishCardProps) {
  return (
    <Link
      href={`/restaurant/${dish.restaurantId}`}
      className="group block shrink-0 w-40 overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden rounded-lg">
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h4 className="font-serif text-sm font-medium text-foreground truncate">
            {dish.name}
          </h4>
          <p className="text-xs text-muted-foreground truncate">
            {dish.restaurant}
          </p>
        </div>
      </div>
    </Link>
  )
}

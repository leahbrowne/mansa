'use client'

import { cn } from '@/lib/utils'

const cuisines = [
  { id: 'all', name: 'All', emoji: '🍽️' },
  { id: 'west-african', name: 'West African', emoji: '🍲' },
  { id: 'caribbean', name: 'Caribbean', emoji: '🥘' },
  { id: 'south-asian', name: 'South Asian', emoji: '🍛' },
  { id: 'east-asian', name: 'East Asian', emoji: '🥢' },
  { id: 'ethiopian', name: 'Ethiopian', emoji: '🫓' },
  { id: 'levantine', name: 'Levantine', emoji: '🧆' },
  { id: 'indo-caribbean', name: 'Indo-Caribbean', emoji: '🍜' },
  { id: 'persian', name: 'Persian', emoji: '🍚' },
  { id: 'north-african', name: 'North African', emoji: '🥗' },
]

interface CuisineFilterProps {
  selected: string
  onSelect: (id: string) => void
}

export function CuisineFilter({ selected, onSelect }: CuisineFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
      {cuisines.map((cuisine) => (
        <button
          key={cuisine.id}
          onClick={() => onSelect(cuisine.id)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 whitespace-nowrap transition-colors shrink-0',
            selected === cuisine.id
              ? 'bg-primary text-primary-foreground'
              : 'bg-card text-foreground hover:bg-card/80 border border-border'
          )}
        >
          <span>{cuisine.emoji}</span>
          <span className="text-sm font-medium">{cuisine.name}</span>
        </button>
      ))}
    </div>
  )
}

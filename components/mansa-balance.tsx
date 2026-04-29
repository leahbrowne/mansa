'use client'

import Link from 'next/link'
import { Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MansaBalanceProps {
  balance: number
  showRedeem?: boolean
}

export function MansaBalance({ balance, showRedeem = true }: MansaBalanceProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 border border-primary/20 p-6">
      {/* Gold shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -skew-x-12 animate-pulse" />

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Crown Icon */}
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
            <Crown className="w-6 h-6 text-primary" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-1">
              Your Mansas
            </p>
            <p className="font-mono text-3xl font-semibold text-foreground">
              {balance.toLocaleString()}
            </p>
          </div>
        </div>

        {showRedeem && (
          <Button
            asChild
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none"
          >
            <Link href="/rewards">Redeem</Link>
          </Button>
        )}
      </div>
    </div>
  )
}

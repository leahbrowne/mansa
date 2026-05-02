'use client'

import { useState, useEffect } from 'react'
import { Camera, Keyboard } from 'lucide-react'
import { BottomNav } from '@/components/bottom-nav'
import { cn } from '@/lib/utils'

type ScanState = 'ready' | 'manual' | 'found' | 'amount' | 'success'

export default function ScanPage() {
  const [state, setState] = useState<ScanState>('ready')
  const [manualCode, setManualCode] = useState('')
  const [spendAmount, setSpendAmount] = useState('')
  const [earnedMansas, setEarnedMansas] = useState(0)
  const [showCoins, setShowCoins] = useState(false)
  const [displayedCount, setDisplayedCount] = useState(0)

  const MANSAS_PER_POUND = 10
  const PREVIOUS_BALANCE = 2840
  const calculatedMansas = Math.floor(parseFloat(spendAmount || '0') * MANSAS_PER_POUND)

  const handleManualSubmit = () => {
    if (manualCode.length === 6) {
      setState('found')
    }
  }

  const handleConfirmEarn = () => {
    const earned = calculatedMansas
    setEarnedMansas(earned)
    setState('success')
    setShowCoins(true)
  }

  // Animate count up on success
  useEffect(() => {
    if (state === 'success' && earnedMansas > 0) {
      const duration = 1500
      const steps = 30
      const increment = earnedMansas / steps
      let current = 0
      const interval = setInterval(() => {
        current += increment
        if (current >= earnedMansas) {
          setDisplayedCount(earnedMansas)
          clearInterval(interval)
        } else {
          setDisplayedCount(Math.floor(current))
        }
      }, duration / steps)
      return () => clearInterval(interval)
    }
  }, [state, earnedMansas])

  const resetScan = () => {
    setState('ready')
    setManualCode('')
    setSpendAmount('')
    setEarnedMansas(0)
    setShowCoins(false)
    setDisplayedCount(0)
  }

  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="px-6 pt-12 pb-6">
        <h1 className="font-serif text-3xl mb-2">Scan to Earn</h1>
        {state === 'ready' && (
          <p className="text-muted-foreground">
            Open this screen after paying. Scan the restaurant QR code to earn your Mansas.
          </p>
        )}
      </header>

      <div className="px-6">
        {/* Ready State - Scan Area */}
        {state === 'ready' && (
          <div className="space-y-8">
            {/* Scan Area */}
            <div 
              className="bg-surface border-2 border-primary aspect-square max-w-sm mx-auto flex flex-col items-center justify-center p-8 animate-pulse-border"
            >
              <Camera className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center mb-6">
                Point your camera at the restaurant QR code
              </p>
              <button className="bg-primary text-primary-foreground px-6 py-3 font-medium hover:bg-primary/90 transition-colors">
                Enable Camera
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-muted-foreground text-sm">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Manual Entry */}
            <button
              onClick={() => setState('manual')}
              className="w-full bg-surface border border-border p-4 flex items-center justify-center gap-3 hover:border-primary/50 transition-colors"
            >
              <Keyboard className="w-5 h-5 text-muted-foreground" />
              <span>Enter restaurant code manually</span>
            </button>
          </div>
        )}

        {/* Manual Entry State */}
        {state === 'manual' && (
          <div className="space-y-6 max-w-sm mx-auto">
            <div>
              <label className="block text-muted-foreground text-sm mb-2">
                Restaurant Code
              </label>
              <input
                type="text"
                maxLength={6}
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value.toUpperCase())}
                placeholder="XXXXXX"
                className="w-full bg-surface border border-border focus:border-primary text-center font-mono text-3xl tracking-[0.3em] py-4 focus:outline-none transition-colors uppercase"
              />
            </div>
            <button
              onClick={handleManualSubmit}
              disabled={manualCode.length !== 6}
              className={cn(
                'w-full py-4 font-medium transition-colors',
                manualCode.length === 6
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              )}
            >
              Find restaurant
            </button>
            <button
              onClick={() => setState('ready')}
              className="w-full py-4 border border-border text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to scan
            </button>
          </div>
        )}

        {/* Found Restaurant State */}
        {state === 'found' && (
          <div className="space-y-6 max-w-sm mx-auto">
            <div className="bg-surface border border-border p-6 text-center">
              <span className="text-4xl mb-4 block">🥘</span>
              <h2 className="font-serif text-2xl mb-1">Cou Cou & Co</h2>
              <span className="inline-block bg-primary text-primary-foreground px-2 py-1 text-xs font-medium mb-2">
                Barbadian Owned
              </span>
              <p className="text-muted-foreground text-sm">
                Mansa Certified
              </p>
            </div>

            <button
              onClick={() => setState('amount')}
              className="w-full bg-primary text-primary-foreground py-4 font-medium hover:bg-primary/90 transition-colors"
            >
              Continue
            </button>
          </div>
        )}

        {/* Amount Entry State */}
        {state === 'amount' && (
          <div className="space-y-6 max-w-sm mx-auto">
            <div className="bg-surface border border-border p-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-4xl">🥘</span>
                <h2 className="font-serif text-xl">Cou Cou & Co</h2>
              </div>
              <span className="text-primary text-sm">Mansa Certified</span>
            </div>

            <div>
              <label className="block text-muted-foreground text-sm mb-2">
                Enter your spend amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-2xl text-muted-foreground">
                  £
                </span>
                <input
                  type="number"
                  value={spendAmount}
                  onChange={(e) => setSpendAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-surface border border-border focus:border-primary font-mono text-3xl py-4 pl-10 pr-4 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="bg-surface border border-primary p-6">
              <div className="text-muted-foreground text-sm mb-1">You will earn</div>
              <div className="font-mono text-4xl text-primary">
                {calculatedMansas.toLocaleString()} Mansas
              </div>
              <div className="text-muted-foreground text-xs mt-1">
                {MANSAS_PER_POUND} Mansas per £1
              </div>
            </div>

            <button
              onClick={handleConfirmEarn}
              disabled={!spendAmount || parseFloat(spendAmount) <= 0}
              className={cn(
                'w-full py-4 font-medium transition-colors',
                spendAmount && parseFloat(spendAmount) > 0
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              )}
            >
              Confirm & Earn
            </button>
          </div>
        )}

        {/* Success State */}
        {state === 'success' && (
          <div className="space-y-8 max-w-sm mx-auto text-center relative">
            {/* Coin Cascade Animation */}
            {showCoins && (
              <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-6 h-6 bg-primary rounded-full animate-coin-fall"
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 0.5}s`,
                      animationDuration: `${1.5 + Math.random()}s`,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Success Content */}
            <div className="relative z-50 pt-12">
              <div className="animate-count-up">
                <div className="font-mono text-6xl text-primary mb-4">
                  +{displayedCount.toLocaleString()}
                </div>
                <p className="text-xl mb-2">
                  You earned {earnedMansas.toLocaleString()} Mansas at Cou Cou & Co
                </p>
              </div>

              <div className="bg-surface border border-border p-6 mt-8">
                <div className="text-muted-foreground text-sm mb-1">New balance</div>
                <div className="font-mono text-3xl text-primary">
                  {(PREVIOUS_BALANCE + earnedMansas).toLocaleString()} Mansas
                </div>
              </div>

              <button
                onClick={resetScan}
                className="w-full bg-primary text-primary-foreground py-4 font-medium hover:bg-primary/90 transition-colors mt-8"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </main>
  )
}

'use client'

import { useState } from 'react'
import { QrCode, Camera, X, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ScanState = 'idle' | 'scanning' | 'enter-amount' | 'success'

export default function ScanPage() {
  const [scanState, setScanState] = useState<ScanState>('idle')
  const [amount, setAmount] = useState('')
  const [earnedMansas, setEarnedMansas] = useState(0)

  const handleStartScan = () => {
    setScanState('scanning')
    // Simulate QR scan after 2 seconds
    setTimeout(() => {
      setScanState('enter-amount')
    }, 2000)
  }

  const handleSubmitAmount = () => {
    const spent = parseFloat(amount)
    if (spent > 0) {
      const mansas = Math.floor(spent * 10) // 10 Mansas per £1
      setEarnedMansas(mansas)
      setScanState('success')
    }
  }

  const handleReset = () => {
    setScanState('idle')
    setAmount('')
    setEarnedMansas(0)
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 border-b border-border">
        <h1 className="font-serif text-2xl text-center">Scan to Earn</h1>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        {/* Idle State */}
        {scanState === 'idle' && (
          <div className="text-center space-y-8">
            <div className="w-48 h-48 mx-auto border-2 border-dashed border-primary/30 rounded-2xl flex items-center justify-center">
              <QrCode className="w-24 h-24 text-primary/50" />
            </div>
            <div>
              <h2 className="font-serif text-2xl mb-2">Ready to earn?</h2>
              <p className="text-muted-foreground max-w-xs mx-auto">
                Scan the restaurant&apos;s QR code after paying to earn Mansas
              </p>
            </div>
            <Button
              onClick={handleStartScan}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-8 py-6 text-lg"
            >
              <Camera className="w-5 h-5 mr-2" />
              Open Scanner
            </Button>
          </div>
        )}

        {/* Scanning State */}
        {scanState === 'scanning' && (
          <div className="text-center space-y-8">
            <div className="relative w-64 h-64 mx-auto">
              {/* Scanner frame */}
              <div className="absolute inset-0 border-2 border-primary rounded-2xl">
                {/* Scanning animation */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-primary animate-scan" />
                </div>
                {/* Corner markers */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl" />
              </div>
              {/* Pulsing background */}
              <div className="absolute inset-4 bg-primary/5 rounded-xl animate-pulse" />
            </div>
            <div>
              <h2 className="font-serif text-2xl mb-2">Scanning...</h2>
              <p className="text-muted-foreground">
                Point your camera at the QR code
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleReset}
              className="border-border"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}

        {/* Enter Amount State */}
        {scanState === 'enter-amount' && (
          <div className="text-center space-y-8 w-full max-w-sm">
            <div className="w-16 h-16 mx-auto bg-success/20 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-success" />
            </div>
            <div>
              <h2 className="font-serif text-2xl mb-2">Restaurant Verified</h2>
              <p className="text-primary font-medium">Alara Lagos Kitchen</p>
            </div>

            <div className="space-y-4">
              <label className="block text-sm text-muted-foreground text-left">
                Enter your spend amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-muted-foreground">
                  £
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-card border border-border pl-10 pr-4 py-4 text-3xl font-mono text-center focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              {amount && parseFloat(amount) > 0 && (
                <p className="text-primary font-mono">
                  You&apos;ll earn {Math.floor(parseFloat(amount) * 10)} Mansas
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleReset}
                className="flex-1 border-border py-6"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitAmount}
                disabled={!amount || parseFloat(amount) <= 0}
                className={cn(
                  'flex-1 py-6 rounded-none',
                  'bg-primary text-primary-foreground hover:bg-primary/90',
                  'disabled:bg-muted disabled:text-muted-foreground'
                )}
              >
                Confirm
              </Button>
            </div>
          </div>
        )}

        {/* Success State */}
        {scanState === 'success' && (
          <div className="text-center space-y-8">
            {/* Coin animation placeholder */}
            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
              <div className="absolute inset-0 bg-primary/30 rounded-full flex items-center justify-center">
                <span className="text-5xl">🪙</span>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-3xl mb-2 text-primary">
                +{earnedMansas.toLocaleString()} Mansas
              </h2>
              <p className="text-muted-foreground">
                Earned at Alara Lagos Kitchen
              </p>
            </div>

            <div className="bg-card border border-border p-4">
              <p className="text-sm text-muted-foreground mb-1">New Balance</p>
              <p className="font-mono text-2xl">
                {(2840 + earnedMansas).toLocaleString()} Mansas
              </p>
            </div>

            <Button
              onClick={handleReset}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-8 py-6"
            >
              Done
            </Button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes scan {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(250px);
          }
        }
        .animate-scan {
          animation: scan 2s ease-in-out infinite;
        }
      `}</style>
    </main>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Check, Upload, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const cuisineOptions = [
  'West African',
  'Caribbean',
  'South Asian',
  'East Asian',
  'Ethiopian',
  'Levantine',
  'Indo-Caribbean',
  'Persian',
  'North African',
  'Other',
]

const planFeatures = {
  free: [
    'Listed in Mansa directory',
    'Basic restaurant profile',
    'Customer reviews',
  ],
  active: [
    'Everything in Free, plus:',
    'QR code scan to earn',
    'Customer redemption',
    'Analytics dashboard',
    'Mansa Certified eligibility',
    'Priority support',
  ],
}

export default function PartnersPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    restaurantName: '',
    cuisineType: '',
    address: '',
    contactName: '',
    contactEmail: '',
    heritageStatement: '',
    plan: 'active',
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    // In production, this would submit to Supabase
    setStep(4)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <h1 className="font-serif text-xl text-primary">Partner with Mansa</h1>
          <div className="w-16" />
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={cn(
                'w-3 h-3 rounded-full transition-colors',
                step >= s ? 'bg-primary' : 'bg-border'
              )}
            />
          ))}
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl mb-2">Tell us about your restaurant</h2>
              <p className="text-muted-foreground">
                Join the Mansa ecosystem and get discovered by customers who value authentic cuisine.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Restaurant Name</label>
                <input
                  type="text"
                  value={formData.restaurantName}
                  onChange={(e) => handleInputChange('restaurantName', e.target.value)}
                  placeholder="e.g. Alara Lagos Kitchen"
                  className="w-full bg-card border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Cuisine Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {cuisineOptions.map((cuisine) => (
                    <button
                      key={cuisine}
                      onClick={() => handleInputChange('cuisineType', cuisine)}
                      className={cn(
                        'px-4 py-3 border text-left transition-colors',
                        formData.cuisineType === cuisine
                          ? 'bg-primary/10 border-primary text-primary'
                          : 'bg-card border-border hover:border-primary/50'
                      )}
                    >
                      {cuisine}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Full restaurant address"
                  className="w-full bg-card border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            <Button
              onClick={() => setStep(2)}
              disabled={!formData.restaurantName || !formData.cuisineType || !formData.address}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none py-6"
            >
              Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}

        {/* Step 2: Heritage Statement */}
        {step === 2 && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl mb-2">Share your heritage</h2>
              <p className="text-muted-foreground">
                This is what makes Mansa different. Tell us the story behind your food.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Contact Name</label>
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => handleInputChange('contactName', e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-card border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Contact Email</label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  placeholder="email@restaurant.com"
                  className="w-full bg-card border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Heritage Statement</label>
                <textarea
                  value={formData.heritageStatement}
                  onChange={(e) => handleInputChange('heritageStatement', e.target.value)}
                  placeholder="Tell us about your family, your recipes, your culture. What makes your food authentic?"
                  rows={5}
                  className="w-full bg-card border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  This helps us verify your authenticity and tell your story to customers.
                </p>
              </div>

              <div className="border border-dashed border-border p-6 text-center">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Upload verification documents (optional)
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Photos, certificates, or any proof of heritage
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1 border-border py-6"
              >
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!formData.contactName || !formData.contactEmail}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-none py-6"
              >
                Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Choose Plan */}
        {step === 3 && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl mb-2">Choose your plan</h2>
              <p className="text-muted-foreground">
                Start free or activate full features immediately.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Free Plan */}
              <button
                onClick={() => handleInputChange('plan', 'free')}
                className={cn(
                  'p-6 border text-left transition-colors',
                  formData.plan === 'free'
                    ? 'bg-card border-primary'
                    : 'bg-card border-border hover:border-primary/50'
                )}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-xl">Free</h3>
                  <div className={cn(
                    'w-5 h-5 border-2 rounded-full flex items-center justify-center',
                    formData.plan === 'free' ? 'border-primary bg-primary' : 'border-muted-foreground'
                  )}>
                    {formData.plan === 'free' && <Check className="w-3 h-3 text-primary-foreground" />}
                  </div>
                </div>
                <p className="text-2xl font-serif mb-4">£0</p>
                <ul className="space-y-2">
                  {planFeatures.free.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </button>

              {/* Active Plan */}
              <button
                onClick={() => handleInputChange('plan', 'active')}
                className={cn(
                  'p-6 border text-left transition-colors relative',
                  formData.plan === 'active'
                    ? 'bg-primary/5 border-primary'
                    : 'bg-card border-border hover:border-primary/50'
                )}
              >
                <div className="absolute -top-3 left-4 bg-primary text-primary-foreground text-xs px-2 py-1 font-medium">
                  3 MONTHS FREE
                </div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-xl">Activate</h3>
                  <div className={cn(
                    'w-5 h-5 border-2 rounded-full flex items-center justify-center',
                    formData.plan === 'active' ? 'border-primary bg-primary' : 'border-muted-foreground'
                  )}>
                    {formData.plan === 'active' && <Check className="w-3 h-3 text-primary-foreground" />}
                  </div>
                </div>
                <p className="text-2xl font-serif mb-4">
                  £49<span className="text-sm text-muted-foreground">/month</span>
                </p>
                <ul className="space-y-2">
                  {planFeatures.active.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </button>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setStep(2)}
                className="flex-1 border-border py-6"
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-none py-6"
              >
                Complete Registration
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="text-center space-y-8 py-12">
            <div className="w-20 h-20 mx-auto bg-success/20 rounded-full flex items-center justify-center">
              <Check className="w-10 h-10 text-success" />
            </div>

            <div>
              <h2 className="font-serif text-3xl mb-2">Welcome to Mansa!</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Your application has been submitted. We&apos;ll review your details and send your QR code pack within 24 hours.
              </p>
            </div>

            <div className="bg-card border border-border p-6 max-w-sm mx-auto">
              <h3 className="font-serif text-xl mb-2">{formData.restaurantName}</h3>
              <p className="text-primary">{formData.cuisineType}</p>
              <p className="text-sm text-muted-foreground mt-2">{formData.address}</p>
            </div>

            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-8 py-6"
            >
              <Link href="/">Return to home</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}

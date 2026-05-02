import { BottomNav } from '@/components/bottom-nav'

export default function DemoConsumerPage() {
  return <main className="min-h-screen bg-background pt-14 pb-24 px-6"><div className="fixed top-0 inset-x-0 bg-primary text-primary-foreground text-center py-3 text-sm">Demo Mode — tap anywhere to explore</div><h1 className="font-serif text-4xl mt-8">Consumer Demo</h1><BottomNav /></main>
}

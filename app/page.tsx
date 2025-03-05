import { homePageMeta } from '@/lib/metadatas'
import Hero from '@/components/home/hero/hero'
import HomeRest from './page-client'

export const metadata = homePageMeta

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <HomeRest />
    </main>
  )
}
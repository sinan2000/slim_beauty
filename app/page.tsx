import { homePageMeta } from '@/lib/metadatas'
import Hero from '@/components/home/hero/hero'
import HomeRest from './page-client'
import { generateFAQSchema } from '@/lib/jsonLds'
import { faqs } from '@/lib/data'

export const metadata = homePageMeta

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <script
        id="contact-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />

      <Hero />
      <HomeRest />
    </main>
  )
}
import { Hero } from '@/components/home/Hero'
import { TrustBadges } from '@/components/home/TrustBadges'
import { FeaturedCollections } from '@/components/home/FeaturedCollections'
import { BestSellers } from '@/components/home/BestSellers'
import { BulkOrderBanner } from '@/components/home/BulkOrderBanner'
import { BrandStory } from '@/components/home/BrandStory'
import { Testimonials } from '@/components/home/Testimonials'
import { Newsletter } from '@/components/home/Newsletter'

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <FeaturedCollections />
      <BestSellers />
      <BulkOrderBanner />
      <BrandStory />
      <Testimonials />
      <Newsletter />
    </>
  )
}

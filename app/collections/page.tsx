import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { COLLECTIONS } from '@/data/products'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Collections — DLSK',
  description: 'Explore our Summer, Winter, and Fancy Wear collections of premium Indian women\'s suits.',
}

export default function CollectionsPage() {
  return (
    <div className="pt-20">
      {/* Page Header */}
      <div className="bg-ink py-20 md:py-28 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1610030466-4709f7c23fd7?w=1920&q=80&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-3xl mx-auto px-4">
          <span className="font-sans text-xs tracking-[0.3em] text-gold uppercase mb-4 block">
            DLSK
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-medium text-ivory mb-4">
            Our Collections
          </h1>
          <p className="font-sans text-base text-ivory/60 max-w-xl mx-auto">
            From breezy summer cottons to opulent bridal ensembles — discover a world of Indian craftsmanship curated for every occasion.
          </p>
        </div>
      </div>

      {/* Collections Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-12 md:gap-16">
            {COLLECTIONS.map((collection, index) => (
              <div
                key={collection.slug}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Image */}
                <div className={`relative overflow-hidden rounded-sm ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <Link href={`/collection/${collection.slug}`} className="group block aspect-[16/10]">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-ink/10 group-hover:bg-ink/5 transition-colors duration-300" />
                  </Link>
                </div>

                {/* Content */}
                <div className={`flex flex-col justify-center ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <span className="font-sans text-xs tracking-[0.3em] text-gold uppercase mb-4">
                    {collection.theme}
                  </span>
                  <h2 className="font-serif text-4xl md:text-5xl font-medium text-ink mb-4">
                    {collection.name}
                  </h2>
                  <p className="font-sans text-base text-ink-warm leading-relaxed mb-4">
                    {collection.description}
                  </p>
                  <p className="font-sans text-sm text-ink-warm leading-relaxed mb-8">
                    {collection.longDescription}
                  </p>
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/collection/${collection.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-rose text-ivory font-sans text-sm font-medium rounded-sm hover:bg-rose-dark transition-colors group"
                    >
                      Shop {collection.name}
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                    <span className="font-sans text-sm text-ink-warm">
                      {collection.productCount} Pieces
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bulk Order CTA */}
      <section className="py-16 bg-gold-pale border-y border-gold/20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-medium text-ink mb-4">
            Buying for Your Store?
          </h2>
          <p className="font-sans text-sm text-ink-warm mb-6">
            We offer wholesale pricing for retailers. MOQ from 50 pieces with up to 40% discount.
          </p>
          <Link
            href="/contact?type=wholesale"
            className="inline-flex items-center gap-2 px-6 py-3 bg-rose text-ivory font-sans text-sm font-medium rounded-sm hover:bg-rose-dark transition-colors"
          >
            Enquire for Wholesale
          </Link>
        </div>
      </section>
    </div>
  )
}

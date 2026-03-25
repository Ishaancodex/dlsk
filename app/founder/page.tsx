import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Quote } from 'lucide-react'

const TIMELINE = [
  { year: '2019', title: 'DLSK is Born', desc: 'Aditya founded DLSK in Ludhiana with a single vision — make premium Indian suits accessible without compromising craft.' },
  { year: '2020', title: 'First Collection', desc: 'The debut Summer Collection sold out in 3 weeks, driven entirely by word of mouth from satisfied customers.' },
  { year: '2021', title: 'Retail Expansion', desc: 'DLSK entered 12 multi-brand outlets across Punjab, Haryana and Delhi NCR, reaching thousands of new customers.' },
  { year: '2022', title: 'Online Launch', desc: 'The brand went digital — unlocking customers from Maharashtra to Tamil Nadu. Online became 60% of revenue within 6 months.' },
  { year: '2023', title: 'Wholesale Network', desc: 'Over 200 retail partners across 15 states joined the DLSK wholesale programme, establishing a pan-India presence.' },
  { year: '2024', title: 'New Horizons', desc: 'DLSK launched its Fancy Wear collection and crossed ₹5 Cr in annual revenue — all while staying true to its artisan roots.' },
]

export default function FounderPage() {
  return (
    <div className="min-h-screen bg-ivory pt-20">

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=90&auto=format&fit=crop"
            alt="Aditya Aggarwal — Founder, DLSK"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto px-4 pb-20 md:pb-28">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gold mb-4">
              The Person Behind the Brand
            </p>
            <h1 className="font-serif text-5xl md:text-7xl font-semibold text-white leading-tight mb-4">
              Aditya<br />Aggarwal
            </h1>
            <p className="text-ivory-dark text-lg md:text-xl font-light leading-relaxed max-w-lg">
              Designer. Entrepreneur. Champion of Indian artisanal craft.
            </p>
          </div>
        </div>
      </section>

      {/* Section 1: Introduction */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center max-w-6xl mx-auto">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">The Beginning</p>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-ink mb-6 leading-tight">
                From a Designer's<br /><em className="text-rose">Notebook</em>
              </h2>
              <div className="space-y-5 text-ink-mid leading-relaxed text-base">
                <p>
                  Long before DLSK became a brand, it lived in Aditya Aggarwal's sketchbooks — pages filled with intricate embroidery patterns, silhouette studies, and fabric swatches collected from markets across India.
                </p>
                <p>
                  Trained in fashion design from NIFT Delhi, Aditya spent six years working with established garment houses, mastering everything from pattern-cutting to retail strategy. But something was missing: a brand that truly honoured Indian women's sensibility — not an imitation of Western luxury, but an original rooted in tradition.
                </p>
                <p>
                  In 2019, with ₹8 lakh in savings and unwavering conviction, he left his corporate job and moved back to Ludhiana to build DLSK.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-strong">
                <Image
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80&auto=format&fit=crop"
                  alt="Aditya Aggarwal working"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-medium p-5 max-w-[220px]">
                <p className="font-serif text-3xl font-semibold text-rose mb-1">12K+</p>
                <p className="text-xs text-ink-warm font-medium">Happy customers across India</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Block */}
      <section className="py-16 md:py-20 bg-rose-dark">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Quote className="w-10 h-10 text-gold mx-auto mb-6 opacity-60" />
          <blockquote className="font-serif text-2xl md:text-4xl text-white font-light italic leading-relaxed mb-8">
            "I didn't want to create another fashion brand. I wanted to create a feeling — the feeling a woman gets when she wears something made specifically for her, with care, with intention, and with love for this country's extraordinary textile heritage."
          </blockquote>
          <cite className="text-ivory-dark font-semibold tracking-wider uppercase text-sm not-italic">
            — Aditya Aggarwal, Founder
          </cite>
        </div>
      </section>

      {/* Section 2: Birth of DLSK */}
      <section className="py-20 md:py-28 bg-ivory-dark">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center max-w-6xl mx-auto">
            <div className="order-2 md:order-1 relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-strong">
                <Image
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop"
                  alt="Artisans crafting DLSK garments"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -top-6 -right-6 bg-gold text-ink-dark rounded-xl shadow-gold p-5 max-w-[200px]">
                <p className="font-serif text-2xl font-bold mb-1">200+</p>
                <p className="text-xs font-semibold">Retail partners nationwide</p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">The Brand</p>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-ink mb-6 leading-tight">
                The Birth of<br /><em className="text-rose">DLSK</em>
              </h2>
              <div className="space-y-5 text-ink-mid leading-relaxed text-base">
                <p>
                  DLSK — named after the initials of the founding family — launched its first collection of 24 summer suits. Every piece was hand-finished. Every stitch reviewed by Aditya personally.
                </p>
                <p>
                  The brand's philosophy was simple: use only quality fabrics sourced from India's finest textile clusters — Chanderi, Varanasi, Ludhiana, Surat — and ensure every woman who wore DLSK felt both comfortable and beautiful.
                </p>
                <p>
                  Today, DLSK produces three seasonal collections and has become a trusted name among both individual buyers and retail chains looking for a reliable premium Indian wear brand.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">Our Journey</p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-ink">Five Years, Countless Stories</h2>
          </div>
          <div className="relative">
            {/* Line */}
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-ivory-darker md:-translate-x-px hidden sm:block" />

            <div className="space-y-10">
              {TIMELINE.map((item, i) => (
                <div
                  key={i}
                  className={`flex gap-6 md:gap-0 items-start ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`flex-1 bg-white rounded-2xl shadow-soft p-6 md:mx-8 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-gold mb-2">{item.year}</p>
                    <h3 className="font-serif text-xl font-semibold text-ink mb-2">{item.title}</h3>
                    <p className="text-ink-mid text-sm leading-relaxed">{item.desc}</p>
                  </div>

                  {/* Dot */}
                  <div className="relative z-10 hidden sm:flex w-14 h-14 flex-shrink-0 md:mx-0 bg-rose rounded-full items-center justify-center shadow-rose self-start md:self-auto">
                    <span className="font-serif text-white font-bold text-sm">{item.year.slice(2)}</span>
                  </div>

                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-20 bg-gold-pale">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">Our Commitment</p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-ink mb-4">Built on Three Promises</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Quality Without Compromise', desc: 'Every fabric is sourced from GI-tagged textile clusters. Every stitch is reviewed before dispatch. We ship only what we\'d wear ourselves.' },
              { title: 'Heritage, Not History', desc: 'We work with artisans from Varanasi, Chanderi, and Ludhiana — not to romanticise the past, but to carry India\'s craft legacy forward.' },
              { title: 'Women at the Centre', desc: 'DLSK exists because of and for Indian women. Their comfort, confidence, and joy in what they wear is our ultimate measure of success.' },
            ].map((promise, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-soft text-center">
                <div className="w-12 h-12 rounded-full bg-rose-pale flex items-center justify-center mx-auto mb-5">
                  <span className="font-serif text-rose text-xl font-bold">{i + 1}</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-ink mb-3">{promise.title}</h3>
                <p className="text-ink-mid text-sm leading-relaxed">{promise.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-rose-dark text-center">
        <div className="container mx-auto px-4">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gold-light mb-4">Discover DLSK</p>
          <h2 className="font-serif text-4xl md:text-5xl text-white font-semibold mb-6">
            Wear the Story
          </h2>
          <p className="text-ivory-dark text-base md:text-lg max-w-xl mx-auto mb-8">
            Every DLSK piece carries a piece of Aditya's vision and the skill of India's finest artisans. Shop the collection and become part of the story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-ink-dark rounded-full font-semibold text-sm tracking-wide hover:bg-gold-light transition-all"
            >
              Shop All Collections <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white rounded-full font-semibold text-sm tracking-wide hover:bg-white/10 transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

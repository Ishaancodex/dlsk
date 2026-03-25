export interface Product {
  id: string
  name: string
  slug: string
  collection: 'summer' | 'winter' | 'fancy'
  price: number
  originalPrice?: number
  images: string[]
  sizes: string[]
  fabric: string
  occasion: string
  color: string
  colorHex: string
  description: string
  careInstructions: string
  inStock: boolean
  rating: number
  reviews: number
  isNew?: boolean
  isBestseller?: boolean
  tags: string[]
}

export interface Collection {
  slug: 'summer' | 'winter' | 'fancy'
  name: string
  description: string
  longDescription: string
  image: string
  productCount: number
  theme: string
}

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export const products: Product[] = [
  // Summer Collection
  {
    id: 'sum-001',
    name: 'Saffron Bloom Cotton Suit',
    slug: 'saffron-bloom-cotton-suit',
    collection: 'summer',
    price: 2499,
    originalPrice: 3499,
    images: [
      'https://images.unsplash.com/photo-1610030466-4709f7c23fd7?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800&q=80&auto=format&fit=crop',
    ],
    sizes: SIZES,
    fabric: 'Pure Cotton',
    occasion: 'Casual',
    color: 'Saffron Yellow',
    colorHex: '#F4A226',
    description:
      'A celebration of Indian summers, this saffron-hued cotton suit embodies effortless grace. Hand-block printed with traditional motifs, the lightweight cotton fabric ensures comfort through the warmest days while keeping you poised and elegant.',
    careInstructions: 'Hand wash in cold water. Do not bleach. Dry in shade. Iron on medium heat.',
    inStock: true,
    rating: 4.8,
    reviews: 124,
    isBestseller: true,
    tags: ['cotton', 'casual', 'summer'],
  },
  {
    id: 'sum-002',
    name: 'Aqua Breeze Georgette Suit',
    slug: 'aqua-breeze-georgette-suit',
    collection: 'summer',
    price: 3299,
    originalPrice: 4200,
    images: [
      'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800&q=80&auto=format&fit=crop',
    ],
    sizes: SIZES,
    fabric: 'Georgette',
    occasion: 'Party',
    color: 'Aqua Blue',
    colorHex: '#4A9BAB',
    description:
      'Drift into evenings in this aqua blue georgette suit, perfect for parties and gatherings. The fluid drape of georgette creates an effortlessly chic silhouette, adorned with delicate self-embroidery at the neckline and hem.',
    careInstructions: 'Dry clean recommended. Store in a cool, dry place.',
    inStock: true,
    rating: 4.7,
    reviews: 89,
    isNew: true,
    tags: ['georgette', 'party', 'summer'],
  },
  {
    id: 'sum-003',
    name: 'Ivory Linen Elegance',
    slug: 'ivory-linen-elegance',
    collection: 'summer',
    price: 1999,
    images: [
      'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610030466-4709f7c23fd7?w=800&q=80&auto=format&fit=crop',
    ],
    sizes: SIZES,
    fabric: 'Linen',
    occasion: 'Office',
    color: 'Ivory White',
    colorHex: '#FAF0E6',
    description:
      'A refined take on workwear, this ivory linen suit exudes quiet confidence. The structured silhouette and minimal design make it perfect for the modern professional who values both style and comfort throughout a long workday.',
    careInstructions: 'Machine wash on delicate cycle. Tumble dry low. Iron while slightly damp.',
    inStock: true,
    rating: 4.5,
    reviews: 67,
    tags: ['linen', 'office', 'summer'],
  },
  {
    id: 'sum-004',
    name: 'Rose Petal Chanderi Suit',
    slug: 'rose-petal-chanderi-suit',
    collection: 'summer',
    price: 4499,
    originalPrice: 5999,
    images: [
      'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800&q=80&auto=format&fit=crop',
    ],
    sizes: SIZES,
    fabric: 'Chanderi',
    occasion: 'Festival',
    color: 'Blush Rose',
    colorHex: '#E8A0A8',
    description:
      'Chanderi silk has been treasured for centuries, and this rose petal suit honours that legacy beautifully. Woven with gold zari borders and adorned with traditional butis, it\'s the perfect ensemble for festive celebrations and family occasions.',
    careInstructions: 'Dry clean only. Store with silica gel to prevent moisture.',
    inStock: true,
    rating: 4.9,
    reviews: 201,
    isBestseller: true,
    tags: ['chanderi', 'festival', 'summer'],
  },

  // Winter Collection
  {
    id: 'win-001',
    name: 'Midnight Velvet Suit',
    slug: 'midnight-velvet-suit',
    collection: 'winter',
    price: 5999,
    originalPrice: 7500,
    images: [
      'https://images.unsplash.com/photo-1610030466-4709f7c23fd7?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=800&q=80&auto=format&fit=crop',
    ],
    sizes: SIZES,
    fabric: 'Velvet',
    occasion: 'Party',
    color: 'Midnight Blue',
    colorHex: '#1A2D5A',
    description:
      'Luxurious midnight blue velvet draped to perfection — this suit commands every room. The rich velvet fabric captures light beautifully, while the intricate gold embroidery at the neckline adds a regal touch befitting celebratory evenings.',
    careInstructions: 'Dry clean only. Do not fold or compress. Hang to store.',
    inStock: true,
    rating: 4.9,
    reviews: 156,
    isBestseller: true,
    tags: ['velvet', 'party', 'winter'],
  },
  {
    id: 'win-002',
    name: 'Heritage Woollen Suit',
    slug: 'heritage-woollen-suit',
    collection: 'winter',
    price: 4299,
    images: [
      'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800&q=80&auto=format&fit=crop',
    ],
    sizes: SIZES,
    fabric: 'Wool Blend',
    occasion: 'Office',
    color: 'Charcoal Grey',
    colorHex: '#4A4A4A',
    description:
      'Crafted from a premium wool blend, this charcoal grey suit brings sophistication to winter workwear. The tailored fit and refined detailing make it a wardrobe cornerstone — warm, structured, and timelessly elegant.',
    careInstructions: 'Dry clean recommended. Store in a garment bag. Use cedar to prevent moths.',
    inStock: true,
    rating: 4.6,
    reviews: 78,
    tags: ['wool', 'office', 'winter'],
  },
  {
    id: 'win-003',
    name: 'Crimson Jacquard Suit',
    slug: 'crimson-jacquard-suit',
    collection: 'winter',
    price: 6499,
    originalPrice: 8200,
    images: [
      'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610030466-4709f7c23fd7?w=800&q=80&auto=format&fit=crop',
    ],
    sizes: SIZES,
    fabric: 'Jacquard',
    occasion: 'Wedding',
    color: 'Crimson Red',
    colorHex: '#8B1A1A',
    description:
      'A masterwork in crimson jacquard, this suit is woven with intricate floral patterns that shimmer under festive lights. Designed for wedding celebrations and milestone occasions, it embodies the grandeur of Indian bridal traditions.',
    careInstructions: 'Dry clean only. Press with a cloth barrier on low heat.',
    inStock: true,
    rating: 4.8,
    reviews: 112,
    isNew: true,
    tags: ['jacquard', 'wedding', 'winter'],
  },
  {
    id: 'win-004',
    name: 'Emerald Pashmina Suit',
    slug: 'emerald-pashmina-suit',
    collection: 'winter',
    price: 7999,
    originalPrice: 10000,
    images: [
      'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800&q=80&auto=format&fit=crop',
    ],
    sizes: SIZES,
    fabric: 'Pashmina',
    occasion: 'Festival',
    color: 'Emerald Green',
    colorHex: '#1A5C3A',
    description:
      'Pure pashmina from the valleys of Kashmir, this emerald green suit is a treasure. Impossibly soft and warm, it is adorned with hand-embroidered paisleys that reflect centuries of artisan tradition. A heirloom piece to be cherished.',
    careInstructions: 'Hand wash in lukewarm water with mild shampoo. Dry flat in shade. Never wring.',
    inStock: true,
    rating: 5.0,
    reviews: 43,
    tags: ['pashmina', 'festival', 'winter'],
  },

  // Fancy Collection
  {
    id: 'fan-001',
    name: 'Bridal Embroidered Anarkali',
    slug: 'bridal-embroidered-anarkali',
    collection: 'fancy',
    price: 12999,
    originalPrice: 16000,
    images: [
      'https://images.unsplash.com/photo-1610030466-4709f7c23fd7?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=800&q=80&auto=format&fit=crop',
    ],
    sizes: SIZES,
    fabric: 'Net + Silk',
    occasion: 'Wedding',
    color: 'Royal Gold',
    colorHex: '#C9A457',
    description:
      'Step into your most magnificent moment in this bridal anarkali. Layered net over pure silk, lavishly adorned with hand-done resham and zardosi embroidery, this piece captures the grandeur of Indian weddings in every stitch.',
    careInstructions: 'Dry clean only. Store in muslin cloth. Keep away from direct sunlight.',
    inStock: true,
    rating: 4.9,
    reviews: 89,
    isBestseller: true,
    tags: ['embroidered', 'bridal', 'fancy'],
  },
  {
    id: 'fan-002',
    name: 'Zardosi Work Palazzo Suit',
    slug: 'zardosi-work-palazzo-suit',
    collection: 'fancy',
    price: 9499,
    originalPrice: 12000,
    images: [
      'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800&q=80&auto=format&fit=crop',
    ],
    sizes: SIZES,
    fabric: 'Georgette + Silk',
    occasion: 'Reception',
    color: 'Champagne',
    colorHex: '#E8D5A0',
    description:
      'The meeting of Georgian grandeur and Indian craftsmanship, this palazzo suit features intricate zardosi work on champagne georgette. Paired with a silk slip and coordinating dupatta, it is reception-ready sophistication.',
    careInstructions: 'Dry clean only. Handle embroidery with care. Store flat to maintain shape.',
    inStock: true,
    rating: 4.7,
    reviews: 67,
    isNew: true,
    tags: ['zardosi', 'palazzo', 'fancy'],
  },
  {
    id: 'fan-003',
    name: 'Phulkari Festival Suit',
    slug: 'phulkari-festival-suit',
    collection: 'fancy',
    price: 5999,
    originalPrice: 7500,
    images: [
      'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610030466-4709f7c23fd7?w=800&q=80&auto=format&fit=crop',
    ],
    sizes: SIZES,
    fabric: 'Cotton Silk',
    occasion: 'Festival',
    color: 'Coral Pink',
    colorHex: '#E85C78',
    description:
      'Punjab\'s beloved Phulkari embroidery — meaning "flower work" — comes alive on this coral pink cotton silk suit. Each piece is hand-embroidered by skilled artisans from rural Punjab, carrying forward a tradition of over 500 years.',
    careInstructions: 'Hand wash gently. Do not soak. Dry in shade. Iron on reverse side only.',
    inStock: true,
    rating: 4.8,
    reviews: 134,
    isBestseller: true,
    tags: ['phulkari', 'festival', 'fancy'],
  },
  {
    id: 'fan-004',
    name: 'Pearl Thread Work Suit',
    slug: 'pearl-thread-work-suit',
    collection: 'fancy',
    price: 11499,
    originalPrice: 14500,
    images: [
      'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800&q=80&auto=format&fit=crop',
    ],
    sizes: SIZES,
    fabric: 'Raw Silk',
    occasion: 'Engagement',
    color: 'Ivory Pearl',
    colorHex: '#F5F0E8',
    description:
      'An engagement calls for something extraordinary. This raw silk suit in ivory pearl is adorned with delicate pearl thread embroidery — a technique that requires hundreds of hours of meticulous handwork. Timeless, rare, and impossibly beautiful.',
    careInstructions: 'Dry clean only. Store in original packaging. Keep away from moisture.',
    inStock: true,
    rating: 4.9,
    reviews: 56,
    tags: ['pearl', 'silk', 'fancy'],
  },
]

export const COLLECTIONS: Collection[] = [
  {
    slug: 'summer',
    name: 'Summer Collection',
    description: 'Light, Breathable, Effortless — perfect for warm days',
    longDescription:
      'Embrace the warmth of Indian summers in our lightweight collection of breathable cottons, flowing georgettes, and crisp linens. Each piece is designed to keep you cool without compromising on elegance.',
    image:
      '/images/summer-collection.jpg',
    productCount: 4,
    theme: 'Light & Breathable',
  },
  {
    slug: 'winter',
    name: 'Winter Collection',
    description: 'Warmth Without Compromise — rich fabrics for colder months',
    longDescription:
      'Wrap yourself in luxury this winter with our collection of sumptuous velvets, heritage woolens, and exquisite pashminas. Rich in texture and opulent in design, each piece transforms the cold season into a canvas for elegance.',
    image:
      '/images/winter-collection.png',
    productCount: 4,
    theme: 'Rich & Warm',
  },
  {
    slug: 'fancy',
    name: 'Fancy Wear',
    description: 'Made for Celebrations — embroidered masterpieces',
    longDescription:
      'For life\'s most precious moments, we craft pieces worthy of the occasion. Our Fancy Wear collection features hand-embroidered masterpieces in net, silk, and brocade — each one a testament to India\'s unparalleled artisan heritage.',
    image:
      '/images/fancy-collection.png',
    productCount: 4,
    theme: 'Celebratory & Opulent',
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCollection(collection: 'summer' | 'winter' | 'fancy'): Product[] {
  return products.filter((p) => p.collection === collection)
}

export function getBestsellers(): Product[] {
  return products.filter((p) => p.isBestseller)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.collection === product.collection)
    .slice(0, limit)
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug)
}

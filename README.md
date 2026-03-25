# DLSK — Luxury Indian Traditional Wear

An e-commerce storefront for DLSK by Aditya Aggarwal, built with Next.js.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [Next.js 14](https://nextjs.org/) | React framework (App Router) |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [Framer Motion](https://www.framer-motion.com/) | Animations and scroll effects |
| [Lucide React](https://lucide.dev/) | Icons |

---

## Getting Started

### Prerequisites
- Node.js 20+
- npm

### Installation

```bash
# 1. Clone the repository
git clone <repo-url>
cd dlsk

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other Commands

```bash
npm run build   # Build for production
npm start       # Run the production build
npm run lint    # Run ESLint
```

---

## Project Structure

```
dlsk/
├── app/                          # Pages (Next.js App Router)
│   ├── page.tsx                  # Home page
│   ├── layout.tsx                # Root layout (Header, Footer, global providers)
│   ├── globals.css               # Global styles and CSS variables
│   ├── cart/page.tsx             # Shopping cart
│   ├── checkout/page.tsx         # Checkout
│   ├── collections/page.tsx      # All collections
│   ├── collection/[slug]/        # Individual collection (summer | winter | fancy)
│   ├── product/[id]/             # Product detail page
│   ├── founder/page.tsx          # Founder story
│   ├── contact/page.tsx          # Contact form
│   └── track-order/page.tsx      # Order tracking
│
├── components/
│   ├── home/                     # Home page sections (Hero, BestSellers, etc.)
│   ├── layout/                   # Header and Footer
│   ├── product/                  # ProductCard, ProductGallery, ProductFilters
│   └── ui/                       # Reusable UI: Button, Badge, Toast, SkeletonLoader
│
├── context/
│   ├── CartContext.tsx            # Cart state (add, remove, quantity)
│   ├── WishlistContext.tsx        # Wishlist state
│   └── ToastContext.tsx           # Toast notification state
│
├── data/
│   └── products.ts               # All product and collection data
│
├── hooks/
│   └── useScrollReveal.ts        # Scroll-triggered animation hook
│
├── lib/
│   └── utils.ts                  # Helper functions (formatPrice, cn, discount)
│
├── public/                       # Static assets (currently empty)
├── next.config.mjs               # Next.js configuration
├── tailwind.config.ts            # Tailwind theme (colors, fonts, animations)
└── package.json                  # Dependencies
```

---

## Pages & Routing

Routing is file-based using the Next.js App Router — every `page.tsx` inside `app/` becomes a route automatically.

| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | Home page |
| `/collections` | `app/collections/page.tsx` | All collections |
| `/collection/summer` | `app/collection/[slug]/page.tsx` | Summer collection |
| `/collection/winter` | `app/collection/[slug]/page.tsx` | Winter collection |
| `/collection/fancy` | `app/collection/[slug]/page.tsx` | Fancy collection |
| `/product/:id` | `app/product/[id]/page.tsx` | Product detail |
| `/cart` | `app/cart/page.tsx` | Shopping cart |
| `/checkout` | `app/checkout/page.tsx` | Checkout |
| `/founder` | `app/founder/page.tsx` | Founder story |
| `/contact` | `app/contact/page.tsx` | Contact |
| `/track-order` | `app/track-order/page.tsx` | Order tracking |

---

## Home Page

The home page (`app/page.tsx`) is composed of section components stacked in order:

1. **Hero** — Full-screen parallax banner with CTA buttons
2. **TrustBadges** — Trust signals (shipping, returns, etc.)
3. **FeaturedCollections** — Summer, Winter, Fancy collection cards
4. **BestSellers** — Grid of top-selling products
5. **BulkOrderBanner** — CTA for wholesale/bulk orders
6. **BrandStory** — Brand background and narrative
7. **Testimonials** — Customer reviews
8. **Newsletter** — Email subscription form

---

## Images

All images are loaded from the **Unsplash CDN** — there are no image files stored locally in this project. The `public/` folder is empty.

Image URLs are defined directly inside `data/products.ts` as strings (e.g., `https://images.unsplash.com/...`).

Next.js is configured to allow these external images in `next.config.mjs`:

```js
images: {
  remotePatterns: [
    { hostname: 'images.unsplash.com' },
    { hostname: 'via.placeholder.com' },
  ]
}
```

---

## State Management

All state is managed with React Context API and persisted to `localStorage`.

| Context | Storage Key | What it manages |
|---|---|---|
| `CartContext` | `dlsk-cart` | Cart items, quantities, open/close |
| `WishlistContext` | `dlsk-wishlist` | Saved product IDs |
| `ToastContext` | — | In-app notifications (auto-dismiss 3s) |

All three providers are loaded globally in `app/layout.tsx`.

---

## Product Data

All products and collections are defined in `data/products.ts`. There is no database or external API — data is static.

**Collections:** Summer, Winter, Fancy

**Helper functions available:**
- `getProductById(id)` — Find a product by ID
- `getProductsByCollection(collection)` — Filter products by collection
- `getBestsellers()` — Get bestseller products
- `getRelatedProducts(product)` — Get related products
- `getCollectionBySlug(slug)` — Get collection metadata by slug

---

## About node_modules

The `node_modules/` folder contains all installed packages. It is **not committed to Git** and can be very large (200MB+).

If you clone this project and `node_modules/` is missing, just run:

```bash
npm install
```

This regenerates `node_modules/` from `package.json` automatically.

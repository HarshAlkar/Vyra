# VYRA — Eyewear Mini E-Commerce

A cinematic, editorial eyewear storefront built with React, TypeScript, and Vite for a React Developer Intern take-home assessment.

**Brand:** VYRA  
**Tagline:** See Beyond Ordinary.  
**Positioning:** Contemporary eyewear for people who treat personal style as an extension of identity.

> Frontend demonstration using local JSON product data. Checkout is a **demo only** — no real payments are processed.

## Features

- Full-viewport cinematic video hero with poster / reduced-motion fallbacks
- Editorial homepage (featured mosaic, shop-by-frame, signature edit, frame finder, brand story)
- Dedicated collection page with search, category filters, frame-shape filters, and sorting
- Slug-based product detail pages with image gallery, specifications, and related frames
- Cart add / remove / quantity controls with live badge and totals
- Cart persistence via `localStorage` (`vyra-cart-v1`)
- Loading skeletons, error states, and empty states
- Responsive layout across mobile, tablet, and desktop
- Framer Motion transitions with `prefers-reduced-motion` support

## Technology Stack

- React 19 + Vite + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`)
- React Router DOM
- Framer Motion
- Lucide React
- Sonner
- Local JSON catalogue
- Context API + `useReducer` for cart state

## Setup

```bash
cd ecom
npm install
```

## Development

```bash
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

## Production Build

```bash
npm run build
npm run preview
```

## Routes

| Route | Description |
| --- | --- |
| `/` | Editorial homepage with video hero |
| `/collection` | Full shop with filters and sorting |
| `/products/:slug` | Product detail page |
| `/cart` | Shopping cart |
| `*` | Custom 404 |

Collection query params:

- `q` — search
- `category` — category filter
- `shape` — frame shape
- `style` — frame finder style (`minimal` \| `bold` \| `classic` \| `experimental`)
- `sort` — `featured` \| `newest` \| `price-asc` \| `price-desc` \| `rating-desc`

## Folder Structure

```text
src/
├── components/
│   ├── cart/
│   ├── common/
│   ├── home/          # HeroVideo, FeaturedEdit, ShopByFrame, FrameFinder, ...
│   ├── layout/
│   └── products/      # ProductCard, ProductGallery, CollectionFilters, ...
├── context/           # CartContext
├── data/products.json
├── hooks/useProducts.ts
├── pages/
├── types/product.ts
└── utils/
public/
├── videos/vyra-hero.mp4
└── images/hero-poster.jpg
```

## Product Data

Products live in `src/data/products.json` (20 eyewear / accessory items). Example fields:

```json
{
  "id": "vyra-001",
  "name": "Noir Acetate Optical",
  "slug": "noir-acetate-optical",
  "price": 4999,
  "category": "Optical Frames",
  "frameShape": "Rectangular",
  "frameMaterial": "Acetate",
  "frameColor": "Black",
  "lensType": "Clear demo lenses",
  "style": "minimal",
  "images": ["..."],
  "featured": true,
  "isNew": false
}
```

Prices are INR whole numbers formatted with `Intl.NumberFormat('en-IN', ...)`.

## Cart Persistence

Stored under `vyra-cart-v1` as:

```json
[{ "productId": "vyra-001", "quantity": 2 }]
```

On load, entries are validated against the catalogue. Invalid JSON, missing products, and out-of-range quantities are ignored or clamped.

## Asset Sources

| Asset | Source | Notes |
| --- | --- | --- |
| Hero video | [Mixkit — Hipster woman taking sun (#701)](https://mixkit.co/free-stock-video/hipster-woman-taking-sun-701/) | Free Mixkit Stock Video License; stored locally at `public/videos/vyra-hero.mp4` |
| Hero poster | Mixkit thumbnail for the same clip | `public/images/hero-poster.jpg` |
| Product images | Unsplash eyewear photographs | Remote URLs with SVG fallback on error |

To replace the hero video, drop another MP4 at `public/videos/vyra-hero.mp4` and update the poster if needed. The hero still renders from the poster when video fails or reduced motion is preferred.

## Known Limitations

- No backend, authentication, or real payments
- Product images depend on Unsplash availability (fallback SVG provided)
- Shipping / returns copy is demonstrative only
- Lens descriptions are product attributes, not medical claims
- Frame Finder is a style preference filter, not face-shape analysis

## Future Improvements

- Local product image assets for fully offline demos
- Color / size variants when true SKUs exist
- Unit tests for cart reducer and filter helpers
- Lightweight recently-viewed history

## License

Assessment / educational use. Third-party media remains under its original license (Mixkit / Unsplash).

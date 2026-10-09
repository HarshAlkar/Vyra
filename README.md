# VYRA — Eyewear Mini E-Commerce

**VYRA** is a premium, editorial eyewear storefront built with React for a React Developer Intern take-home assessment.

> **Tagline:** See Beyond Ordinary.  
> Contemporary frames for people who treat personal style as an extension of identity.

This is a **frontend-only** demo. Product data comes from a local JSON file. Checkout is a static demonstration flow — **no real payments** are processed.

---

## Prerequisites

Before you begin, install:

- **[Node.js](https://nodejs.org/)** — version **18** or newer (recommended: LTS)
- **npm** — comes with Node.js

Check your versions:

```bash
node -v
npm -v
```

---

## Setup & Run (Local)

### 1. Open the project folder

```bash
cd ecom
```

If you cloned a GitHub repository that contains this app at the root, use that root folder instead of `ecom`.

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Open the app in your browser

Vite will print a local URL in the terminal, usually:

```text
http://localhost:5173/
```

Open that link to use the application.

Stop the server anytime with `Ctrl + C`.

---

## Other Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start local development server with hot reload |
| `npm run build` | Type-check and create a production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

### Production preview

```bash
npm run build
npm run preview
```

Then open the preview URL shown in the terminal (often `http://localhost:4173/`).

---

## Features

- Cinematic full-viewport **video hero** with poster fallback
- Editorial homepage (featured edit, shop-by-frame, signature collection, frame finder, brand story)
- **Collection** page with search, category filters, frame-shape filters, and sorting
- **Product detail** pages with image gallery, specifications, and related products
- **Shopping cart** — add / remove / quantity, live badge, accurate totals
- **Checkout page** — static demo form (contact, shipping, payment) + confirmation
- Cart **persists in `localStorage`** across refreshes
- Loading, error, and empty states
- Responsive layout (mobile, tablet, desktop)
- Page transitions and motion with `prefers-reduced-motion` respect for UI animations

---

## Tech Stack

| Tool | Role |
| --- | --- |
| React 19 + TypeScript | UI |
| Vite | Dev server & build |
| Tailwind CSS v4 | Styling |
| React Router DOM | Routing |
| Framer Motion | Animations |
| Lucide React | Icons |
| Sonner | Toasts |
| Context API + `useReducer` | Cart state |
| Local JSON | Product catalogue |

---

## Application Routes

| Route | Page |
| --- | --- |
| `/` | Home — video hero + editorial sections |
| `/collection` | Full product catalogue (search / filter / sort) |
| `/products/:slug` | Product details |
| `/cart` | Shopping cart |
| `/checkout` | Demo checkout form |
| `*` | Custom 404 |

### Useful collection query params

```text
/collection?q=aviator
/collection?category=Sunglasses
/collection?shape=Round
/collection?style=minimal
/collection?sort=price-asc
```

---

## Project Structure

```text
ecom/
├── public/
│   ├── images/hero-poster.jpg
│   └── videos/vyra-hero.mp4
├── src/
│   ├── components/
│   │   ├── cart/          # CartItem, CartSummary
│   │   ├── common/        # Button, EmptyState, LoadingSkeleton, ...
│   │   ├── home/          # HeroVideo, FeaturedEdit, FrameFinder, ...
│   │   ├── layout/        # Navbar, Footer, Layout, ScrollToTop
│   │   └── products/      # ProductCard, ProductGallery, filters, ...
│   ├── context/           # CartContext (useReducer + localStorage)
│   ├── data/products.json # Local eyewear catalogue (20 items)
│   ├── hooks/             # useProducts
│   ├── pages/             # Home, Collection, ProductDetails, Cart, Checkout, 404
│   ├── types/             # Product & cart types
│   ├── utils/             # currency, cart helpers, animations
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
└── README.md
```

---

## Product Data

All products are stored in [`src/data/products.json`](src/data/products.json). No backend or external product API is required.

Each product includes fields such as:

- `id`, `name`, `slug`, `description`, `price`
- `category`, `frameShape`, `frameMaterial`, `frameColor`, `lensType`
- `rating`, `reviewCount`, `image`, `images[]`
- `stock`, `featured`, `isNew`, `style`

Prices are in **INR** and formatted with:

```ts
Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })
```

---

## Cart & Checkout

- Cart state is managed with **React Context** and **`useReducer`**
- Persisted in the browser under the key **`vyra-cart-v1`**
- Invalid / outdated `localStorage` data is handled safely
- Quantity cannot go below `1` or above available `stock`
- Checkout at `/checkout` is a **static demo** — place order shows a confirmation screen only

---

## Asset Sources

| Asset | Source |
| --- | --- |
| Hero video | [Mixkit #701](https://mixkit.co/free-stock-video/hipster-woman-taking-sun-701/) (stored locally) |
| Hero poster | Mixkit thumbnail for the same clip |
| Product images | Unsplash eyewear photos (SVG fallback if a URL fails) |

To swap the hero film, replace `public/videos/vyra-hero.mp4` (and optionally `public/images/hero-poster.jpg`).

---

## Screenshots

Add screenshots here after running the app locally:

1. Home — video hero  
2. Collection — filters + grid  
3. Product detail  
4. Cart + checkout  

---

## Known Limitations

- No backend, authentication, or real payment gateway
- Product images load from Unsplash (offline image hosting is optional future work)
- Shipping and payment options on checkout are simulated
- Frame Finder filters by style preference only — it is not a face-shape or prescription tool

---

## Troubleshooting

| Issue | What to try |
| --- | --- |
| `npm` / `node` not found | Install Node.js LTS and reopen the terminal |
| Port already in use | Vite will offer another port, or stop the other process using `5173` |
| Blank page / install errors | Delete `node_modules` and run `npm install` again |
| Hero video not moving | Confirm `public/videos/vyra-hero.mp4` exists; hard-refresh the browser |

---

## License

Built for assessment / educational use.  
Third-party media remains under its original license (Mixkit / Unsplash).

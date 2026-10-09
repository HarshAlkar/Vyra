export type FrameStyle = 'minimal' | 'bold' | 'classic' | 'experimental'

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  category: string
  frameShape: string
  frameMaterial: string
  frameColor: string
  lensType: string
  gender: string
  style: FrameStyle
  rating: number
  reviewCount: number
  image: string
  images: string[]
  stock: number
  featured: boolean
  isNew: boolean
}

export type SortOption =
  | 'featured'
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'rating-desc'

export interface CartItem {
  product: Product
  quantity: number
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'HYDRATE'; payload: CartItem[] }

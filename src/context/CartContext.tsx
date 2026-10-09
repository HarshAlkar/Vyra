import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react'
import productsData from '../data/products.json'
import type { CartAction, CartItem, Product } from '../types/product'
import {
  CART_STORAGE_KEY,
  clampQuantity,
  getCartItemCount,
  getCartSubtotal,
  getShippingCost,
  parseStoredCart,
  serializeCart,
} from '../utils/cart'

interface CartContextValue {
  items: CartItem[]
  itemCount: number
  subtotal: number
  shipping: number
  total: number
  addItem: (
    product: Product,
    quantity?: number,
  ) => { ok: boolean; message: string }
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getItemQuantity: (productId: string) => number
}

const CartContext = createContext<CartContextValue | null>(null)

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'HYDRATE':
      return action.payload

    case 'ADD_ITEM': {
      const { product, quantity = 1 } = action.payload
      const existing = state.find((item) => item.product.id === product.id)

      if (existing) {
        const nextQty = clampQuantity(
          existing.quantity + quantity,
          product.stock,
        )
        return state.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: nextQty, product }
            : item,
        )
      }

      return [
        ...state,
        { product, quantity: clampQuantity(quantity, product.stock) },
      ]
    }

    case 'REMOVE_ITEM':
      return state.filter((item) => item.product.id !== action.payload.productId)

    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload
      if (quantity < 1) {
        return state.filter((item) => item.product.id !== productId)
      }

      return state.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: clampQuantity(quantity, item.product.stock),
            }
          : item,
      )
    }

    case 'CLEAR_CART':
      return []

    default:
      return state
  }
}

function getCatalogue(): Product[] {
  return Array.isArray(productsData) ? (productsData as Product[]) : []
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, [])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const products = getCatalogue()
    const stored = parseStoredCart(
      localStorage.getItem(CART_STORAGE_KEY),
      products,
    )
    dispatch({ type: 'HYDRATE', payload: stored })
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(CART_STORAGE_KEY, serializeCart(items))
    } catch {
      // Ignore quota / private-mode write failures
    }
  }, [items, hydrated])

  const addItem = useCallback(
    (product: Product, quantity = 1) => {
      if (product.stock < 1) {
        return { ok: false, message: 'This product is currently out of stock.' }
      }

      const existing = items.find((item) => item.product.id === product.id)
      const currentQty = existing?.quantity ?? 0

      if (currentQty >= product.stock) {
        return {
          ok: false,
          message: `Only ${product.stock} in stock.`,
        }
      }

      dispatch({ type: 'ADD_ITEM', payload: { product, quantity } })
      return { ok: true, message: `${product.name} added to cart.` }
    },
    [items],
  )

  const removeItem = useCallback((productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } })
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' })
  }, [])

  const getItemQuantity = useCallback(
    (productId: string) =>
      items.find((item) => item.product.id === productId)?.quantity ?? 0,
    [items],
  )

  const subtotal = getCartSubtotal(items)
  const shipping = getShippingCost(subtotal)
  const total = subtotal + shipping

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount: getCartItemCount(items),
      subtotal,
      shipping,
      total,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getItemQuantity,
    }),
    [
      items,
      subtotal,
      shipping,
      total,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getItemQuantity,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

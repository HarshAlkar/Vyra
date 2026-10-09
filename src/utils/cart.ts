import type { CartItem, Product } from '../types/product'

export const CART_STORAGE_KEY = 'vyra-cart-v1'

export function clampQuantity(quantity: number, stock: number): number {
  return Math.max(1, Math.min(quantity, stock))
}

export function getCartItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}

export function getCartSubtotal(items: CartItem[]): number {
  return items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  )
}

export function getShippingCost(subtotal: number): number {
  if (subtotal === 0) return 0
  return subtotal >= 5000 ? 0 : 149
}

export function parseStoredCart(
  raw: string | null,
  products: Product[],
): CartItem[] {
  if (!raw) return []

  try {
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    const productMap = new Map(products.map((p) => [p.id, p]))
    const items: CartItem[] = []

    for (const entry of parsed) {
      if (
        typeof entry !== 'object' ||
        entry === null ||
        !('productId' in entry) ||
        !('quantity' in entry)
      ) {
        continue
      }

      const productId = (entry as { productId: unknown }).productId
      const quantity = (entry as { quantity: unknown }).quantity

      if (typeof productId !== 'string' || typeof quantity !== 'number') {
        continue
      }

      const product = productMap.get(productId)
      if (!product || product.stock < 1) continue

      items.push({
        product,
        quantity: clampQuantity(Math.floor(quantity), product.stock),
      })
    }

    return items
  } catch {
    return []
  }
}

export function serializeCart(items: CartItem[]): string {
  return JSON.stringify(
    items.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    })),
  )
}

import { AnimatePresence } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CartItem } from '../components/cart/CartItem'
import { CartSummary } from '../components/cart/CartSummary'
import { Button } from '../components/common/Button'
import { EmptyState } from '../components/common/EmptyState'
import { useCart } from '../context/CartContext'

export function CartPage() {
  const { items, itemCount } = useCart()

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Discover the collection and add frames you love. Your selections will appear here."
        >
          <div className="mt-6">
            <Link to="/collection">
              <Button>Start shopping</Button>
            </Link>
          </div>
        </EmptyState>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="editorial-caption">Cart</p>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            Shopping cart
          </h1>
          <p className="mt-2 text-sm text-silver">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} in your bag
          </p>
        </div>
        <Link to="/collection">
          <Button variant="secondary">Continue shopping</Button>
        </Link>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] xl:grid-cols-[minmax(0,1fr)_24rem]">
        <section aria-label="Cart items">
          <ul className="border border-line bg-surface px-4 sm:px-6">
            <AnimatePresence initial={false} mode="popLayout">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </AnimatePresence>
          </ul>
        </section>

        <CartSummary />
      </div>
    </main>
  )
}

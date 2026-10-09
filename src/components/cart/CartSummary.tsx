import { MapPin, Package, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { formatINR } from '../../utils/currency'
import { Button } from '../common/Button'

export function CartSummary() {
  const { items, itemCount, subtotal, shipping, total, clearCart } = useCart()

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="border border-line bg-surface">
        <div className="border-b border-line px-5 py-5 sm:px-6">
          <p className="editorial-caption">Checkout</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-ink">
            Order summary
          </h2>
          <p className="mt-1 text-sm text-silver">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </p>
        </div>

        <div className="space-y-4 border-b border-line px-5 py-5 sm:px-6">
          <div>
            <p className="mb-2 flex items-center gap-2 text-[10px] font-semibold tracking-[0.14em] text-silver uppercase">
              <Package className="h-3.5 w-3.5" aria-hidden="true" />
              Items
            </p>
            <ul className="space-y-2">
              {items.map((item) => (
                <li
                  key={item.product.id}
                  className="flex items-start justify-between gap-3 text-sm"
                >
                  <span className="min-w-0 text-ink">
                    <span className="line-clamp-1 font-medium">
                      {item.product.name}
                    </span>
                    <span className="mt-0.5 block text-xs text-silver">
                      Qty {item.quantity}
                    </span>
                  </span>
                  <span className="shrink-0 tabular-nums text-ink">
                    {formatINR(item.product.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-3 border-b border-line px-5 py-5 sm:px-6">
          <div>
            <p className="mb-2 flex items-center gap-2 text-[10px] font-semibold tracking-[0.14em] text-silver uppercase">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              Delivery
            </p>
            <div className="border border-line bg-paper px-3 py-3 text-sm text-ink">
              <p className="font-medium">Standard delivery</p>
              <p className="mt-1 text-xs leading-relaxed text-silver">
                Estimated 4–7 business days. Enter your address on the next
                step.
              </p>
            </div>
          </div>

          <div>
            <p className="mb-2 flex items-center gap-2 text-[10px] font-semibold tracking-[0.14em] text-silver uppercase">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Payment
            </p>
            <div className="border border-line bg-paper px-3 py-3 text-sm text-ink">
              <p className="font-medium">Secure demo checkout</p>
              <p className="mt-1 text-xs leading-relaxed text-silver">
                Continue to a full checkout form. No real payment is charged.
              </p>
            </div>
          </div>
        </div>

        <dl className="space-y-3 px-5 py-5 text-sm sm:px-6">
          <div className="flex items-center justify-between">
            <dt className="text-silver">Subtotal</dt>
            <dd className="tabular-nums text-ink">{formatINR(subtotal)}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-silver">Shipping</dt>
            <dd className="tabular-nums text-ink">
              {shipping === 0 ? 'Free' : formatINR(shipping)}
            </dd>
          </div>
          {shipping > 0 ? (
            <p className="text-xs text-silver">
              Free shipping on orders of ₹5,000 or more.
            </p>
          ) : (
            <p className="text-xs text-silver">
              You qualify for free shipping on this order.
            </p>
          )}
          <div className="flex items-center justify-between border-t border-line pt-3 text-base font-semibold">
            <dt>Total</dt>
            <dd className="tabular-nums">{formatINR(total)}</dd>
          </div>
        </dl>

        <div className="space-y-3 border-t border-line px-5 py-5 sm:px-6">
          <Link to="/checkout" className="block">
            <Button fullWidth size="lg">
              Proceed to checkout
            </Button>
          </Link>
          <Button fullWidth variant="ghost" onClick={clearCart}>
            Clear cart
          </Button>
        </div>
      </div>
    </aside>
  )
}

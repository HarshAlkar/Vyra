import { CheckCircle2, CreditCard, Truck } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Button } from '../components/common/Button'
import { ProductImage } from '../components/common/ProductImage'
import { useCart } from '../context/CartContext'
import { formatINR } from '../utils/currency'

interface CheckoutForm {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  pincode: string
  payment: 'upi' | 'card' | 'cod'
}

const initialForm: CheckoutForm = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  pincode: '',
  payment: 'upi',
}

export function CheckoutPage() {
  const { items, itemCount, subtotal, shipping, total, clearCart } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState<CheckoutForm>(initialForm)
  const [placed, setPlaced] = useState(false)
  const [orderId, setOrderId] = useState('')

  if (items.length === 0 && !placed) {
    return <Navigate to="/cart" replace />
  }

  const update = (field: keyof CheckoutForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const id = `VYRA-${Date.now().toString().slice(-8)}`
    setOrderId(id)
    setPlaced(true)
    clearCart()
  }

  if (placed) {
    return (
      <main className="mx-auto max-w-2xl px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        <div className="border border-line bg-surface px-6 py-14 text-center sm:px-10">
          <CheckCircle2
            className="mx-auto h-12 w-12 text-cobalt"
            aria-hidden="true"
          />
          <p className="editorial-caption mt-6 text-cobalt">Order confirmed</p>
          <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Thank you, {form.fullName.split(' ')[0] || 'there'}.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-silver">
            This is a demonstration checkout. No payment was processed and no
            order will be shipped. Your reference ID is{' '}
            <span className="font-medium text-ink">{orderId}</span>.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/collection">
              <Button>Continue shopping</Button>
            </Link>
            <Button variant="secondary" onClick={() => navigate('/')}>
              Back to home
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="editorial-caption">Checkout</p>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          Complete your order
        </h1>
        <p className="mt-2 max-w-xl text-sm text-silver">
          Static demo checkout — fill the form to walk through the flow. No
          payment gateway is connected.
        </p>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_24rem]">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 border border-line bg-surface"
        >
          <section className="border-b border-line px-5 py-6 sm:px-6">
            <h2 className="font-display text-xl font-semibold">Contact</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field
                id="fullName"
                label="Full name"
                value={form.fullName}
                onChange={(v) => update('fullName', v)}
                required
                className="sm:col-span-2"
              />
              <Field
                id="email"
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => update('email', v)}
                required
              />
              <Field
                id="phone"
                label="Phone"
                type="tel"
                value={form.phone}
                onChange={(v) => update('phone', v)}
                required
              />
            </div>
          </section>

          <section className="border-b border-line px-5 py-6 sm:px-6">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-cobalt" aria-hidden="true" />
              <h2 className="font-display text-xl font-semibold">Shipping</h2>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field
                id="address"
                label="Address"
                value={form.address}
                onChange={(v) => update('address', v)}
                required
                className="sm:col-span-2"
              />
              <Field
                id="city"
                label="City"
                value={form.city}
                onChange={(v) => update('city', v)}
                required
              />
              <Field
                id="pincode"
                label="PIN code"
                value={form.pincode}
                onChange={(v) => update('pincode', v)}
                required
              />
            </div>
          </section>

          <section className="px-5 py-6 sm:px-6">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-cobalt" aria-hidden="true" />
              <h2 className="font-display text-xl font-semibold">Payment</h2>
            </div>
            <p className="mt-2 text-xs text-silver">
              Payment methods are simulated. Selecting one does not charge you.
            </p>
            <div className="mt-4 space-y-2">
              {(
                [
                  { id: 'upi', label: 'UPI' },
                  { id: 'card', label: 'Card' },
                  { id: 'cod', label: 'Cash on delivery' },
                ] as const
              ).map((option) => (
                <label
                  key={option.id}
                  className={[
                    'flex cursor-pointer items-center gap-3 border px-4 py-3 text-sm transition-colors',
                    form.payment === option.id
                      ? 'border-cobalt bg-cobalt/5'
                      : 'border-line hover:border-ink/40',
                  ].join(' ')}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={option.id}
                    checked={form.payment === option.id}
                    onChange={() => update('payment', option.id)}
                    className="accent-cobalt"
                  />
                  {option.label}
                </label>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button type="submit" size="lg" className="sm:flex-1">
                Place demo order · {formatINR(total)}
              </Button>
              <Link to="/cart" className="sm:w-auto">
                <Button type="button" variant="secondary" size="lg" fullWidth>
                  Back to cart
                </Button>
              </Link>
            </div>
          </section>
        </form>

        <aside className="border border-line bg-surface lg:sticky lg:top-24">
          <div className="border-b border-line px-5 py-5">
            <h2 className="font-display text-xl font-semibold">Your bag</h2>
            <p className="mt-1 text-sm text-silver">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </p>
          </div>
          <ul className="max-h-72 space-y-3 overflow-y-auto border-b border-line px-5 py-4">
            {items.map((item) => (
              <li key={item.product.id} className="flex gap-3">
                <div className="h-16 w-16 shrink-0 overflow-hidden border border-line">
                  <ProductImage
                    src={item.product.image}
                    alt={item.product.name}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-medium">
                    {item.product.name}
                  </p>
                  <p className="mt-1 text-xs text-silver">Qty {item.quantity}</p>
                </div>
                <p className="shrink-0 text-sm tabular-nums">
                  {formatINR(item.product.price * item.quantity)}
                </p>
              </li>
            ))}
          </ul>
          <dl className="space-y-2 px-5 py-5 text-sm">
            <div className="flex justify-between">
              <dt className="text-silver">Subtotal</dt>
              <dd className="tabular-nums">{formatINR(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-silver">Shipping</dt>
              <dd className="tabular-nums">
                {shipping === 0 ? 'Free' : formatINR(shipping)}
              </dd>
            </div>
            <div className="flex justify-between border-t border-line pt-3 text-base font-semibold">
              <dt>Total</dt>
              <dd className="tabular-nums">{formatINR(total)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </main>
  )
}

function Field({
  id,
  label,
  value,
  onChange,
  type = 'text',
  required,
  className = '',
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  required?: boolean
  className?: string
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[10px] font-semibold tracking-[0.14em] text-silver uppercase"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full border border-line bg-paper px-3 text-sm text-ink placeholder:text-silver focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink"
      />
    </div>
  )
}

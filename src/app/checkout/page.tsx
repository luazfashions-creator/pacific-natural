import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils';

export default function CheckoutPage() {
    // For demo, use first 2 products as cart items
    const cartItems = [
        { product: products[0], quantity: 2, purchaseType: 'subscribe' as const },
        { product: products[4], quantity: 1, purchaseType: 'once' as const },
    ];

    const subtotal = cartItems.reduce(
        (sum, item) =>
            sum +
            item.product.price *
            item.quantity *
            (item.purchaseType === 'subscribe' ? 0.85 : 1),
        0
    );
    const shipping = 0;
    const total = subtotal + shipping;

    return (
        <div className="min-h-screen bg-background">
            {/* Checkout Header */}
            <div className="bg-surface border-b border-primary/10 py-5">
                <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 text-primary">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 48 48">
                            <path
                                clipRule="evenodd"
                                d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z"
                                fill="currentColor"
                                fillRule="evenodd"
                            />
                        </svg>
                        <span className="text-lg font-extrabold tracking-tight">Pacific Naturals</span>
                    </Link>
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <Icon name="lock" className="text-primary text-lg" />
                        <span className="font-bold uppercase tracking-widest text-xs">Secure Checkout</span>
                    </div>
                </div>
            </div>

            {/* Progress Indicator */}
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="flex items-center gap-0 max-w-md mx-auto mb-12">
                    {['Shipping', 'Payment', 'Review'].map((step, idx) => (
                        <div key={step} className="flex items-center flex-1">
                            <div className="flex flex-col items-center">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${idx === 0
                                            ? 'bg-primary text-white'
                                            : 'bg-border text-muted'
                                        }`}
                                >
                                    {idx + 1}
                                </div>
                                <span
                                    className={`text-xs mt-2 font-bold ${idx === 0 ? 'text-primary' : 'text-muted'
                                        }`}
                                >
                                    {step}
                                </span>
                            </div>
                            {idx < 2 && (
                                <div className="flex-1 h-0.5 bg-border mx-3 mt-[-12px]" />
                            )}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column: Checkout Form */}
                    <div className="lg:col-span-7 space-y-10">
                        {/* Shipping Address */}
                        <div className="bg-surface rounded-xl p-8 shadow-sm border border-border">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                                <Icon name="local_shipping" className="text-primary" />
                                Shipping Address
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary mb-2">
                                        First Name
                                    </label>
                                    <input className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary mb-2">
                                        Last Name
                                    </label>
                                    <input className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary mb-2">
                                        Street Address
                                    </label>
                                    <input className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary mb-2">
                                        City
                                    </label>
                                    <input className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary mb-2">
                                        Postal Code
                                    </label>
                                    <input className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary mb-2">
                                        Country
                                    </label>
                                    <select className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-surface">
                                        <option>Germany</option>
                                        <option>Austria</option>
                                        <option>Switzerland</option>
                                        <option>United States</option>
                                        <option>United Kingdom</option>
                                    </select>
                                </div>
                            </div>
                            <button className="mt-8 bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary-hover transition-all shadow-lg shadow-primary/20 w-full flex items-center justify-center gap-2">
                                Continue to Payment
                                <Icon name="arrow_forward" />
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap justify-center gap-8">
                            {[
                                { icon: 'lock', label: 'SSL Encrypted' },
                                { icon: 'verified', label: 'Money-Back Guarantee' },
                                { icon: 'local_shipping', label: 'Free Shipping €50+' },
                            ].map((badge) => (
                                <div key={badge.label} className="flex items-center gap-2 text-muted">
                                    <Icon name={badge.icon} className="text-xl" />
                                    <span className="font-bold text-xs uppercase tracking-widest">{badge.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-5">
                        <div className="bg-surface rounded-xl p-8 shadow-sm border border-border lg:sticky lg:top-24">
                            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                            {/* Cart items */}
                            <div className="space-y-6 mb-8">
                                {cartItems.map((item) => (
                                    <div key={item.product.id} className="flex gap-4">
                                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-surface-2 flex-shrink-0 relative">
                                            <Image
                                                src={item.product.image}
                                                alt={item.product.name}
                                                fill
                                                className="object-cover"
                                                sizes="80px"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-sm truncate">{item.product.name}</h3>
                                            <p className="text-xs text-muted">Qty: {item.quantity}</p>
                                            {item.purchaseType === 'subscribe' && (
                                                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                                                    Subscribe & Save
                                                </span>
                                            )}
                                        </div>
                                        <span className="font-bold text-primary whitespace-nowrap">
                                            {formatPrice(
                                                item.product.price *
                                                item.quantity *
                                                (item.purchaseType === 'subscribe' ? 0.85 : 1)
                                            )}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-border pt-6 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-text-secondary">Subtotal</span>
                                    <span className="font-bold">{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-text-secondary">Shipping</span>
                                    <span className="font-bold text-primary">Free</span>
                                </div>
                            </div>

                            <div className="border-t border-border mt-6 pt-6 flex justify-between">
                                <span className="text-lg font-bold">Total</span>
                                <span className="text-2xl font-extrabold text-primary">
                                    {formatPrice(total)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Help widget */}
            <div className="fixed bottom-6 right-6 z-50">
                <button className="w-14 h-14 rounded-full bg-primary text-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform shadow-primary/30">
                    <Icon name="support_agent" className="text-2xl" />
                </button>
            </div>
        </div>
    );
}

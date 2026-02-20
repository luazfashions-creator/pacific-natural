'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { notFound } from 'next/navigation';
import { use } from 'react';
import { getProductBySlug, getRelatedProducts } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';
import { StarRating } from '@/components/ui/StarRating';
import { Badge } from '@/components/ui/Badge';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ProductCard } from '@/components/products/ProductCard';

export default function ProductDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = use(params);
    const product = getProductBySlug(slug);

    if (!product) return notFound();

    return <ProductDetailClient product={product} />;
}

function ProductDetailClient({ product }: { product: ReturnType<typeof getProductBySlug> }) {
    const [purchaseType, setPurchaseType] = useState<'subscribe' | 'once'>('subscribe');
    const [quantity, setQuantity] = useState(1);
    const [selectedImageIdx] = useState(0);

    if (!product) return null;

    const relatedProducts = getRelatedProducts(product.slug, 4);
    const subscribePrice = product.price * 0.85;

    // Generate thumbnails (using the same image for demo, in production you'd have multiple angles)
    const thumbnails = [product.image, product.image, product.image, product.image];

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 pb-24">
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Supplements', href: '/products' },
                    { label: product.name },
                ]}
            />

            {/* Main product section */}
            <div className="lg:grid lg:grid-cols-12 gap-x-12 items-start mt-8">
                {/* Left: Image Gallery */}
                <div className="lg:col-span-7">
                    <div className="relative aspect-square bg-surface rounded-2xl shadow-sm overflow-hidden border border-border">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 1024px) 100vw, 58vw"
                        />
                        {product.badge && (
                            <Badge className="absolute top-6 left-6">{product.badge}</Badge>
                        )}
                    </div>
                    {/* Thumbnails */}
                    <div className="grid grid-cols-4 gap-4 mt-4">
                        {thumbnails.map((img, i) => (
                            <div
                                key={i}
                                className={`aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${i === selectedImageIdx ? 'border-primary' : 'border-transparent hover:border-primary/30'
                                    }`}
                            >
                                <Image
                                    src={img}
                                    alt={`${product.name} view ${i + 1}`}
                                    width={150}
                                    height={150}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Product Info */}
                <div className="lg:col-span-5 mt-10 lg:mt-0 lg:sticky lg:top-24 space-y-6">
                    {product.badge && (
                        <Badge variant="outline">{product.badge}</Badge>
                    )}

                    <StarRating rating={product.rating} size="md" showCount count={product.reviewCount} />

                    <h1 className="text-4xl font-extrabold text-text-primary leading-tight">
                        {product.name}
                    </h1>

                    <p className="text-text-secondary leading-relaxed">{product.longDescription}</p>

                    {/* Price section */}
                    <div className="flex items-baseline gap-4">
                        <span className="text-4xl font-extrabold text-primary">
                            {formatPrice(purchaseType === 'subscribe' ? subscribePrice : product.price)}
                        </span>
                        {product.originalPrice && (
                            <span className="text-lg text-muted line-through">
                                {formatPrice(product.originalPrice)}
                            </span>
                        )}
                    </div>

                    {/* Purchase type toggle */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => setPurchaseType('subscribe')}
                            className={`flex-1 p-4 rounded-xl border-2 transition-all text-left ${purchaseType === 'subscribe'
                                    ? 'border-primary bg-primary/5'
                                    : 'border-border hover:border-primary/40'
                                }`}
                        >
                            <div className="flex items-center gap-3 mb-1">
                                <Icon name="autorenew" className="text-primary text-xl" />
                                <span className="font-bold">Subscribe & Save</span>
                            </div>
                            <p className="text-xs text-text-secondary ml-8">Save 15% on every delivery</p>
                        </button>
                        <button
                            onClick={() => setPurchaseType('once')}
                            className={`flex-1 p-4 rounded-xl border-2 transition-all text-left ${purchaseType === 'once'
                                    ? 'border-primary bg-primary/5'
                                    : 'border-border hover:border-primary/40'
                                }`}
                        >
                            <div className="flex items-center gap-3 mb-1">
                                <Icon name="shopping_bag" className="text-primary text-xl" />
                                <span className="font-bold">One-Time Purchase</span>
                            </div>
                            <p className="text-xs text-text-secondary ml-8">Standard pricing</p>
                        </button>
                    </div>

                    {/* Quantity + Add to Cart */}
                    <div className="flex gap-4">
                        <div className="flex items-center bg-surface-2 rounded-lg">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="w-12 h-12 flex items-center justify-center hover:text-primary transition-colors"
                            >
                                <Icon name="remove" />
                            </button>
                            <span className="w-12 text-center font-bold">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="w-12 h-12 flex items-center justify-center hover:text-primary transition-colors"
                            >
                                <Icon name="add" />
                            </button>
                        </div>
                        <Link
                            href="/checkout"
                            className="flex-1 bg-primary text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-3 hover:bg-primary-hover transition-all shadow-xl shadow-primary/20"
                        >
                            <Icon name="shopping_cart" />
                            Add to Cart
                        </Link>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                        {product.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Ingredient Highlights */}
            <section className="mt-24">
                <h2 className="text-3xl font-extrabold text-text-primary mb-10">Ingredient Highlights</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {product.ingredients.map((ing) => (
                        <div
                            key={ing.name}
                            className="p-8 rounded-xl bg-surface border border-border hover:shadow-lg transition-all"
                        >
                            <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                                <Icon name={ing.icon} className="text-2xl" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">{ing.name}</h3>
                            <p className="text-sm text-text-secondary leading-relaxed">{ing.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Customer Reviews */}
            <section className="mt-24">
                <h2 className="text-3xl font-extrabold text-text-primary mb-10">Customer Reviews</h2>
                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Left: Summary */}
                    <div className="lg:col-span-4 bg-surface p-8 rounded-xl border border-border">
                        <div className="text-center mb-8">
                            <span className="text-6xl font-extrabold text-primary">{product.rating}</span>
                            <div className="flex justify-center mt-2 mb-2">
                                <StarRating rating={product.rating} size="md" />
                            </div>
                            <p className="text-sm text-muted">{product.reviewCount} reviews</p>
                        </div>
                        {/* Rating bars */}
                        {[5, 4, 3, 2, 1].map((stars) => {
                            const pct =
                                stars === 5
                                    ? 78
                                    : stars === 4
                                        ? 15
                                        : stars === 3
                                            ? 5
                                            : stars === 2
                                                ? 1
                                                : 1;
                            return (
                                <div key={stars} className="flex items-center gap-3 mb-2">
                                    <span className="text-sm text-text-secondary w-3">{stars}</span>
                                    <Icon name="star" filled className="text-accent-warm text-xs" />
                                    <div className="flex-1 h-2 bg-surface-2 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary rounded-full"
                                            style={{ width: `${pct}%` }}
                                        />
                                    </div>
                                    <span className="text-xs text-muted w-8">{pct}%</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right: Reviews */}
                    <div className="lg:col-span-8 space-y-6">
                        {product.reviews.map((review) => (
                            <div
                                key={review.id}
                                className="p-8 bg-surface rounded-xl border border-border"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <StarRating rating={review.rating} />
                                        <h4 className="font-bold">{review.title}</h4>
                                    </div>
                                    {review.verified && (
                                        <Badge variant="outline">
                                            <span className="flex items-center gap-1">
                                                <Icon name="check_circle" className="text-xs" />
                                                Verified
                                            </span>
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-text-secondary mb-4 leading-relaxed">{review.content}</p>
                                <div className="flex justify-between text-sm text-muted">
                                    <span>{review.author}</span>
                                    <span>{review.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Related Products */}
            <section className="mt-24">
                <h2 className="text-3xl font-extrabold text-text-primary mb-10">You Might Also Like</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {relatedProducts.map((p) => (
                        <ProductCard key={p.id} product={p} variant="compact" />
                    ))}
                </div>
            </section>
        </div>
    );
}

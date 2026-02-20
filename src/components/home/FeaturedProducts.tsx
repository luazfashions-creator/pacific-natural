'use client';

import { useRef } from 'react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/products/ProductCard';
import { Icon } from '@/components/ui/Icon';

export function FeaturedProducts() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 340;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    const featured = products.slice(0, 4);

    return (
        <section className="py-24 bg-primary/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col gap-12">
                <div className="flex items-end justify-between">
                    <div>
                        <h2 className="text-4xl lg:text-5xl font-semibold text-slate-900 mb-4">Daily Essentials</h2>
                        <p className="text-slate-600">Our most requested foundational formulations.</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll('left')}
                            className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                        >
                            <Icon name="chevron_left" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                        >
                            <Icon name="chevron_right" />
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    className="flex gap-8 overflow-x-auto hide-scrollbar pb-8 -mx-10 px-10"
                >
                    {featured.map((product) => (
                        <div key={product.id} className="min-w-[300px] sm:min-w-[320px]">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

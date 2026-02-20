import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { StarRating } from '@/components/ui/StarRating';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';

interface ProductCardProps {
    product: Product;
    variant?: 'default' | 'compact';
}

export function ProductCard({ product, variant = 'default' }: ProductCardProps) {
    if (variant === 'compact') {
        return (
            <Link href={`/products/${product.slug}`} className="group cursor-pointer">
                <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg border border-primary/10 relative mb-3">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, 25vw"
                    />
                </div>
                <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{product.name}</h3>
                <p className="text-sm text-slate-500 mb-2">{product.subtitle}</p>
                <div className="flex justify-between items-center">
                    <span className="font-bold text-primary">{formatPrice(product.price)}</span>
                    <button className="p-2 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-white transition-all">
                        <Icon name="add_shopping_cart" className="text-sm" />
                    </button>
                </div>
            </Link>
        );
    }

    return (
        <div className="group relative flex flex-col bg-white/50 p-3 rounded-2xl border border-primary/5 hover:border-primary/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <Link href={`/products/${product.slug}`}>
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-100 rounded-lg">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Quick Add overlay */}
                    <button className="absolute bottom-4 left-4 right-4 bg-primary text-white py-3 rounded-lg font-bold text-sm translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-primary/20">
                        <Icon name="add_shopping_cart" className="text-lg" />
                        Quick Add
                    </button>
                    {product.badge && (
                        <Badge
                            variant={product.badge === 'New' ? 'primary' : 'light'}
                            className="absolute top-4 left-4"
                        >
                            {product.badge}
                        </Badge>
                    )}
                </div>
            </Link>
            <div className="mt-4 flex flex-col flex-1">
                <h3 className="text-sm font-bold text-slate-800 leading-tight mb-1">
                    <Link href={`/products/${product.slug}`}>{product.name}</Link>
                </h3>
                <p className="text-xs text-slate-500 mb-2">{product.subtitle}</p>
                <StarRating rating={product.rating} showCount count={product.reviewCount} />
                <p className="mt-auto pt-3 text-lg font-extrabold text-primary">{formatPrice(product.price)}</p>
            </div>
        </div>
    );
}

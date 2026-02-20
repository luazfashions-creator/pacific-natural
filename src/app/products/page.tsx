import { products } from '@/data/products';
import { ProductCard } from '@/components/products/ProductCard';
import { FilterSidebar } from '@/components/products/FilterSidebar';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Icon } from '@/components/ui/Icon';

export default function ProductsPage() {
    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Supplements' },
                ]}
            />

            <div className="flex items-start justify-between mb-12">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Supplements Collection</h1>
                    <p className="text-slate-500">{products.length} Products</p>
                </div>
                <div className="hidden md:flex items-center gap-3 text-sm text-slate-500">
                    <span>Sort by:</span>
                    <select className="bg-transparent font-bold text-slate-900 border-none focus:outline-none cursor-pointer">
                        <option>Best Selling</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Highest Rated</option>
                        <option>Newest</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Filter Sidebar */}
                <FilterSidebar className="hidden lg:block lg:col-span-3 sticky top-24" />

                {/* Product Grid */}
                <div className="lg:col-span-9">
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {/* Load More */}
                  
                </div>
            </div>
        </div>
    );
}

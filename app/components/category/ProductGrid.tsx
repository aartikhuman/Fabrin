import type { Product } from '../../types/product';
import ProductCard from './ProductCard';

interface ProductGridProps {
    products: Product[];
    columns?: 3 | 4;
}

export default function ProductGrid({ products, columns = 3 }: ProductGridProps) {
    if (products.length === 0) {
        return (
            <div className={`${columns === 4 ? 'lg:col-span-4' : 'lg:col-span-3'} col-span-1 text-center py-20`}>
                <p className="text-shade-06 text-lg">No products found matching your filters.</p>
            </div>
        );
    }

    const gridClasses = columns === 4
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";

    return (
        <div className={gridClasses}>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

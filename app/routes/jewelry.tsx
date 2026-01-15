import { useState, useMemo } from 'react';
import type { Route } from "./+types/jewelry";
import Layout from '../components/layout/Layout';
import FilterSidebar from '../components/category/FilterSidebar';
import ProductGrid from '../components/category/ProductGrid';
import Pagination from '../components/category/Pagination';
import { jewelryProducts } from '../data/products';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, fadeInLeft } from '../utils/animations';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Jewelry Collection - Fabrin" },
        { name: "description", content: "Explore our curated collection of jewelry. Shop necklaces, bracelets, rings, earrings, and more." },
    ];
}

const PRODUCTS_PER_PAGE = 9;

export default function Jewelry() {
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState<any>({
        categories: [],
        dressStyles: [],
        priceRange: [0, 200],
        colors: [],
        sizes: []
    });

    // Get unique subcategories
    const subcategories = useMemo(() => {
        return Array.from(new Set(jewelryProducts.map(p => p.subcategory)));
    }, []);

    // Filter products based on filters
    const filteredProducts = useMemo(() => {
        return jewelryProducts.filter(product => {
            // Category filter
            if (filters.categories.length > 0 && !filters.categories.includes(product.subcategory)) {
                return false;
            }

            // Price filter
            if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
                return false;
            }

            // Color filter
            if (filters.colors.length > 0 && !product.colors.some(c => filters.colors.includes(c))) {
                return false;
            }

            return true;
        });
    }, [filters]);

    // Paginate products
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
        return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
    }, [filteredProducts, currentPage]);

    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

    // Reset to page 1 when filters change
    const handleFilterChange = (newFilters: any) => {
        setFilters(newFilters);
        setCurrentPage(1);
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-12 overflow-hidden relative">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
                    {/* Filter Sidebar */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="lg:col-span-1"
                    >
                        <motion.div variants={fadeInLeft}>
                            <FilterSidebar
                                filters={filters}
                                onFilterChange={handleFilterChange}
                                showDressStyle={false}
                            />
                        </motion.div>
                    </motion.div>
                    {/* Main Content */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="lg:col-span-3"
                    >
                        <motion.div
                            variants={fadeInUp}
                            className="flex items-center justify-between mb-6"
                        >
                            <h1 className="text-4xl font-bold font-big text-black-100">Jewelry</h1>
                            <p className="text-shade-06">
                                Showing {paginatedProducts.length} of {filteredProducts.length} products
                            </p>
                        </motion.div>

                        <motion.div
                            variants={fadeInUp}
                        >
                            <ProductGrid products={paginatedProducts} />
                        </motion.div>

                        {totalPages > 1 && (
                            <motion.div
                                variants={fadeInUp}
                            >
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                />
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
}

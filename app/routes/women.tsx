import { useState, useMemo } from 'react';
import type { Route } from "./+types/women";
import Layout from '../components/layout/Layout';
import FilterSidebar from '../components/category/FilterSidebar';
import ProductGrid from '../components/category/ProductGrid';
import Pagination from '../components/category/Pagination';
import { womenProducts } from '../data/products';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer, fadeInLeft } from '../utils/animations';
import { IoFilterOutline } from 'react-icons/io5';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Women's Collection - Fabrin" },
        { name: "description", content: "Explore our curated collection of women's fashion. Shop t-shirts, tops, dresses, and more." },
    ];
}

const PRODUCTS_PER_PAGE = 9;

export default function Women() {
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState<any>({
        categories: [],
        dressStyles: [],
        priceRange: [0, 200],
        colors: [],
        sizes: []
    });
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Get unique subcategories
    const subcategories = useMemo(() => {
        return Array.from(new Set(womenProducts.map(p => p.subcategory)));
    }, []);

    // Filter products based on filters
    const filteredProducts = useMemo(() => {
        return womenProducts.filter(product => {
            // Category filter
            if (filters.categories.length > 0 && !filters.categories.includes(product.subcategory)) {
                return false;
            }

            // Dress style filter
            if (filters.dressStyles.length > 0 && product.dressStyle && !filters.dressStyles.includes(product.dressStyle)) {
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

            // Size filter
            if (filters.sizes.length > 0 && product.sizes && !product.sizes.some(s => filters.sizes.includes(s))) {
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
                    {/* Desktop Filter Sidebar */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="hidden lg:block lg:col-span-1"
                    >
                        <motion.div variants={fadeInLeft}>
                            <FilterSidebar
                                filters={filters}
                                onFilterChange={handleFilterChange}
                                showDressStyle={true}
                            />
                        </motion.div>
                    </motion.div>

                    {/* Mobile Filter Drawer Overlay */}
                    <AnimatePresence>
                        {isFilterOpen && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setIsFilterOpen(false)}
                                    className="fixed inset-0 bg-black/50 z-100 lg:hidden"
                                />
                                <motion.div
                                    initial={{ x: '-100%' }}
                                    animate={{ x: 0 }}
                                    exit={{ x: '-100%' }}
                                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                    className="fixed top-0 left-0 bottom-0 w-[300px] h-full bg-white z-101 lg:hidden overflow-y-auto p-6 shadow-2xl"
                                >
                                    <FilterSidebar
                                        filters={filters}
                                        onFilterChange={handleFilterChange}
                                        showDressStyle={true}
                                        onClose={() => setIsFilterOpen(false)}
                                        isMobile={true}
                                    />
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
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
                            <div className="flex items-center gap-4">
                                <h1 className="text-4xl font-bold font-big text-black-100">Women</h1>
                                <button
                                    onClick={() => setIsFilterOpen(true)}
                                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-shade-01 text-black-100 font-medium rounded-md hover:bg-shade-10 transition-colors"
                                >
                                    <IoFilterOutline size={18} />
                                    Filters
                                </button>
                            </div>
                            <p className="text-shade-06 hidden sm:block">
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

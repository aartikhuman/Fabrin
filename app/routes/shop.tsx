import { useState, useMemo } from 'react';
import type { Route } from "./+types/shop";
import Layout from '../components/layout/Layout';
import ProductGrid from '../components/category/ProductGrid';
import Pagination from '../components/category/Pagination';
import { allProducts } from '../data/products';
import { IoSearchOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/animations';

const PRODUCTS_PER_PAGE = 12;


export default function Shop() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');


    // Filter products based on search
    const filteredProducts = useMemo(() => {
        return allProducts.filter(product => {
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                return (
                    product.name.toLowerCase().includes(query) ||
                    product.category.toLowerCase().includes(query) ||
                    product.subcategory.toLowerCase().includes(query)
                );
            }
            return true;
        });
    }, [searchQuery]);

    // Paginate products
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
        return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
    }, [filteredProducts, currentPage]);

    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

    return (
        <Layout>
            {/* Hero Section */}
            <div className="bg-[url('/assets/images/image.png')] bg-cover bg-top border-b border-shade-10 py-20 mb-12 relative before:absolute before:inset-0 before:bg-black/20 overflow-hidden">
                <motion.div
                    initial={false}
                    animate="visible"
                    variants={staggerContainer}
                    className="container mx-auto px-4 text-center z-10 relative"
                >
                    <motion.h1
                        variants={fadeInUp}
                        initial={false}
                        className="text-5xl md:text-7xl font-bold font-big text-white mb-6 tracking-tight"
                    >
                        Discover Everything
                    </motion.h1>
                    <motion.p
                        variants={fadeInUp}
                        initial={false}
                        className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-inter"
                    >
                        Explore our curated collection of unique pieces, blended together for a creative shopping discovery.
                    </motion.p>

                    {/* Professional Search Bar */}
                    <motion.div variants={fadeInUp} className="relative max-w-2xl mx-auto group">
                        <input
                            type="text"
                            placeholder="What are you looking for?"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-shade-10 rounded px-12 py-4 focus:outline-none focus:border-brown focus:ring-4 focus:ring-brown/5 transition-all text-base shadow-sm group-hover:shadow-md"
                        />
                        <IoSearchOutline className="absolute left-5 top-1/2 -translate-y-1/2 text-shade-04 transition-colors group-hover:text-brown" size={20} />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-shade-04 hover:text-black-100 transition-colors font-medium text-sm border-l border-shade-10 pl-4"
                            >
                                Clear
                            </button>
                        )}
                    </motion.div>
                </motion.div>
            </div>

            <div className="container mx-auto px-4 pb-20">
                <motion.div
                    initial={false}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 1 }}
                >
                    <ProductGrid products={paginatedProducts} columns={4} />

                    {totalPages > 1 && (
                        <div className="mt-20 flex justify-center border-t border-shade-10 pt-12">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    )}

                    {filteredProducts.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-32 bg-shade-01 rounded-[40px] border-2 border-dashed border-shade-10 transition-all hover:border-brown/20 group"
                        >
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl transition-transform group-hover:scale-110">
                                <IoSearchOutline className="text-shade-04 group-hover:text-brown transition-colors" size={48} />
                            </div>
                            <h3 className="text-3xl font-bold text-black-100 mb-3 font-big">We searched everywhere</h3>
                            <p className="text-shade-06 text-lg mb-10 max-w-md mx-auto font-inter">
                                We couldn't find any products matching your search. Try different keywords or browse our full collection.
                            </p>
                            <button
                                onClick={() => setSearchQuery('')}
                                className="px-10 py-4 bg-black-100 text-white font-bold rounded-xl hover:bg-brown transition-all cursor-pointer shadow-xl hover:shadow-brown/20 flex items-center gap-2 mx-auto"
                            >
                                <IoSearchOutline size={20} />
                                View Full Collection
                            </button>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </Layout>
    );
}

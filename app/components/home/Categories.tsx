import { Link } from 'react-router';
import { motion } from 'framer-motion';

export default function Categories() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">

                    {/* Column 1: Fashion Collection */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <Link to="/shop" className="group">
                            <div className="aspect-square overflow-hidden mb-8">
                                <img
                                    src="/assets/images/categories/product-1.png"
                                    alt="Fashion Collection"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <h3 className="text-3xl font-bold font-big mb-6 tracking-tight">Fashion Collection</h3>
                            <button className="px-10 py-3 border border-brown/30 text-brown font-inter text-sm font-medium hover:bg-brown hover:text-white transition-all cursor-pointer">
                                Shop Now
                            </button>
                        </Link>
                    </motion.div>

                    {/* Column 2: Center Image (Taller) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="pt-0"
                    >
                        <div className="aspect-[3/4.5] overflow-hidden shadow-sm">
                            <img
                                src="/assets/images/categories/product-2.png"
                                alt="Style Look"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>

                    {/* Column 3: Jewelry Collection */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Link to="/shop?category=jewelry" className="group">
                            <div className="aspect-square overflow-hidden mb-8">
                                <img
                                    src="/assets/images/categories/product-3.png"
                                    alt="Jewelry Collection"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <h3 className="text-3xl font-bold font-big mb-2 tracking-tight">Jewelry Collection</h3>
                            <p className="text-shade-06 mb-8 font-inter">Where simplicity becomes luxury</p>
                            <button className="px-10 py-3 border border-brown/30 text-brown font-inter text-sm font-medium hover:bg-brown hover:text-white transition-all cursor-pointer">
                                Shop Now
                            </button>
                        </Link>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

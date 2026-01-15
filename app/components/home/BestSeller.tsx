import { allProducts } from '../../data/products';
import ProductCard from '../category/ProductCard';
import Button from '../ui/Button';
import { motion } from 'framer-motion';

export default function BestSeller() {
    // Mixed products: Jewelry, Men's T-shirt, Women's Top, Women's Top
    const bestSellerIds = ['j1', 'm9', 'w4', 'w17'];
    const bestSellers = bestSellerIds
        .map(id => allProducts.find(p => p.id === id))
        .filter((p): p is typeof allProducts[0] => !!p);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" as any }
        }
    };

    return (
        <section className="py-20 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                >
                    <div className="flex justify-between items-end mb-12">
                        <motion.div variants={itemVariants}>
                            <h2 className="text-[40px] md:text-[64px] font-bold font-big leading-tight">
                                Best Seller Products
                            </h2>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <Button
                                to="/shop"
                                variant="primary"
                            >
                                See All
                            </Button>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {bestSellers.map(product => (
                            <motion.div key={product.id} variants={itemVariants}>
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
            <motion.img
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
                src="/assets/images/bestseller/vector1.png"
                alt="vector"
                className='absolute -bottom-3 0 left-0'
            />
        </section>
    );
}

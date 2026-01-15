import { useRef } from 'react';
import { useLoaderData, Link } from 'react-router';
import type { Route } from './+types/product.$id';
import { allProducts } from '../data/products';
import Layout from '../components/layout/Layout';
import ProductGallery from '../components/product/ProductGallery';
import ProductInfo from '../components/product/ProductInfo';
import ProductContent from '../components/product/ProductContent';
import BestSeller from '../components/home/BestSeller';
import { IoChevronForward, IoCheckmarkCircle } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/animations';

export function meta({ data }: Route.MetaArgs) {
    if (!data?.product) {
        return [{ title: "Product Not Found - Fabrin" }];
    }
    return [
        { title: `${data.product.name} - Fabrin` },
        { name: "description", content: data.product.description || "Product details" },
    ];
}

export function loader({ params }: Route.LoaderArgs) {
    const product = allProducts.find(p => p.id === params.id);
    if (!product) {
        throw new Response("Not Found", { status: 404 });
    }
    return { product };
}


export default function ProductDetails() {
    const { product } = useLoaderData();
    const scrollRef = useRef<HTMLDivElement>(null);

    // Fallback images if gallery images not defined
    const galleryImages = product.images && product.images.length > 0
        ? product.images
        : [product.image, product.image, product.image, product.image];

    return (
        <Layout>
            <div className="container mx-auto px-4 pt-8 overflow-hidden" ref={scrollRef}>
                {/* Breadcrumbs */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-2 text-base text-shade-06 mb-8"
                >
                    <Link to="/" className="hover:text-black-100 transition-colors">Home</Link>
                    <IoChevronForward size={14} />
                    <Link to={`/${product.category}`} className="hover:text-black-100 transition-colors capitalize">
                        {product.category}
                    </Link>
                    <IoChevronForward size={14} />
                    <span className="text-black-100 font-medium">{product.name}</span>
                </motion.div>

                {/* Main Product Section */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20"
                >
                    <motion.div variants={fadeInUp}>
                        <ProductGallery images={galleryImages} product={product} />
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                        <ProductInfo product={product} />
                    </motion.div>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="mt-10 space-y-8"
                >
                    <motion.div variants={fadeInUp}>
                        <h3 className="text-xl font-bold font-big text-black-100 mb-3">Product Description</h3>
                        <p className="text-shade-06 leading-relaxed">
                            A versatile and stylish top designed for comfort and everyday wear. Its flattering fit and modern silhouette make it easy to pair with denim, trousers, or layered outfits — perfect for casual outings, office looks, or relaxed weekends.
                        </p>
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                        <h3 className="text-xl font-bold font-big text-black-100 mb-3">Benefits</h3>
                        <ul className="space-y-3">
                            {[
                                "Soft and breathable fabric for all-day comfort",
                                "Flattering cut that enhances your natural shape",
                                "Lightweight and easy to style across seasons",
                                "Works effortlessly with multiple outfit types casual or dressy"
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-3 text-shade-06">
                                    <IoCheckmarkCircle className="text-brown text-xl shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                        <h3 className="text-xl font-bold font-big text-black-100 mb-3">Product Details</h3>
                        <ul className="space-y-3">
                            {[
                                { label: "Fabric", value: "95% Cotton, 5% Spandex" },
                                { label: "Fit", value: "Regular / Relaxed (select as needed)" },
                                { label: "Neckline", value: "Round / V-neck (choose based on actual product)" }
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-3 text-shade-06">
                                    <IoCheckmarkCircle className="text-brown text-xl shrink-0 mt-0.5" />
                                    <span><strong className="text-black-100 font-medium">{item.label}:</strong> {item.value}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                        <h3 className="text-xl font-bold font-big text-black-100 mb-3">More Details</h3>
                        <ul className="space-y-3">
                            {[
                                "Minimal maintenance, long-lasting color, and wrinkle-resistant finish. Designed to stay soft even after multiple washes.",
                                "Style it with jeans, trousers, skirts, or layers for an effortless everyday look."
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-3 text-shade-06">
                                    <IoCheckmarkCircle className="text-brown text-xl shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>
                {/* Detailed Content */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="mb-20"
                >
                    <ProductContent
                        longDescription={product.longDescription}
                        benefits={product.benefits}
                        productDetails={product.productDetails}
                        moreDetails={product.moreDetails}
                    />
                </motion.div>
            </div>

            <div className='pb-20'>
                {/* Related/Best Seller Products */}
                <BestSeller />
            </div>
        </Layout>
    );
}

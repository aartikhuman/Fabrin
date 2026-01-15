import type { Route } from "./+types/cart";
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, scaleUp } from '../utils/animations';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Shopping Cart - Fabrin" },
        { name: "description", content: "Review your cart and proceed to checkout." },
    ];
}

export default function Cart() {
    // Empty cart for now
    const cartItems: any[] = [];

    return (
        <Layout>
            <div className="bg-accent-50 py-12 md:py-16 overflow-hidden">
                <div className="container mx-auto px-4">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="font-display text-4xl md:text-5xl font-bold text-accent-900"
                    >
                        Shopping Cart
                    </motion.h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 md:py-16">
                {cartItems.length === 0 ? (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="text-center py-16"
                    >
                        <motion.div variants={scaleUp}>
                            <svg className="w-24 h-24 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </motion.div>
                        <motion.h2 variants={fadeInUp} className="font-display text-2xl font-bold text-gray-900 mb-4">
                            Your cart is empty
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-gray-600 mb-8">
                            Looks like you haven't added anything to your cart yet
                        </motion.p>
                        <motion.div variants={fadeInUp}>
                            <Button to="/shop" size="lg">
                                Continue Shopping
                            </Button>
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                    >
                        {/* Cart Items */}
                        <motion.div variants={fadeInUp} className="lg:col-span-2">
                            {/* Cart items would go here */}
                        </motion.div>

                        {/* Order Summary */}
                        <motion.div variants={fadeInUp}>
                            <div className="bg-accent-50 p-6 rounded-lg sticky top-24">
                                <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-semibold">$0.00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="font-semibold">Free</span>
                                    </div>
                                    <div className="border-t pt-3 flex justify-between text-lg">
                                        <span className="font-semibold">Total</span>
                                        <span className="font-bold">$0.00</span>
                                    </div>
                                </div>
                                <Button to="/checkout" variant="primary" size="lg" className="w-full">
                                    Proceed to Checkout
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </Layout>
    );
}

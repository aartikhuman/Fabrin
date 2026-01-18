import { Outlet, useLocation } from "react-router";
import { Link } from "react-router";
import OrderSummary from "../components/checkout/OrderSummary";
import { IoCardOutline } from "react-icons/io5";
import Footer from "~/components/layout/Footer";
import { FaListCheck, FaTruck } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

export default function CheckoutLayout() {
    const location = useLocation();

    const steps = [
        { id: 1, name: "Shipping", path: "/checkout" },
        { id: 2, name: "Payment", path: "/checkout/payment" },
        { id: 3, name: "Review", path: "/checkout/review" },
    ];

    const currentStep = steps.findIndex(step => step.path === location.pathname) + 1 || (location.pathname === "/checkout" ? 1 : 1);

    return (
        <div className="overflow-hidden">
            <div className="bg-white">
                <motion.header
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white border-b border-shade-10 sticky top-0 z-50"
                >
                    <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                        <Link to="/" className="text-4xl font-big font-bold text-black-100">Fabrin</Link>
                        <Link to="/shop" className="text-shade-06 hover:text-brown transition-colors">
                            Continue Shopping
                        </Link>
                    </div>
                </motion.header>

                <div className="container mx-auto px-4 py-8 lg:py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                        {/* Left Column: Flow Content */}
                        <div className="lg:col-span-7">
                            {/* Stepper */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center justify-between mb-12 max-w-2xl mx-auto lg:mx-0"
                            >
                                {steps.map((step, index) => {
                                    const isCompleted = currentStep > step.id;
                                    const isActive = currentStep === step.id;

                                    let Icon = FaTruck;
                                    if (step.id === 2) Icon = IoCardOutline;
                                    if (step.id === 3) Icon = FaListCheck;

                                    return (
                                        <div key={step.id} className="flex items-center w-full last:w-auto">
                                            <div className="flex items-center relative z-10 gap-2 md:gap-3">
                                                <motion.div
                                                    initial={false}
                                                    animate={{
                                                        backgroundColor: (isActive || isCompleted) ? "#A86C51" : "#FFFFFF",
                                                        borderColor: (isActive || isCompleted) ? "#A86C51" : "#E5E7EB",
                                                        color: (isActive || isCompleted) ? "#FFFFFF" : "#9CA3AF"
                                                    }}
                                                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-xl md:text-2xl border-2 transition-colors duration-300`}
                                                >
                                                    <Icon />
                                                </motion.div>
                                                <span className={`text-[12px] sm:text-base md:text-lg font-semibold font-inter ${(isActive || isCompleted) ? 'text-black-100' : 'text-shade-05'} hidden xs:block`}>
                                                    {step.name}
                                                </span>
                                            </div>

                                            {/* Connector Line */}
                                            {index < steps.length - 1 && (
                                                <div className="flex-1 mx-2 md:mx-4 h-px bg-shade-10 relative">
                                                    <motion.div
                                                        initial={{ scaleX: 0 }}
                                                        animate={{ scaleX: isCompleted ? 1 : 0 }}
                                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                                        className="absolute top-0 left-0 h-full w-full bg-brown origin-left"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </motion.div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={location.pathname}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                >
                                    <Outlet />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Right Column: Order Summary */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="lg:col-span-5"
                        >
                            <OrderSummary />
                        </motion.div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

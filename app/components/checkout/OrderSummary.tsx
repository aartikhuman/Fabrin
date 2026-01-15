import { BsTruck } from "react-icons/bs";
import { useCheckout } from "../../context/CheckoutContext";
import { motion } from "framer-motion";

const fadeInUp = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" as any }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
};

export default function OrderSummary() {
    const { cartItems, cartTotal, discount, deliveryFee, finalTotal } = useCheckout();

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="bg-white p-6 sticky top-24"
        >
            <motion.h2 variants={fadeInUp} className="font-big font-bold text-4xl mb-10 text-black-100">Order Summary</motion.h2>

            {/* Cart Items Area */}
            <div className="space-y-6 mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                    <motion.div variants={fadeInUp} key={item.id} className="flex gap-4">
                        <div className="w-20 h-20 bg-shade-01 overflow-hidden shrink-0">
                            <img
                                src={item.product.images?.[1] || item.product.image}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className="font-medium text-xl text-black-100">{item.product.name}</h3>
                                <span className="font-medium text-xl text-black-100">${item.product.price.toFixed(2)}</span>
                            </div>
                            <p className="text-shade-06 mt-2 text-lg">
                                Qty : {item.quantity < 10 ? `0${item.quantity}` : item.quantity}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div variants={fadeInUp} className="h-px bg-shade-10 mb-6" />

            {/* Calculations */}
            <motion.div variants={fadeInUp} className="space-y-4 mb-6">
                <div className="flex justify-between items-center text-lg">
                    <span className="text-shade-04">Subtotal</span>
                    <span className="font-medium text-black-100">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                    <span className="text-shade-04">Discount (-20%)</span>
                    <span className="font-medium text-red-500">-${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                    <span className="text-shade-04">Delivery Fee</span>
                    <span className="font-medium text-black-100">${deliveryFee.toFixed(2)}</span>
                </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="h-px bg-shade-10 mb-6" />

            <motion.div variants={fadeInUp} className="flex justify-between items-center mb-6">
                <span className="font-bold text-2xl text-black-100">Total</span>
                <span className="font-bold text-3xl text-black-100">${finalTotal.toFixed(2)}</span>
            </motion.div>

            {/* Returns Info */}
            <motion.div variants={fadeInUp} className="flex items-center gap-3 text-[#10B981]">
                <BsTruck size={22} />
                <span className="text-lg font-medium">Free returns within 30 days</span>
            </motion.div>
        </motion.div>
    );
}

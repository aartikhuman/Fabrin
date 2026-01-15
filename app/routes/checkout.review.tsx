import { useNavigate } from "react-router";
import { IoLocationOutline, IoCardOutline } from "react-icons/io5";
import { useCheckout } from "../context/CheckoutContext";
import { BiArrowBack } from "react-icons/bi";
import Button from "../components/ui/Button";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../utils/animations";

export default function ReviewOrder() {
    const navigate = useNavigate();
    const { shippingInfo, paymentMethod, cartItems, finalTotal } = useCheckout();

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
        >
            <motion.button variants={fadeInUp} onClick={() => navigate('/checkout/payment')} className="flex items-center gap-2 font-medium transition-colors cursor-pointer hover:text-brown text-black-100 text-lg mb-8"><BiArrowBack size={20} /> Back</motion.button>
            <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-8">
                <h2 className="text-3xl font-bold text-black-100 font-big">Review & Confirm</h2>
            </motion.div>

            <div className="space-y-8 mb-8">
                <motion.div variants={fadeInUp}>
                    <h3 className="font-bold text-black-100 mb-2 font-big text-xl">Shipping To</h3>
                    <div className="text-shade-06">
                        <div className="flex items-center gap-2">
                            <img src="/assets/icons/location.svg" alt="location" />
                            <p className="text-base">{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <img src="/assets/icons/phone.svg" alt="phone" />
                            <p className="text-base mt-1">{shippingInfo.phone}</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={fadeInUp}>
                    <h3 className="font-bold text-black-100 mb-2 font-big text-xl">Payment</h3>
                    <div className="flex items-center gap-2 text-shade-06">
                        <IoCardOutline />
                        <p className="text-base capitalize">{paymentMethod}</p>
                    </div>
                </motion.div>

                <motion.div variants={fadeInUp}>
                    <h3 className="font-bold text-black-100 mb-4 font-big text-xl">Items</h3>
                    <div className="space-y-6">
                        {cartItems.map((item: any) => (
                            <div key={item.id} className="flex justify-between items-center group">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-shade-01 overflow-hidden shrink-0">
                                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-black-100 text-lg group-hover:text-brown transition-colors">{item.product.name}</h4>
                                        <p className="text-shade-06 text-base">{item.product.category || "Furniture"}</p>
                                    </div>
                                </div>
                                <span className="font-bold text-black-100 font-inter text-lg">${(item.product.price * item.quantity).toFixed(0)}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <motion.div variants={fadeInUp} className="pt-4">
                <Button
                    to="/order-confirmation"
                    size="md"
                    className="w-full max-w-[250px]"
                >
                    Place Order
                </Button>
            </motion.div>
        </motion.div>
    );
}

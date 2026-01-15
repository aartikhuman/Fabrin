import { useNavigate } from "react-router";
import { IoCheckmark, IoChevronBack, IoCardOutline, IoLocationOutline, IoCallOutline } from "react-icons/io5";
import { useCheckout } from "../context/CheckoutContext";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" as any }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function OrderConfirmation() {
    const { orderId, generateOrderId, shippingInfo, cartItems, cartTotal, discount, deliveryFee, finalTotal, paymentMethod } = useCheckout();
    const navigate = useNavigate();

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);

    useEffect(() => {
        if (!orderId) {
            generateOrderId();
        }
    }, [orderId, generateOrderId]);

    if (!orderId) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-[#FDFCFB] py-8 px-4 font-inter text-black-100 overflow-x-hidden">
            <div className="container mx-auto">
                {/* Top Navigation */}
                <button
                    onClick={() => navigate('/checkout/review')}
                    className="flex items-center gap-1 text-black-100 font-medium hover:text-brown transition-colors mb-12 group cursor-pointer"
                >
                    <IoChevronBack className="text-xl transition-transform group-hover:-translate-x-1" />
                    <span className="text-lg">Back</span>
                </button>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="flex flex-col items-center"
                >
                    {/* Success Icon & Header */}
                    <motion.div variants={fadeInUp} className="text-center mb-16">
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                delay: 0.2
                            }}
                            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#AF866D] mb-8 shadow-xl shadow-brown/20"
                        >
                            <IoCheckmark className="text-white text-4xl" />
                        </motion.div>
                        <h1 className="text-4xl md:text-5xl font-big font-bold text-black-100 mb-4">Order Confirmed!</h1>
                        <p className="text-shade-06 text-lg max-w-lg">Thank you for your purchase. Your order has been placed successfully.</p>
                    </motion.div>

                    {/* Main Content Card */}
                    <motion.div
                        variants={fadeInUp}
                        className="w-full max-w-5xl"
                    >
                        {/* Brown Banner */}
                        <div className="bg-[#A5745B] rounded-t-[32px] p-8 md:p-10 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-2xl">
                                    <span className="opacity-80 font-inter">Order ID :</span>
                                    <span className="font-bold tracking-tight">{orderId}</span>
                                </div>
                                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm md:text-base opacity-90">
                                    <div className="flex items-center gap-1.5">
                                        <span className="font-inter">Order Date :</span>
                                        <span className="font-medium">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                    </div>
                                    <div className="hidden md:block w-px h-4 bg-white/30" />
                                    <div className="flex items-center gap-1.5">
                                        <span className="font-inter">Estimated Delivery :</span>
                                        <span className="font-medium uppercase">{deliveryDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4 w-full md:w-auto">
                                <Button
                                    className="flex-1 md:flex-none border-white/50 text-white"
                                    variant="outline"
                                    size="sm"
                                >
                                    Download Invoice
                                </Button>
                                <Button
                                    className="flex-1 md:flex-none bg-white !text-[#A5745B] hover:bg-shade-01 border-transparent"
                                    size="sm"
                                >
                                    Track Order
                                </Button>
                            </div>
                        </div>

                        {/* White Body Section */}
                        <div className="bg-white rounded-b-[32px] shadow-2xl shadow-black/5 overflow-hidden">
                            <div className="p-8 md:p-10">
                                {/* Product Items */}
                                <div className="space-y-0 mb-10">
                                    {(cartItems.length > 0 ? cartItems : [
                                        { id: '1', product: { name: 'Woman Coat', price: 24.00, image: '/assets/images/product-1.png' }, quantity: 1 }
                                    ]).map((item: any, idx) => (
                                        <div
                                            key={item.id}
                                            className={`flex items-center justify-between py-6 ${idx !== (cartItems.length || 1) - 1 ? 'border-b border-shade-02' : ''}`}
                                        >
                                            <div className="flex items-center gap-5">
                                                <div className="w-16 h-16 bg-shade-01 rounded-lg overflow-hidden shrink-0">
                                                    <img
                                                        src={item.product?.image || item.product?.images?.[0]}
                                                        alt={item.product?.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <h3 className="font-bold text-lg text-black-100">{item.product?.name}</h3>
                                                    <p className="text-shade-05 text-sm">Qty : {item.quantity < 10 ? `0${item.quantity}` : item.quantity}</p>
                                                </div>
                                            </div>
                                            <div className="font-bold text-xl text-black-100">
                                                ${(item.product?.price * (item.quantity || 1)).toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="h-px bg-shade-10 mb-10" />

                                {/* Info Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                                    <div className="space-y-4">
                                        <h3 className="font-bold text-lg text-black-100">Shipping To</h3>
                                        <div className="space-y-1 text-shade-05 flex flex-col gap-1">
                                            <div className="flex items-start gap-2.5">
                                                <IoLocationOutline className="mt-1 text-shade-04" size={18} />
                                                <p className="leading-relaxed">{shippingInfo.address || 't Lorem Ipsum, giving information on its origins'}</p>
                                            </div>
                                            <div className="flex items-center gap-2.5 pl-0.5">
                                                <IoCallOutline className="text-shade-04" size={18} />
                                                <p>{shippingInfo.phone || '+91 12345 56789'}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:border-l md:border-shade-10 md:pl-10 space-y-4">
                                        <h3 className="font-bold text-lg text-black-100">Payment</h3>
                                        <div className="flex items-center gap-3 text-shade-05">
                                            <IoCardOutline size={20} className="text-shade-04" />
                                            <p className="capitalize font-medium">{paymentMethod || 'PayPal'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Summary Table */}
                                <div className="space-y-4 max-w-full mt-8 border-t border-shade-02 pt-8 md:border-0 md:pt-0">
                                    <div className="flex justify-between items-center text-shade-05 font-medium">
                                        <span className="text-lg">Subtotal</span>
                                        <span className="text-black-100 font-bold text-lg">${cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-shade-05 font-medium">
                                        <span className="text-lg">Discount (-20%)</span>
                                        <span className="text-red-500 font-bold text-lg">-${discount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-shade-05 font-medium">
                                        <span className="text-lg">Delivery Fee</span>
                                        <span className="text-black-100 font-bold text-lg">${deliveryFee.toFixed(2)}</span>
                                    </div>
                                    <div className="h-px bg-shade-10 my-4" />
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-2xl text-black-100">Total</span>
                                        <span className="font-bold text-3xl text-black-100">${finalTotal.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

import { useNavigate } from "react-router";
import { useCheckout } from "../context/CheckoutContext";
import { IoCardOutline, IoLogoPaypal, IoPencil, IoCubeOutline } from "react-icons/io5";
import { BiArrowBack } from "react-icons/bi";
import { RiEdit2Line } from "react-icons/ri";
import Button from "../components/ui/Button";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../utils/animations";

export default function PaymentMethod() {
    const navigate = useNavigate();
    const { paymentMethod, setPaymentMethod, shippingInfo } = useCheckout();

    const methods = [
        { id: 'card', name: 'Credit Card', icon: '/assets/icons/mastercard.svg' },
        { id: 'bank', name: 'Bank Transfer', icon: '/assets/icons/bank.svg' }, // Using Cube as helper, Bank icon usually IoHome/Business
        { id: 'paypal', name: 'PayPal', icon: '/assets/icons/paypal.svg' },
    ];

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="p-8"
        >
            <motion.button variants={fadeInUp} onClick={() => navigate('/checkout')} className="flex items-center gap-2 font-medium transition-colors cursor-pointer hover:text-brown text-black-100 text-lg mb-8"><BiArrowBack size={20} /> Back</motion.button>
            <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-8">
                <h2 className="text-3xl font-bold text-black-100 font-big">Payment Method</h2>
            </motion.div>
            <div className="space-y-4 mb-10">
                {methods.map((method) => (
                    <motion.div
                        variants={fadeInUp}
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`flex items-center justify-between p-5 rounded-xl border cursor-pointer transition-all ${paymentMethod === method.id ? 'border-brown/40 bg-white' : 'border-shade-10/50 bg-white hover:border-shade-05'}`}
                    >
                        <div className="flex items-center gap-4">
                            {/* <method.icon size={20} /> */}
                            <img src={method.icon} alt={method.name} />
                            <span className="font-medium text-black-100 font-inter">{method.name}</span>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id ? 'border-brown' : 'border-shade-06'}`}>
                            {paymentMethod === method.id && <div className="w-3 h-3 rounded-full bg-brown" />}
                        </div>
                    </motion.div>
                ))}
            </div>
            <motion.div variants={fadeInUp} className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-3xl font-bold text-black-100 font-big">Shipping Information</h3>
                    <button onClick={() => navigate('/checkout')} className="text-black-100 flex items-center gap-2 text-base font-medium transition-colors cursor-pointer">
                        <img src="/assets/icons/edit.svg" alt="edit" /> Edit
                    </button>
                </div>
                <div className="">
                    <div className="flex items-center gap-2 mb-2">
                        <img src="/assets/icons/location.svg" alt="location" />
                        <p className="text-shade-06">{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src="/assets/icons/phone.svg" alt="phone" />
                        <p className="text-shade-06">{shippingInfo.phone}</p>
                    </div>
                </div>
            </motion.div>



            <motion.div variants={fadeInUp} className="pt-4">
                <Button
                    to="/checkout/review"
                    size="md"
                    className="w-full max-w-[250px]"
                >
                    Continue To Review
                </Button>
            </motion.div>
        </motion.div>
    );
}

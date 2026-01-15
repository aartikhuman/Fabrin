import { useNavigate } from "react-router";
import { useCheckout } from "../context/CheckoutContext";
import Button from "../components/ui/Button";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../utils/animations";

export default function ShippingForm() {
    const navigate = useNavigate();
    const { shippingInfo, setShippingInfo } = useCheckout();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate("/checkout/payment");
    };

    const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];
    const states = ["New York", "California", "Illinois", "Texas", "Arizona"];

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="p-8"
        >
            <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-8">
                <h2 className="text-4xl font-bold text-black-100 font-big">Shipping Details</h2>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={fadeInUp} className="space-y-2">
                        <label className="text-base font-medium text-black-100 block mb-1">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={shippingInfo.firstName}
                            onChange={handleChange}
                            placeholder="Enter First Name"
                            className="w-full border border-shade-10 rounded px-4 py-3 focus:outline-none focus:border-brown transition-colors placeholder-shade-06"
                            required
                        />
                    </motion.div>
                    <motion.div variants={fadeInUp} className="space-y-2">
                        <label className="text-base font-medium text-black-100 block mb-1">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={shippingInfo.lastName}
                            onChange={handleChange}
                            placeholder="Enter Last Name"
                            className="w-full border border-shade-10 rounded px-4 py-3 focus:outline-none focus:border-brown transition-colors placeholder-shade-06"
                            required
                        />
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={fadeInUp} className="space-y-2">
                        <label className="text-base font-medium text-black-100 block mb-1">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={shippingInfo.phone}
                            onChange={handleChange}
                            placeholder="Enter Phone Number"
                            className="w-full border border-shade-10 rounded px-4 py-3 focus:outline-none focus:border-brown transition-colors placeholder-shade-06"
                            required
                        />
                    </motion.div>
                    <motion.div variants={fadeInUp} className="space-y-2">
                        <label className="text-base font-medium text-black-100 block mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={shippingInfo.email}
                            onChange={handleChange}
                            placeholder="Enter Email"
                            className="w-full border border-shade-10 rounded px-4 py-3 focus:outline-none focus:border-brown transition-colors placeholder-shade-06"
                            required
                        />
                    </motion.div>
                </div>

                <motion.div variants={fadeInUp} className="space-y-2">
                    <label className="text-base font-medium text-black-100 block mb-1">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleChange}
                        placeholder="Enter Address"
                        className="w-full border border-shade-10 rounded px-4 py-3 focus:outline-none focus:border-brown transition-colors placeholder-shade-06"
                        required
                    />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={fadeInUp} className="space-y-2">
                        <label className="text-base font-medium text-black-100 block mb-1">City</label>
                        <div className="relative">
                            <select
                                name="city"
                                value={shippingInfo.city}
                                onChange={handleChange}
                                className="w-full border border-shade-10 rounded px-4 py-3 focus:outline-none focus:border-brown transition-colors appearance-none bg-white text-shade-06 cursor-pointer"
                                required
                            >
                                <option value="" disabled>Select City</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                            <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none text-shade-06">
                                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="space-y-2">
                        <label className="text-base font-medium text-black-100 block mb-1">State</label>
                        <div className="relative">
                            <select
                                name="state"
                                value={shippingInfo.state}
                                onChange={handleChange}
                                className="w-full border border-shade-10 rounded px-4 py-3 focus:outline-none focus:border-brown transition-colors appearance-none bg-white text-shade-06 cursor-pointer"
                                required
                            >
                                <option value="" disabled>Select State</option>
                                {states.map(state => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                            <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none text-shade-06">
                                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div variants={fadeInUp} className="pt-8 flex items-center gap-6">
                    <Button
                        variant="outline"
                        onClick={() => navigate('/cart')}
                        className="w-full max-w-[250px]" size='md'
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="w-full max-w-[250px]" size='md'
                    >
                        Continue
                    </Button>
                </motion.div>
            </form>
        </motion.div>
    );
}

import type { Route } from "./+types/contact";
import Layout from '../components/layout/Layout';
import { IoChevronDown } from 'react-icons/io5';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/animations';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Contact Us - Fabrin" },
        { name: "description", content: "Get in touch with us." },
    ];
}


export default function Contact() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-12 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                    {/* Left Column - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="w-full overflow-hidden aspect-4/5 lg:aspect-auto lg:h-[800px]"
                    >
                        <img
                            src="/assets/images/contact.png"
                            alt="Contact Us"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* Right Column - Form */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="flex flex-col"
                    >
                        <motion.h1
                            variants={fadeInUp}
                            className="text-[54px] lg:text-[64px] font-big font-bold text-black-100 mb-12 leading-none"
                        >
                            Contact Us
                        </motion.h1>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Row 1: Name */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <motion.div variants={fadeInUp} className="space-y-3">
                                    <label className="text-sm font-medium mb-2 block text-black-100 font-inter">First Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter First Name"
                                        className="w-full border border-shade-10 px-4 py-4 focus:outline-none focus:border-brown transition-colors placeholder:text-shade-04 font-inter h-[48px]"
                                        required
                                    />
                                </motion.div>
                                <motion.div variants={fadeInUp} className="space-y-3">
                                    <label className="text-sm font-medium mb-2 block text-black-100 font-inter">Last Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Last Name"
                                        className="w-full border border-shade-10 px-4 py-4 focus:outline-none focus:border-brown transition-colors placeholder:text-shade-04 font-inter h-[48px]"
                                        required
                                    />
                                </motion.div>
                            </div>

                            {/* Row 2: Email & Phone */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <motion.div variants={fadeInUp} className="space-y-3">
                                    <label className="text-sm font-medium mb-2 block text-black-100 font-inter">Label</label>
                                    <input
                                        type="email"
                                        placeholder="Enter Name"
                                        className="w-full border border-shade-10 px-4 py-4 focus:outline-none focus:border-brown transition-colors placeholder:text-shade-04 font-inter h-[48px]"
                                        required
                                    />
                                </motion.div>
                                <motion.div variants={fadeInUp} className="space-y-3">
                                    <label className="text-sm font-medium mb-2 block text-black-100 font-inter">Label</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Name"
                                        className="w-full border border-shade-10 px-4 py-4 focus:outline-none focus:border-brown transition-colors placeholder:text-shade-04 font-inter h-[48px]"
                                        required
                                    />
                                </motion.div>
                            </div>

                            {/* Row 3: City & State */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <motion.div variants={fadeInUp} className="space-y-3">
                                    <label className="text-sm font-medium mb-2 block text-black-100 font-inter">City</label>
                                    <div className="relative">
                                        <select className="w-full border border-shade-10 px-4 py-2 focus:outline-none focus:border-brown transition-colors appearance-none bg-white text-shade-06 cursor-pointer font-inter h-[48px]">
                                            <option value="">Select City</option>
                                            <option value="ny">New York</option>
                                            <option value="la">Los Angeles</option>
                                            <option value="ch">Chicago</option>
                                        </select>
                                        <IoChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    </div>
                                </motion.div>
                                <motion.div variants={fadeInUp} className="space-y-3">
                                    <label className="text-sm font-medium mb-2 block text-black-100 font-inter">State</label>
                                    <div className="relative">
                                        <select className="w-full border border-shade-10 px-4 py-2 focus:outline-none focus:border-brown transition-colors appearance-none bg-white text-shade-06 cursor-pointer font-inter h-[48px]">
                                            <option value="">Select State</option>
                                            <option value="ny">New York</option>
                                            <option value="ca">California</option>
                                            <option value="il">Illinois</option>
                                        </select>
                                        <IoChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    </div>
                                </motion.div>
                            </div>

                            {/* Row 4: Message */}
                            <motion.div variants={fadeInUp} className="space-y-3">
                                <label className="text-sm font-medium mb-2 block text-black-100 font-inter">Message</label>
                                <textarea
                                    rows={4}
                                    placeholder="Write Something...."
                                    className="w-full border border-shade-10 px-4 py-4 focus:outline-none focus:border-brown transition-colors placeholder:text-shade-04 resize-none font-inter"
                                ></textarea>
                            </motion.div>

                            {/* Buttons */}
                            <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-full"
                                >
                                    Submit
                                </Button>
                            </motion.div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
}

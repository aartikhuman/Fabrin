import { Link } from 'react-router';
import { FaFacebook, FaYoutube, FaGoogle } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../../utils/animations';


export default function Footer() {
    return (
        <footer className="bg-black text-white py-16 overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12"
                >
                    {/* Brand Logo */}
                    <motion.div variants={fadeInUp}>
                        <Link to="/" className="text-5xl font-big font-bold tracking-tight">
                            Fabrin
                        </Link>
                    </motion.div>

                    {/* Navigation Menu */}
                    <motion.nav variants={fadeInUp} className="flex flex-wrap justify-center items-center gap-8 text-base font-medium">
                        <Link to="/" className="hover:text-shade-04 transition-colors">Home</Link>
                        <Link to="/women" className="hover:text-shade-04 transition-colors">Category</Link>
                        <Link to="/shop" className="hover:text-shade-04 transition-colors">Shop</Link>
                        <Link to="/contact" className="hover:text-shade-04 transition-colors">Contact Us</Link>
                    </motion.nav>

                    {/* Social Icons */}
                    <motion.div variants={fadeInUp} className="flex items-center gap-6 text-2xl">
                        <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity">
                            <FaGoogle />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity">
                            <FaFacebook />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity">
                            <FaYoutube />
                        </a>
                    </motion.div>
                </motion.div>

                {/* Divider Line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="border-t border-white/10 mb-8 w-full origin-left"
                />

                {/* Copyright Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center text-shade-06 text-sm font-inter"
                >
                    <p>© {new Date().getFullYear()} fabrin. All rights reserved.</p>
                </motion.div>
            </div>
        </footer>
    );
}

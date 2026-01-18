import { motion } from 'framer-motion';
import Button from '../ui/Button';

export default function ElevateBanner() {
    return (
        <section className="relative h-[60vh] md:h-[70vh] overflow-hidden flex items-center justify-center">
            <motion.div
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0"
            >
                <img
                    src="/assets/images/shop.png"
                    alt="Elevate"
                    className="w-full h-full object-cover bg-fixed"
                    loading="lazy"
                    decoding="async"
                    width={1920}
                    height={800}
                />
                <div className="absolute inset-0 bg-black/20"></div>
            </motion.div>

            <div className="container mx-auto px-4 relative z-10 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-[40px] md:text-[72px] font-bold font-big mb-6 leading-tight">
                        Elevate Your Everyday Style
                    </h2>
                    <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto font-inter opacity-90">
                        Discover a range of styles that fit into your lifestyle effortlessly.
                    </p>
                    <Button
                        to="/shop"
                        variant='primary'
                    >
                        Explore More
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}

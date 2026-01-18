import { motion } from 'framer-motion';
import Button from '../ui/Button';

export default function JoinUs() {
    return (
        <section className="py-20 bg-[#7F4227]/6">
            <div className="container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-[40px] md:text-[64px] font-bold font-big mb-4">Join Us Today</h2>
                    <p className="text-shade-06 mb-10 font-inter">Sign up to our newsletter and be the first to know about new collections and exclusive offers.</p>

                    <form className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto" aria-label="Newsletter signup">
                        <input
                            type="email"
                            placeholder="Your email address"
                            aria-label="Email address for newsletter"
                            className="grow px-6 py-2 border border-shade-02 rounded-md focus:outline-none focus:border-brown"
                            required
                        />
                        <Button
                            type="submit"
                            variant="primary"
                            size="md"
                            aria-label="Subscribe to newsletter"
                        >
                            Join
                        </Button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}

import { motion } from 'framer-motion';

export default function Preloader() {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-white"
        >
            <div className="flex flex-col items-center">
                {/* Logo or Brand Name */}
                <motion.h1
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                    className="text-6xl font-big font-bold text-black-100 tracking-widest"
                >
                    FABRIN
                </motion.h1>

                {/* Optional: Subtle Progress Bar */}
                <div className="mt-8 w-48 h-1 bg-shade-01 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3, ease: "linear" }}
                        className="h-full bg-brown"
                    />
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="mt-4 text-shade-05 font-inter text-sm tracking-widest uppercase"
                >
                    Loading Experience
                </motion.p>
            </div>
        </motion.div>
    );
}

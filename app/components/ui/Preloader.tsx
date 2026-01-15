import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const fashionImages = [
    '/assets/images/products/women/women1.png',
    '/assets/images/products/men/men1.png',
    '/assets/images/products/women/women2.png',
    '/assets/images/products/men/men2.png',
    '/assets/images/products/women/women3.png',
    '/assets/images/products/men/men3.png',
    '/assets/images/products/women/women4.png',
    '/assets/images/products/men/men4.png',
];

export default function Preloader() {
    const [count, setCount] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // High speed percentage counter
        const counterInterval = setInterval(() => {
            setCount((prev) => {
                if (prev >= 100) {
                    clearInterval(counterInterval);
                    return 100;
                }
                return prev + 1;
            });
        }, 20);

        // Soft cross-fade image transition
        const flashInterval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % fashionImages.length);
        }, 400);

        // Hide loader after completion
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2600);

        return () => {
            clearInterval(counterInterval);
            clearInterval(flashInterval);
            clearTimeout(timer);
        };
    }, []);

    const containerVariants = {
        exit: {
            opacity: 0,
            scale: 1.05,
            transition: {
                duration: 1,
                ease: [0.33, 1, 0.68, 1] as any,
            }
        }
    };

    const brandName = "FABRIN";

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    variants={containerVariants}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit="exit"
                    className="fixed inset-0 z-[10000] flex items-center justify-center bg-white overflow-hidden"
                >
                    {/* Atmospheric Theme-Aligned Background */}
                    <div className="absolute inset-0 z-0 bg-shade-01/50">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentImageIndex}
                                src={fashionImages[currentImageIndex]}
                                className="w-full h-full object-cover grayscale opacity-10"
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 0.1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                            />
                        </AnimatePresence>
                        {/* Soft theme gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white/80" />
                    </div>

                    {/* Content Container */}
                    <div className="relative z-10 text-center flex flex-col items-center">
                        {/* Elegant Counter (Lighter Theme) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[120px] md:text-[200px] font-big font-bold text-black-100/5 flex items-baseline leading-none select-none"
                        >
                            {count}
                            <span className="text-4xl md:text-6xl ml-2 opacity-50">%</span>
                        </motion.div>

                        {/* Brand Revealing Centered (Black/Brown Theme) */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
                            <div className="flex justify-center gap-1 md:gap-4">
                                {brandName.split("").map((letter, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
                                        animate={{
                                            opacity: count > i * 14 ? 1 : 0,
                                            filter: count > i * 14 ? "blur(0px)" : "blur(10px)",
                                            y: count > i * 14 ? 0 : 10
                                        }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        className="text-6xl md:text-[10rem] font-big font-bold text-black-100 tracking-widest"
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </div>
                        </div>

                        {/* Minimal Theme Progress Line */}
                        <div className="w-48 md:w-96 h-px bg-black-100/10 mt-4 relative overflow-hidden">
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: count / 100 }}
                                className="absolute inset-0 bg-brown origin-left"
                            />
                        </div>

                        <motion.p
                            initial={{ opacity: 0, letterSpacing: "0.2em" }}
                            animate={{ opacity: 1, letterSpacing: "0.4em" }}
                            transition={{ delay: 0.5, duration: 2 }}
                            className="text-shade-04 text-[10px] md:text-[12px] uppercase mt-12 font-medium tracking-[0.4em]"
                        >
                            Defining Timeless Elegance
                        </motion.p>
                    </div>

                    {/* Subtle Overlay Polish */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

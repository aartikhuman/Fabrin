import { motion, AnimatePresence } from 'framer-motion';
import { IoSearchOutline } from 'react-icons/io5';
import { useEffect, useRef } from 'react';

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop for handling close on click outside but let header stay on top */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-40 bg-[#140C03]/50 backdrop-blur-sm top-20"
                    />

                    {/* Search Panel */}
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: '35vh', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed top-20 left-0 w-full z-45 bg-[#967F64]/20 text-white overflow-hidden"
                    >
                        <div className="container mx-auto px-4 h-full flex items-center">
                            <div className="max-w-6xl w-full mx-auto relative group">
                                <div className="flex items-center gap-6 text-white pb-6 border-b border-white/40 transition-all duration-300 group-focus-within:border-white">
                                    <IoSearchOutline className="text-3xl opacity-60 group-focus-within:opacity-100 transition-opacity" />
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        placeholder="Search"
                                        className="w-full bg-transparent border-none text-2xl md:text-4xl text-white placeholder-white/30 focus:outline-none focus:ring-0 font-light tracking-tight pb-1"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

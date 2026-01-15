import { useState, useEffect, Fragment } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { Dialog, Transition } from '@headlessui/react';

export default function WelcomePopup() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Check if user has already seen the popup in this session
        const hasSeen = sessionStorage.getItem('hasSeenPopup');

        if (!hasSeen) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 2000); // Show after 2 seconds

            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem('hasSeenPopup', 'true');
    };

    if (!isOpen) return null;

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[70]" onClose={handleClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="relative bg-white rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col md:flex-row transform transition-all">
                                {/* Close Button */}
                                <button
                                    onClick={handleClose}
                                    className="absolute top-4 right-4 z-10 p-2 bg-white/50 hover:bg-white rounded-full transition-colors cursor-pointer hover:rotate-90 duration-300"
                                >
                                    <IoCloseOutline size={24} className="text-black-100" />
                                </button>

                                {/* Left Column: Image */}
                                <div className="md:w-1/2 bg-shade-01 min-h-[300px] md:min-h-[500px] relative group">
                                    <img
                                        src="/assets/images/products/women/women2.png"
                                        alt="Welcome Offer"
                                        className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>

                                {/* Right Column: Content */}
                                <div className="md:w-1/2 p-8 lg:p-12 flex flex-col justify-center text-center md:text-left">
                                    <span className="text-brown font-bold tracking-widest uppercase mb-2">Limited Time Offer</span>
                                    <Dialog.Title as="h2" className="text-4xl lg:text-5xl font-big font-bold text-black-100 mb-4">
                                        Get 20% Off
                                    </Dialog.Title>
                                    <p className="text-shade-06 mb-8 text-lg">
                                        Subscribe to our newsletter and get a 20% discount on your first order. Be the first to know about new arrivals!
                                    </p>

                                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleClose(); }}>
                                        <input
                                            type="email"
                                            placeholder="Enter your email address"
                                            className="w-full px-6 py-4 border border-shade-10 rounded-full focus:outline-none focus:border-brown transition-colors bg-shade-01"
                                            required
                                        />
                                        <button
                                            type="submit"
                                            className="w-full py-4 bg-brown text-white rounded-full font-bold uppercase tracking-wider hover:bg-dark-brown active:scale-95 transition-all shadow-lg shadow-brown/20 cursor-pointer"
                                        >
                                            Subscribe Now
                                        </button>
                                    </form>

                                    <button
                                        onClick={handleClose}
                                        className="mt-6 text-shade-05 text-sm underline hover:text-black-100 cursor-pointer hover:no-underline transition-all"
                                    >
                                        No thanks, I'll pay full price
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

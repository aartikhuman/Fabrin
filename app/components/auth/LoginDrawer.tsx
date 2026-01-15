import { useAuth } from '../../context/AuthContext';
import { IoCloseOutline } from "react-icons/io5";
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" as any }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function LoginDrawer() {
    const { isLoginOpen, toggleLogin } = useAuth();
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic
        console.log('Login logic here', { rememberMe });
    };

    return (
        <Transition show={isLoginOpen} as={Fragment}>
            <Dialog as="div" className="relative z-70" onClose={toggleLogin}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-300 sm:duration-500"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-300 sm:duration-500"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto py-8 px-6 sm:px-8">
                                            <AnimatePresence>
                                                {isLoginOpen && (
                                                    <motion.div
                                                        initial="hidden"
                                                        animate="visible"
                                                        variants={staggerContainer}
                                                    >
                                                        <motion.div variants={fadeInUp} className="flex items-center justify-between mb-12">
                                                            <h2 className="text-3xl font-big font-bold text-black-100">
                                                                Login
                                                            </h2>
                                                            <button
                                                                type="button"
                                                                className="text-black-100 hover:text-brown transition-colors cursor-pointer"
                                                                onClick={toggleLogin}
                                                            >
                                                                <IoCloseOutline size={32} />
                                                            </button>
                                                        </motion.div>

                                                        <form onSubmit={handleSubmit} className="space-y-6">
                                                            <motion.div variants={fadeInUp} className="space-y-2">
                                                                <label className="text-sm font-medium mb-2 block text-black-100 font-inter">Name</label>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Enter Name"
                                                                    className="w-full border border-shade-10 px-4 py-4 focus:outline-none focus:border-brown transition-colors placeholder:text-shade-04 font-inter h-[48px]"
                                                                    required
                                                                />
                                                            </motion.div>

                                                            <motion.div variants={fadeInUp} className="space-y-2">
                                                                <label className="text-sm font-medium mb-2 block text-black-100 font-inter">Email</label>
                                                                <input
                                                                    type="email"
                                                                    placeholder="Enter Email"
                                                                    className="w-full border border-shade-10 px-4 py-4 focus:outline-none focus:border-brown transition-colors placeholder:text-shade-04 font-inter h-[48px]"
                                                                    required
                                                                />
                                                            </motion.div>

                                                            <motion.div variants={fadeInUp}>
                                                                <Checkbox
                                                                    id="remember-me"
                                                                    label="Remember Me"
                                                                    checked={rememberMe}
                                                                    onChange={setRememberMe}
                                                                />
                                                            </motion.div>

                                                            <motion.div variants={fadeInUp} className="pt-4">
                                                                <Button
                                                                    type="submit"
                                                                    variant="primary"
                                                                    className="w-full"
                                                                >
                                                                    Login
                                                                </Button>
                                                            </motion.div>
                                                        </form>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

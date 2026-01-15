import { useNavigate } from 'react-router';
import { useWishlist } from '../../context/WishlistContext';
import { useCheckout } from '../../context/CheckoutContext';
import { IoCloseOutline, IoTrashOutline, IoCartOutline } from "react-icons/io5";
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function WishlistDrawer() {
    const { isWishlistOpen, toggleWishlistDrawer, wishlistItems, removeFromWishlist } = useWishlist();
    const { addToCart } = useCheckout();
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        toggleWishlistDrawer();
        navigate(path);
    };

    const handleAddToCart = (item: any) => {
        addToCart(item, 1, item.colors[0], item.sizes?.[0]);
        // Optional: Keep drawer open or close it? usually keep open for wishlist -> cart
    };

    return (
        <Transition show={isWishlistOpen} as={Fragment}>
            <Dialog as="div" className="relative z-60" onClose={toggleWishlistDrawer}>
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
                                        <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                            <div className="flex flex-col h-full">
                                                {/* Header */}
                                                <div className="flex items-center justify-between border-b border-shade-10 pb-6 mb-2">
                                                    <h2 className="text-2xl font-big font-bold text-black-100">
                                                        {wishlistItems.length > 0 ? `Your Wishlist (${wishlistItems.length} Items)` : 'Your Wishlist Is Empty'}
                                                    </h2>
                                                    <button
                                                        type="button"
                                                        className="text-gray-400 hover:text-gray-500 -m-2 p-2 outline-none"
                                                        onClick={toggleWishlistDrawer}
                                                    >
                                                        <IoCloseOutline size={24} />
                                                    </button>
                                                </div>

                                                {/* Body */}
                                                <div className="flex-1 overflow-y-auto">
                                                    {wishlistItems.length === 0 ? (
                                                        <div className="flex flex-col items-center justify-center h-full space-y-4">
                                                            <p className="text-shade-06 mb-8 text-center">Save items you love now to buy later.</p>
                                                            <button onClick={() => handleNavigation('/shop')} className="w-full max-w-[200px] py-3 bg-brown text-white rounded font-medium hover:bg-dark-brown hover:scale-105 transition-all duration-300 cursor-pointer">
                                                                Shop Products
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-6 mt-4">
                                                            {wishlistItems.map((item) => (
                                                                <div key={item.id} className="flex gap-4 group border-b border-shade-01 pb-6">
                                                                    <div
                                                                        className="w-24 h-32 bg-shade-01 rounded overflow-hidden shrink-0 cursor-pointer"
                                                                        onClick={() => handleNavigation(`/product/${item.id}`)}
                                                                    >
                                                                        <img
                                                                            src={item.image}
                                                                            alt={item.name}
                                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                                        />
                                                                    </div>
                                                                    <div className="flex-1 flex flex-col justify-between">
                                                                        <div>
                                                                            <div className="flex justify-between items-start mb-1">
                                                                                <h3
                                                                                    className="font-bold text-black-100 cursor-pointer hover:text-brown transition-colors"
                                                                                    onClick={() => handleNavigation(`/product/${item.id}`)}
                                                                                >
                                                                                    {item.name}
                                                                                </h3>
                                                                                <span className="font-bold text-black-100">${item.price.toFixed(2)}</span>
                                                                            </div>
                                                                            <p className="text-sm text-shade-06 capitalize">
                                                                                {item.category} | {item.subcategory}
                                                                            </p>
                                                                        </div>

                                                                        <div className="flex justify-between items-center gap-3">
                                                                            <button
                                                                                onClick={() => handleAddToCart(item)}
                                                                                className="flex-1 flex items-center justify-center gap-2 py-2 bg-brown text-white rounded-md text-sm font-medium hover:bg-dark-brown transition-all duration-300 transform active:scale-95 cursor-pointer"
                                                                            >
                                                                                <IoCartOutline size={18} />
                                                                                Add to Cart
                                                                            </button>
                                                                            <button
                                                                                onClick={() => removeFromWishlist(item.id)}
                                                                                className="p-2 text-shade-04 hover:text-red-500 transition-colors cursor-pointer"
                                                                                title="Remove"
                                                                            >
                                                                                <IoTrashOutline size={20} />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Footer */}
                                                {wishlistItems.length > 0 && (
                                                    <div className="pt-6 border-t border-shade-10 bg-white mt-auto">
                                                        <button
                                                            onClick={() => handleNavigation('/shop')}
                                                            className="w-full py-4 bg-black-100 text-white rounded font-bold uppercase tracking-wider hover:bg-shade-09 transition-all cursor-pointer"
                                                        >
                                                            Continue Shopping
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
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

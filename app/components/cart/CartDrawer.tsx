import { useNavigate } from 'react-router';
import { useCheckout } from '../../context/CheckoutContext';
import { IoCloseOutline, IoTrashOutline, IoAdd, IoRemove } from "react-icons/io5";
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function CartDrawer() {
    const { isCartOpen, toggleCart, cartItems, removeFromCart, updateQuantity, cartTotal, cartCount, discount, deliveryFee, finalTotal } = useCheckout();
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        toggleCart();
        navigate(path);
    };

    return (
        <Transition show={isCartOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[60]" onClose={toggleCart}>
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
                                            {/* Header */}
                                            <div className="flex items-center justify-between border-b border-shade-10 pb-6 mb-2">
                                                <Dialog.Title as="h2" className="text-2xl font-big font-bold text-black-100">
                                                    {cartItems.length > 0 ? `Your Cart (${cartCount} Items)` : 'Your Shopping Bag Is Empty'}
                                                </Dialog.Title>
                                                <button
                                                    type="button"
                                                    className="text-gray-400 hover:text-gray-500 -m-2 p-2 outline-none"
                                                    onClick={toggleCart}
                                                >
                                                    <IoCloseOutline size={24} />
                                                </button>
                                            </div>

                                            {/* Body */}
                                            <div className="flex-1 overflow-y-auto">
                                                {cartItems.length === 0 ? (
                                                    <div className="flex flex-col items-center justify-center h-full space-y-4">
                                                        <p className="text-shade-06 mb-8 text-center">Start adding items you don't want to miss.</p>

                                                        <button onClick={() => handleNavigation('/shop')} className="w-full max-w-[200px] py-3 bg-brown text-white rounded font-medium hover:bg-dark-brown hover:scale-105 transition-all duration-300 cursor-pointer">
                                                            Collection
                                                        </button>
                                                        <button onClick={() => handleNavigation('/shop?sort=newest')} className="w-full max-w-[200px] py-3 bg-brown text-white rounded font-medium hover:bg-dark-brown hover:scale-105 transition-all duration-300 cursor-pointer">
                                                            New In
                                                        </button>
                                                        <button onClick={() => handleNavigation('/shop?filter=best-sellers')} className="w-full max-w-[200px] py-3 bg-white border border-brown text-brown rounded font-medium hover:bg-shade-01 hover:scale-105 transition-all duration-300 cursor-pointer">
                                                            Best Sellers
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-6 mt-4">
                                                        {cartItems.map((item) => (
                                                            <div key={item.id} className="flex gap-4 group">
                                                                <div className="w-24 h-32 bg-shade-01 rounded overflow-hidden shrink-0">
                                                                    <img
                                                                        src={item.product.images?.[0] || item.product.image}
                                                                        alt={item.product.name}
                                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                                    />
                                                                </div>
                                                                <div className="flex-1 flex flex-col justify-between">
                                                                    <div>
                                                                        <div className="flex justify-between items-start mb-1">
                                                                            <h3 className="font-bold text-black-100">{item.product.name}</h3>
                                                                            <span className="font-bold text-black-100">${item.product.price.toFixed(2)}</span>
                                                                        </div>
                                                                        <p className="text-sm text-shade-06 capitalize">
                                                                            Color: {item.selectedColor} {item.selectedSize && `| Size: ${item.selectedSize}`}
                                                                        </p>
                                                                    </div>

                                                                    <div className="flex justify-between items-center">
                                                                        <div className="flex items-center bg-shade-01 rounded px-2 py-1">
                                                                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-brown transition-colors cursor-pointer active:scale-90">
                                                                                <IoRemove size={16} />
                                                                            </button>
                                                                            <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                                                                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-brown transition-colors cursor-pointer active:scale-90">
                                                                                <IoAdd size={16} />
                                                                            </button>
                                                                        </div>

                                                                        <button
                                                                            onClick={() => removeFromCart(item.id)}
                                                                            className="text-red-500 hover:text-red-700 transition-colors cursor-pointer hover:rotate-12 transform duration-200"
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
                                            {cartItems.length > 0 && (
                                                <div className="pt-6 border-t border-shade-10 bg-white mt-auto">
                                                    <h3 className="font-big font-bold text-xl mb-4 text-black-100">Order Summary</h3>

                                                    <div className="space-y-3 mb-6">
                                                        <div className="flex justify-between text-shade-06">
                                                            <span>Subtotal</span>
                                                            <span className="font-medium text-black-100">${cartTotal.toFixed(2)}</span>
                                                        </div>
                                                        <div className="flex justify-between text-shade-06">
                                                            <span>Discount (-20%)</span>
                                                            <span className="font-medium text-red-500">-${discount.toFixed(2)}</span>
                                                        </div>
                                                        <div className="flex justify-between text-shade-06">
                                                            <span>Delivery Fee</span>
                                                            <span className="font-medium text-black-100">${deliveryFee.toFixed(2)}</span>
                                                        </div>
                                                        <div className="h-px bg-shade-10 my-2" />
                                                        <div className="flex justify-between items-center">
                                                            <span className="font-bold text-xl text-black-100">Total</span>
                                                            <span className="font-bold text-xl text-black-100">${finalTotal.toFixed(2)}</span>
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-2 mb-6">
                                                        <div className="relative flex-1">
                                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-shade-05">🏷️</span>
                                                            <input
                                                                type="text"
                                                                placeholder="Add promo code"
                                                                className="w-full pl-10 pr-4 py-3 bg-shade-01 border border-transparent rounded focus:outline-none focus:border-brown transition-colors"
                                                            />
                                                        </div>
                                                        <button className="px-6 py-3 bg-brown text-white rounded font-medium hover:bg-dark-brown active:scale-95 transition-all cursor-pointer">
                                                            Apply
                                                        </button>
                                                    </div>

                                                    <button
                                                        onClick={() => handleNavigation('/checkout')}
                                                        className="w-full py-4 bg-brown text-white rounded font-bold uppercase tracking-wider hover:bg-dark-brown hover:shadow-xl active:scale-95 transition-all shadow-lg shadow-brown/20 cursor-pointer"
                                                    >
                                                        Proceed To Checkout
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition >
    );
}

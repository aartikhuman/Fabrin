import { useCheckout } from '../../context/CheckoutContext';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { IoHeartOutline, IoSearchOutline, IoCloseOutline } from 'react-icons/io5';
import SearchOverlay from './SearchOverlay';

export default function Header() {
    const { toggleCart, cartCount } = useCheckout();
    const { toggleLogin } = useAuth();
    const { toggleWishlistDrawer, wishlistItems } = useWishlist();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const location = useLocation();

    // Close search on route change
    useEffect(() => {
        setIsSearchOpen(false);
    }, [location.pathname]);

    const isActive = (path: string) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    const getLinkClass = (path: string, isCategory = false) => {
        const baseClass = "transition-colors";
        const activeClass = "text-accent-700 font-semibold";
        const inactiveClass = isCategory ? "text-shade-06 hover:text-accent-700" : "text-shade-06 hover:text-accent-700";

        return `${baseClass} ${isActive(path) ? activeClass : inactiveClass}`;
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <a href="/" className="text-4xl font-big font-bold text-black-100">
                        Fabrin
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <a
                            href="/"
                            className={`${isActive('/') ? 'text-black-100 font-semibold' : 'text-shade-06'} hover:text-accent-700 transition-colors font-medium`}
                        >
                            Home
                        </a>
                        <div className="relative group">
                            <button className={`${isActive('/women') || isActive('/men') || isActive('/jewelry') ? 'text-black-100 font-semibold' : 'text-shade-06'} hover:text-accent-700 transition-colors font-medium`}>
                                Category
                            </button>
                            <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <a
                                    href="/women"
                                    className="block px-4 py-3 text-shade-06 hover:bg-shade-01 hover:text-brown transition-colors first:rounded-t-lg"
                                >
                                    Women
                                </a>
                                <a
                                    href="/men"
                                    className="block px-4 py-3 text-shade-06 hover:bg-shade-01 hover:text-brown transition-colors"
                                >
                                    Men
                                </a>
                                <a
                                    href="/jewelry"
                                    className="block px-4 py-3 text-shade-06 hover:bg-shade-01 hover:text-brown transition-colors last:rounded-b-lg"
                                >
                                    Jewelry
                                </a>
                            </div>
                        </div>
                        <a
                            href="/shop"
                            className={`${isActive('/shop') ? 'text-accent-700 font-semibold' : 'text-shade-06'} hover:text-accent-700 transition-colors`}
                        >
                            Shop
                        </a>
                        <a
                            href="/contact"
                            className={`${isActive('/contact') ? 'text-accent-700 font-semibold' : 'text-shade-06'} hover:text-accent-700 transition-colors`}
                        >
                            Contact Us
                        </a>
                    </nav>

                    {/* Right Side - Search & Cart */}
                    <div className="flex items-center gap-6">
                        {/* Search Icon */}
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="text-gray-700 hover:text-accent-700 transition-colors cursor-pointer"
                            aria-label={isSearchOpen ? "Close search" : "Search"}
                        >
                            {isSearchOpen ? (
                                <IoCloseOutline size={28} />
                            ) : (
                                <IoSearchOutline size={24} />
                            )}
                        </button>

                        {/* Wishlist */}
                        <button
                            onClick={toggleWishlistDrawer}
                            className="relative text-gray-700 hover:text-accent-700 transition-colors cursor-pointer"
                            aria-label="Wishlist"
                        >
                            <IoHeartOutline size={26} />
                            {wishlistItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center">
                                    {wishlistItems.length}
                                </span>
                            )}
                        </button>

                        {/* Cart */}
                        <button
                            onClick={toggleCart}
                            className="relative text-gray-700 hover:text-accent-700 transition-colors cursor-pointer"
                            aria-label="Shopping cart"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={toggleLogin}
                            className="hidden md:block text-gray-700 hover:text-accent-700 transition-colors cursor-pointer"
                            aria-label="Profile"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                        </button>
                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-gray-700"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <nav className="md:hidden py-4 border-t animate-fadeIn">
                        <div className="flex flex-col space-y-4">
                            <a
                                href="/"
                                className={`transition-colors font-medium ${isActive('/') ? 'text-accent-700 font-semibold' : 'text-gray-700 hover:text-accent-700'}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </a>
                            <div className="flex flex-col space-y-2 pl-4 border-l-2 border-gray-200">
                                <a
                                    href="/women"
                                    className={`transition-colors ${isActive('/women') ? 'text-accent-700 font-semibold' : 'text-gray-700 hover:text-accent-700'}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Women
                                </a>
                                <a
                                    href="/men"
                                    className={`transition-colors ${isActive('/men') ? 'text-accent-700 font-semibold' : 'text-gray-700 hover:text-accent-700'}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Men
                                </a>
                                <a
                                    href="/jewelry"
                                    className={`transition-colors ${isActive('/jewelry') ? 'text-accent-700 font-semibold' : 'text-gray-700 hover:text-accent-700'}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Jewelry
                                </a>
                            </div>
                            <a
                                href="/shop"
                                className={`transition-colors font-medium ${isActive('/shop') ? 'text-accent-700 font-semibold' : 'text-gray-700 hover:text-accent-700'}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Shop All
                            </a>
                            <a
                                href="/about"
                                className={`transition-colors font-medium ${isActive('/about') ? 'text-accent-700 font-semibold' : 'text-gray-700 hover:text-accent-700'}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                About
                            </a>
                            <a
                                href="/contact"
                                className={`transition-colors font-medium ${isActive('/contact') ? 'text-accent-700 font-semibold' : 'text-gray-700 hover:text-accent-700'}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contact
                            </a>
                        </div>
                    </nav>
                )}
            </div>

            <SearchOverlay
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            />
        </header>
    );
}

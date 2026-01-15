import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { toast } from 'react-toastify';
import type { Product } from '../types/product';

interface WishlistContextType {
    wishlistItems: Product[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
    toggleWishlist: (product: Product) => void;
    isWishlistOpen: boolean;
    toggleWishlistDrawer: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);

    // Load from local storage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedWishlist = localStorage.getItem('fabrin_wishlist');
            if (savedWishlist) {
                try {
                    setWishlistItems(JSON.parse(savedWishlist));
                } catch (e) {
                    console.error('Failed to parse wishlist from localStorage', e);
                }
            }
        }
    }, []);

    // Save to local storage when wishlist changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('fabrin_wishlist', JSON.stringify(wishlistItems));
        }
    }, [wishlistItems]);

    const isInWishlist = (productId: string) => {
        return wishlistItems.some(item => item.id === productId);
    };

    const addToWishlist = (product: Product) => {
        if (!isInWishlist(product.id)) {
            setWishlistItems(prev => [...prev, product]);
            toast.success(`'${product.name}' added to wishlist!`, {
                position: "top-right",
                autoClose: 2000,
                theme: "light",
            });
        }
    };

    const removeFromWishlist = (productId: string) => {
        const itemToRemove = wishlistItems.find(item => item.id === productId);
        if (itemToRemove) {
            setWishlistItems(prev => prev.filter(item => item.id !== productId));
            toast.success(`Successfully removed '${itemToRemove.name}' from wishlist`, {
                position: "top-right",
                autoClose: 2000,
                theme: "light",
            });
        }
    };

    const toggleWishlist = (product: Product) => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const toggleWishlistDrawer = () => setIsWishlistOpen(prev => !prev);

    return (
        <WishlistContext.Provider value={{
            wishlistItems,
            addToWishlist,
            removeFromWishlist,
            isInWishlist,
            toggleWishlist,
            isWishlistOpen,
            toggleWishlistDrawer
        }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
}

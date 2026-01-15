import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { toast } from 'react-toastify';
import type { Product, Color, Size } from '../types/product';

interface ShippingInfo {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
}

interface CheckoutContextType {
    shippingInfo: ShippingInfo;
    setShippingInfo: (info: ShippingInfo) => void;
    paymentMethod: string;
    setPaymentMethod: (method: string) => void;
    orderId: string | null;
    generateOrderId: () => void;
    // Cart
    cartItems: CartItem[];
    isCartOpen: boolean;
    toggleCart: () => void;
    addToCart: (product: Product, quantity: number, color: Color, size?: Size) => void;
    removeFromCart: (itemId: string) => void;
    updateQuantity: (itemId: string, delta: number) => void;
    cartTotal: number;
    cartCount: number;
    discount: number;
    deliveryFee: number;
    finalTotal: number;
}

export interface CartItem {
    id: string; // unique ID for the cart entry (product.id + variants)
    product: Product;
    quantity: number;
    selectedColor: Color;
    selectedSize?: Size;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({ children }: { children: ReactNode }) {
    const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: ''
    });
    const [paymentMethod, setPaymentMethod] = useState<string>('card');
    const [orderId, setOrderId] = useState<string | null>(null);

    // Cart State
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Persistence logic
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('fabrin_cart');
            const savedShipping = localStorage.getItem('fabrin_shipping');
            const savedPayment = localStorage.getItem('fabrin_payment');

            if (savedCart) setCartItems(JSON.parse(savedCart));
            if (savedShipping) setShippingInfo(JSON.parse(savedShipping));
            if (savedPayment) setPaymentMethod(savedPayment);
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('fabrin_cart', JSON.stringify(cartItems));
        }
    }, [cartItems]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('fabrin_shipping', JSON.stringify(shippingInfo));
        }
    }, [shippingInfo]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('fabrin_payment', paymentMethod);
        }
    }, [paymentMethod]);

    const toggleCart = () => setIsCartOpen(prev => !prev);

    const addToCart = (product: Product, quantity: number, color: Color, size?: Size) => {
        setCartItems(prev => {
            const existingItemIndex = prev.findIndex(item =>
                item.product.id === product.id &&
                item.selectedColor === color &&
                item.selectedSize === size
            );

            if (existingItemIndex > -1) {
                const newItems = [...prev];
                newItems[existingItemIndex].quantity += quantity;
                return newItems;
            }

            return [...prev, {
                id: `${product.id}-${color}-${size || 'nosize'}`,
                product,
                quantity,
                selectedColor: color,
                selectedSize: size
            }];
        });

        toast.success(`Added ${product.name} to cart!`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            toastId: `add-${product.id}-${Date.now()}`
        });
    };

    const removeFromCart = (itemId: string) => {
        setCartItems(prev => {
            const itemToRemove = prev.find(item => item.id === itemId);
            if (itemToRemove) {
                toast.success(`Removed ${itemToRemove.product.name} from cart`, {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "light",
                    toastId: `remove-${itemId}-${Date.now()}`
                });
            }
            return prev.filter(item => item.id !== itemId)
        });
    };

    const updateQuantity = (itemId: string, delta: number) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === itemId) {
                const newQuantity = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const cartTotal = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    // Centralized Calculations
    const discount = cartTotal * 0.20; // 20% Mock Discount
    const deliveryFee = 15;
    const finalTotal = cartTotal - discount + deliveryFee;

    const generateOrderId = () => {
        const id = '#' + Math.floor(Math.random() * 10000000000).toString();
        setOrderId(id);
    };

    return (
        <CheckoutContext.Provider value={{
            shippingInfo,
            setShippingInfo,
            paymentMethod,
            setPaymentMethod,
            orderId,
            generateOrderId,
            cartItems,
            isCartOpen,
            toggleCart,
            addToCart,
            removeFromCart,
            updateQuantity,
            cartTotal,
            cartCount,
            discount,
            deliveryFee,
            finalTotal
        }}>
            {children}
        </CheckoutContext.Provider>
    );
}

export function useCheckout() {
    const context = useContext(CheckoutContext);
    if (context === undefined) {
        throw new Error('useCheckout must be used within a CheckoutProvider');
    }
    return context;
}

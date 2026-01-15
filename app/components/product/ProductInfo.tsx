import { useState, useEffect } from 'react';
import { IoStar, IoCartOutline } from "react-icons/io5";
import type { Product, Color, Size } from '../../types/product';
import Button from '../ui/Button';
import { FaRegStar } from 'react-icons/fa';

interface ProductInfoProps {
    product: Product;
}

import { useNavigate } from 'react-router';
import { useCheckout } from '../../context/CheckoutContext';

export default function ProductInfo({ product }: ProductInfoProps) {
    const { addToCart } = useCheckout();
    const navigate = useNavigate();
    const [selectedColor, setSelectedColor] = useState<Color>(product.colors[0]);
    const [selectedSize, setSelectedSize] = useState<Size | undefined>(product.sizes?.[0]);
    const [quantity, setQuantity] = useState(1);

    // Reset state when product changes
    useEffect(() => {
        setSelectedColor(product.colors[0]);
        setSelectedSize(product.sizes?.[0]);
        setQuantity(1);
    }, [product.id]);

    const increment = () => setQuantity(q => q + 1);
    const decrement = () => setQuantity(q => Math.max(1, q - 1));

    const colorMap: Record<string, string> = {
        beige: '#D4B896', tan: '#D2B48C', cream: '#FFFDD0', blue: '#A3C1DA',
        gray: '#B0B0B0', black: '#000000', white: '#FFFFFF', brown: '#A86C51',
        green: '#4A7856', red: '#C64D4D', yellow: '#F2C94C', gold: '#FFD700'
    };

    return (
        <div>

            <div className="flex flex-col h-full">
                <span className="text-shade-06 text-base mb-3 capitalize">{product.category} Collection</span>
                <h1 className="text-5xl font-bold font-big text-black-100 mb-5">{product.name}</h1>

                <div className="flex items-center justify-between mb-6 pb-6 border-b border-shade-10">
                    <div className="flex items-center gap-4">
                        <span className="text-2xl font-medium font-inter text-black-100">
                            ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                            <span className="text-xl text-shade-06 line-through font-inter">
                                ${product.originalPrice.toFixed(2)}
                            </span>
                        )}
                    </div>
                    {/* <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-shade-01 px-3 py-1 rounded">
                        <IoStar className="text-yellow-100" />
                        <span className="font-semibold">{product.rating}</span>
                    </div>
                    {product.reviewCount && (
                        <div className="bg-shade-01 px-3 py-1 rounded text-shade-06">
                            {product.reviewCount} Reviews
                        </div>
                    )}
                </div> */}
                    <div className='flex items-center gap-2'>
                        <div className='bg-light-brown text-black-100 flex items-center gap-2 px-3 py-1'><FaRegStar /><span className="font-medium text-sm">{product.rating}</span></div>
                        <div className='bg-light-brown text-black-100 flex items-center gap-2 px-3 py-1'><FaRegStar /><span className="font-medium text-sm">67 Reviews</span></div>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-bold font-big text-black-100 mb-2">Description:</h3>
                    <p className="text-shade-06 leading-relaxed">
                        {product.description}If it doesn't fit your expectations, you're covered — hassle-free return and support available. Easy to clean and maintain, ensuring it stays looking new even with regular use.
                        <button className="text-black-100 font-semibold ml-1 hover:underline cursor-pointer">See More...</button>
                    </p>
                </div>
                <div className='flex items-center justify-between'>
                    {/* Color Selector */}
                    <div className="mb-6">
                        <h3 className="text-lg font-bold font-big text-black-100 mb-3">Color</h3>
                        <div className="flex items-center gap-3">
                            {product.colors.map(color => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${selectedColor === color
                                        ? 'border-brown ring-1 ring-brown ring-offset-2'
                                        : 'border-[#ececec] hover:scale-110'
                                        }`}
                                    style={{ backgroundColor: colorMap[color] || color }}
                                    title={color}
                                />
                            ))}
                        </div>
                    </div>
                    {/* Quantity */}
                    <div className="flex items-center bg-shade-01 rounded-lg px-2">
                        <button onClick={decrement} className="w-10 h-10 flex items-center justify-center text-lg cursor-pointer hover:text-brown transition-colors">
                            -
                        </button>
                        <span className="w-8 text-center font-semibold">{quantity}</span>
                        <button onClick={increment} className="w-10 h-10 flex items-center justify-center text-lg cursor-pointer hover:text-brown transition-colors">
                            +
                        </button>
                    </div>
                </div>

                {/* Size Selector */}
                {product.sizes && (
                    <div className="mb-20">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-lg font-bold font-big text-black-100">Size</h3>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {product.sizes.map(size => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-4 py-3 text-sm transition-colors cursor-pointer min-w-12 ${selectedSize === size
                                        ? 'bg-brown text-white font-medium'
                                        : 'bg-shade-01 text-shade-06 hover:bg-shade-02 hover:text-black-100'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Actions */}

                <div className="flex w-full items-center gap-4">
                    <Button
                        variant="outline"
                        onClick={() => addToCart(product, quantity, selectedColor, selectedSize)}
                        className="max-w-[200px] w-full"
                    >
                        Add To Cart
                    </Button>
                    <Button
                        onClick={() => {
                            addToCart(product, quantity, selectedColor, selectedSize);
                            navigate('/checkout');
                        }}
                        className="max-w-[200px] w-full"
                    >
                        Buy Now
                    </Button>
                </div>

            </div>

        </div>
    );
}

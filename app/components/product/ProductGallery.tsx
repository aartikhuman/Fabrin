import { useState, useEffect } from 'react';
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useWishlist } from '../../context/WishlistContext';
import type { Product } from '../../types/product';

interface ProductGalleryProps {
    images: string[];
    product: Product;
}

export default function ProductGallery({ images, product }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(images[0]);

    // Reset selected image when images prop changes
    useEffect(() => {
        setSelectedImage(images[0]);
    }, [images]);

    const { toggleWishlist, isInWishlist } = useWishlist();
    const isWishlisted = isInWishlist(product.id);

    return (
        <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative bg-shade-01 overflow-hidden group">
                <img
                    src={selectedImage}
                    alt={product.name}
                    width={712}
                    height={936}
                    fetchPriority="high"
                    loading="eager"
                    decoding="sync"
                    className="w-full aspect-4/5 md:h-[700px] object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <button
                    onClick={() => toggleWishlist(product)}
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    className={`absolute top-4 right-4 p-2 rounded-full transition-all shadow-sm cursor-pointer ${isWishlisted ? 'bg-white text-red-500 scale-110' : 'bg-white/80 hover:bg-white text-black-100'}`}
                >
                    {isWishlisted ? <IoHeart size={24} /> : <IoHeartOutline size={24} />}
                </button>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-5 gap-4">
                {images.map((img, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(img)}
                        aria-label={`View thumbnail ${index + 1}`}
                        className={`overflow-hidden transition-all aspect-square border-2 ${selectedImage === img ? 'border-brown opacity-100' : 'border-transparent opacity-70 hover:opacity-100'
                            }`}
                    >
                        <img
                            src={img}
                            alt={`${product.name} thumbnail ${index + 1}`}
                            width={155}
                            height={130}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover aspect-square"
                        />
                    </button>
                ))}
            </div>

        </div>
    );
}

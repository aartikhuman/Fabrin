import { Link, useNavigate } from 'react-router';
import { FaStar } from "react-icons/fa";
import { IoHeart, IoHeartOutline, IoBagAddOutline, IoEyeOutline } from 'react-icons/io5';
import { useWishlist } from '../../context/WishlistContext';
import { useCheckout } from '../../context/CheckoutContext';
import type { Product } from '../../types/product';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const navigate = useNavigate();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const { addToCart } = useCheckout();
    const isWishlisted = isInWishlist(product.id);

    return (
        <Link to={`/product/${product.id}`} className="block group cursor-pointer">
            <div className="h-[380px] relative overflow-hidden group-hover:shadow-sm transition-all duration-500">
                {product.discount && (
                    <span className="absolute top-4 left-4 bg-brown text-white px-4 py-1 rounded-full text-base font-inter z-10 transition-transform duration-300 group-hover:scale-110">
                        {product.discount}%
                    </span>
                )}
                <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover h-full w-full group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

                {/* Action buttons with staggered animation */}
                <div className="absolute right-4 top-4 flex flex-col gap-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 z-20">
                    <button
                        title="Quick View"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(`/product/${product.id}`); }}
                        className="w-12 h-12 rounded-full bg-brown text-white flex items-center justify-center cursor-pointer hover:bg-dark-brown hover:scale-110 transition-all duration-300 shadow-lg transform group-hover:animate-[slideIn_0.3s_ease-out]"
                    >
                        <IoEyeOutline size={22} />
                    </button>
                    <button
                        title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); }}
                        className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 shadow-lg transform group-hover:animate-[slideIn_0.4s_ease-out] ${isWishlisted ? 'bg-white text-red-500 scale-110' : 'bg-brown text-white hover:bg-dark-brown hover:scale-110'}`}
                    >
                        {isWishlisted ? <IoHeart size={22} /> : <IoHeartOutline size={22} />}
                    </button>
                    <button
                        title="Add to Cart"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product, 1, product.colors[0], product.sizes?.[0]); }}
                        className="w-12 h-12 rounded-full bg-brown text-white flex items-center justify-center cursor-pointer hover:bg-dark-brown hover:scale-110 transition-all duration-300 shadow-lg transform group-hover:animate-[slideIn_0.5s_ease-out]"
                    >
                        <IoBagAddOutline size={22} />
                    </button>
                </div>

                {/* Shop Now Button with Premium Look */}
                {/* <div className="absolute bottom-0 left-0 right-0 translate-y-[120%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20">
                    <button className="w-full bg-dark-brown text-white uppercase tracking-widest text-sm font-bold py-4 shadow-xl hover:bg-black-100 hover:text-white transition-all duration-300 transform cursor-pointer flex items-center justify-center gap-2">
                        Shop Now
                    </button>
                </div> */}
            </div>
            <div className='flex justify-between items-center mt-2 transition-all duration-300'>
                <h4 className='font-big text-2xl font-medium group-hover:text-brown transition-colors duration-300'>{product.name}</h4>
                <span className='bg-shade-10 gap-1.5 px-2 py-1 text-black-100 font-medium flex justify-center items-center w-fit rounded-md transition-all duration-300 group-hover:bg-brown group-hover:text-white'>
                    <FaStar className='text-yellow-100 transition-transform duration-300 group-hover:scale-110' />
                    {product.rating}
                </span>
            </div>
            <p className='text-shade-08 text-base font-inter transition-colors duration-300 group-hover:text-shade-06'>
                ${product.price.toFixed(2)}
                {product.originalPrice && (
                    <span className='text-shade-05 line-through ml-2'>${product.originalPrice.toFixed(2)}</span>
                )}
            </p>
        </Link>
    );
}

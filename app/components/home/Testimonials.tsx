import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoStar, IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper';

const testimonialData = [
    {
        id: 1,
        name: "Jane Smith",
        role: "Fashion Designer",
        image: "/assets/images/products/women/women15.png",
        quote: "I was really impressed with the quality and design. It was exactly what I was looking for, great and keep things effortless for everyone.",
        rating: 5
    },
    {
        id: 2,
        name: "Sarah Johnson",
        role: "Creative Director",
        image: "/assets/images/products/women/women12.png",
        quote: "The attention to detail in every stitch is remarkable. Fabrin has become my go-to for minimalist luxury that actually feels sustainable.",
        rating: 5
    },
    {
        id: 3,
        name: "Elena Rodriguez",
        role: "Lifestyle Blogger",
        image: "/assets/images/products/women/women10.png",
        quote: "Finally a brand that understands the balance between style and comfort. The pieces are versatile enough to take me from meetings to dinner.",
        rating: 5
    },
    {
        id: 4,
        name: "Maria Garcia",
        role: "Stylist",
        image: "/assets/images/products/women/women4.png",
        quote: "The fabric quality is exactly what I expected from a premium brand. It feels amazing on the skin and the fit is perfect.",
        rating: 5
    },
    {
        id: 5,
        name: "Sophia Miller",
        role: "Creative Stylist",
        image: "/assets/images/products/women/women7.png",
        quote: "Managing a wardrobe for high-profile clients requires pieces that are both timeless and modern. Fabrin delivers on both fronts consistently.",
        rating: 5
    },
    {
        id: 6,
        name: "Isabella Martinez",
        role: "Brand Consultant",
        image: "/assets/images/products/women/women14.png",
        quote: "The aesthetic of this brand is unparalleled in the current market. Every collection feels like a curated art gallery of wearable fashion.",
        rating: 5
    }
];

export default function Testimonials() {
    const swiperRef = useRef<SwiperClass | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);


    return (
        <section className="py-20 bg-white overflow-hidden relative">
            <div className="container mx-auto px-4">
                <h2 className="text-[40px] md:text-[64px] font-bold font-big leading-tight text-center mb-16">
                    What People Say
                </h2>

                <div className="relative">
                    {mounted && (
                        <Swiper
                            modules={[Autoplay, Navigation, Pagination]}
                            spaceBetween={30}
                            slidesPerView={1}
                            autoplay={{ delay: 5000, disableOnInteraction: false }}
                            onSwiper={(swiper) => (swiperRef.current = swiper)}
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                            className="testimonial-swiper pb-12!"
                        >
                            {testimonialData.map((item, index) => (
                                <SwiperSlide key={item.id} className="h-auto">
                                    <motion.div
                                        initial={false}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className={`p-8 lg:p-10 rounded-sm relative group hover:shadow-xl transition-all duration-500 border border-shade-01 h-full flex flex-col bg-white cursor-pointer`}
                                    >
                                        {/* Decorative Quote Mark */}
                                        <div className="absolute top-4 right-4 text-brown/10 group-hover:text-brown/20 transition-colors duration-500">
                                            <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017V4H21.017V15C21.017 18.3137 18.3307 21 15.017 21H14.017ZM3.017 21L3.017 18C3.017 16.8954 3.91243 16 5.017 16H8.017C8.56928 16 9.017 15.5523 9.017 15V9C9.017 8.44772 8.56928 8 8.017 8H4.017C3.46472 8 3.017 8.44772 3.017 9V12C3.017 12.5523 2.56928 13 2.017 13H0.017V4H10.017V15C10.017 18.3137 7.33072 21 4.017 21H3.017Z" />
                                            </svg>
                                        </div>

                                        <div className="flex text-yellow-100 mb-6 gap-1">
                                            {[...Array(item.rating)].map((_, i) => (
                                                <IoStar key={i} size={16} />
                                            ))}
                                        </div>

                                        <blockquote className="text-lg lg:text-base font-inter text-shade-08 mb-10 leading-relaxed grow">
                                            "{item.quote}"
                                        </blockquote>

                                        <div className="flex items-center gap-4 mt-auto">
                                            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-brown/20 shrink-0">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    width={56}
                                                    height={56}
                                                    loading="lazy"
                                                    decoding="async"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <span className="block text-xl font-bold font-big uppercase tracking-wider text-black-100">
                                                    {item.name}
                                                </span>
                                                <p className="text-brown text-xs font-inter uppercase tracking-widest mt-0.5">
                                                    {item.role}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>
                {/* Minimalist Navigation */}
                <div className="flex justify-center gap-3">
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="w-12 h-12 rounded-full border border-shade-02 flex items-center justify-center text-shade-04 hover:border-brown hover:bg-brown hover:text-white transition-all duration-300"
                    >
                        <IoChevronBack size={20} />
                    </button>
                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="w-12 h-12 rounded-full border border-shade-02 flex items-center justify-center text-shade-04 hover:border-brown hover:bg-brown hover:text-white transition-all duration-300"
                    >
                        <IoChevronForward size={20} />
                    </button>
                </div>
            </div>
            <img src="/assets/images/trends/vector2.png" alt="vector" className='absolute bottom-0 right-0 opacity-28' />
        </section>
    );
}

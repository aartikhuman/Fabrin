import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Controller, Autoplay, Pagination } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const trendData = [
    // ... (lines 8-45 omitted for brevity, but I will keep them)
    {
        id: 'trend-1',
        title: "Modern Minimalist",
        productName: "Silk-Touch Formal Blouse",
        price: 44.00,
        image: "/assets/images/trends/slide.jpg",
        lifestyleImage: "/assets/images/trends/slide.jpg",
        link: "/product/w2"
    },
    {
        id: 'trend-2',
        title: "Urban Utility",
        productName: "Tailored Linen Blazer Set",
        price: 54.00,
        image: "/assets/images/products/women/women3.png",
        lifestyleImage: "/assets/images/products/women/women3.png",
        link: "/product/w3"
    },
    {
        id: 'trend-3',
        title: "Evening Elegance",
        productName: "Modern Layered Trench Set",
        price: 32.00,
        image: "/assets/images/products/women/women7.png",
        lifestyleImage: "/assets/images/products/women/women7.png",
        link: "/product/w7"
    },
    {
        id: 'trend-4',
        title: "Casual Chic",
        productName: "Ribbed Cotton Essential Tee",
        price: 32.00,
        image: "/assets/images/products/women/women1.png",
        lifestyleImage: "/assets/images/products/women/women1.png",
        link: "/product/w1"
    }
];

export default function SeasonsTrends() {
    const [firstSwiper, setFirstSwiper] = useState<SwiperClass | null>(null);
    const [secondSwiper, setSecondSwiper] = useState<SwiperClass | null>(null);

    return (
        <section className="py-20 overflow-hidden relative bg-[#7F4227]/6">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row container mx-auto px-4"
            >
                {/* Left Side: Large Editorial Slider (70%) */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden group"
                >
                    <Swiper
                        modules={[Controller, Autoplay, Pagination]}
                        onSwiper={setFirstSwiper}
                        controller={{ control: secondSwiper }}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        pagination={{
                            clickable: true,
                            el: '.custom-pagination-dots',
                        }}
                        className="h-full w-full"
                    >
                        {trendData.map((item, index) => (
                            <SwiperSlide key={`editorial-${index}`}>
                                <div className="relative h-full w-full">
                                    <img
                                        src={item.lifestyleImage}
                                        alt={item.title}
                                        className="w-[620px] h-[751px] object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Center Overlay Text */}
                    <div className="absolute right-[100px] top-1/2 pointer-events-none z-20 flex flex-col items-center justify-center text-center">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-[40px] md:text-[64px] font-bold font-big leading-none text-black-100 drop-shadow-lg mb-4">
                                Season's Trends
                            </h2>
                            <div className="custom-pagination-dots flex justify-center gap-3 pointer-events-auto"></div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Right Side: Product Brief (30%) */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="w-full md:w-[30%] relative flex flex-col justify-center px-8 md:px-12 py-16 md:py-0"
                >
                    {/* Subtle Grid Pattern Overlay */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }}>
                    </div>

                    <div className="relative z-10">
                        <Swiper
                            modules={[Controller]}
                            onSwiper={setSecondSwiper}
                            controller={{ control: firstSwiper }}
                            className="w-full"
                            allowTouchMove={false}
                        >
                            {trendData.map((item, index) => (
                                <SwiperSlide key={`info-${index}`}>
                                    <div className="space-y-6">
                                        <div className="aspect-4/5 w-full overflow-hidden">
                                            <img
                                                src={item.image}
                                                alt={item.productName}
                                                className="w-full h-full object-cover scale-110"
                                            />
                                        </div>
                                        <div className="space-y-2 mt-8">
                                            <h4 className="text-sm uppercase tracking-[0.2em] font-inter text-shade-04 font-meduim">{item.title}</h4>
                                            <h3 className="text-3xl font-bold font-big text-black-100">{item.productName}</h3>
                                            <p className="text-xl font-inter text-brown font-medium">${item.price.toFixed(2)}</p>
                                        </div>
                                        <div className="pt-4">
                                            <Link
                                                to={item.link}
                                                className="inline-block border-b border-brown text-brown uppercase text-xs tracking-widest font-bold pb-1 hover:text-black-100 hover:border-black-100 transition-colors"
                                            >
                                                Discover Review
                                            </Link>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </motion.div>
            </motion.div>
            <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 0.28, scale: 1 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
                src="/assets/images/trends/vector2.png"
                alt="vector"
                className='absolute bottom-0 right-0'
            />
        </section>
    );
}

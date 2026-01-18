import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

const sliderData = [
    {
        id: 1,
        image: '/assets/images/home/banner1.png',
        alt: 'Timeless Fashion Collection'
    },
    {
        id: 2,
        image: '/assets/images/home/banner2.png',
        alt: 'Curated Lifestyle Selection'
    },
    {
        id: 3,
        image: '/assets/images/home/banner3.png',
        alt: 'Refined Elegance'
    }
];

export default function Hero() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };


    return (
        <section className="bg-white overflow-hidden pt-10 pb-0 relative">
            <style>
                {`
                .hero-slider .swiper-pagination {
                    bottom: 40px !important;
                    display: flex;
                    justify-content: center;
                    gap: 12px;
                    z-index: 20;
                }
                .hero-slider .swiper-pagination-bullet {
                    width: 40px;
                    height: 2px;
                    background: #000;
                    border-radius: 0;
                    opacity: 0.2;
                    transition: all 0.4s ease;
                    margin: 0 !important;
                }
                .hero-slider .swiper-pagination-bullet-active {
                    opacity: 1;
                    width: 60px;
                }
                `}
            </style>

            <div className='container mx-auto px-4'>
                <motion.div
                    initial={false}
                    animate="visible"
                    variants={containerVariants}
                    className="flex flex-col"
                >
                    <h1 className="text-[5.8vw] sm:text-[40px] md:text-[49px] lg:text-[65px] xl:text-[80px] 2xl:text-[102px] font-bold font-big flex flex-wrap items-center gap-x-2 md:gap-x-8 leading-[1.2] md:leading-[1.1] tracking-tight pb-2">
                        <span>Timeless Fashion for Refined LUX</span>
                        <motion.img
                            initial={false}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
                            src='/assets/images/home/badge1.png'
                            alt='Fabrin quality badge'
                            className="object-contain w-[60px] sm:w-[120px] lg:w-[200px] xl:w-[266px] h-auto"
                        />
                    </h1>
                    <h2 className="text-[5.8vw] sm:text-[40px] md:text-[49px] lg:text-[65px] xl:text-[80px] 2xl:text-[102px] font-bold font-big text-end leading-[1.2] md:leading-[1.1] tracking-tight">
                        Curated Lifestyle
                    </h2>
                </motion.div>
            </div>

            <motion.div
                initial={false}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
                className="w-full mt-[-20px] sm:mt-[-47px] lg:mt-[-72px] xl:mt-[-100px] 2xl:mt-[-120px] relative z-0"
            >
                {mounted && (
                    <Swiper
                        modules={[Autoplay, Pagination, EffectFade]}
                        effect="fade"
                        speed={1500}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        loop={true}
                        className="hero-slider w-full"
                    >
                        {sliderData.map((slide, index) => (
                            <SwiperSlide key={slide.id}>
                                <div className="relative overflow-hidden w-full">
                                    <motion.img
                                        initial={false}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 6, ease: "linear" }}
                                        src={slide.image}
                                        alt={slide.alt}
                                        className='w-full h-full object-cover'
                                        width={1920}
                                        height={1080}
                                        loading={index === 0 ? "eager" : "lazy"}
                                        {...(index === 0 ? { fetchPriority: "high" } : {})}
                                    />
                                    {/* Optional Overlay for better text readability if needed later */}
                                    <div className="absolute inset-0 pointer-events-none"></div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </motion.div>
        </section>
    );
}

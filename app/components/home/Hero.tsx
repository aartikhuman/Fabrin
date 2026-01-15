import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

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

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
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
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="flex flex-col"
                >
                    <motion.h1
                        variants={itemVariants}
                        className="text-[48px] md:text-[5.3vw] font-bold font-big flex flex-wrap items-center gap-x-4 md:gap-x-8 leading-[1.1] md:leading-[124px] tracking-tight pb-2"
                    >
                        <span>Timeless Fashion for Refined</span>
                        <motion.img
                            initial={{ scale: 0, rotate: -15 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
                            src='/assets/images/home/badge1.png'
                            alt='badge'
                            className="h-[40px] md:h-[80px] object-contain"
                        />
                    </motion.h1>
                    <motion.h1
                        variants={itemVariants}
                        className="text-[48px] md:text-[5.3vw] font-bold font-big text-end leading-[1.1] md:leading-[124px] tracking-tight"
                    >
                        Curated Lifestyle
                    </motion.h1>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
                className="w-full mt-4 md:mt-[-130px] relative z-0"
            >
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
                    {sliderData.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <div className="relative overflow-hidden w-full h-[60vh] md:h-[80vh] lg:h-auto">
                                <motion.img
                                    initial={{ scale: 1.1 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 6, ease: "linear" }}
                                    src={slide.image}
                                    alt={slide.alt}
                                    className='w-full h-full object-cover'
                                />
                                {/* Optional Overlay for better text readability if needed later */}
                                <div className="absolute inset-0 pointer-events-none"></div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.div>
        </section>
    );
}

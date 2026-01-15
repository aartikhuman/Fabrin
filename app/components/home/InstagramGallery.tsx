import { motion } from 'framer-motion';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

export default function InstagramGallery() {
    const images = [
        '/assets/images/gallery/gallery1.png',
        '/assets/images/gallery/gallery2.png',
        '/assets/images/gallery/gallery3.png',
        '/assets/images/gallery/gallery4.png',
        '/assets/images/gallery/gallery5.png'
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 }
    };

    return (
        <section className="bg-white">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 lg:grid-cols-5"
            >
                {images.map((img, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        className="aspect-square overflow-hidden relative group cursor-pointer"
                    >
                        {/* Background Image */}
                        <img
                            src={img}
                            alt={`Gallery ${index}`}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-end p-4">

                            {/* Animated Text */}
                            <h4 className="text-white text-3xl font-big font-bold text-center leading-tight transition-all duration-700 transform translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                                Style That Fit You
                            </h4>

                            {/* Creative Arrow Button */}
                            <div className="mt-6 relative w-14 h-14 transition-all duration-700 transform translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 delay-100 flex items-center justify-center">
                                {/* Offset Outline Circle */}
                                <div className="absolute inset-0 translate-x-4 rounded-full border-2 border-brown opacity-50" />

                                {/* Solid background circle with arrow */}
                                <div className="relative w-full h-full rounded-full bg-brown flex items-center justify-center text-white shadow-lg">
                                    <HiOutlineArrowNarrowRight size={28} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}

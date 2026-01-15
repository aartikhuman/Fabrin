import { motion } from 'framer-motion';

export default function StyleDescription() {
    const textVariants: any = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <section className="py-20 md:py-32 bg-white">
            <div className="container mx-auto px-4 text-center">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={textVariants}
                    className=""
                >
                    <h2 className="text-[32px] md:text-[64px] font-bold font-big text-black-100">
                        Simple, quality fashion
                        <img src="/assets/images/categories/badge2.png" alt="" className="inline-block h-10 md:h-16 mx-2 md:mx-4 translate-y-[-2px] md:translate-y-[-4px]" />
                        designed to <br /> looking
                        <img src="/assets/images/categories/badge3.png" alt="" className="inline-block h-10 md:h-16 mx-2 md:mx-4 translate-y-[-2px] md:translate-y-[-4px]" />
                        great and keep things effortless <br /> for everyone everywhere
                        <img src="/assets/images/categories/badge4.png" alt="" className="inline-block h-10 md:h-16 mx-2 md:mx-4 translate-y-[-2px] md:translate-y-[-4px]" />
                        wherever you go.
                    </h2>
                </motion.div>
            </div>
        </section>
    );
}

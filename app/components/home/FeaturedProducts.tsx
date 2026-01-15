import Button from '../ui/Button';

export default function FeaturedProducts() {

    return (
        // <section className="py-16 md:py-20 bg-white">
        //     <div className="container mx-auto px-4">
        //         {/* Section Header */}
        //         <div className="text-center mb-12 animate-fadeIn">
        //             <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-accent-900 mb-4">
        //                 Featured Collection
        //             </h2>
        //             <p className="text-gray-600 text-lg max-w-2xl mx-auto">
        //                 Discover our handpicked selection of timeless pieces
        //             </p>
        //         </div>

        //         {/* Products Grid */}
        //         <div className="mb-12">
        //             <ProductGrid products={featuredProducts} columns={4} />
        //         </div>

        //         {/* View All Button */}
        //         <div className="text-center">
        //             <Button to="/shop" variant="outline" size="lg">
        //                 View All Products
        //             </Button>
        //         </div>
        //     </div>
        // </section>
        <section className='container mx-auto px-4'>
            <div className='my-20'>
                <h2 className="text-[64px] font-bold font-big flex justify-center gap-4 items-center leading-[96px] mb-2">Simple, quality fashion <img src='/assets/images/categories/badge2.png' alt='badge' /> designed to</h2>
                <h2 className="text-[64px] font-bold font-big flex justify-center gap-4 items-center leading-[96px] mb-2">looking <img src='/assets/images/categories/badge3.png' alt='badge' /> great and keep things effortless</h2>
                <h2 className="text-[64px] font-bold font-big flex justify-center gap-4 items-center leading-[96px] mb-2">for everyone everywhere <img src='/assets/images/categories/badge4.png' alt='badge' /> wherever you go.</h2>
            </div>
            <div className='py-20 grid grid-cols-3 gap-6'>
                <div>
                    <img src='/assets/images/categories/product-1.png' alt='product' className='w-full' />
                    <div className='mt-2'>
                        <h4 className='text-black-100 text-[28px] font-big font-bold leading-[48px] mb-4'>Fashion Collection</h4>
                        <Button variant='outline' size='md' to='/shop'>Shop Now</Button>
                    </div>
                </div>
                <div>
                    <img src='/assets/images/categories/product-2.png' alt='product' className='w-full' />
                </div>
                <div>
                    <img src='/assets/images/categories/product-3.png' alt='product' className='w-full' />
                    <div className='mt-2'>
                        <h4 className='text-black-100 text-[28px] font-big font-bold leading-[48px] mb-4'>Jewelry Collection</h4>
                        <Button variant='outline' size='md' to='/shop'>Shop Now</Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

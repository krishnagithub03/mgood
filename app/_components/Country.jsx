// 'use client';
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import InfiniteScroll from '@/components/InfiniteScroll/InfiniteScroll';
// import { InfiniteMovingImages } from '@/components/ui/infinite-moving-images';

// // const items = [
// //     { content: <img src="./Flag1.jpg" alt="Item 2" className="w-full h-auto object-cover" /> },
// //     { content: <img src="../Flag4.jpg" alt="Item 4" className="w-full h-auto object-cover" /> },
// //     { content: <img src="./Flag2.jpg" alt="Item 6" className="w-full h-auto object-cover" /> },
// //     { content: <img src="./Flag7.jpg" alt="Item 8" className="w-full h-auto object-cover" /> },
// //     { content: <img src="./Flag5.jpg" alt="Item 10" className="w-full h-auto object-cover" /> },
// //     { content: <img src="../Flag6.jpg" alt="Item 12" className="w-full h-auto object-cover" /> },
// //     { content: <img src="./Flag3.jpg" alt="Item 14" className="w-full h-auto object-cover" /> },
// // ];
// const images = [
//     {
//         src: "/Flag1.jpg",
//         alt: "Beautiful landscape",
//         width: 250,
//         height: 100,
//     },
//     {
//         src: "/Flag4.jpg",
//         alt: "City skyline",
//         width: 250,
//         height: 100,
//     },
//     {
//         src: "/Flag2.jpg",
//         alt: "Ocean waves",
//         width: 250,
//         height: 100,
//     },
//     {
//         src: "/Flag7.jpg",
//         alt: "Ocean waves",
//         width: 250,
//         height: 100,
//     },
//     {
//         src: "/Flag5.jpg",
//         alt: "Ocean waves",
//         width: 250,
//         height: 100,
//     },
//     {
//         src: "/Flag6.jpg",
//         alt: "Ocean waves",
//         width: 250,
//         height: 100,
//     },
//     {
//         src: "/Flag3.jpg",
//         alt: "Ocean waves",
//         width: 250,
//         height: 100,
//     },
// ];
// const Country = () => {
//     return (
//         <div>
//             <section className="min-h-[90vh] sm:min-h-[90%] mt-6 sm:mt-10 flex items-center overflow-hidden">
//                 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
//                         {/* Text Content */}
//                         <motion.div
//                             initial={{ opacity: 0, x: -50 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.8, ease: "easeOut" }}
//                             className="space-y-6 sm:space-y-8 text-center lg:text-left"
//                         >
//                             <div className="space-y-3 sm:space-y-4">
//                                 <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
//                                     MGood Goes Global
//                                     <span className="text-[#FF9933] block">9+ Countries</span>
//                                 </h1>
//                                 <p className="text-lg sm:text-xl text-[#138808] leading-relaxed">
//                                     Via our networking partner : Healthtrip
//                                 </p>
//                             </div>
//                         </motion.div>

//                         {/* InfiniteScroll Container */}
//                         <div className='h-[40vh] sm:h-[45vh] lg:h-[50vh] relative mt-8 lg:mt-0'>
//                             <InfiniteMovingImages
//                                 images={images}
//                                 direction="left"
//                                 speed="fast"
//                                 pauseOnHover={true}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     )
// }

// export default Country;
'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import InfiniteScroll from '@/components/InfiniteScroll/InfiniteScroll';
import { InfiniteMovingImages } from '@/components/ui/infinite-moving-images';

const images = [
    {
        src: "/Flag1.jpg",
        alt: "Beautiful landscape",
        width: 250,
        height: 100,
    },
    {
        src: "/Flag4.jpg",
        alt: "City skyline",
        width: 250,
        height: 100,
    },
    {
        src: "/Flag2.jpg",
        alt: "Ocean waves",
        width: 250,
        height: 100,
    },
    {
        src: "/Flag7.jpg",
        alt: "Ocean waves",
        width: 250,
        height: 100,
    },
    {
        src: "/Flag5.jpg",
        alt: "Ocean waves",
        width: 250,
        height: 100,
    },
    {
        src: "/Flag6.jpg",
        alt: "Ocean waves",
        width: 250,
        height: 100,
    },
    {
        src: "/Flag3.jpg",
        alt: "Ocean waves",
        width: 250,
        height: 100,
    },
];

const Country = () => {
    return (
        <div>
            <section className="min-h-[50vh] sm:min-h-[90%] mt-6 sm:mt-10 flex items-center overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Changed from grid to flex column layout */}
                    <div className="flex flex-col items-center gap-8 sm:gap-12">
                        {/* Text Content - Now centered */}
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="space-y-6 sm:space-y-8 text-center"
                        >
                            <div className="space-y-3 sm:space-y-4">
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                    MGood Goes Global
                                    <span className="text-[#FF9933] block">9+ Countries</span>
                                </h1>
                                <p className="text-lg sm:text-xl text-[#138808] leading-relaxed">
                                    Via our networking partner : Healthtrip
                                </p>
                            </div>
                        </motion.div>

                        {/* InfiniteScroll Container - Now below the text */}
                        <motion.div 
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                            className='h-[15vh] sm:h-[25vh] lg:h-[30vh] w-full relative'
                        >
                            <InfiniteMovingImages
                                images={images}
                                direction="left"
                                speed="fast"
                                pauseOnHover={true}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Country;

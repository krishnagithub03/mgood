'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { InfiniteMovingImages } from '@/components/ui/infinite-moving-images';

const Logo = () => {
    const images = [
        {
            src: "/image1.avif",
            alt: "Beautiful landscape",
            width: 250,
            height: 180,
        },
        {
            src: "/image2.jpg",
            alt: "City skyline",
            width: 250,
            height: 180,
        },
        {
            src: "/image3.jpg",
            alt: "Ocean waves",
            width: 250,
            height: 180,
        },
        {
            src: "/observenow.png",
            alt: "Ocean waves",
            width: 250,
            height: 180,
        },
    ];

    return (
        <div className=' mt-10 '>
      <InfiniteMovingImages
            images={images}
            direction="left"
            speed="fast"
            pauseOnHover={true}
        />
        </div>
    );
}

export default Logo;

'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// --- The Main Component ---
const OurJourney = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        
        {/* Responsive Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Image 1: Our Journey So Far */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Image
              src="/1.jpg" // Path to your first image in the `public` folder
              alt="Our Journey So Far Timeline"
              width={400}  // Original width or desired display width
              height={400} // Original height or desired display height
              className="w-[40rem] h-[45rem] rounded-lg shadow-xl"
            />
          </motion.div>

          {/* Image 2: Our Numbers */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Image
              src="/2.jpg" // Path to your second image in the `public` folder
              alt="Our Numbers Timeline"
              width={400}  // Original width or desired display width
              height={400} // Original height or desired display height
              className="w-[35rem] h-[40rem] rounded-lg shadow-xl"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default OurJourney;
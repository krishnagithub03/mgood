"use client";
import { ImagesSlider } from "@/components/ui/images-slider";
import { motion } from "motion/react";
import React from "react";


export function Slider() {
  const images = [
    "./slider1.jpg",
    "./slider2.jpg",
    "./slider3.jpg",
    "./slider4.png",
    "./slider5.jpg",
    "./slider6.png",
    "./slider7.jpg",
    
  ];
  
  return (

    <div className="flex justify-center ">
  
  <ImagesSlider className="h-[20rem] md:h-[30rem] md:w-[70rem]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center">
        {/* <motion.p
          className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          The hero section slideshow <br /> nobody asked for
        </motion.p> */}
      </motion.div>
    </ImagesSlider>
    </div>
  );
}



// "use client";
// import { ImagesSlider } from "@/components/ui/images-slider";
// import { motion } from "framer-motion";
// import React, { useState, useEffect, useMemo } from "react";

// function useMediaQuery(query) {
//   const [matches, setMatches] = useState(false);

//   useEffect(() => {
//     if (typeof window === 'undefined') return;

//     const mediaQueryList = window.matchMedia(query);
//     const handleChange = (e) => setMatches(e.matches);

//     setMatches(mediaQueryList.matches); // initial value

//     mediaQueryList.addEventListener?.("change", handleChange);
//     return () => mediaQueryList.removeEventListener?.("change", handleChange);
//   }, [query]);

//   return matches;
// }

// export function Slider() {
//   const isDesktop = useMediaQuery("(min-width: 768px)");
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => setMounted(true), []);

//   const desktopImages = useMemo(() => [
//     "./slider1.png",
//     "./slider2.png",
//     "./slider3.png",
//     "./slider4.png"
//   ], []);

//   const mobileImages = useMemo(() => ["./slider4.png"], []);

//   // Use state only after mounted
//   const imagesToDisplay = mounted ? (isDesktop ? desktopImages : mobileImages) : [];

//   return (
//     <div className="flex justify-center">
//       {mounted && imagesToDisplay.length > 0 && (
//         <ImagesSlider className="h-[30rem] md:w-[40rem]" images={imagesToDisplay}>
//           <motion.div
//             initial={{ opacity: 0, y: -80 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="z-50 flex flex-col justify-center items-center"
//           >
//             {/* Slider content */}
//           </motion.div>
//         </ImagesSlider>
//       )}
//     </div>
//   );
// }

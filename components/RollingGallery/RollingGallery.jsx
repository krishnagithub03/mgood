// import { useEffect, useState } from "react";
// import {
//   motion,
//   useMotionValue,
//   useAnimation,
//   useTransform,
// } from "framer-motion";

// const IMGS = [
//   "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1495103033382-fe343886b671?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1506781961370-37a89d6b3095?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1599576838688-8a6c11263108?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1494094892896-7f14a4433b7a?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://plus.unsplash.com/premium_photo-1664910706524-e783eed89e71?q=80&w=3869&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1503788311183-fa3bf9c4bc32?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1585970480901-90d6bb2a48b5?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// ];

// const RollingGallery = ({
//   autoplay = false,
//   pauseOnHover = false,
//   images = [],
// }) => {
//   images = images.length > 0 ? images : IMGS;

//   const [isScreenSizeSm, setIsScreenSizeSm] = useState(
//     window.innerWidth <= 640
//   );
//   useEffect(() => {
//     const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // 3D geometry
//   const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
//   const faceCount = images.length;
//   const faceWidth = (cylinderWidth / faceCount) * 1.5;
//   const radius = cylinderWidth / (2 * Math.PI);

//   // Framer Motion
//   const dragFactor = 0.05;
//   const rotation = useMotionValue(0);
//   const controls = useAnimation();

//   // Convert rotation -> 3D transform
//   const transform = useTransform(
//     rotation,
//     (val) => `rotate3d(0,1,0,${val}deg)`
//   );

//   const startInfiniteSpin = (startAngle) => {
//     controls.start({
//       rotateY: [startAngle, startAngle - 360],
//       transition: {
//         duration: 20,
//         ease: "linear",
//         repeat: Infinity,
//       },
//     });
//   };

//   useEffect(() => {
//     if (autoplay) {
//       const currentAngle = rotation.get();
//       startInfiniteSpin(currentAngle);
//     } else {
//       controls.stop();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [autoplay]);

//   const handleUpdate = (latest) => {
//     if (typeof latest.rotateY === "number") {
//       rotation.set(latest.rotateY);
//     }
//   };

//   const handleDrag = (_, info) => {
//     controls.stop();
//     rotation.set(rotation.get() + info.offset.x * dragFactor);
//   };

//   const handleDragEnd = (_, info) => {
//     const finalAngle = rotation.get() + info.velocity.x * dragFactor;
//     rotation.set(finalAngle);

//     if (autoplay) {
//       startInfiniteSpin(finalAngle);
//     }
//   };

//   const handleMouseEnter = () => {
//     if (autoplay && pauseOnHover) {
//       controls.stop();
//     }
//   };
//   const handleMouseLeave = () => {
//     if (autoplay && pauseOnHover) {
//       const currentAngle = rotation.get();
//       startInfiniteSpin(currentAngle);
//     }
//   };

//   return (
//     <div className="relative h-[500px] w-full overflow-hidden">
//       <div
//         className="absolute top-0 left-0 h-full w-[48px] z-10"
//         style={{
//           background:
//             "linear-gradient(to left, rgba(0,0,0,0) 0%, #060606 100%)",
//         }}
//       />
//       <div
//         className="absolute top-0 right-0 h-full w-[48px] z-10"
//         style={{
//           background:
//             "linear-gradient(to right, rgba(0,0,0,0) 0%, #060606 100%)",
//         }}
//       />

//       <div className="flex h-full items-center justify-center [perspective:1000px] [transform-style:preserve-3d]">
//         <motion.div
//           drag="x"
//           dragElastic={0}
//           onDrag={handleDrag}
//           onDragEnd={handleDragEnd}
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//           animate={controls}
//           onUpdate={handleUpdate}
//           style={{
//             transform: transform,
//             rotateY: rotation,
//             width: cylinderWidth,
//             transformStyle: "preserve-3d",
//           }}
//           className="flex min-h-[200px] cursor-grab items-center justify-center [transform-style:preserve-3d]"
//         >
//           {images.map((url, i) => (
//             <div
//               key={i}
//               className="group absolute flex h-fit items-center justify-center p-[8%] [backface-visibility:hidden] md:p-[6%]"
//               style={{
//                 width: `${faceWidth}px`,
//                 transform: `rotateY(${(360 / faceCount) * i
//                   }deg) translateZ(${radius}px)`,
//               }}
//             >
//               <img
//                 src={url}
//                 alt="gallery"
//                 className="pointer-events-none h-[120px] w-[300px] rounded-[15px] border-[3px] border-white object-cover
//                            transition-transform duration-300 ease-out group-hover:scale-105
//                            sm:h-[100px] sm:w-[220px]"
//               />
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default RollingGallery;




// import { useEffect, useState } from "react";
// import {
//   motion,
//   useMotionValue,
//   useAnimation,
//   useTransform,
// } from "framer-motion";

// // Default images if none are provided via props
// const DEFAULT_IMGS = [
//   "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1495103033382-fe343886b671?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1506781961370-37a89d6b3095?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1599576838688-8a6c11263108?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1494094892896-7f14a4433b7a?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://plus.unsplash.com/premium_photo-1664910706524-e783eed89e71?q=80&w=3869&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1503788311183-fa3bf9c4bc32?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1585970480901-90d6bb2a48b5?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// ];

// const RollingGallery = ({
//   autoplay = false,
//   pauseOnHover = false,
//   images: propImages, // Renamed to avoid conflict
// }) => {
//   const images = propImages && propImages.length > 0 ? propImages : DEFAULT_IMGS;

//   const [isScreenSizeSm, setIsScreenSizeSm] = useState(
//     () => typeof window !== 'undefined' && window.innerWidth <= 640
//   );

//   useEffect(() => {
//     if (typeof window === 'undefined') return;
//     const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // 3D geometry: Adjusted for larger images
//   // Target image width (lg screens): 280px. With md:p-[6%] (0.12 total), faceWidth * 0.88 = 280 => faceWidth = 318px
//   // cylinderWidth_lg = (faceWidth_lg / 1.5) * 10 = (318 / 1.5) * 10 = 212 * 10 = 2120px
//   // Target image width (sm screens): 200px. With p-[8%] (0.16 total), faceWidth * 0.84 = 200 => faceWidth = 238px
//   // cylinderWidth_sm = (faceWidth_sm / 1.5) * 10 = (238 / 1.5) * 10 = ~158.6 * 10 = ~1586px (use 1600 for rounder numbers)
//   const cylinderWidth = isScreenSizeSm ? 1600 : 2120;
//   const faceCount = images.length;
//   // The 1.5 multiplier makes faces overlap/appear denser.
//   const faceWidthMultiplier = 1.5;
//   const faceWidth = (cylinderWidth / faceCount) * faceWidthMultiplier;
//   const radius = cylinderWidth / (2 * Math.PI);

//   // Framer Motion
//   const dragFactor = 0.05; // Sensitivity of drag
//   const rotation = useMotionValue(0);
//   const controls = useAnimation();

//   // Convert rotation -> 3D transform for the cylinder
//   const transform = useTransform(
//     rotation,
//     (val) => `rotate3d(0,1,0,${val}deg)`
//   );

//   const startInfiniteSpin = (startAngle) => {
//     controls.start({
//       rotateY: [startAngle, startAngle - 360], // Animate one full rotation
//       transition: {
//         duration: 40, // Speed of rotation
//         ease: "linear",
//         repeat: Infinity,
//       },
//     });
//   };

//   useEffect(() => {
//     if (autoplay) {
//       const currentAngle = rotation.get();
//       startInfiniteSpin(currentAngle);
//     } else {
//       controls.stop();
//     }
//     // Adding controls to dependency array as it's used in the effect
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [autoplay, rotation, controls]); // Added controls, rotation for completeness

//   const handleUpdate = (latest) => {
//     // This function is called on every animation frame when `controls` are active.
//     // We update the `rotation` motion value if `rotateY` is part of the animation.
//     if (typeof latest.rotateY === "number") {
//       rotation.set(latest.rotateY);
//     }
//   };

//   const handleDrag = (_, info) => {
//     controls.stop(); // Stop any ongoing animation like autoplay
//     rotation.set(rotation.get() + info.offset.x * dragFactor);
//   };

//   const handleDragEnd = (_, info) => {
//     // Apply velocity to the rotation for a smoother end to the drag
//     const finalAngle = rotation.get() + info.velocity.x * dragFactor;
//     rotation.set(finalAngle);

//     if (autoplay) {
//       startInfiniteSpin(finalAngle); // Restart autoplay from the new angle
//     }
//   };

//   const handleMouseEnter = () => {
//     if (autoplay && pauseOnHover) {
//       controls.stop();
//     }
//   };

//   const handleMouseLeave = () => {
//     if (autoplay && pauseOnHover) {
//       const currentAngle = rotation.get();
//       startInfiniteSpin(currentAngle);
//     }
//   };

//   return (
//     // Main container for the gallery
//     <div className="relative h-[500px] w-full overflow-hidden">
//       {/* Perspective wrapper: This div creates the 3D space */}
//       <div className="flex h-full items-center justify-center [perspective:1000px] [transform-style:preserve-3d]">
//         {/* The rotating cylinder itself. It's draggable. */}
//         <motion.div
//           drag="x" // Allow dragging only on the x-axis
//           dragElastic={0} // No elastic bounce when dragging past limits
//           onDrag={handleDrag}
//           onDragEnd={handleDragEnd}
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//           animate={controls} // Connects to useAnimation for programmatic control
//           onUpdate={handleUpdate} // Called during animation updates
//           style={{
//             transform: transform, // Applies the 3D rotation
//             rotateY: rotation, // Also bind rotateY directly (can be redundant but often useful)
//             width: cylinderWidth,
//             transformStyle: "preserve-3d", // Children also exist in 3D space
//           }}
//           className="flex min-h-[200px] cursor-grab items-center justify-center [transform-style:preserve-3d]"
//         >
//           {images.map((url, i) => (
//             // Each face/panel of the cylinder
//             <div
//               key={i}
//               className="group absolute flex h-fit items-center justify-center 
//                          p-[8%] md:p-[6%] [backface-visibility:hidden]"
//               style={{
//                 width: `${faceWidth}px`,
//                 // Position each face around the cylinder
//                 transform: `rotateY(${(360 / faceCount) * i
//                   }deg) translateZ(${radius}px)`,
//               }}
//             >
//               <img
//                 src={url}
//                 alt={`gallery-image-${i}`}
//                 className="pointer-events-none rounded-[15px] border-[3px] border-white object-cover
//                            transition-transform duration-300 ease-out group-hover:scale-105
//                            w-[280px] h-[170px] 
//                            sm:w-[200px] sm:h-[120px]"
//               />
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default RollingGallery;



import { useEffect, useState } from "react";
import { motion, useMotionValue, useAnimation } from "framer-motion";

// Default images if none are provided via props
const DEFAULT_IMGS = [
  "https://res.cloudinary.com/dwkili7et/image/upload/v1748622706/PHOTO-2025-05-26-10-03-44_eky4av.jpg",
  "https://res.cloudinary.com/dwkili7et/image/upload/v1748622707/PHOTO-2025-05-26-10-02-51_a1ftl8.jpg",
  "https://res.cloudinary.com/dwkili7et/image/upload/v1748622707/PHOTO-2025-05-26-10-03-45_whjkg6.jpg",
  "https://res.cloudinary.com/dwkili7et/image/upload/v1748622706/PHOTO-2025-05-26-10-03-44_eky4av.jpg",
  "https://res.cloudinary.com/dwkili7et/image/upload/v1748622707/PHOTO-2025-05-26-10-02-51_a1ftl8.jpg",
  "https://res.cloudinary.com/dwkili7et/image/upload/v1748622707/PHOTO-2025-05-26-10-03-45_whjkg6.jpg",
  "https://res.cloudinary.com/dwkili7et/image/upload/v1748622706/PHOTO-2025-05-26-10-03-44_eky4av.jpg",
  "https://res.cloudinary.com/dwkili7et/image/upload/v1748622707/PHOTO-2025-05-26-10-02-51_a1ftl8.jpg",
  "https://res.cloudinary.com/dwkili7et/image/upload/v1748622707/PHOTO-2025-05-26-10-03-45_whjkg6.jpg",
 
];

const RollingGallery = ({
  autoplay = false,
  pauseOnHover = false,
  images: propImages,
}) => {
  const images = propImages && propImages.length > 0 ? propImages : DEFAULT_IMGS;

  const [isScreenSizeSm, setIsScreenSizeSm] = useState(
    () => typeof window !== "undefined" && window.innerWidth <= 640
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cylinderWidth = isScreenSizeSm ? 1600 : 2120;
  const faceCount = images.length;
  const faceWidthMultiplier = 1.5;
  const faceWidth = (cylinderWidth / faceCount) * faceWidthMultiplier;
  const radius = cylinderWidth / (2 * Math.PI);

  const dragFactor = 0.05;
  const rotation = useMotionValue(0);
  const controls = useAnimation();

  const startInfiniteSpin = (startAngle) => {
    controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: {
        duration: 40,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  useEffect(() => {
    if (autoplay) {
      startInfiniteSpin(rotation.get());
    } else {
      controls.stop();
    }
  }, [autoplay]);

  const handleDrag = (_, info) => {
    controls.stop();
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_, info) => {
    const velocity = info.velocity.x * dragFactor;
    const newAngle = rotation.get() + velocity;

    // Apply spring easing
    controls.start({
      rotateY: newAngle,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
      },
    });

    // Resume autoplay after delay
    if (autoplay) {
      setTimeout(() => {
        startInfiniteSpin(newAngle);
      }, 1000);
    }
  };

  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover) {
      controls.stop();
    }
  };

  const handleMouseLeave = () => {
    if (autoplay && pauseOnHover) {
      startInfiniteSpin(rotation.get());
    }
  };

  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      <div className="flex h-full items-center justify-center [perspective:1000px] [transform-style:preserve-3d]">
        <motion.div
          drag="x"
          dragElastic={0.05}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={controls}
          style={{
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          className="flex min-h-[200px] cursor-grab items-center justify-center [transform-style:preserve-3d]"
        >
          {images.map((url, i) => (
            <div
              key={i}
              className="group absolute flex h-fit items-center justify-center p-[8%] md:p-[6%] [backface-visibility:hidden]"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${(360 / faceCount) * i}deg) translateZ(${radius}px)`,
              }}
            >
              <img
                src={url}
                alt={`gallery-image-${i}`}
                className="pointer-events-none rounded-[15px] border-[3px] border-white object-conver transition-transform duration-300 ease-out group-hover:scale-105 w-[280px] h-[170px] sm:w-[180px] sm:h-[120px]"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RollingGallery;

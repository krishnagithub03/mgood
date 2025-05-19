"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion"; // Ensure this is the correct import
import { useEffect, useState, useMemo } from "react";

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}) => {
  const [active, setActive] = useState(0);
  const [isMounted, setIsMounted] = useState(false); // <-- For client-side only logic

  // Set isMounted to true after the component mounts on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => index === active;

  useEffect(() => {
    if (autoplay && isMounted) { // Only start autoplay after mounting
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, active, testimonials.length, isMounted, handleNext]); // Added handleNext to deps

  // Memoize random rotations for non-active cards to keep them consistent
  // once generated on the client after mount.
  const nonActiveCardRotations = useMemo(() => {
    if (!isMounted) {
      // For SSR and initial client render before mount, return deterministic values
      return testimonials.map(() => 0);
    }
    // After mounting, generate random rotations
    return testimonials.map(() => Math.floor(Math.random() * 21) - 10);
  }, [isMounted, testimonials]); // Re-calculate if isMounted changes or testimonials array changes

  // Function to get a random rotation, used for exit animations (client-side only)
  const getRandomExitRotation = () => {
    if (!isMounted) return 0; // Fallback for safety, though exit is client-driven
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
        <div>
        <div className="relative w-full aspect-[1/1.3] md:h-80">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: 0, // Use a deterministic value for SSR and initial client render
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    // Apply random rotation only if mounted and card is not active
                    rotate: isActive(index) ? 0 : nonActiveCardRotations[index],
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: getRandomExitRotation(), // Random rotation on exit is fine (client-only)
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-between py-4">
          {/* Use AnimatePresence for the text part if you want smoother transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active} // Keying by `active` ensures re-animation on change
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -20,
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            >
              <h3 className="text-2xl font-bold text-black dark:text-white">
                {testimonials[active].name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-neutral-500">
                {testimonials[active].designation}
              </p>
              <motion.p className="mt-8 text-lg text-gray-500 dark:text-neutral-300">
                {/* Only run word animation if mounted to prevent SSR mismatch */}
                {isMounted && testimonials[active].quote.split(" ").map((word, wordIndex) => (
                  <motion.span
                    key={wordIndex}
                    initial={{
                      filter: "blur(10px)",
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                      delay: 0.02 * wordIndex,
                    }}
                    className="inline-block"
                  >
                    {word} 
                  </motion.span>
                ))}
                {/* Fallback for SSR: render plain text */}
                {!isMounted && testimonials[active].quote}
              </motion.p>
            </motion.div>
          </AnimatePresence>
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
            >
              <IconArrowLeft className="h-7 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
            >
              <IconArrowRight className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
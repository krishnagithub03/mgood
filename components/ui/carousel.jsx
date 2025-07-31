"use client";
import dynamic from "next/dynamic";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect, useCallback } from "react"; // Added useCallback

const Slide = ({
  slide,
  index,
  current,
  handleSlideClick
}) => {
  const slideRef = useRef(null);

  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef();

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;

      const x = xRef.current;
      const y = yRef.current;

      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event) => {
    const el = slideRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const imageLoaded = (event) => {
    event.currentTarget.style.opacity = "1";
  };

  const { src, button, title } = slide;

  return (
    (<div className="[perspective:1200px] [transform-style:preserve-3d] ">
      <li
        ref={slideRef}
        className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[45vmin] h-[35vmin] mx-[2vmin] z-10 "
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            current !== index
              ? "scale(0.98) rotateX(8deg)"
              : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}>
        <div
          className="absolute top-0 left-0 w-full h-full bg-[#1D1F2F] rounded-[1%] overflow-hidden transition-all duration-150 ease-out"
          style={{
            transform:
              current === index
                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                : "none",
          }}>
          <img
            className="absolute inset-0 w-[100%] h-[100%]  object-contain opacity-100 transition-opacity duration-600 ease-in-out"
            style={{
              opacity: current === index ? 1 : 0.5,
            }}
            alt={title}
            src={src}
            onLoad={imageLoaded}
            loading="eager"
            decoding="sync" />
          {current === index && (
            <div className="absolute inset-0 bg-black/30 transition-all duration-1000" />
          )}
        </div>

        <article
          className={`relative p-[2vmin]  transition-opacity duration-1000 ease-in-out ${
            current === index ? "opacity-100 visible" : "opacity-0 invisible"
          }`}>
          <h2 className="text-lg md:text-2xl lg:text-4xl font-semibold  relative">
            {title}
          </h2>
          <div className="flex justify-center">
            
          </div>
        </article>
      </li>
    </div>)
  );
};

const CarouselControl = ({
  type,
  title,
  handleClick
}) => {
  return (
    (<button
      className={`w-10 h-10 flex items-center mx-1 justify-center bg-primary dark:bg-neutral-800 border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${
        type === "previous" ? "rotate-180" : ""
      }`}
      title={title}
      onClick={handleClick}>
      <IconArrowNarrowRight className="text-white " />
    </button>)
  );
};

export default function Carousel({
  slides,
  autoplay = false, // Set to true to enable autoplay by default
  autoplayInterval = 3000 // Interval in milliseconds (e.g., 3 seconds)
}) {
  const [current, setCurrent] = useState(0);

  const handlePreviousClick = useCallback(() => {
    setCurrent(prevCurrent => {
      if (slides.length === 0) return 0;
      const newPrevious = prevCurrent - 1;
      return newPrevious < 0 ? slides.length - 1 : newPrevious;
    });
  }, [slides.length]);

  const handleNextClick = useCallback(() => {
    setCurrent(prevCurrent => {
      if (slides.length === 0) return 0;
      const newNext = prevCurrent + 1;
      return newNext >= slides.length ? 0 : newNext;
    });
  }, [slides.length]);

  const handleSlideClick = (index) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  // Autoplay useEffect
  useEffect(() => {
    if (!autoplay || slides.length <= 1) {
      return; // Don't start interval if autoplay is false or not enough slides
    }

    const intervalId = setInterval(() => {
      handleNextClick();
    }, autoplayInterval);

    return () => {
      clearInterval(intervalId); // Clear interval on component unmount or when dependencies change
    };
  }, [current, autoplay, autoplayInterval, slides.length, handleNextClick]);
  // Dependencies:
  // - current: Reset timer when current slide changes (manual or auto)
  // - autoplay: Start/stop interval when autoplay prop changes
  // - autoplayInterval: Adjust interval timing when prop changes
  // - slides.length: Re-evaluate if number of slides changes (affects handleNextClick and condition)
  // - handleNextClick: If this function's definition changes (due to slides.length changing)

  const id = useId();

  return (
    (<div className="relative w-[50vmin] h-[45vmin] mx-auto" aria-labelledby={`carousel-heading-${id}`}>
      <ul
        className="absolute flex mx-[-2vmin] transition-transform duration-1000 ease-in-out"
        style={{
          transform: slides.length > 0 ? `translateX(-${current * (100 / slides.length)}%)` : 'translateX(0%)',
        }}>
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </ul>
    
      {slides.length > 1 && (
        <div className="absolute flex justify-center w-full top-full mt-2">
          <CarouselControl
            type="previous"
            title="Go to previous slide"
            handleClick={handlePreviousClick}
          />
          <CarouselControl
            type="next"
            title="Go to next slide"
            handleClick={handleNextClick}
          />
        </div>
      )}
    </div>)
  );
}
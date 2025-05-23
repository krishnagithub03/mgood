"use client";

import createGlobe from "cobe";
import { useMotionValue, useSpring } from "motion/react"; // Ensure this import is correct if using 'motion'
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const MOVEMENT_DAMPING = 1400;

const GLOBE_CONFIG = {
  width: 800, // Note: These are overridden by dynamic width calculation
  height: 800, // Note: These are overridden by dynamic width calculation
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
};

export function Globe({
  className,
  config = GLOBE_CONFIG
}) {
  let phi = 0;
  let internalWidth = 0; // Renamed to avoid conflict with global 'width' if any
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const updatePointerInteraction = (value) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        // Get the actual rendered width of the canvas's parent div
        // The parent div is aspect-[1/1] and w-full max-w-[600px]
        // So its offsetWidth will be its actual display width.
        internalWidth = canvasRef.current.parentElement.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);
    onResize(); // Call on mount to set initial size

    if (!canvasRef.current) return; // Guard clause

    const globe = createGlobe(canvasRef.current, {
      ...config,
      width: internalWidth * config.devicePixelRatio, // Use internalWidth
      height: internalWidth * config.devicePixelRatio, // Use internalWidth, ensuring square
      onRender: (state) => {
        // Update state in onRender callback
        if (!pointerInteracting.current) phi += 0.005;
        state.phi = phi + rs.get();
        // Ensure globe rendering size is updated if internalWidth changed
        state.width = internalWidth * config.devicePixelRatio;
        state.height = internalWidth * config.devicePixelRatio;
      },
    });

    // Fade in canvas
    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    }, 100); // Small delay can sometimes help ensure dimensions are calculated

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rs, config]); // internalWidth is not a state/prop, so onResize handles its updates for the globe instance

  return (
    <div
      className={cn(
        // REMOVED: "absolute inset-0"
        // ADDED: Standard block behavior, square aspect ratio, centered
        "relative mx-auto aspect-[1/1] w-full max-w-[600px]", // Added relative in case child elements need it
        className
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}
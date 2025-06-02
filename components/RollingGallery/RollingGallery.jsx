import { useEffect, useState, useCallback } from "react";
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

  const [openedImageUrl, setOpenedImageUrl] = useState(null);
  const [isCurrentlyDragging, setIsCurrentlyDragging] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
    setIsScreenSizeSm(window.innerWidth <= 640); // Initial check on client
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

  const startInfiniteSpin = useCallback((startAngle) => {
    controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: {
        duration: 40,
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, [controls]);

  useEffect(() => {
    if (openedImageUrl) {
      controls.stop();
      return;
    }
    if (autoplay) {
      startInfiniteSpin(rotation.get());
    } else {
      controls.stop();
    }
  }, [autoplay, openedImageUrl, startInfiniteSpin, rotation, controls]);

  const handleDragStartInternal = () => {
    setIsCurrentlyDragging(true);
    controls.stop();
  };

  const handleDrag = (_, info) => {
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_, info) => {
    setTimeout(() => {
      setIsCurrentlyDragging(false);
    }, 0);

    const velocity = info.velocity.x * dragFactor;
    const newAngle = rotation.get() + velocity;

    controls.start({
      rotateY: newAngle,
      transition: { type: "spring", stiffness: 50, damping: 20 },
    });

    if (autoplay && !openedImageUrl) {
      setTimeout(() => {
        if (!openedImageUrl) {
            startInfiniteSpin(newAngle);
        }
      }, 1000);
    }
  };

  const handleImageClick = (imageUrl) => {
    if (!isCurrentlyDragging) {
      setOpenedImageUrl(imageUrl);
    }
  };

  const closeModal = useCallback(() => {
    setOpenedImageUrl(null);
  }, []);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    if (openedImageUrl) {
      document.addEventListener("keydown", handleEscKey);
    }
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [openedImageUrl, closeModal]);

  const handleMouseEnter = () => {
    if (openedImageUrl) return;
    if (autoplay && pauseOnHover) {
      controls.stop();
    }
  };

  const handleMouseLeave = () => {
    if (openedImageUrl) return;
    if (autoplay && pauseOnHover) {
      if (autoplay) { // Check if autoplay is still globally enabled
        startInfiniteSpin(rotation.get());
      }
    }
  };

  return (
    <>
      <div className="relative h-[500px] w-full overflow-hidden">
        <div className="flex h-full items-center justify-center [perspective:1000px] [transform-style:preserve-3d]">
          <motion.div
            drag="x"
            dragElastic={0.05}
            onDragStart={handleDragStartInternal}
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
              onClick={() => handleImageClick(url)}
            >
              <img
                src={url}
                alt={`gallery-image-${i}`}
                className="pointer-events-none rounded-[15px] border-[3px] border-white object-conver transition-transform duration-300 ease-out group-hover:scale-105 w-[280px] h-[170px] sm:w-[180px] sm:h-[120px]"
              />
            </div>
          ))}
            {/* {images.map((url, i) => (
              <div
                key={i}
                className="group absolute flex h-fit cursor-pointer items-center justify-center p-[8%] md:p-[6%] [backface-visibility:hidden]"
                style={{
                  width: `${faceWidth}px`,
                  transform: `rotateY(${(360 / faceCount) * i}deg) translateZ(${radius}px)`,
                }}
                onClick={() => handleImageClick(url)}
              >
                <img
                  src={url}
                  alt={`gallery-image-${i}`}
                  // MODIFIED: Changed object-cover to object-contain
                  // MODIFIED: Added inline style for maxWidth: '100%'
                  // className="pointer-events-none rounded-[15px] border-[3px] border-white object-contain transition-transform duration-300 ease-out group-hover:scale-105 w-[280px] h-[170px] sm:w-[180px] sm:h-[120px]"
                  className="pointer-events-none rounded-[15px] border-[3px] border-white object-cover transition-transform duration-300 ease-out group-hover:scale-105 w-[280px] h-[170px] sm:w-[180px] sm:h-[120px]"

                  style={{ maxWidth: '100%' }}
                />
              </div>
            ))} */}
          </motion.div>
        </div>
      </div>

      {openedImageUrl && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            cursor: "pointer",
          }}
          onClick={closeModal}
        >
          <img
            src={openedImageUrl}
            alt="Opened gallery"
            style={{
              maxHeight: "90vh",
              maxWidth: "90vw",
              objectFit: "contain", // This was already correct for the modal image
              boxShadow: "0 0 30px rgba(0,0,0,0.5)",
              cursor: "default",
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => {
                e.stopPropagation();
                closeModal();
            }}
            // MODIFIED: Enhanced close button style for better visibility
            style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              background: "white",
              color: "black",
              border: "1px solid #ccc",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              fontSize: "24px",
              textAlign: "center",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1001 // Ensure it's above other modal content
            }}
            aria-label="Close image view"
          >
            ×
          </button>
        </div>
      )}
    </>
  );
};

export default RollingGallery;
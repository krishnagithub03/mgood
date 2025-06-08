"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import RotatingText from "@/components/RotatingText/RotatingText";


const Carousel = dynamic(() => import("@/components/ui/carousel"), { ssr: false });

const RuralGallery = () => {
  const slideData = [
    {
      title: "Mgood Rural Expansion",
      src: "https://res.cloudinary.com/dwkili7et/image/upload/v1748622706/PHOTO-2025-05-26-10-03-44_eky4av.jpg",
    },
    {
      title: "Mgood.org's initiative to support community Healthcare Across Rural Area.",
      src: "https://res.cloudinary.com/dwkili7et/image/upload/v1748622707/PHOTO-2025-05-26-10-02-51_a1ftl8.jpg",
    },
    {
      title: "Mgood Rural Expansion ",
      src: "https://res.cloudinary.com/dwkili7et/image/upload/v1748622707/PHOTO-2025-05-26-10-03-45_whjkg6.jpg",
    },
    {
      title: "Mgood.org's initiative to support community Healthcare Across Rural Area.",
      src: "https://res.cloudinary.com/dwkili7et/image/upload/v1748622706/PHOTO-2025-05-26-10-03-44_eky4av.jpg",
    },
    {
      title: "Mgood Rural Expansion ",
      src: "https://res.cloudinary.com/dwkili7et/image/upload/v1748622707/PHOTO-2025-05-26-10-02-51_a1ftl8.jpg",
    },
    {
      title: "Mgood.org's initiative to support community Healthcare Across Rural Area.",
      src: "https://res.cloudinary.com/dwkili7et/image/upload/v1748622707/PHOTO-2025-05-26-10-03-45_whjkg6.jpg",
    },
    
  ];

  return (
    <>
    <div className="flex justify-center mt-12 ">
    <h1 className="py-2 m-2 sm:py-2 md:py-3 text-3xl font-display font-bold">MGOOD</h1>
   
<RotatingText
  texts={['Rural', 'Expansion!']}
  mainClassName="flex items-center justify-center px-2 sm:px-2 md:px-3 bg-primary text-3xl text-white overflow-hidden py-0.5 sm:py-1 md:py-2 rounded-2xl font-bold font-display"

  staggerFrom={"last"}
  initial={{ y: "100%" }}
  animate={{ y: 0 }}
  exit={{ y: "-120%" }}
  staggerDuration={0.025}
  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
  transition={{ type: "spring", damping: 30, stiffness: 400 }}
  rotationInterval={2000}
  />

</div>
    <div className="relative overflow-hidden w-full h-full py-20">
      <Carousel slides={slideData} autoplay={true} autoplayInterval={3000}  />
    </div>
  </>
  );
};

export default RuralGallery;
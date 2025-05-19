"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";


const Carousel = dynamic(() => import("@/components/ui/carousel"), { ssr: false });

const Gallery = () => {
  const slideData = [
    {
      title: "Mgood Eye Care Camp ",
      src: "https://res.cloudinary.com/dwkili7et/image/upload/v1717379642/7_qny7ea.png",
    },
    {
      title: "Mgood.org's initiative to support community eye health through accessible care.",
      src: "https://res.cloudinary.com/dwkili7et/image/upload/v1717379145/WhatsApp_Image_2025-05-16_at_07.44.33_subg5u.jpg",
    },
    {
      title: "Mgood Eye Care Camp ",
      src: "https://res.cloudinary.com/dwkili7et/image/upload/v1717379641/5_ptg0ws.png",
    },
    {
      title: "Mgood.org's initiative to support community eye health through accessible care.",
      src: "https://res.cloudinary.com/dwkili7et/image/upload/v1717379641/4_wkmxbx.png",
    },
    {
      title: "Mgood Eye Care Camp ",
      src: "https://res.cloudinary.com/dwkili7et/image/upload/v1747379641/3_wkfk1j.png",
    },
    {
      title: "Mgood.org's initiative to support community eye health through accessible care.",
      src: "https://res.cloudinary.com/dwkili7et/image/upload/v1717379641/6_klbh3u.png",
    },
    {
      title: "Mgood Eye Care Camp ",
      src: "https://res.cloudinary.com/dwkili7et/image/upload/v1717379642/2_rsdkeq.png",
    },
  ];

  return (
    <div className="relative overflow-hidden w-full h-full py-20">
      <Carousel slides={slideData} />
    </div>
  );
};

export default Gallery;
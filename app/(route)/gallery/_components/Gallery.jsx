"use client";
import React from "react";

import { LayoutGrid } from "@/components/ui/layout-grid";




const sampleImages = [
  {
    id: "1",
    url: "https://res.cloudinary.com/dwkili7et/image/upload/v1747379642/7_qny7ea.png",
    title: "Mgood Eye Care camp",
    description: "On May 15, Mgood.org conducted a free Eye Camp offering vision screenings, consultations, and treatment guidance to the local community—promoting eye health and early detection of visual issues.",
    
    className: "md:col-span-1",
  },
  {
    id: "2",
    url: "https://res.cloudinary.com/dwkili7et/image/upload/v1747379145/WhatsApp_Image_2025-05-16_at_07.44.33_subg5u.jpg",
    title: "Mgood Eye Care camp",
    description: "On May 15, Mgood.org conducted a free Eye Camp offering vision screenings, consultations, and treatment guidance to the local community—promoting eye health and early detection of visual issues.",
    className: "md:col-span-2 md:row-span-2", // This image will take two columns on medium screens and up
  },
  {
    id: "3",
    url: "https://res.cloudinary.com/dwkili7et/image/upload/v1747379641/5_ptg0ws.png",
    title: "Mgood Eye Care camp",
    description: "On May 15, Mgood.org conducted a free Eye Camp offering vision screenings, consultations, and treatment guidance to the local community—promoting eye health and early detection of visual issues.",
    className: "md:col-span-1",
  },
  {
    id: "4",
    url: "https://res.cloudinary.com/dwkili7et/image/upload/v1747379641/4_wkmxbx.png",
    title: "Mgood Eye Care camp",
    description: "On May 15, Mgood.org conducted a free Eye Camp offering vision screenings, consultations, and treatment guidance to the local community—promoting eye health and early detection of visual issues.",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    id: "5",
    url: "https://res.cloudinary.com/dwkili7et/image/upload/v1747379642/2_rsdkeq.png",
    title: "Mgood Eye Care camp",
    description: "On May 15, Mgood.org conducted a free Eye Camp offering vision screenings, consultations, and treatment guidance to the local community—promoting eye health and early detection of visual issues.",
    className: "md:col-span-1 md:row-span-2", // This will span 1 column and 2 rows
  },
  {
    id: "6",
    url: "https://res.cloudinary.com/dwkili7et/image/upload/v1747379641/6_klbh3u.png",
    title: "Mgood Eye Care camp",
    description: "On May 15, Mgood.org conducted a free Eye Camp offering vision screenings, consultations, and treatment guidance to the local community—promoting eye health and early detection of visual issues.",
    className: "md:col-span-1",
  },
];

const Gallery = () => {
  
  const cards = sampleImages.map((image) => ({
    id: image.id, 
    className: image.className, 
    thumbnail: image.url, 
   
    content: (
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
          {image.title}
        </h2>
        <p className="text-sm md:text-base text-neutral-200">
          {image.description}
        </p>
      </div>
    ),
  }));

  return (
    <>
     <h1 className="text-center text-xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-red-500 to-amber-400 drop-shadow-xl tracking-tight mb-16 animate-fade-in-up">
  ✨ Mgood Gallery ✨
</h1>

      <LayoutGrid cards={cards} />
    </>
  );
};

export default Gallery;












// "use client";
// import React, { useState } from "react";
// import { motion } from "framer-motion";

// const Gallery = () => {
//   const [selected, setSelected] = useState(null);
//   const [lastSelected, setLastSelected] = useState(null);

//   // Healthcare-themed gallery items
//   const healthcareServices = [
//     {
//       id: "1",
//       thumbnail: "/api/placeholder/800/600",
//       title: "Teleconsultation",
//       description: "Connect with our healthcare professionals from anywhere through secure video consultations.",
//       className: "md:col-span-1"
//     },
//     {
//       id: "2",
//       thumbnail: "/api/placeholder/800/600",
//       title: "Health Camp Registration",
//       description: "Register for our upcoming health camps offering free screenings, consultations, and health education.",
//       className: "md:col-span-2"
//     },
//     {
//       id: "3",
//       thumbnail: "/api/placeholder/800/600",
//       title: "Prescription Services",
//       description: "Access and manage your prescriptions online with our secure prescription management system.",
//       className: "md:col-span-1"
//     },
//     {
//       id: "4",
//       thumbnail: "/api/placeholder/800/600",
//       title: "Blood Donation Drive",
//       description: "Join our blood donation initiatives and help save lives in your community.",
//       className: "md:col-span-1"
//     },
//     {
//       id: "5",
//       thumbnail: "/api/placeholder/800/600",
//       title: "Medical Reports",
//       description: "View and download your test results and medical reports from our secure patient portal.",
//       className: "md:col-span-1 md:row-span-2"
//     },
//     {
//       id: "6",
//       thumbnail: "/api/placeholder/800/600",
//       title: "Health Education",
//       description: "Access resources and educational materials about preventive care and managing chronic conditions.",
//       className: "md:col-span-1"
//     }
//   ];

//   const handleClick = (card) => {
//     setLastSelected(selected);
//     setSelected(card);
//   };

//   const handleOutsideClick = () => {
//     setLastSelected(selected);
//     setSelected(null);
//   };

//   // Helper function to apply conditional classes
//   const cn = (...classes) => {
//     return classes.filter(Boolean).join(" ");
//   };

//   // Create cards from healthcare services
//   const cards = healthcareServices.map((service) => ({
//     id: service.id,
//     className: service.className,
//     thumbnail: service.thumbnail,
//     title: service.title,
//     description: service.description,
//     content: (
//       <div>
//         <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{service.title}</h2>
//         <p className="text-sm md:text-base text-neutral-200">{service.description}</p>
//         <button className="mt-4 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-all duration-300">
//           Learn More
//         </button>
//       </div>
//     )
//   }));

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-800">
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
//           MGood Gallery
//         </h1>
//         <p className="text-center text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
//           Explore our comprehensive healthcare services designed to provide you with quality medical care and support.
//         </p>

//         {/* Gallery Grid */}
//         <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 gap-6 relative">
//           {cards.map((card, i) => (
//             <div key={i} className={cn(card.className, "")}>
//               <motion.div
//                 onClick={() => handleClick(card)}
//                 className={cn(
//                   "relative overflow-hidden",
//                   selected?.id === card.id
//                     ? "rounded-lg cursor-pointer absolute inset-0 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col"
//                     : lastSelected?.id === card.id
//                     ? "z-40 bg-white dark:bg-gray-800 rounded-xl h-full w-full shadow-lg"
//                     : "bg-white dark:bg-gray-800 rounded-xl h-full w-full shadow-md hover:shadow-lg transition-all duration-300"
//                 )}
//                 layoutId={`card-${card.id}`}
//               >
//                 {selected?.id === card.id ? (
//                   // Selected card view
//                   <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-60">
//                     <motion.img
//                       layoutId={`image-${card.id}-image`}
//                       src={card.thumbnail}
//                       alt={card.title}
//                       className="object-cover object-center absolute inset-0 h-full w-full"
//                     />
//                     <motion.div
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 0.7 }}
//                       className="absolute inset-0 h-full w-full bg-black z-10"
//                     />
//                     <motion.div
//                       layoutId={`content-${card.id}`}
//                       initial={{ opacity: 0, y: 100 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: 100 }}
//                       transition={{ duration: 0.3, ease: "easeInOut" }}
//                       className="relative px-8 py-6 z-20"
//                     >
//                       {card.content}
//                     </motion.div>
//                   </div>
//                 ) : (
//                   // Thumbnail view
//                   <>
//                     <motion.img
//                       layoutId={`image-${card.id}-image`}
//                       src={card.thumbnail}
//                       alt={card.title}
//                       className="object-cover object-center w-full h-48 md:h-56"
//                     />
//                     <div className="p-4">
//                       <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                         {card.title}
//                       </h3>
//                       <p className="mt-1 text-sm text-gray-500 dark:text-gray-300 line-clamp-2">
//                         {card.description}
//                       </p>
//                     </div>
//                   </>
//                 )}
//               </motion.div>
//             </div>
//           ))}
          
//           {/* Overlay for clicking outside */}
//           <motion.div
//             onClick={handleOutsideClick}
//             className={cn(
//               "fixed inset-0 bg-black opacity-0 z-10",
//               selected ? "pointer-events-auto" : "pointer-events-none"
//             )}
//             animate={{ opacity: selected ? 0.5 : 0 }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Gallery;
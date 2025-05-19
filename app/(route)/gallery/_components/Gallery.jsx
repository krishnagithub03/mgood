// "use client";
// import React from "react";

// import { LayoutGrid } from "@/components/ui/layout-grid";




// const sampleImages = [
//   {
//     id: "1",
//     url: "https://res.cloudinary.com/dwkili7et/image/upload/v1747379642/7_qny7ea.png",
//     title: "Mgood Eye Care camp",
//     description: "On May 15, Mgood.org conducted a free Eye Camp offering vision screenings, consultations, and treatment guidance to the local community—promoting eye health and early detection of visual issues.",
    
//     className: "md:col-span-1",
//   },
//   {
//     id: "2",
//     url: "https://res.cloudinary.com/dwkili7et/image/upload/v1747379145/WhatsApp_Image_2025-05-16_at_07.44.33_subg5u.jpg",
//     title: "Mgood Eye Care camp",
//     description: "On May 15, Mgood.org conducted a free Eye Camp offering vision screenings, consultations, and treatment guidance to the local community—promoting eye health and early detection of visual issues.",
//     className: "md:col-span-2 md:row-span-2", // This image will take two columns on medium screens and up
//   },
//   {
//     id: "3",
//     url: "https://res.cloudinary.com/dwkili7et/image/upload/v1747379641/5_ptg0ws.png",
//     title: "Mgood Eye Care camp",
//     description: "On May 15, Mgood.org conducted a free Eye Camp offering vision screenings, consultations, and treatment guidance to the local community—promoting eye health and early detection of visual issues.",
//     className: "md:col-span-1",
//   },
//   {
//     id: "4",
//     url: "https://res.cloudinary.com/dwkili7et/image/upload/v1747379641/4_wkmxbx.png",
//     title: "Mgood Eye Care camp",
//     description: "On May 15, Mgood.org conducted a free Eye Camp offering vision screenings, consultations, and treatment guidance to the local community—promoting eye health and early detection of visual issues.",
//     className: "md:col-span-1 md:row-span-2",
//   },
//   {
//     id: "5",
//     url: "https://res.cloudinary.com/dwkili7et/image/upload/v1747379642/2_rsdkeq.png",
//     title: "Mgood Eye Care camp",
//     description: "On May 15, Mgood.org conducted a free Eye Camp offering vision screenings, consultations, and treatment guidance to the local community—promoting eye health and early detection of visual issues.",
//     className: "md:col-span-1 md:row-span-2", // This will span 1 column and 2 rows
//   },
//   {
//     id: "6",
//     url: "https://res.cloudinary.com/dwkili7et/image/upload/v1747379641/6_klbh3u.png",
//     title: "Mgood Eye Care camp",
//     description: "On May 15, Mgood.org conducted a free Eye Camp offering vision screenings, consultations, and treatment guidance to the local community—promoting eye health and early detection of visual issues.",
//     className: "md:col-span-1",
//   },
// ];

// const Gallery = () => {

//   const cards = sampleImages.map((image) => ({
//     id: image.id, 
//     className: image.className, 
//     thumbnail: image.url, 
   
//     content: (
//       <div>
//         <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
//           {image.title}
//         </h2>
//         <p className="text-sm md:text-base text-neutral-200">
//           {image.description}
//         </p>
//       </div>
//     ),
//   }));

//   return (
//     <>
//      <h1 className="text-center text-xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-red-500 to-amber-400 drop-shadow-xl tracking-tight mb-16 animate-fade-in-up">
//   ✨ Mgood Gallery ✨
// </h1>

//       <LayoutGrid cards={cards} />
//     </>
//   );
// };

// export default Gallery;












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





// "use client";
// import React from "react";
// import { LayoutGrid } from "@/components/ui/layout-grid";

// // Ensure all 'url', 'title', and 'description' fields are correctly populated and are strings.
// // The error "Minified React error #130" often means you're trying to render an object where a string/number/React element is expected.
// // This usually happens if image.title or image.description is an object.
// const sampleImages = [
//   {
//     id: "1",
//     url: "https://res.cloudinary.com/dwkili7et/image/upload/v1717379642/7_qny7ea.png", // Corrected typo from v1747... to v1717... for a more plausible date
//     title: "Mgood Eye Care Camp - Image 1",
//     description: "On May 15, Mgood.org conducted a free Eye Camp offering vision screenings, consultations, and treatment guidance to the local community—promoting eye health and early detection of visual issues.",
//     className: "md:col-span-1",
//   },
//   {
//     id: "2",
//     url: "https://res.cloudinary.com/dwkili7et/image/upload/v1717379145/WhatsApp_Image_2025-05-16_at_07.44.33_subg5u.jpg", // Corrected typo
//     title: "Mgood Eye Care Camp - Image 2",
//     description: "On May 15, Mgood.org conducted a free Eye Camp offering vision screenings, consultations, and treatment guidance.",
//     className: "md:col-span-2 md:row-span-2",
//   },
//   {
//     id: "3",
//     url: "https://res.cloudinary.com/dwkili7et/image/upload/v1717379641/5_ptg0ws.png", // Corrected typo
//     title: "Mgood Eye Care Camp - Image 3",
//     description: "Promoting eye health and early detection of visual issues within the local community.",
//     className: "md:col-span-1",
//   },
//   {
//     id: "4",
//     url: "https://res.cloudinary.com/dwkili7et/image/upload/v1717379641/4_wkmxbx.png", // Corrected typo
//     title: "Mgood Eye Care Camp - Image 4",
//     description: "Vision screenings and consultations provided during the Mgood.org free Eye Camp.",
//     className: "md:col-span-1 md:row-span-2",
//   },
//   {
//     id: "5",
//     url: "https://res.cloudinary.com/dwkili7et/image/upload/v1717379642/2_rsdkeq.png", // Corrected typo
//     title: "Mgood Eye Care Camp - Image 5",
//     description: "Treatment guidance offered at the eye camp for various visual impairments.",
//     className: "md:col-span-1 md:row-span-2",
//   },
//   {
//     id: "6",
//     url: "https://res.cloudinary.com/dwkili7et/image/upload/v1717379641/6_klbh3u.png", // Corrected typo
//     title: "Mgood Eye Care Camp - Image 6",
//     description: "Mgood.org's initiative to support community eye health through accessible care.",
//     className: "md:col-span-1",
//   },
// ];

// const Gallery = () => {
//   // Map sampleImages to the format expected by LayoutGrid
//   const cards = sampleImages.map((image) => {
//     // CRITICAL: Ensure image.title and image.description are strings.
//     // If they are objects, React will throw an error when trying to render them.
//     if (typeof image.title !== 'string' || typeof image.description !== 'string') {
//       console.error("Error: Image title or description is not a string for image.id:", image.id, image);
//       // Fallback to prevent rendering an object, or handle error appropriately
//     }

//     return {
//       id: image.id,
//       className: image.className,
//       thumbnail: image.url, // This is used as src for the image
//       // Content is JSX that will be rendered inside SelectedCard
//       content: (
//         <div>
//           <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
//             {image.title} {/* Must be a string or valid React child */}
//           </h2>
//           <p className="text-sm md:text-base text-neutral-200">
//             {image.description} {/* Must be a string or valid React child */}
//           </p>
//         </div>
//       ),
//     };
//   });

//   return (
//     <div className="min-h-screen bg-white text-white py-10"> {/* Added a container with background */}
//       <h1 className="text-center text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-red-500 to-amber-400 drop-shadow-xl tracking-tight mb-10 md:mb-16">
//         ✨ Mgood Gallery ✨
//       </h1>
//       <LayoutGrid cards={cards} />
//     </div>
//   );
// };

// export default Gallery;





// // Gallery.js
// "use client";
// import React from "react";
// import { LayoutGrid } from "@/components/ui/layout-grid";

// const sampleImages = [
//   {
//     id: "1",
//     url: "https://res.cloudinary.com/dwkili7et/image/upload/v1717379642/7_qny7ea.png",
//     title: "Mgood Eye Care Camp - Image 1",
//     description: "On May 15, Mgood.org conducted a free Eye Camp offering vision screenings, consultations, and treatment guidance to the local community—promoting eye health and early detection of visual issues.",
//     className: "md:col-span-1",
//   },
//   {
//     id: "2",
//     url: "https://res.cloudinary.com/dwkili7et/image/upload/v1717379145/WhatsApp_Image_2025-05-16_at_07.44.33_subg5u.jpg",
//     title: "Mgood Eye Care Camp - Image 2",
//     description: "On May 15, Mgood.org conducted a free Eye Camp offering vision screenings, consultations, and treatment guidance.",
//     className: "md:col-span-2 md:row-span-2",
//   },
//   {
//     id: "3",
//     url: "https://res.cloudinary.com/dwkili7et/image/upload/v1717379641/5_ptg0ws.png",
//     title: "Mgood Eye Care Camp - Image 3",
//     description: "Promoting eye health and early detection of visual issues within the local community.",
//     className: "md:col-span-1",
//   },
//   {
//     id: "4",
//     url: "https://res.cloudinary.com/dwkili7et/image/upload/v1717379641/4_wkmxbx.png",
//     title: "Mgood Eye Care Camp - Image 4",
//     description: "Vision screenings and consultations provided during the Mgood.org free Eye Camp.",
//     className: "md:col-span-1 md:row-span-2",
//   },
//   {
//     id: "5",
//     url: "https://res.cloudinary.com/dwkili7et/image/upload/v1717379642/2_rsdkeq.png",
//     title: "Mgood Eye Care Camp - Image 5",
//     description: "Treatment guidance offered at the eye camp for various visual impairments.",
//     className: "md:col-span-1 md:row-span-2",
//   },
//   {
//     id: "6",
//     url: "https://res.cloudinary.com/dwkili7et/image/upload/v1717379641/6_klbh3u.png",
//     title: "Mgood Eye Care Camp - Image 6",
//     description: "Mgood.org's initiative to support community eye health through accessible care.",
//     className: "md:col-span-1",
//   },
// ];

// const Gallery = () => {
//   const cards = sampleImages.map((image) => {
//     const safeTitle = typeof image.title === 'string' ? image.title : 'Untitled Image';
//     const safeDescription = typeof image.description === 'string' ? image.description : 'No description available.';

//     if (typeof image.title !== 'string' || typeof image.description !== 'string') {
//       console.warn( // Changed to warn, as we're providing fallbacks
//         "Warning: Image title or description was not a string for image.id:",
//         image.id,
//         "Original data:", image
//       );
//     }

//     return {
//       id: image.id,
//       className: image.className,
//       thumbnail: image.url,
//       title: safeTitle, // Pass the safe title for alt tags and other uses
//       content: (
//         <div>
//           <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
//             {safeTitle} {/* Use the sanitized title */}
//           </h2>
//           <p className="text-sm md:text-base text-neutral-200">
//             {safeDescription} {/* Use the sanitized description */}
//           </p>
//         </div>
//       ),
//     };
//   });

//   return (
//     <div className="min-h-screen bg-white text-white py-10">
//       <h1 className="text-center text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-red-500 to-amber-400 drop-shadow-xl tracking-tight mb-10 md:mb-16">
//         ✨ Mgood Gallery ✨
//       </h1>
//       <LayoutGrid cards={cards} />
//     </div>
//   );
// };

// export default Gallery;

"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Make sure this path is correct for your project

// 1. Data previously in Gallery.js (sampleImages)
const sampleImages = [
  {
    id: "1",
    url: "https://res.cloudinary.com/dwkili7et/image/upload/v1717379642/7_qny7ea.png",
    title: "Mgood Eye Care Camp - Image 1",
    description: "On May 15, Mgood.org conducted a free Eye Camp offering vision screenings, consultations, and treatment guidance to the local community—promoting eye health and early detection of visual issues.",
    className: "md:col-span-1",
  },
  {
    id: "2",
    url: "https://res.cloudinary.com/dwkili7et/image/upload/v1717379145/WhatsApp_Image_2025-05-16_at_07.44.33_subg5u.jpg",
    title: "Mgood Eye Care Camp - Image 2",
    description: "On May 15, Mgood.org conducted a free Eye Camp offering vision screenings, consultations, and treatment guidance.",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    id: "3",
    url: "https://res.cloudinary.com/dwkili7et/image/upload/v1717379641/5_ptg0ws.png",
    title: "Mgood Eye Care Camp - Image 3",
    description: "Promoting eye health and early detection of visual issues within the local community.",
    className: "md:col-span-1",
  },
  {
    id: "4",
    url: "https://res.cloudinary.com/dwkili7et/image/upload/v1717379641/4_wkmxbx.png",
    title: "Mgood Eye Care Camp - Image 4",
    description: "Vision screenings and consultations provided during the Mgood.org free Eye Camp.",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    id: "5",
    url: "https://res.cloudinary.com/dwkili7et/image/upload/v1717379642/2_rsdkeq.png",
    title: "Mgood Eye Care Camp - Image 5",
    description: "Treatment guidance offered at the eye camp for various visual impairments.",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    id: "6",
    url: "https://res.cloudinary.com/dwkili7et/image/upload/v1717379641/6_klbh3u.png",
    title: "Mgood Eye Care Camp - Image 6",
    description: "Mgood.org's initiative to support community eye health through accessible care.",
    className: "md:col-span-1",
  },
  // Example of potentially problematic data (uncomment to test console warnings):
  // {
  //   id: "7",
  //   url: "https://res.cloudinary.com/dwkili7et/image/upload/v1717379641/6_klbh3u.png", // Reusing URL for test
  //   title: {text: "This is an object title"},
  //   description: {text: "This is an object description"},
  //   className: "md:col-span-1",
  // }
];

// 2. Main Page Component (combines Gallery and LayoutGrid usage)
const Gallery = () => {
  // Mapping logic to prepare cards for LayoutGridInternal
  const cards = sampleImages.map((image) => {
    // Ensure title and description are strings, provide fallbacks
    const safeTitle = typeof image.title === 'string' ? image.title : 'Untitled Image';
    const safeDescription = typeof image.description === 'string' ? image.description : 'No description available.';
    const safeThumbnail = typeof image.url === 'string' ? image.url : ''; // Fallback for URL

    if (typeof image.id === 'undefined' || image.id === null || image.id === '') {
        console.error("CRITICAL: Image data is missing an 'id'. This will break layout animations.", image);
        // Potentially assign a temporary unique ID or filter out this item
    }
    if (typeof image.title !== 'string') {
      console.warn(
        `Warning: Image title is not a string for image.id: ${image.id}. Type: ${typeof image.title}. Value:`, image.title,
        "Using fallback title:", safeTitle
      );
    }
    if (typeof image.description !== 'string') {
      console.warn(
        `Warning: Image description is not a string for image.id: ${image.id}. Type: ${typeof image.description}. Value:`, image.description,
        "Using fallback description:", safeDescription
      );
    }
    if (typeof image.url !== 'string' || image.url === '') {
      console.warn(
        `Warning: Image URL is missing or not a string for image.id: ${image.id}. Type: ${typeof image.url}. Value:`, image.url
      );
    }


    return {
      id: String(image.id), // Ensure ID is a string for consistency with layoutId
      className: image.className || "", // Ensure className is a string
      thumbnail: safeThumbnail,
      title: safeTitle, // For alt tags and direct use
      // Content is JSX that will be rendered inside SelectedCard
      // content: ( // This MUST be a valid React element.
      //   <div>
      //     <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
      //       {safeTitle} {/* Render the sanitized string title */}
      //     </h2>
      //     <p className="text-sm md:text-base text-neutral-200">
      //       {safeDescription} {/* Render the sanitized string description */}
      //     </p>
      //   </div>
      // ),
    };
  });

  return (
    <div className="min-h-screen bg-white text-white py-10">
      <h1 className="text-center text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-red-500 to-amber-400 drop-shadow-xl tracking-tight mb-10 md:mb-16">
        ✨ Mgood Gallery ✨
      </h1>
      <LayoutGridInternal cards={cards} />
    </div>
  );
};

// 3. Internal LayoutGrid component structure
const LayoutGridInternal = ({ cards }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [lastSelectedId, setLastSelectedId] = useState(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!cards) {
    console.error("LayoutGridInternal: 'cards' prop is undefined or null.");
    return <div className="text-red-500 p-4">Error: Cards data not provided.</div>;
  }

  // SSR Fallback or initial render before client-side mount
  if (!hasMounted) {
    return (
      <div className="w-full p-4 md:p-10 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 relative">
        {cards.map((card, i) => {
          if (!card || typeof card.id === 'undefined') {
            console.warn("SSR Fallback: Invalid card data at index", i, card);
            return <div key={`ssr-fallback-invalid-${i}`} className="bg-neutral-700 aspect-video rounded-xl flex items-center justify-center"><p>Invalid Card</p></div>;
          }
          const altText = typeof card.title === 'string' ? card.title : "Gallery thumbnail";
          const imgSrc = typeof card.thumbnail === 'string' ? card.thumbnail : "";

          return (
            <div key={card.id || `ssr-fallback-${i}`} className={cn(card.className, "bg-neutral-800 aspect-video rounded-xl")}>
              {imgSrc ? (
                <img
                  src={imgSrc}
                  height="500"
                  width="500"
                  className="object-cover object-top absolute inset-0 h-full w-full transition duration-200"
                  alt={altText}
                />
              ) : (
                <div className="flex items-center justify-center h-full w-full"><p className="text-neutral-400">Image N/A</p></div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  const selected = cards.find((c) => c && c.id === selectedId); // Add check for c
  const lastSelected = cards.find((c) => c && c.id === lastSelectedId); // Add check for c

  const handleClick = (cardId) => {
    if (typeof cardId === 'undefined' || cardId === null) {
        console.warn("handleClick: received undefined or null cardId");
        return;
    }
    setLastSelectedId(selectedId);
    setSelectedId(String(cardId)); // Ensure ID is a string
  };

  const handleOutsideClick = () => {
    setLastSelectedId(selectedId);
    setSelectedId(null);
  };

  return (
    <div className="w-full p-4 md:p-10 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 relative">
      {cards.map((card, i) => {
        if (!card || typeof card.id === 'undefined') {
            console.error("LayoutGridInternal render: Card or card.id is missing at index", i, card);
            return <div key={`invalid-card-${i}`} className="bg-red-200 p-2">Invalid card data</div>;
        }
        const cardIdStr = String(card.id); // Ensure ID is string for layoutId

        return (
            <div key={cardIdStr} className={cn(card.className)}>
            <motion.div
                onClick={() => handleClick(cardIdStr)}
                className={cn(
                "relative overflow-hidden rounded-xl cursor-pointer group",
                selected?.id === cardIdStr
                    ? "rounded-lg absolute inset-0 h-[60vh] md:h-1/2 w-full md:w-3/4 lg:w-1/2 m-auto z-50 flex justify-center items-center flex-col bg-black shadow-2xl"
                    : lastSelected?.id === cardIdStr
                    ? "z-40 rounded-xl h-full w-full bg-white"
                    : "bg-neutral-800 aspect-video"
                )}
                layoutId={`card-${cardIdStr}`} // layoutId requires a string
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <ImageComponent card={card} />
                {selected?.id === cardIdStr && <SelectedCard selected={selected} />}
            </motion.div>
            </div>
        );
      })}

      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "absolute h-full w-full left-0 top-0 bg-black opacity-0 z-30",
          selectedId ? "pointer-events-auto" : "pointer-events-none"
        )}
        animate={{ opacity: selectedId ? 0.7 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
};

// 4. Helper components (ImageComponent, SelectedCard)
const ImageComponent = ({ card }) => {
  if (!card || typeof card.id === 'undefined') {
    console.error("ImageComponent: Card or card.id is missing.", card);
    return <div className="bg-red-500 text-white p-2 h-full w-full flex items-center justify-center">Error: Card ID missing</div>;
  }
  if (typeof card.thumbnail !== 'string' || !card.thumbnail) {
    console.warn("ImageComponent: Card thumbnail is missing, not a string, or empty for card.id:", card.id, "Thumbnail:", card.thumbnail);
    return <div className="bg-neutral-700 text-neutral-300 p-2 h-full w-full flex items-center justify-center">Image Not Available</div>;
  }
  const altText = typeof card.title === 'string' ? card.title : "Gallery image";
  const cardIdStr = String(card.id);

  return (
    <motion.img
      layoutId={`image-${cardIdStr}-image`} // layoutId requires a string
      src={card.thumbnail}
      // It's generally better to let CSS control height/width of responsive images
      // rather than fixed HTML attributes if using object-cover.
      // height="500"
      // width="500"
      className="object-cover object-top absolute inset-0 h-full w-full group-hover:scale-105 transition-transform duration-300 ease-in-out"
      alt={altText}
      onError={(e) => {
        console.error("Image failed to load:", card.thumbnail, "for card.id:", card.id, e);
        // Optionally, you could set a fallback image source here via state
        // e.target.src = '/path/to/fallback-image.png';
      }}
    />
  );
};

const SelectedCard = ({ selected }) => {
  if (!selected || typeof selected.id === 'undefined') {
    console.error("SelectedCard: Selected item or selected.id is missing.", selected);
    return null;
  }
  const cardIdStr = String(selected.id);

  // --- CRITICAL DEBUGGING ---
  // This will tell you exactly what 'selected.content' is before rendering.
  console.log(
    "SelectedCard rendering for ID:", cardIdStr,
    "Type of selected.content:", typeof selected.content,
    "Is selected.content a valid React element?", React.isValidElement(selected.content),
    "Value of selected.content:", selected.content
  );

  if (!selected.content) {
    console.warn("SelectedCard: selected.content is missing or falsy for id:", cardIdStr);
    return (
        <div className="text-yellow-400 p-4 bg-black/50">
            Content not available for this item.
        </div>
    );
  }
  
  // Explicitly check if content is an object but not a React element
  if (typeof selected.content === 'object' && selected.content !== null && !React.isValidElement(selected.content)) {
    console.error(
        "FATAL: SelectedCard received 'selected.content' as an object that is NOT a React element for id:", cardIdStr,
        "Content causing error:", selected.content
    );
    // This is likely the direct cause of "Minified React error #130"
    return <div className="text-red-500 p-4 bg-black/70">Error: Invalid content data structure. Check console for details.</div>;
  }
  // --- END CRITICAL DEBUGGING ---


  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg relative z-[60] p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent z-[65]"
      />
      <motion.div
        layoutId={`content-${cardIdStr}`} // layoutId requires a string
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ duration: 0.3, ease: "easeInOut", delay: 0.15 }}
        className="relative z-[70]"
      >
        {selected.content} {/* This is where the error likely happens if content is bad */}
      </motion.div>
    </div>
  );
};

export default Gallery;




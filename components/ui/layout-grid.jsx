// "use client";
// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { cn } from "@/lib/utils"; // Make sure you have this utility or replace with a classnames library

// export const LayoutGrid = ({ cards }) => {
//   const [selectedId, setSelectedId] = useState(null);
//   const [lastSelectedId, setLastSelectedId] = useState(null);
//   const [hasMounted, setHasMounted] = useState(false);

//   useEffect(() => {
//     setHasMounted(true);
//   }, []);

//   // Prevents SSR/hydration mismatch for layout animations
//   if (!hasMounted) {
//     // Optionally, you can render a static version or a loader here for SSR
//     // For simplicity, returning null if not mounted client-side
//     return (
//       <div className="w-full p-4 md:p-10 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 relative">
//         {cards.map((card, i) => (
//           <div key={card.id || i} className={cn(card.className, "bg-neutral-800 aspect-video rounded-xl")}>
//             {/* Basic placeholder or simplified view for SSR */}
//             <img
//               src={card.thumbnail}
//               height="500"
//               width="500"
//               className="object-cover object-top absolute inset-0 h-full w-full transition duration-200"
//               alt={typeof card.title === 'string' ? card.title : "thumbnail"}
//             />
//           </div>
//         ))}
//       </div>
//     );
//   }

//   const selected = cards.find((c) => c.id === selectedId);
//   const lastSelected = cards.find((c) => c.id === lastSelectedId);

//   const handleClick = (cardId) => {
//     setLastSelectedId(selectedId);
//     setSelectedId(cardId);
//   };

//   const handleOutsideClick = () => {
//     setLastSelectedId(selectedId);
//     setSelectedId(null);
//   };

//   return (
//     <div className="w-full p-4 md:p-10 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 relative">
//       {cards.map((card, i) => (
//         <div key={card.id || i} className={cn(card.className)}>
//           <motion.div
//             onClick={() => handleClick(card.id)}
//             className={cn(
//               "relative overflow-hidden rounded-xl cursor-pointer group",
//               selected?.id === card.id
//                 ? "rounded-lg absolute inset-0 h-[60vh] md:h-1/2 w-full md:w-3/4 lg:w-1/2 m-auto z-50 flex justify-center items-center flex-col bg-black shadow-2xl"
//                 : lastSelected?.id === card.id
//                 ? "z-40 rounded-xl h-full w-full bg-white" // This might need a background color to cover underlying content if it's not meant to be transparent
//                 : "bg-neutral-800 aspect-video" // Default card background
//             )}
//             layoutId={`card-${card.id}`}
//             transition={{ duration: 0.3, ease: "easeInOut" }} // Added default transition
//           >
//             <ImageComponent card={card} />
//             {selected?.id === card.id && <SelectedCard selected={selected} />}
//           </motion.div>
//         </div>
//       ))}

//       <motion.div
//         onClick={handleOutsideClick}
//         className={cn(
//           "absolute h-full w-full left-0 top-0 bg-black opacity-0 z-30",
//           selectedId ? "pointer-events-auto" : "pointer-events-none"
//         )}
//         animate={{ opacity: selectedId ? 0.7 : 0 }}
//         transition={{ duration: 0.2 }} // Added transition
//       />
//     </div>
//   );
// };

// const ImageComponent = ({ card }) => {
//   // Ensure card.id is unique and stable for layoutId
//   if (!card || !card.id) {
//     console.error("ImageComponent: Card or card.id is missing", card);
//     return null; // Or a placeholder
//   }
//   return (
//     <motion.img
//       layoutId={`image-${card.id}-image`}
//       src={card.thumbnail}
//       height="500" // These are props for the img tag, actual display size is controlled by CSS
//       width="500"
//       className="object-cover object-top absolute inset-0 h-full w-full group-hover:scale-105 transition-transform duration-300 ease-in-out" // Added group-hover effect
//       alt={typeof card.title === 'string' ? card.title : "thumbnail"} // Ensure title is a string for alt
//     />
//   );
// };

// const SelectedCard = ({ selected }) => {
//   // Ensure selected.id is unique and stable for layoutId
//   if (!selected || !selected.id) {
//     console.error("SelectedCard: Selected item or selected.id is missing", selected);
//     return null;
//   }
//   if (!selected?.content) return null;

//   return (
//     <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg relative z-[60] p-4 md:p-8">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.3, delay: 0.2 }}
//         className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent z-[65]"
//       />
//       <motion.div
//         layoutId={`content-${selected.id}`}
//         initial={{ opacity: 0, y: 60 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: 60 }} // Note: exit animations require AnimatePresence wrapping the component instance for this to work on removal
//         transition={{ duration: 0.3, ease: "easeInOut", delay: 0.15 }} // Slightly adjusted delay
//         className="relative z-[70]"
//       >
//         {selected.content}
//       </motion.div>
//     </div>
//   );
// };




// LayoutGrid.js (or relevant component file)
"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Make sure you have this utility

export const LayoutGrid = ({ cards }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [lastSelectedId, setLastSelectedId] = useState(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
      <div className="w-full p-4 md:p-10 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 relative">
        {cards.map((card, i) => (
          <div key={card.id || i} className={cn(card.className, "bg-neutral-800 aspect-video rounded-xl")}>
            <img
              src={card.thumbnail}
              height="500"
              width="500"
              className="object-cover object-top absolute inset-0 h-full w-full transition duration-200"
              alt={card.title || "Gallery thumbnail"} // Use card.title here
            />
          </div>
        ))}
      </div>
    );
  }

  const selected = cards.find((c) => c.id === selectedId);
  const lastSelected = cards.find((c) => c.id === lastSelectedId);

  const handleClick = (cardId) => {
    setLastSelectedId(selectedId);
    setSelectedId(cardId);
  };

  const handleOutsideClick = () => {
    setLastSelectedId(selectedId);
    setSelectedId(null);
  };

  return (
    <div className="w-full p-4 md:p-10 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 relative">
      {cards.map((card, i) => (
        <div key={card.id || i} className={cn(card.className)}>
          <motion.div
            onClick={() => handleClick(card.id)}
            className={cn(
              "relative overflow-hidden rounded-xl cursor-pointer group",
              selected?.id === card.id
                ? "rounded-lg absolute inset-0 h-[60vh] md:h-1/2 w-full md:w-3/4 lg:w-1/2 m-auto z-50 flex justify-center items-center flex-col bg-black shadow-2xl"
                : lastSelected?.id === card.id
                ? "z-40 rounded-xl h-full w-full bg-white"
                : "bg-neutral-800 aspect-video"
            )}
            layoutId={`card-${card.id}`}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ImageComponent card={card} /> {/* card object now contains title */}
            {selected?.id === card.id && <SelectedCard selected={selected} />}
          </motion.div>
        </div>
      ))}

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

const ImageComponent = ({ card }) => {
  if (!card || !card.id) {
    console.error("ImageComponent: Card or card.id is missing", card);
    return null;
  }
  return (
    <motion.img
      layoutId={`image-${card.id}-image`}
      src={card.thumbnail}
      height="500"
      width="500"
      className="object-cover object-top absolute inset-0 h-full w-full group-hover:scale-105 transition-transform duration-300 ease-in-out"
      alt={card.title || "Gallery image"} // Use card.title here
    />
  );
};

const SelectedCard = ({ selected }) => {
  if (!selected || !selected.id) {
    console.error("SelectedCard: Selected item or selected.id is missing", selected);
    return null;
  }
  if (!selected?.content) return null;

  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg relative z-[60] p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent z-[65]"
      />
      <motion.div
        layoutId={`content-${selected.id}`}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ duration: 0.3, ease: "easeInOut", delay: 0.15 }}
        className="relative z-[70]"
      >
        {selected.content} {/* This content is now guaranteed to have string titles/descriptions */}
      </motion.div>
    </div>
  );
};
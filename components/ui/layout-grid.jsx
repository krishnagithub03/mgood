// "use client";;
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// // import { motion } from "motion/react";
// import { cn } from "@/lib/utils";

// export const LayoutGrid = ({
//   cards
// }) => {
//   const [selected, setSelected] = useState(null);
//   const [lastSelected, setLastSelected] = useState(null);

//   const handleClick = (card) => {
//     setLastSelected(selected);
//     setSelected(card);
//   };

//   const handleOutsideClick = () => {
//     setLastSelected(selected);
//     setSelected(null);
//   };

//   return (
//     (<div
//       className="w-full h-full p-10 grid grid-cols-1 md:grid-cols-3  max-w-7xl mx-auto gap-4 relative">
//       {cards.map((card, i) => (
//         <div key={i} className={cn(card.className, "")}>
//           <motion.div
//             onClick={() => handleClick(card)}
//             className={cn(card.className, "relative overflow-hidden", selected?.id === card.id
//               ? "rounded-lg cursor-pointer absolute inset-0 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col"
//               : lastSelected?.id === card.id
//               ? "z-40 bg-white rounded-xl h-full w-full"
//               : "bg-white rounded-xl h-full w-full")}
//             layoutId={`card-${card.id}`}>
//             {selected?.id === card.id && <SelectedCard selected={selected} />}
//             <ImageComponent card={card} />
//           </motion.div>
//         </div>
//       ))}
//       <motion.div
//         onClick={handleOutsideClick}
//         className={cn(
//           "absolute h-full w-full left-0 top-0 bg-white opacity-0 z-10",
//           selected?.id ? "pointer-events-auto" : "pointer-events-none"
//         )}
//         animate={{ opacity: selected?.id ? 0.3 : 0 }} />
//     </div>)
//   );
// };

// const ImageComponent = ({
//   card
// }) => {
//   return (
//     (<motion.img
//       layoutId={`image-${card.id}-image`}
//       src={card.thumbnail}
//       height="500"
//       width="500"
//       className={cn(
//         "object-cover object-top absolute inset-0 h-full w-full transition duration-200"
//       )}
//       alt="thumbnail" />)
//   );
// };

// const SelectedCard = ({
//   selected
// }) => {
//   return (
//     (<div
//       className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]">
//       <motion.div
//         initial={{
//           opacity: 0,
//         }}
//         animate={{
//           opacity: 0.6,
//         }}
//         className="absolute inset-0 h-full w-full bg-black opacity-60 z-10" />
//       <motion.div
//         layoutId={`content-${selected?.id}`}
//         initial={{
//           opacity: 0,
//           y: 100,
//         }}
//         animate={{
//           opacity: 1,
//           y: 0,
//         }}
//         exit={{
//           opacity: 0,
//           y: 100,
//         }}
//         transition={{
//           duration: 0.3,
//           ease: "easeInOut",
//         }}
//         className="relative px-8 pb-4 z-[70]">
//         {selected?.content}
//       </motion.div>
//     </div>)
//   );
// };
// LayoutGrid.tsx


// "use client";
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// //  import { motion } from "motion/react";
// import { cn } from "@/lib/utils"; // Ensure this path is correct

// export const LayoutGrid = ({ cards }) => {
//   const [selected, setSelected] = useState(null);
//   const [lastSelected, setLastSelected] = useState(null);

//   const handleClick = (card) => {
//     setLastSelected(selected);
//     setSelected(card);
//   };

//   const handleOutsideClick = () => {
//     setLastSelected(selected);
//     setSelected(null);
//   };

//   return (
//     <div
      
//       className="w-full p-4 md:p-10 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 relative"
//     >
//       {cards.map((card, i) => (
//         // This div is the actual grid item. `card.className` applies here for col/row spanning.
//         <div key={card.id || i} className={cn(card.className, "")}>
//           <motion.div
//             onClick={() => handleClick(card)}
//             className={cn(
//               "relative overflow-hidden rounded-xl cursor-pointer group", // Base classes
//               selected?.id === card.id
//                 ? "rounded-lg absolute inset-0 h-[60vh] md:h-1/2 w-full md:w-3/4 lg:w-1/2 m-auto z-50 flex justify-center items-center flex-col bg-black shadow-2xl" // Selected card style
//                 : lastSelected?.id === card.id
//                 ? "z-40 rounded-xl h-full w-full bg-white" // Last selected style (ensure it fills the cell properly)
//                 : "bg-neutral-800 aspect-video" // Default card: placeholder bg, use aspect ratio to define height.
//                                                 // Common aspect ratios: aspect-square, aspect-video (16/9), aspect-[4/3]
//                                                 // Ensure `w-full` is effectively applied by grid cell.
//             )}
//             layoutId={`card-${card.id}`} // Ensure card.id is unique
//           >
//             {selected?.id === card.id && <SelectedCard selected={selected} />}
//             {/* ImageComponent should fill this motion.div */}
//             <ImageComponent card={card} isSelected={selected?.id === card.id} />
//           </motion.div>
//         </div>
//       ))}
//       <motion.div
//         onClick={handleOutsideClick}
//         className={cn(
//           "absolute h-full w-full left-0 top-0 bg-black opacity-0 z-30", // Overlay matches dark theme
//           selected?.id ? "pointer-events-auto" : "pointer-events-none"
//         )}
//         animate={{ opacity: selected?.id ? 0.7 : 0 }} // Darker overlay when active
//       />
//     </div>
//   );
// };

// // const ImageComponent = ({ card, isSelected }) => {
// //   return (
// //     <motion.img
// //       layoutId={`image-${card.id}-image`} // Ensure card.id is unique
// //       src={card.thumbnail}
     
// //       className={cn(
// //         "object-cover object-center absolute inset-0 w-full h-full transition-opacity duration-300",
       
// //       )}
// //       alt={card.title || "thumbnail"}
// //     />
// //   );
// // };


// const ImageComponent = ({
//   card
// }) => {
//   return (
//     (<motion.img
//       layoutId={`image-${card.id}-image`}
//       src={card.thumbnail}
//       height="500"
//       width="500"
//       className={cn(
//         "object-cover object-top absolute inset-0 h-full w-full transition duration-200"
//       )}
//       alt="thumbnail" />)
//   );
// };


// const SelectedCard = ({ selected }) => {
//   if (!selected?.content) return null; // Handle cases where content might be missing

//   return (
//     <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg relative z-[60] p-4 md:p-8">
//       {/* Optional: Add a subtle gradient overlay behind the text for better readability */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.3, delay: 0.2 }} // Delay to allow card expansion
//         className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent z-[65]"
//       />
//       <motion.div
//         layoutId={`content-${selected.id}`} // Ensure selected.id is valid
//         initial={{ opacity: 0, y: 60 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: 60 }}
//         transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
//         className="relative z-[70]" // Content on top
//       >
//         {selected.content}
//       </motion.div>
//     </div>
//   );
// };

"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const LayoutGrid = ({ cards }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [lastSelectedId, setLastSelectedId] = useState(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null; // 🚫 Avoid mismatch

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
          >
            {selected?.id === card.id && <SelectedCard selected={selected} />}
            <ImageComponent card={card} isSelected={selected?.id === card.id} />
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
      />
    </div>
  );
};

const ImageComponent = ({ card }) => (
  <motion.img
    layoutId={`image-${card.id}-image`}
    src={card.thumbnail}
    height="500"
    width="500"
    className="object-cover object-top absolute inset-0 h-full w-full transition duration-200"
    alt={card.title || "thumbnail"}
  />
);

const SelectedCard = ({ selected }) => {
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
        transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
        className="relative z-[70]"
      >
        {selected.content}
      </motion.div>
    </div>
  );
};

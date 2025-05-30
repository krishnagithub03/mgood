"use client";
import React from "react";
import RollingGallery from "@/components/RollingGallery/RollingGallery";
import RotatingText from "@/components/RotatingText/RotatingText";

  


const RuralGallery = () =>{
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
  <div>
<RollingGallery autoplay={true} pauseOnHover={true} />
  </div>


</>
    )
}


export default RuralGallery;

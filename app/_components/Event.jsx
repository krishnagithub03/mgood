"use client";
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text';
import { Button } from '@/components/ui/button'
import React from 'react'
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
const Event = () => {
  return (
    <>
    {/* <div className='text-center bg-white-100 py-2 text-sm font-medium'>
        <span>Play MHL And Earn Rewards 🏏 </span> 
        <Button className="text-center bg-primary py-2 text-sm font-medium" onClick={() => window.location.href = '/MHL'}>
            Play
        </Button>
        
    </div> */}
     {/* <div className='text-center bg-white-100 py-2 text-xl font-lg'> */}
     {/* <span >Health Camp Registration </span>  */}
     {/* <Button className="text-center bg-primary py-2 text-sm font-medium" >
         Click me
     </Button> */}
     <div className="group relative my-10 mx-auto w-80 md:w-[400px] flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]" onClick={() => window.location.href = '/camp'}>
      <span
        className={cn(
          "absolute inset-0 block h-auto w-auto animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]",
        )}
        style={{
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "subtract",
          WebkitClipPath: "padding-box",
        }}
      />
    
     <AnimatedGradientText className="text-xl md:text-2xl font-bold cursor-pointer " >
        Health Camp Registration
      </AnimatedGradientText>
      <ChevronRight
        className="ml-1 size-4 stroke-neutral-500 transition-transform
 duration-300 ease-in-out group-hover:translate-x-0.5"
      />
    </div>
     

 </>
  )
}

export default Event
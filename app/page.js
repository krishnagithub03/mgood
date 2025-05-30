import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "./_components/Hero";
import Testimonials from "./_components/Testimonials";
import Faqs from "./_components/Faqs";
import Plans from "./_components/Plans";
import Gallery from "./_components/Gallery";
import Event from "./_components/Event";
import { Slider } from "./_components/Slider";
import RuralGallery from "./_components/RuralGallery";


export default function Home() {
  return (
    <div>
       <Event />
       <Slider/>
      <Plans />
      {/* hero->searchbar + category */}
      <Hero />
      <Gallery/>
      <Testimonials />
      <Faqs />
      <RuralGallery/>
      

    </div>
  );
}

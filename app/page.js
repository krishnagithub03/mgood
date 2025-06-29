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
import Trusted from "./_components/Trusted";
import Numbers from "./_components/Numbers";
import Services from "./_components/Services";


export default function Home() {
  return (
    <div>
       <Event />
       <Slider/>
      <Plans />
      <Numbers/>
      <Hero />
      
      <Services/>
      <Gallery/>
      <Trusted/>
      <Testimonials />
      <Faqs />
      <RuralGallery/>
      

    </div>
  );
}

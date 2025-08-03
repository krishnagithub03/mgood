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
import Logo from "./_components/Tieup"

export const metadata = {
  title: "MGood | Medical Tourism Near Me • Premium Healthcare Services • Best Digital Health Platform",
  description:
    "Explore premium healthcare services, treatment in foreign countries, annual health checkups, full body health checkup packages, and online doctor consultation near me on the leading healthtech startup platform.",
};


export default function Home() {
  return (
    <div>
       {/* <Event /> */}
       <Slider/>
       <Numbers/>
       <Trusted/>
      <Plans />
      <Services />
      <Logo/>
      
      <Hero />

      
      <Gallery/>
     
      <Testimonials />
      <Faqs />
      <RuralGallery/>
      

    </div>
  );
}

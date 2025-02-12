import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "./_components/Hero";
import Testimonials from "./_components/Testimonials";
import Faqs from "./_components/Faqs";
export default function Home() {
  return (
    <div>
      {/* hero->searchbar + category */}
      <Hero />
      <Testimonials />
      <Faqs />
    </div>
  );
}

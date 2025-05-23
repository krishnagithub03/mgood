"use client";

import React from "react";
import { motion } from "framer-motion";

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { Globe } from "@/components/magicui/globe"; // Assuming this path is correct
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

// ... (testimonials and other constants remain the same) ...
const testimonials = [
  {
    quote:
      "Driving strategic marketing initiatives, ensuring legal compliance, and cultivating high-impact sponsorships to elevate brand value and integrity.",
    name: "Mr. Puneet Singhal",
    designation: "Head - Marketing , legal and Sponsorship",
    src: "/mgood-puneet.jpg",
  },
  {
    quote:
      "Driving operational excellence through streamlined processes and efficient administration to ensure seamless business functionality.",
    name: "Mrs. Garima Gangal",
    designation: "Head - Admin & Process",
    src: "/mgood-garima.jpg",
  },
  {
    quote:
      "Designing, managing, and securing robust IT infrastructure systems that power business continuity and digital transformation.",
    name: "Mr. Krishna Agrawal",
    designation: "IT Infrastructure Expert",
    src: "/mgood-krishna.jpg",
  },
];


const AboutUs = () => {
  const aboutMGoodText =
  "At MGood, we've made a promise to make doctors accessible to " +
  "everyone by 2029. We're working tirelessly to turn this vision " +
  "into a reality. Our commitment goes beyond teleconsultation. We're " +
  "dedicated to empowering our Medical Good Partners (MGPs) to " +
  "achieve their dreams of being part of a multispecialty setup. " +
  "Remember, MGood is more than just a platform - we're a friend in " +
  "need. Join hands with us, and together, let's create a world " +
  "that's not just a place to live, but a good - an MGood - " +
  "place to thrive.";

   const aboutIndia ="The healthcare industry in India is one of the largest and fastest-growing sectors in the country, both in terms of revenue and employment. Driven by factors such as a growing population, rising incomes, increased health awareness, and government initiatives like Ayushman Bharat, the industry has seen significant expansion in recent years. It encompasses hospitals, medical devices, clinical trials, telemedicine, medical tourism, health insurance, and diagnostics. Despite these advancements, the sector faces challenges such as disparities in access between urban and rural areas, a shortage of healthcare professionals, and the need for better infrastructure. Nevertheless, India continues to make progress toward achieving universal health coverage and improving the overall quality of care.";


  return (
    <section className="overflow-x-hidden">
      {/* About MGood Section */}
      <div className="flex items-center justify-center md:min-h-[60vh] min-h-[auto] py-16 md:py-20 px-6 md:px-10">
        <div className="flex flex-col gap-6 max-w-4xl mx-auto text-center">
          <h1 className="md:text-5xl text-3xl font-display font-bold">
            About
            
            <span className="text-primary mx-2 ">MGOOD</span>
           
          </h1>
          <TextGenerateEffect
            words={aboutMGoodText}
            className={"italic font-body md:text-xl text-lg leading-relaxed"}
          />
        </div>
      </div>

      {/* Combined Healthcare in India & Globe Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-center gap-x-8 gap-y-12 py-12 md:py-16 px-6 md:px-10">
        {/* Left Side: Healthcare in India Text */}
        <div className="md:w-1/2 w-full flex flex-col justify-center md:items-start text-center md:text-left">
          <h1 className="md:text-5xl text-3xl font-display font-bold mb-6">
            Healthcare in
            <span className="text-primary mx-2 ">INDIA</span>
          </h1>
          <TextGenerateEffect
            words={aboutIndia}
            className={"italic font-body md:text-xl text-lg leading-relaxed"}
          />
        </div>

        {/* Right Side: Globe */}
        {/* This container provides the column space. Globe component handles its own centering and max-width. */}
        <div className="md:w-1/2 w-full flex justify-center items-center">
          {/* The Globe component itself is w-full, max-w-[600px], aspect-[1/1], and mx-auto.
              It will fill this container's width up to 600px and center itself if the container is wider. */}
          <Globe />
        </div>
      </div>


      
      <div className="grid grid-cols-1 md:grid-cols-3 p-6 md:p-8 bg-slate-100 items-center gap-8 md:gap-10">
      
      {/* Image Animation */}
      <motion.div
        className="md:col-span-1 flex justify-center items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut",delay: 2}}
      >
        <img
          src="/mgood-rajendra.jpg"
          alt="MD of MGood"
          className="h-60 w-60 sm:h-64 sm:w-64 md:h-96 md:w-80 rounded-full overflow-hidden object-cover shadow-lg"
        />
      </motion.div>

      {/* Text Animation */}
      <motion.div
        className="md:col-span-2 md:p-4 lg:p-8 my-auto"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 2.8 }}
      >
        <h2 className="md:text-3xl text-2xl font-display font-bold p-2 text-center md:text-left">
          MD's <span className="text-primary">Desk</span>
        </h2>
        <p className="font-body p-2 text-base md:text-lg leading-relaxed text-gray-700 text-center md:text-left">
          I am thrilled to introduce MGood, a revolutionary platform poised to
          transform the healthcare industry. Our mission is bold and ambitious:{" "}
          <span className="font-bold text-primary italic">
            "Doctor for All by 2029."
          </span>{" "}
          We envision a world where geographical boundaries and socio-economic
          disparities no longer hinder access to quality medical care. At
          MGood, we are committed to making this vision a reality. Our team is
          working tirelessly to ensure that everyone, regardless of their
          location or background, has access to reliable and affordable
          healthcare services. We believe that healthcare is a fundamental
          human right, and we are dedicated to bridging the gap between those
          who need medical attention and the healthcare professionals who can
          provide it. Join us on this extraordinary journey as we strive to
          create a healthier, more compassionate world. Together, let's make
          "Doctor for All" a reality by 2029. Stay tuned for updates on our
          progress, and let's transform the healthcare landscape together!
        </p>
      </motion.div>

    </div>


      {/* MD's Desk
      <div className="grid grid-cols-1 md:grid-cols-3 p-6 md:p-8 bg-slate-100 items-center gap-8 md:gap-10">
        <div className="md:col-span-1 flex justify-center items-center">
          <img
            src="/mgood-rajendra.jpg"
            alt="MD of MGood"
            className="h-60 w-60 sm:h-64 sm:w-64 md:h-96 md:w-80 rounded-full overflow-hidden object-cover shadow-lg"
          />
        </div>
        <div className="md:col-span-2 md:p-4 lg:p-8 my-auto">
          <h2 className="md:text-3xl text-2xl font-display font-bold p-2 text-center md:text-left">
            MD's <span className="text-primary">Desk</span>
          </h2>
          <p className="font-body p-2 text-base md:text-lg leading-relaxed text-gray-700 text-center md:text-left">
            I am thrilled to introduce MGood, a revolutionary platform poised to
            transform the healthcare industry. Our mission is bold and
            ambitious:{" "}
            <span className="font-bold text-primary italic">
              "Doctor for All by 2029."
            </span>{" "}
            We envision a world where geographical boundaries and socio-economic
            disparities no longer hinder access to quality medical care. At
            MGood, we are committed to making this vision a reality. Our team is
            working tirelessly to ensure that everyone, regardless of their
            location or background, has access to reliable and affordable
            healthcare services. We believe that healthcare is a fundamental
            human right, and we are dedicated to bridging the gap between those
            who need medical attention and the healthcare professionals who can
            provide it. Join us on this extraordinary journey as we strive to
            create a healthier, more compassionate world. Together, let's make
            "Doctor for All" a reality by 2029. Stay tuned for updates on our
            progress, and let's transform the healthcare landscape together!
          </p>
        </div>
      </div> */}

      {/* Our Team */}
      <div className="bg-white dark:bg-gray-900" id="our-team">
        <div className="py-12 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
          <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Our Team
            </h2>
            <p className="font-light text-gray-500 lg:mb-10 sm:text-xl dark:text-gray-400">
              Meet out experts who are driving the MGood platform and brand.
            </p>
            <div className="mt-8 md:mt-12">
              <AnimatedTestimonials testimonials={testimonials} />
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default AboutUs;
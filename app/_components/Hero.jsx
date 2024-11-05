"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  const [showAll, setShowAll] = useState(false);
  const initalOptions = 8;
  const specialityList = [
    {
      id: 1,
      name: "Dental",
      imgPath: "fas fa-tooth",
      path: "/search/dentist",
    },
    {
      id: 2,
      name: "Ortho",
      imgPath: "fas fa-bone",
      path: "/search/ortho",
    },
    {
      id: 3,
      name: "Derma",
      imgPath: "fas fa-spray-can",
      path: "/search/derma",
    },
    {
      id: 4,
      name: "Patho",
      imgPath: "fas fa-vial",
      path: "/search/patho",
    },
    {
      id: 5,
      name: "Pedo",
      imgPath: "fas fa-baby",
      path: "/search/pedo",
    },
    {
      id: 6,
      name: "Physiotherapy",
      imgPath: "fas fa-running",
      path: "/search/physiotherapy",
    },
    {
      id: 7,
      name: "General Physician",
      imgPath: "fas fa-user-md",
      path: "/search/general-physician",
    },
    {
      id: 8,
      name: "Dietician",
      imgPath: "fas fa-apple-alt",
      path: "/search/dietician",
    },
    {
      id: 9,
      name: "Gyane",
      imgPath: "fas fa-female",
      path: "/search/gyane",
    },
    {
      id: 10,
      name: "Psychiatry",
      imgPath: "fas fa-brain",
      path: "/search/psychiatry",
    },
    {
      id: 11,
      name: "Cardio",
      imgPath: "fas fa-heartbeat",
      path: "/search/cardio",
    },
    {
      id: 12,
      name: "Neuro",
      imgPath: "fas fa-brain",
      path: "/search/neuro",
    },
    {
      id: 13,
      name: "Urology",
      imgPath: "fas fa-procedures",
      path: "/search/urology",
    },
    {
      id: 14,
      name: "Pulmonologist",
      imgPath: "fas fa-lungs",
      path: "/search/pulmonologist",
    },
    {
      id: 15,
      name: "General Surgeon",
      imgPath: "fas fa-stethoscope",
      path: "/search/general-surgeon",
    },
    {
      id: 16,
      name: "Radiology",
      imgPath: "fas fa-x-ray",
      path: "/search/radiology",
    },
    {
      id: 17,
      name: "Hair Transplant Clinics",
      imgPath: "fas fa-cut",
      path: "/search/hair-transplant-clinics",
    },
    {
      id: 18,
      name: "Plastic Surgeon",
      imgPath: "fas fa-user-ninja",
      path: "/search/plastic-surgeon",
    },
    {
      id: 19,
      name: "Ayurveda",
      imgPath: "fas fa-leaf",
      path: "/search/ayurveda",
    },
    {
      id: 20,
      name: "Homeopathy",
      imgPath: "fas fa-flask",
      path: "/search/homeopathy",
    },
    {
      id: 21,
      name: "Eye",
      imgPath: "fas fa-eye",
      path: "/search/eye",
    },
    {
      id: 22,
      name: "ENT",
      imgPath: "fas fa-head-side-cough",
      path: "/search/ent",
    },
    {
      id: 23,
      name: "Primary Healthcare Centres",
      imgPath: "fas fa-clinic-medical",
      path: "/search/primary-healthcare-centres",
    },
    {
      id: 24,
      name: "Yoga Instructors",
      imgPath: "fas fa-child",
      path: "/search/yoga-instructors",
    },
    {
      id: 25,
      name: "Pharmacy",
      imgPath: "fas fa-pills",
      path: "/search/pharmacy",
    },
    {
      id: 26,
      name: "Diagnostic Centres",
      imgPath: "fas fa-vials",
      path: "/search/diagnostic-centres",
    },
  ];
  return (
    <div className="mt-16 font-display font-bold flex flex-col items-center gap-4 p-4 ">
      <h1 className="md:text-6xl text-3xl">
        Search <span className="text-primary">Doctors</span>
      </h1>
      <h2 className="text-gray-500 md:text-xl text-sm text-center">
        search your doctor and book appoitnment
      </h2>
      <div className="flex w-full md:max-w-xl max-w-sm items-center space-x-4 p-2">
        <Input
          type="text"
          placeholder="Search by speciality..."
          className="font-normal"
        />
        <Button type="submit">
          <Search className="w-4 h-4 mr-1" />
          Search
        </Button>
      </div>

      {/* List of Specialities */}
      <div className="max-w-3xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {specialityList
          .slice(0, showAll ? specialityList.length : initalOptions)
          .map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="flex flex-col justify-center text-center bg-green-100 p-8 gap-5 m-2 rounded-lg cursor-pointer hover:scale-110 ease-in-out transition-all"
            >
              <i className={`${item.imgPath} fa-2xl text-primary`}></i>
              <span className="text-sm font-normal">{item.name}</span>
            </Link>
          ))}
      </div>
      <button
        className="p-2 bg-slate-200 rounded-lg text-gray-500 flex items-center justify-center gap-2 hover:bg-slate-300"
        onClick={() => setShowAll(!showAll)}
      >
        {!showAll ? (
          <i className="fa-solid fa-arrow-down fa-sm"></i>
        ) : (
          <i className="fa-solid fa-arrow-up fa-sm"></i>
        )}
        <h3 className="text-sm font-medium">{showAll ? "Hide" : "Show All"}</h3>
      </button>
    </div>
  );
};

export default Hero;

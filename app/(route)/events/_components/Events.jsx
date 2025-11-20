import React from "react";
import { Calendar, MapPin } from "lucide-react";
import Logo from "./../../../_components/Tieup";
import { FadingLine } from "./FadingLine";

const Events = (props) => {
  return (
    <div className="w-full flex flex-col">
      <section
        id="banner"
        className="
          w-full h-screen relative flex flex-col items-center justify-center text-center
          bg-[url('/event-banner.jpg')] bg-cover bg-center
        "
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>

        <div className="relative z-10 px-6 flex flex-col items-center gap-5 max-w-2xl">
          <h1 className="text-white text-5xl font-bold tracking-wide drop-shadow-lg">
            {props.title || "An Exclusive Session with Our Distinguished Speaker"}
          </h1>
          <h3 className="text-white text-2xl font-bold tracking-wide drop-shadow-lg">
            {props.speaker} ({props.designation})
          </h3>

          <p className="text-white text-lg opacity-90 leading-relaxed max-w-xl">
            Join us for an insightful session with {props.speaker}, where we explore wellness, learning, and meaningful conversations.
          </p>

          <div className="flex items-center gap-8 text-white mt-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#1A73E8]" />
              <h3 className="text-lg font-semibold">
                {props.date}, 2025 at {props.time}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#1A73E8]" />
              <h3 className="text-lg font-semibold">
                {props.place}
              </h3>
            </div>
          </div>

          {/* THEME BUTTON */}
          <a href="https://wa.me/+918923894358?text=Hi%2C%20I'm%20interested%20in%20Wellness%20Day%20Programs?">
            <button className="
              mt-4 bg-[#1A73E8] text-white px-10 py-3 rounded-xl font-semibold shadow-lg 
              hover:bg-[#1667d1] transition-all
            ">
              Register Now
            </button>
          </a>
        </div>
      </section>

      <section className="py-16 text-center">
        <h2 className="text-4xl font-bold mb-8 text-[#1A73E8]">Our Partners</h2>
        <Logo />
      </section>

      <FadingLine className="my-6" />

      <section className="py-20 flex flex-col items-center px-6 bg-[#F9FAFB]">
        <h2 className="text-4xl font-bold mb-14 text-center text-[#1A73E8]">
          What Awaits You at This Exclusive Session?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="flex flex-col items-center bg-white shadow-md p-10 rounded-2xl border border-gray-100">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              1
            </h3>
            <p className="text-gray-600 mt-2 text-lg">Distinguished Speaker</p>
          </div>

          <div className="flex flex-col items-center bg-white shadow-md p-10 rounded-2xl border border-gray-100">
            <h3 className="text-4xl font-bold text-[#0BB15E]">2+</h3>
            <p className="text-gray-600 mt-2 text-lg">Hours of Insights</p>
          </div>

          <div className="flex flex-col items-center bg-white shadow-md p-10 rounded-2xl border border-gray-100">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              100+
            </h3>
            <p className="text-gray-600 mt-2 text-lg">Attendees</p>
          </div>

          <div className="flex flex-col items-center bg-white shadow-md p-10 rounded-2xl border border-gray-100">
            <h3 className="text-4xl font-bold text-[#0BB15E]">1</h3>
            <p className="text-gray-600 mt-2 text-lg">Unforgettable Experience</p>
          </div>
        </div>
      </section>

      <FadingLine className="my-6" />

      <section className="py-20 px-8 lg:px-20 text-center lg:text-left flex flex-col lg:flex-row items-center lg:items-start gap-12">
        <h1 className="text-4xl font-bold lg:w-1/3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Overview
        </h1>

        <p className="text-gray-700 text-lg lg:w-2/3 leading-relaxed">
          This exclusive session brings together {props.speaker}, a distinguished expert in their field, to share invaluable insights and experiences. Don't miss this opportunity to learn and grow.
        </p>
      </section>

      <FadingLine className="my-6" />

      <section className="px-6 lg:px-24 py-16 bg-gradient-to-br from-white to-teal-50">
        <h2 className="text-4xl font-bold lg:w-1/3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Key Discussion Points</h2>
        <div className="w-10 h-1 bg-teal-600 mx-auto mt-2 mb-10"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-gray-800 text-lg">
          <ul className="space-y-4 list-disc pl-5">
            <li>Global Health, Local Choices: Is India on the Right Nutrition Path?</li>
            <li>Diet Gone Haywire: Fixing India’s Nutrition Crisis from the Ground up</li>
            <li>From Awareness to Action: Advancing Evidence-Based Clinical Nutrition in Patient Care</li>
            <li>The Science of Strength: What Truly Works in Sports Nutrition?</li>
          </ul>

          <ul className="space-y-4 list-disc pl-5">
            <li>Fitness or Fad? The Illusion of Shortcuts in Wellness</li>
            <li>Supplements vs. Real Nutrition: Are We Getting It Wrong?</li>
            <li>
              Weight Loss Drugs, Obesity & the Wellness Paradox: Rethinking the Role of Medications in Health
            </li>
          </ul>
        </div>
      </section>

      <FadingLine className="my-6" />

      <section className="px-6 lg:px-24 py-20 bg-white">
        <h2 className="text-4xl font-bold lg:w-1/3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Esteemed Speaker</h2>
        <div className="w-10 h-1 bg-teal-600 mx-auto mt-2 mb-10"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            {
              name: `${props.speaker}`,
              role: `${props.designation}`,
              img: "/profile.jpg"
            }
          ].map((spk, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <img
                src={spk.img}
                className="w-40 h-40 object-cover rounded-xl shadow-md"
              />
              <h3 className="text-xl font-semibold mt-4">{spk.name}</h3>
              <p className="text-gray-600 text-sm mt-2">{spk.role}</p>
            </div>
          ))}
        </div>
      </section>

      <FadingLine className="my-6" />

      <section className="px-6 lg:px-24 py-16 bg-gradient-to-br from-white to-teal-50">
        <h2 className="text-4xl font-bold lg:w-1/3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Who Should Attend</h2>
        <div className="w-10 h-1 bg-teal-600 mx-auto mt-2 mb-10"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-gray-800 text-lg">
          <ul className="space-y-4 list-disc pl-5">
            <li>Healthcare Practitioners</li>
            <li>Food Industry Representatives</li>
            <li>Nutritionists and Dietitians</li>
            <li>Non-Governmental Organizations (NGOs)</li>
          </ul>

          <ul className="space-y-4 list-disc pl-5">
            <li>Wellness Experts</li>
            <li>Nutraceutical & Dietary Supplement Industry</li>
            <li>Public Health Officials</li>
          </ul>

          <ul className="space-y-4 list-disc pl-5">
            <li>Researchers and Scientists</li>
            <li>Startups & Innovators</li>
            <li>Marketing Professionals</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Events;
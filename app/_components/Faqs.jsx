// import React from "react";

// const Faqs = () => {
//   return (
//     <div className="text-left md:mx-40 mx-2 space-y-5" id="faq-section">
//       <h1 className="text-left text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
//         FAQS
//         <span className="text-primary">.</span>
//       </h1>
//       <div className="divide-y divide-gray-100 rounded-xl border border-gray-100 bg-white ">
//         <details
//           className="group p-6 [&_summary::-webkit-details-marker]:hidden"
//           open
//         >
//           <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
//             <h2 className="text-lg font-medium">What is MGood?</h2>

//             <span className="relative size-5 shrink-0">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>

//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="absolute inset-0 size-5 opacity-0 group-open:opacity-100"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//             </span>
//           </summary>

//           <p className="mt-4 leading-relaxed text-gray-700">
//             MGood is a platform that links individuals with healthcare needs to
//             qualified doctors, pathologists, pharmacists, and other healthcare
//             services.
//           </p>
//         </details>

//         <details className="group p-6 [&_summary::-webkit-details-marker]:hidden">
//           <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
//             <h2 className="text-lg font-medium">
//               How do I access your services?
//             </h2>

//             <span className="relative size-5 shrink-0">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>

//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="absolute inset-0 size-5 opacity-0 group-open:opacity-100"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//             </span>
//           </summary>

//           <p className="mt-4 leading-relaxed text-gray-700">
//             Simply send "Hi" to +918923894358, and our team will assist you
//             within 10 minutes.
//           </p>
//         </details>
//         <details className="group p-6 [&_summary::-webkit-details-marker]:hidden">
//           <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
//             <h2 className="text-lg font-medium">What services do you offer?</h2>

//             <span className="relative size-5 shrink-0">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>

//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="absolute inset-0 size-5 opacity-0 group-open:opacity-100"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//             </span>
//           </summary>

//           <div className="mt-4 leading-relaxed text-gray-700">
//             We provide:
//             <ul className="list-disc pl-5">
//               <li>Consultations with healthcare professionals</li>
//               <li>Organization of healthcare camps in your area</li>
//               <li>Referrals for various healthcare needs</li>
//               <li>Consultation and Referral</li>
//             </ul>
//           </div>
//         </details>
//         <details className="group p-6 [&_summary::-webkit-details-marker]:hidden">
//           <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
//             <h2 className="text-lg font-medium">
//               How do I consult a doctor on your platform?
//             </h2>

//             <span className="relative size-5 shrink-0">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>

//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="absolute inset-0 size-5 opacity-0 group-open:opacity-100"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//             </span>
//           </summary>

//           <p className="mt-4 leading-relaxed text-gray-700">
//             Send "Hi" to +918923894358, and our team will guide you through the
//             consultation process.
//           </p>
//         </details>
//         <details className="group p-6 [&_summary::-webkit-details-marker]:hidden">
//           <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
//             <h2 className="text-lg font-medium">
//               Can I refer someone in need to your platform?
//             </h2>

//             <span className="relative size-5 shrink-0">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>

//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="absolute inset-0 size-5 opacity-0 group-open:opacity-100"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//             </span>
//           </summary>

//           <p className="mt-4 leading-relaxed text-gray-700">
//             Yes, share the contact number (+918923894358) with the person in
//             need, and we'll assist them.
//           </p>
//         </details>
//         <details className="group p-6 [&_summary::-webkit-details-marker]:hidden">
//           <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
//             <h2 className="text-lg font-medium">
//               What healthcare services can I access through your platform?
//             </h2>

//             <span className="relative size-5 shrink-0">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>

//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="absolute inset-0 size-5 opacity-0 group-open:opacity-100"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//             </span>
//           </summary>

//           <p className="mt-4 leading-relaxed text-gray-700">
//             Our network includes doctors, pathologists, pharmacists, and other
//             healthcare providers. Healthcare Camps
//           </p>
//         </details>
//         <details className="group p-6 [&_summary::-webkit-details-marker]:hidden">
//           <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
//             <h2 className="text-lg font-medium">
//               How do I organize a healthcare camp in my area?
//             </h2>

//             <span className="relative size-5 shrink-0">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>

//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="absolute inset-0 size-5 opacity-0 group-open:opacity-100"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//             </span>
//           </summary>

//           <p className="mt-4 leading-relaxed text-gray-700">
//             Contact us via +918923894358, and our team will help you arrange a
//             camp.
//           </p>
//         </details>
//         <details className="group p-6 [&_summary::-webkit-details-marker]:hidden">
//           <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
//             <h2 className="text-lg font-medium">
//               What services are offered at healthcare camps?
//             </h2>

//             <span className="relative size-5 shrink-0">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>

//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="absolute inset-0 size-5 opacity-0 group-open:opacity-100"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//             </span>
//           </summary>

//           <p className="mt-4 leading-relaxed text-gray-700">
//             Our camps provide various healthcare services, including
//             consultations, check-ups, and health awareness. Assistance and
//             Support.
//           </p>
//         </details>
//         <details className="group p-6 [&_summary::-webkit-details-marker]:hidden">
//           <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
//             <h2 className="text-lg font-medium">
//               How quickly can I expect assistance?
//             </h2>

//             <span className="relative size-5 shrink-0">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>

//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="absolute inset-0 size-5 opacity-0 group-open:opacity-100"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//             </span>
//           </summary>

//           <p className="mt-4 leading-relaxed text-gray-700">
//             Our team responds within 10 minutes of receiving your message.
//           </p>
//         </details>
//         <details className="group p-6 [&_summary::-webkit-details-marker]:hidden">
//           <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
//             <h2 className="text-lg font-medium">
//               What languages do you support?
//             </h2>

//             <span className="relative size-5 shrink-0">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>

//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="absolute inset-0 size-5 opacity-0 group-open:opacity-100"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//             </span>
//           </summary>

//           <p className="mt-4 leading-relaxed text-gray-700">
//             We currently support Hindi and English.
//           </p>
//         </details>
//         <details className="group p-6 [&_summary::-webkit-details-marker]:hidden">
//           <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
//             <h2 className="text-lg font-medium">
//               Can I provide feedback or suggestions?
//             </h2>

//             <span className="relative size-5 shrink-0">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>

//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="absolute inset-0 size-5 opacity-0 group-open:opacity-100"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//             </span>
//           </summary>

//           <p className="mt-4 leading-relaxed text-gray-700">
//             Yes, please share your feedback via +918923894358.
//           </p>
//         </details>
//         <details className="group p-6 [&_summary::-webkit-details-marker]:hidden">
//           <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
//             <h2 className="text-lg font-medium">
//               Is my personal and medical information secure?
//             </h2>

//             <span className="relative size-5 shrink-0">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>

//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="absolute inset-0 size-5 opacity-0 group-open:opacity-100"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//             </span>
//           </summary>

//           <p className="mt-4 leading-relaxed text-gray-700">
//             Yes, we maintain confidentiality and adhere to strict data
//             protection policies.
//           </p>
//         </details>
//         <details className="group p-6 [&_summary::-webkit-details-marker]:hidden">
//           <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
//             <h2 className="text-lg font-medium">
//               How do you ensure healthcare provider authenticity?
//             </h2>

//             <span className="relative size-5 shrink-0">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>

//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="absolute inset-0 size-5 opacity-0 group-open:opacity-100"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//             </span>
//           </summary>

//           <p className="mt-4 leading-relaxed text-gray-700">
//             We verify and validate all healthcare providers before onboarding
//             them to our platform.
//           </p>
//         </details>
//       </div>
//     </div>
//   );
// };

// export default Faqs;

"use client"

import React, { useState } from "react";

// Define FAQ data as an array of objects
// Add an 'id' for React keys and 'initiallyOpen' for the first item.
const allFaqsData = [
  {
    id: 1,
    question: "What is MGood?",
    answer: "MGood is a platform that links individuals with healthcare needs to qualified doctors, pathologists, pharmacists, and other healthcare services.",
    initiallyOpen: true,
  },
  {
    id: 2,
    question: "How do I access your services?",
    answer: 'Simply send "Hi" to +918923894358, and our team will assist you within 10 minutes.',
    initiallyOpen: false,
  },
  {
    id: 3,
    question: "What services do you offer?",
    answer: (
      <>
        We provide:
        <ul className="list-disc pl-5 mt-1">
          <li>Consultations with healthcare professionals</li>
          <li>Organization of healthcare camps in your area</li>
          <li>Referrals for various healthcare needs</li>
          <li>Consultation and Referral</li>
        </ul>
      </>
    ),
    initiallyOpen: false,
  },
  {
    id: 4,
    question: "How do I consult a doctor on your platform?",
    answer:
      'Send "Hi" to +918923894358, and our team will guide you through the consultation process.',
    initiallyOpen: false,
  },
  {
    id: 5,
    question: "Can I refer someone in need to your platform?",
    answer:
      "Yes, share the contact number (+918923894358) with the person in need, and we'll assist them.",
    initiallyOpen: false,
  },
  {
    id: 6,
    question: "What healthcare services can I access through your platform?",
    answer:
      "Our network includes doctors, pathologists, pharmacists, and other healthcare providers. Healthcare Camps",
    initiallyOpen: false,
  },
  {
    id: 7,
    question: "How do I organize a healthcare camp in my area?",
    answer:
      "Contact us via +918923894358, and our team will help you arrange a camp.",
    initiallyOpen: false,
  },
  {
    id: 8,
    question: "What services are offered at healthcare camps?",
    answer:
      "Our camps provide various healthcare services, including consultations, check-ups, and health awareness. Assistance and Support.",
    initiallyOpen: false,
  },
  {
    id: 9,
    question: "How quickly can I expect assistance?",
    answer: "Our team responds within 10 minutes of receiving your message.",
    initiallyOpen: false,
  },
  {
    id: 10,
    question: "What languages do you support?",
    answer: "We currently support Hindi and English.",
    initiallyOpen: false,
  },
  {
    id: 11,
    question: "Can I provide feedback or suggestions?",
    answer: "Yes, please share your feedback via +918923894358.",
    initiallyOpen: false,
  },
  {
    id: 12,
    question: "Is my personal and medical information secure?",
    answer:
      "Yes, we maintain confidentiality and adhere to strict data protection policies.",
    initiallyOpen: false,
  },
  {
    id: 13,
    question: "How do you ensure healthcare provider authenticity?",
    answer:
      "We verify and validate all healthcare providers before onboarding them to our platform.",
    initiallyOpen: false,
  },
];

// Reusable FAQ Item Component
const FaqItem = ({ question, answer, openByDefault }) => {
  return (
    <details
      className="group p-6 [&_summary::-webkit-details-marker]:hidden"
      open={openByDefault}
    >
      <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
        <h2 className="text-lg font-medium">{question}</h2>
        <span className="relative size-5 shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 size-5 opacity-0 group-open:opacity-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>
      </summary>
      {typeof answer === "string" ? (
        <p className="mt-4 leading-relaxed text-gray-700">{answer}</p>
      ) : (
        <div className="mt-4 leading-relaxed text-gray-700">{answer}</div>
      )}
    </details>
  );
};

const Faqs = () => {
  const [showAll, setShowAll] = useState(false);

  // Determine which FAQs to display based on the 'showAll' state
  const displayedFaqs = showAll ? allFaqsData : allFaqsData.slice(0, 2);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="text-left md:mx-40 mx-2 space-y-5" id="faq-section">
      <h1 className="text-left text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        FAQS
        <span className="text-primary">.</span>
      </h1>
      <div className="divide-y divide-gray-100 rounded-xl border border-gray-100 bg-white ">
        {displayedFaqs.map((faq) => (
          <FaqItem
            key={faq.id}
            question={faq.question}
            answer={faq.answer}
            openByDefault={faq.initiallyOpen || false} // Pass the initial open state
          />
        ))}
      </div>

      {/* Conditionally render the "Show more/less" button */}
      {allFaqsData.length > 2 && (
        <div className="text-center"> {/* Button container will get margin from parent's space-y-5 */}
          <button
            onClick={toggleShowAll}
            className="text-primary hover:underline font-medium py-2 px-4 rounded-md focus:outline-none"
          >
            {showAll ? "Show less" : "Show more"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Faqs;
"use client";
import { useState, useEffect } from "react";

export default function EventBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    setShowBanner(true); 
  }, []);

  if (!showBanner) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
      {/* BIG Banner Box */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-10 text-center bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300 
//           text-white">
        
        <h2 className="text-4xl font-bold mb-6 text-blue-700">
          🎉 Upcoming Event Announcement 🎉
        </h2>
        <a
        href="https://www.mgood.org/events"
        >

        <img
          src="/event-banner-with-text.png" 
          alt="Event Poster"
          className="w-full h-64 object-cover rounded-xl shadow-md mb-6"
        />
        </a>

        <p className="text-xl text-gray-700 mb-8 leading-relaxed">
          We are excited to bring you exclusive Mgood Wellness Program and updates.  
          Stay tuned for amazing surprises!
        </p>

        <button
          onClick={() => setShowBanner(false)}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 text-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
}


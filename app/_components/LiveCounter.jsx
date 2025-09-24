"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { StickyBanner } from "@/components/ui/sticky-banner";

   
  
function LiveUserCounter() {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/cnt/patientCnt`
        );
        // console.log(response);
        setUserCount(response.data.count);
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    fetchUserCount(); // Fetch initially
    const interval = setInterval(fetchUserCount, 5000); // Update every 5 sec

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <StickyBanner className="bg-gradient-to-r from-blue-600 to-purple-700">
    <div className="text-center text-white max-w-[90%] drop-shadow-md py-1 text-sm font-medium">
      Total Requests Received : <NumberTicker
      value={1006}
      className="whitespace-pre-wrap text-sm font-medium tracking-tighter text-white drop-shadow-md  dark:text-white"
    />
    </div>
    </StickyBanner>
    
  );
}

export default LiveUserCounter;

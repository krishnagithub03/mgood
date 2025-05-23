"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { NumberTicker } from "@/components/magicui/number-ticker";

   
  
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
    <div className="text-center bg-white py-1 text-sm font-medium">
      Total Number of request recevie : <NumberTicker
      value={userCount}
      className="whitespace-pre-wrap text-sm font-medium tracking-tighter text-black dark:text-white"
    />
    </div>
    
  );
}

export default LiveUserCounter;

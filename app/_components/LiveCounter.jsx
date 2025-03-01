"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

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
    <div className="text-center bg-gray-100 py-2 text-sm font-medium">
      🏥 Total Teleconsultations Done: <span className="text-primary">{userCount}</span>
    </div>
  );
}

export default LiveUserCounter;

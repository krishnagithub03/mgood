"use client";
import React, { useEffect } from "react";
import Events from "./_components/Events";
import axios from "axios";

function Page() {
  useEffect(() => {
    const sendTracking = async () => {
      try {
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/send-email`, {
          params: {
            userAgent: navigator.userAgent,
            referrer: document.referrer || "Direct",
            page: window.location.pathname,
          },
        });
      } catch (err) {
        console.error("Tracking failed:", err);
      }
    };

    sendTracking();
  }, []);

  return <Events />;
}

export default Page;

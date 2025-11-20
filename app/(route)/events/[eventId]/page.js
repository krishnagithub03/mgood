"use client";
import React, { useEffect, useState } from "react";
import Events from "../_components/Events";
import axios from "axios";
import { useParams } from "next/navigation";

function Page() {
  const eventsList = [
    {
      id: 1,
      title: "Mgood Wellness Day",
      speaker: "Mr. Hemant Mittal",
      designation: "Head Analytics Fair Assets Technologies India Pvt. Ltd.",
      date: "Nov 18",
      time: "10:00 AM",
      place: "LinkedIn",
      description: "Join us for a day of wellness, learning, and meaningful conversations with industry leaders and health experts.",
      image: "/event-banner.jpg"
    },
    {
      id: 2,
      title: "Mgood Wellness Day",
      speaker: "Karan Thakur",
      designation: "Founder, Digitow",
      date: "Nov 19",
      time: "05:00 PM",
      place: "Online",
      description: "",
      image: "/event-banner.jpg"
    },
    {
      id: 3,
      title: "Mgood Wellness Day",
      speaker: "Rajesh Ranjan D",
      designation: "HR Leader, HR40 under 40, Personality Development Coach & Award Winning Filmmaker",
      date: "Nov 10",
      time: "06:00 PM",
      place: "Online",
      description: "Understanding mental health and building resilience in modern times.",
      image: "/event-banner.jpg"
    },
    {
      id: 4,
      title: "Mgood Wellness Day",
      speaker: "Varsha Barde",
      designation: "Founder, Dharti Wellness",
      date: "Sep 11",
      time: "04:00 PM",
      place: "Online",
      description: "Defend your glow with skin care.",
      image: "/event-banner.jpg"
    },
    {
      id: 6,
      title: "Mgood Wellness Day",
      speaker: "Aina Raj",
      designation: "Founder, Udan",
      date: "Dec 06",
      time: "Yet to be decided",
      place: "Online",
      description: "",
      image: "/event-banner.jpg"
    }
  ];

  const params = useParams();
  const [currentEvent, setCurrentEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const sendTracking = async () => {
  //     try {
  //       await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/send-email`, {
  //         params: {
  //           userAgent: navigator.userAgent,
  //           referrer: document.referrer || "Direct",
  //           page: window.location.pathname,
  //         },
  //       });
  //     } catch (err) {
  //       console.error("Tracking failed:", err);
  //     }
  //   };

  //   sendTracking();
  // }, []);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventId = parseInt(params.eventId);
        const event = eventsList.find(e => e.id === eventId);

        if (event) {
          setCurrentEvent(event);
        } else {
          setError("Event not found");
        }
      } catch (err) {
        setError("Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    if (params.eventId) {
      fetchEvent();
    }
  }, [params.eventId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading event...</div>
      </div>
    );
  }

  if (error || !currentEvent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">{error || "Event not found"}</div>
      </div>
    );
  }

  return (
    <Events
      speaker={currentEvent.speaker}
      designation={currentEvent.designation}
      name={currentEvent.name}
      date={currentEvent.date}
      time={currentEvent.time}
      place={currentEvent.place}
      title={currentEvent.title}
    />
  );
}

export default Page;

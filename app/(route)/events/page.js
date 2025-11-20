"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import axios from "axios";

function EventsListPage() {
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

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-5xl font-bold mb-4">Mgood Events</h1>
                    <p className="text-xl opacity-90">Discover wellness events and connect with industry experts</p>
                </div>
            </section>

            {/* Events Grid */}
            <section className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {eventsList.map((event) => (
                        <Link key={event.id} href={`/events/${event.id}`}>
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                                <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-500 relative">
                                    <div className="absolute inset-0 bg-black/30"></div>
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <h3 className="text-2xl font-bold">{event.title}</h3>
                                        <p className="text-sm opacity-90">{event.date}, 2025 at {event.time}</p>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="mb-4">
                                        <h4 className="text-lg font-semibold text-gray-800">{event.speaker}</h4>
                                        <p className="text-sm text-gray-600">{event.designation}</p>
                                    </div>

                                    <p className="text-gray-700 mb-4 line-clamp-3">{event.description}</p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
                                            </svg>
                                            <span className="text-sm text-gray-600">{event.place}</span>
                                        </div>

                                        <span className="text-blue-600 font-semibold hover:text-blue-800">
                                            View Details →
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default EventsListPage;
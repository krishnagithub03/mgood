// app/api/matches/route.js
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Call your backend API to fetch the most recent match
    // Replace with your actual backend URL
    const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/mhl/get`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch match data");
    }

    const matchData = await response.json();

    return NextResponse.json(matchData, { status: 200 });
  } catch (error) {
    console.error("Error fetching match:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch match data",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

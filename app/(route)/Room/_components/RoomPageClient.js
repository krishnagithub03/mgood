"use client";
import React from "react";
import RoomPage from "./RoomPage";

export default function RoomPageClient({ roomId }) {
  return (
    <div>
      <RoomPage roomId={roomId} />
    </div>
  );
}

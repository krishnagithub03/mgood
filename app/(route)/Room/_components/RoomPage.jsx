import React from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const RoomPage = ({ roomId }) => {
  const myMeeting = async (element) => {
    const appID = Number(process.env.NEXT_PUBLIC_ZEGOCLOUD_APP_ID);
    const serverSecret = process.env.NEXT_PUBLIC_ZEGOCLOUD_SECRET;

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId.toString(),
      Date.now().toString(),
      "MGood Partner"
    );

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom(
      {
        container: element,
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton: true,
        showLeavingView: false,
        onLeaveRoom: () => {
          window.location.href = "/";
        },
      },
      [roomId.toString()]
    );
  };
  return (
    <div className="h-screen w-screen bg-gray-50 flex justify-center my-auto object-contain">
      <div ref={myMeeting} style={{ width: "100vw", height: "100vh" }} />
    </div>
  );
};

export default RoomPage;

// import React, { useState } from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import RoomPageClient from "../_components/RoomPageClient";

const Page = async ({ params }) => {
  // const [roomId, setRoomId] = useState(null);
  // useEffect(() => {
  //   params.then((unwrappedParams) => {
  //     setRoomId(unwrappedParams.roomId);
  //   });
  // }, [params]);

  // const { isAuthenticated } = getKindeServerSession();
  // if (!(await isAuthenticated())) {
  //   redirect("/api/auth/login");
  // }

  // const { getClaim } = getKindeServerSession();
  // const result = await getClaim("roles");
  // console.log("Role: ", result);

  // if (!result?.value.some((role) => role.name === "mgood-partner")) {
  //   return <div>Access Denied</div>;
  // }

  const roomId = params.roomId;
  return (
    <div>
      <RoomPageClient roomId={roomId} />
    </div>
  );
};

export default Page;

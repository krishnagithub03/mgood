
import { redirect } from "next/navigation";
import RoomPageClient from "../_components/RoomPageClient";

const Page = async ({ params }) => {
  // const [roomId, setRoomId] = useState(null);
  // useEffect(() => {
  //   params.then((unwrappedParams) => {
  //     setRoomId(unwrappedParams.roomId);
  //   });
  // }, [params]);


  const roomId = params.roomId;
  return (
    <div>
      <RoomPageClient roomId={roomId} />
    </div>
  );
};

export default Page;

import { Button } from "@/components/ui/button";
import { GraduationCap, MapPin, Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import BookAppointment from "./BookAppointment";

const DoctorDetails = ({ doctor }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 border-[1px] border-gray-500 p-4 gap-4 mt-5 rounded-lg">
        {/* doctor img */}
        <div>
          <Image
            width={200}
            height={200}
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
            alt={doctor.name}
            className="object-fill rounded-lg w-full h-[280px]"
          />
        </div>
        {/* info */}
        <div className="col-span-2 mt-5 flex md:px-10 flex-col gap-3 max-w-[300px]">
          <h2 className="font-bold text-2xl">{doctor.name}</h2>
          <h2 className="flex gap-2 text-gray-500 text-md">
            <GraduationCap />
            <span>{doctor.exp} Years of Experience</span>
          </h2>
          <h2 className="flex gap-2 text-gray-500 text-md">
            <MapPin />
            <span>{doctor.place}, India</span>
          </h2>
          <h2 className="flex gap-2 text-gray-500 text-lg">
            <Star />
            <span>4.3/5</span>
          </h2>
          <BookAppointment />
        </div>
      </div>
      {/* About */}
      <div>
        <h2 className="font-bold text-lg mt-10">About Me</h2>
        <p className="text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi rem
          nesciunt id quod veritatis consectetur sit a fuga totam, enim nostrum
          hic inventore quia beatae voluptas. Amet sint libero culpa vel eaque
          consequuntur delectus numquam, aliquid debitis in architecto quo modi
          laboriosam exercitationem eligendi fugiat earum explicabo ipsum. Totam
          enim sunt magnam vitae facere voluptates facilis dignissimos eos eum
          rerum numquam commodi, libero dicta quam reiciendis a ipsam hic
          accusamus quasi architecto ullam. Corporis cum illum accusamus omnis
          repellat molestiae suscipit, voluptate ullam quibusdam in labore neque
          veniam voluptatem architecto accusantium qui at amet molestias,
          provident excepturi possimus unde eveniet.
        </p>
      </div>
    </>
  );
};

export default DoctorDetails;

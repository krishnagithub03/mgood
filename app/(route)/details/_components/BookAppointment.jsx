import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar1, Clock } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";

const BookAppointment = () => {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);

  useEffect(() => {
    getTime();
  }, []);
  const getTime = () => {
    const timeList = [];

    // Generate AM time slots from 10:00 AM to 12:30 PM
    for (let i = 10; i <= 12; i++) {
      timeList.push({ time: i + ":00 AM" });
      timeList.push({ time: i + ":30 AM" });
    }

    // Generate PM time slots from 1:00 PM to 6:30 PM
    for (let i = 1; i <= 6; i++) {
      timeList.push({ time: i + ":00 PM" });
      timeList.push({ time: i + ":30 PM" });
    }

    setTimeSlot(timeList);
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="bg-primary mt-10 flex">Book Appointment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-slate-600">
            Book Appointment
          </DialogTitle>
          <DialogDescription>
            <div className="">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {/* Calender */}
                <div className="mt-3 md:mt-0">
                  <h2 className="flex gap-2 items-center mb-3">
                    <Calendar1 className="text-primary h-5 w-5" />
                    Select Day
                  </h2>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border-2 shadow-lg"
                  />
                </div>
                {/* Time Slot */}
                <div className="mt-3 md:mt-0">
                  <h2 className="flex gap-2 items-center mb-3">
                    <Clock className="text-primary h-5 w-5" />
                    Select Time Slot
                  </h2>
                  <div className="grid grid-cols-3 gap-2 border-2 rounded-lg p-5 shadow-lg">
                    {timeSlot.map((item, index) => (
                      <h2 className="p-2 border-2 rounded-full hover:text-white hover:bg-primary text-center cursor-pointer">
                        {item.time}
                      </h2>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default BookAppointment;

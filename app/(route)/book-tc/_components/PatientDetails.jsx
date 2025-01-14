"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SyncLoader } from "react-spinners";
import { PacmanLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import io from "socket.io-client";
import { toast } from "sonner";

const specialtyList = [
  "Dental",
  "Ortho",
  "Derma",
  "Patho",
  "Pedo",
  "Physiotherapy",
  "General Physician",
  "Dietician",
  "Gyane",
  "Psychiatry",
  "Cardio",
  "Neuro",
  "Urology",
  "Pulmonologist",
  "General Surgeon",
  "Radiology",
  "Hair Transplant Clinics",
  "Plastic Surgeon",
  "Ayurveda",
  "Homeopathy",
  "Eye",
  "ENT",
  "Primary Healthcare Centres",
  "Yoga Instructors",
  "Pharmacy",
  "Diagnostic Centres",
  "Associate",
  "RMP",
];

const mgoodIds = ["ID001", "ID002", "ID003", "ID004"]; // Example IDs

const PatientDetails = () => {
  const socket = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}`);

  const initialFormData = {
    name: "",
    age: "",
    gender: "",
    phone: "",
    specialization: "",
    place: "",
    mgoodId: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(true);
  const [roomId, setRoomId] = useState(null);
  const [amount, setamount] = useState(1);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [timer, setTimer] = useState(30);
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [meetingUrl, setMeetingUrl] = useState("");
  const [prescriptionUrl, setPrescriptionUrl] = useState("");
  const [updates, setUpdates] = useState([
    {
      triggered_action: "Pending",
      name: "Krish",
      custom_order_id: "123456",
    },
  ]);

  const [getDocNumber, setDocNumber] = useState(0);

  // const [meetingStatus, setMeetingStatus] = useState(false);

  useEffect(() => {
    let interval;
    if (showDialog) {
      setTimer(30); // Reset timer to 30 seconds
      setButtonEnabled(false); // Disable button initially
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev > 1) {
            return prev - 1;
          } else {
            clearInterval(interval);
            setButtonEnabled(true); // Enable button after 30 seconds
            setDocNumber(1234567890);
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showDialog]);

  useEffect(() => {
    socket.on("update", (data) => {
      console.log("Update received:", data);
      setUpdates((prev) => [...prev, data]); // Append new updates
    });

    return () => {
      socket.disconnect(); // Cleanup on component unmount
    };
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const handlePayment = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/order`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            amount,
          }),
        }
      );

      const data = await res.json();
      console.log(data);
      handlePaymentVerify(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePaymentVerify = async (data) => {
    const options = {
      key: process.env.RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "MGood",
      description: "Test Mode",
      order_id: data.id,
      handler: async (response) => {
        console.log("response", response);
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/verify`,
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            }
          );

          const verifyData = await res.json();

          if (verifyData.message) {
            toast.success(verifyData.message);
            socket.emit("appointment-booked", { data: formData });
            setShowDialog(true);
          }
          setPaymentStatus(true);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#5f63b8",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  const createAppointment = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/third-party/create-appointment`,
        {
          name: "Krish",
          age: "20",
          appointment_for: "Doctor",
        }
      );
      console.log("Appointment created:", response.data);
      setMeetingUrl(response.data.data.meeting_url);
      setPrescriptionUrl(response.data.data.download_prescription);
    } catch (error) {
      console.error("Error creating appointment:", error.message);
    }
  };

  // const handleThirdPartyJoin = async (data) => {
  //   try {
  //     // console.log("thirdPartFormData", thirdPartFormData);

  //     const res = await axios
  //       .post(
  //         `${process.env.NEXT_PUBLIC_CUSIPCO_API_URL}/api/B2B/create-appointment`,
  //         {
  //           name: data.name,
  //           age: data.age?.toString(),
  //           appointment_for: "Doctor",
  //         },
  //         // {
  //         //   name: "Krish",
  //         //   age: "20",
  //         //   appointment_for: "Doctor",
  //         // },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             "API-Secret-Key": process.env.NEXT_PUBLIC_CUSIPCO_API_SECRET_KEY,
  //             "API-Secret-Token":
  //               process.env.NEXT_PUBLIC_CUSIPCO_API_SECRET_TOKEN,
  //             "API-Environment": process.env.NEXT_PUBLIC_CUSIPCO_ENVIRONMENT,
  //             "Accept-Language": "en",
  //           },
  //         }
  //       )
  //       .then((response) => {
  //         console.log("response", response);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //     // console.log("body", body);
  //     console.log("Third Party", res.data);
  //     setMeetingUrl(res.data.data.meeting_url);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsedData = {
      ...formData,
      age: parseInt(formData.age, 10),
      phone: parseInt(formData.phone, 10),
    };
    setRoomId(parsedData.phone);
    console.log("Submitting formData: ", parsedData);
    await axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/patient`, {
        data: parsedData,
      })
      .then((response) => {
        console.log(response);
        toast("Form Submitted Successfully");
        // handleThirdPartyJoin(parsedData);
        handlePayment(parsedData);
        createAppointment();
        setFormData(initialFormData);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        alert("An error occurred. Please try again.");
      });
  };

  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold">
          Fill Patient <span className="text-primary">Details</span>
        </h1>
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
          <div className="lg:col-span-2 lg:py-12">
            <p className="max-w-xl text-lg">
              At MGood, we believe that access to quality healthcare should be
              seamless, efficient, and instant. Our mission is to bridge the gap
              between those seeking medical attention and qualified healthcare
              professionals, ensuring timely support and care.
            </p>
            <div className="mt-8">
              <a
                href="https://mgood.org"
                className="text-2xl font-bold text-primary"
              >
                Mgood.org
              </a>
            </div>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="border-2 rounded-md">
                <label className="sr-only" htmlFor="name">
                  Name
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Name"
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="border-2 rounded-md">
                <label className="sr-only" htmlFor="age">
                  Age
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Age"
                  type="number"
                  id="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="border-2 rounded-md">
                <label className="sr-only" htmlFor="phone">
                  Phone
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Phone"
                  type="text"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="border-2 rounded-md">
                <label className="sr-only" htmlFor="gender">
                  Gender
                </label>
                <select
                  className="w-full rounded-lg border-gray-200 p-3 text-sm text-gray-400"
                  id="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="border-2 rounded-md">
                <label className="sr-only" htmlFor="specialization">
                  Specialization
                </label>
                <select
                  className="w-full rounded-lg border-gray-200 p-3 text-sm text-gray-400"
                  id="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Specialization</option>
                  {specialtyList.map((specialty, index) => (
                    <option key={index} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>

              <div className="border-2 rounded-md">
                <label className="sr-only" htmlFor="mgoodId">
                  Mgood ID
                </label>
                <select
                  className="w-full rounded-lg border-gray-200 p-3 text-sm text-gray-400"
                  id="mgoodId"
                  value={formData.mgoodId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Mgood ID</option>
                  {mgoodIds.map((id, index) => (
                    <option key={index} value={id}>
                      {id}
                    </option>
                  ))}
                </select>
              </div>

              <div className="border-2 rounded-md">
                <label className="sr-only" htmlFor="place">
                  Place
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Place"
                  type="text"
                  id="place"
                  value={formData.place}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white"
              >
                Start Consultation
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* <Dialog>
        <DialogTrigger> */}
      {/* </DialogTrigger>
        <DialogContent>
    
          <DialogHeader>
            <DialogTitle>Starting consultation</DialogTitle>
            <DialogDescription className="p-28 text-center flex flex-col gap-10">
              Please wait while we connect you with a healthcare
              {loading ? (
                <SyncLoader className="justify-center" />
              ) : (
                <Link href={`/Room/${roomId}`}>
                  <button className="border-2 bg-primary text-white text-xl px-8 py-4 rounded-lg">
                    Join
                  </button>
                </Link>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button>End Consultation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
      {/* {showDialog && (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Starting Consultation</DialogTitle>
              <DialogDescription>
                <p className="p-28 text-center flex flex-col gap-10">
                  Please wait while we connect you with a healthcare provider.
                  {loading ? (
                    <SyncLoader className="justify-center" />
                  ) : (
                    <Link href={`/Room/${roomId}`}>
                      <button className="border-2 bg-primary text-white text-xl px-8 py-4 rounded-lg">
                        Join
                      </button>
                    </Link>
                  )}
                </p>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setShowDialog(false)}>
                End Consultation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )} */}
      {showDialog && (
        <div>
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogContent className="h-screen sm:h-fit my-10 p-4 sm:p-8 text-xs sm:text-sm md:p-8 md:text-sm">
              <DialogHeader>
                <DialogTitle className="text-center">
                  Starting Consultation
                </DialogTitle>
                <DialogDescription>
                  <div className="md:p-0 p-28 text-center flex flex-col gap-10 font-body md:text-sm text-xl">
                    <div>
                      Please wait while we connect you with a healthcare
                      provider.
                    </div>
                    <div className="flex justify-center">
                      <PacmanLoader color="#1CAC78" />
                    </div>
                    <div className="text-lg font-semibold">
                      Time remaining: {timer} seconds
                    </div>
                    {loading ? (
                      <SyncLoader className="justify-center" />
                    ) : (
                      <div className="flex flex-col gap-4">
                        <Link
                          // href={`/Room/${roomId}`}
                          href={meetingUrl}
                          target="_blank" // This opens the link in a new tab
                          rel="noopener noreferrer"
                        >
                          <button
                            className={`border-2 text-xl px-8 py-4 rounded-lg ${
                              buttonEnabled
                                ? "bg-primary text-white"
                                : "bg-gray-400 cursor-not-allowed"
                            }`}
                            disabled={!buttonEnabled}
                          >
                            Join
                          </button>
                        </Link>
                        <p className="font-bold text-2xl">
                          or contact Doctor on the displayed number{" "}
                          <a
                            href={`tel:+91${getDocNumber}`}
                            className="text-blue-500 font-extrabold"
                          >
                            {getDocNumber}
                          </a>
                        </p>
                        {updates[updates.length - 1].triggered_action ===
                          "Prescription-Uploaded" && (
                          <Link
                            // href={`/Room/${roomId}`}
                            href={prescriptionUrl}
                            target="_blank" // This opens the link in a new tab
                            rel="noopener noreferrer"
                          >
                            <button
                              className={`border-2 text-xl px-8 py-4 rounded-lg ${
                                buttonEnabled
                                  ? "bg-primary text-white"
                                  : "bg-gray-400 cursor-not-allowed"
                              }`}
                              disabled={!buttonEnabled}
                            >
                              Prescription
                            </button>
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                {updates[updates.length - 1].triggered_action ===
                  "Completed" && (
                  <Button onClick={() => setShowDialog(false)}>
                    End Consultation
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </section>
  );
};

export default PatientDetails;

// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Link from "next/link";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { SyncLoader } from "react-spinners";
// import { Button } from "@/components/ui/button";
// import { io } from "socket.io-client";
// import { toast } from "sonner";

// const socket = io("http://localhost:8000");

// const PatientDetails = () => {
//   const initialFormData = {
//     name: "",
//     age: "",
//     gender: "",
//     phone: "",
//     specialization: "",
//     place: "",
//     problem: "",
//     pastMedicalHistory: "",
//     currentMedication: "",
//   };

//   const [formData, setFormData] = useState(initialFormData);
//   const [loading, setLoading] = useState(true);
//   const [roomId, setRoomId] = useState(null);

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [id]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const parsedData = {
//       ...formData,
//       age: parseInt(formData.age, 10),
//       phone: parseInt(formData.phone, 10),
//     };
//     setRoomId(parsedData.phone);
//     console.log("Submitting formData: ", parsedData);
//     axios
//       // .post(
//       //   `https://backend-production-7277.up.railway.app/api/patient`,
//       //   parsedData
//       // )
//       .post("http://localhost:8000/api/patient", { data: parsedData })
//       .then((response) => {
//         console.log(response);
//         socket.emit("appointment-booked", { data: parsedData });
//         toast("Form Submitted Successfully");
//         setFormData(initialFormData); // Reset form fields after successful submission
//         setLoading(false);
//         // setFile(null);
//         // document.getElementById("uploadFile").value = "";
//       })
//       .catch((error) => {
//         console.log(error);
//         alert("An error occurred. Please try again.");
//       });
//   };

//   // const handleJoin = () => {};
//   return (
//     <section className="bg-gray-100">
//       <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
//         <h1 className="text-4xl font-bold">
//           Fill Patient <span className="text-primary">Details</span>
//         </h1>
//         <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
//           <div className="lg:col-span-2 lg:py-12">
//             <p className="max-w-xl text-lg">
//               At MGood, we believe that access to quality healthcare should be
//               seamless, efficient, and instant. Our mission is to bridge the gap
//               between those seeking medical attention and qualified healthcare
//               professionals, ensuring timely support and care.
//             </p>
//             <div className="mt-8">
//               <a href="/" className="text-2xl font-bold text-primary">
//                 Mgood.org
//               </a>
//             </div>
//           </div>

//           <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
//             <form className="space-y-4" onSubmit={handleSubmit}>
//               <div className="border-2 rounded-md">
//                 <label className="sr-only" htmlFor="name">
//                   Name
//                 </label>
//                 <input
//                   className="w-full rounded-lg border-gray-200 p-3 text-sm"
//                   placeholder="Name"
//                   type="text"
//                   id="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="border-2 rounded-md">
//                 <label className="sr-only" htmlFor="age">
//                   Age
//                 </label>
//                 <input
//                   className="w-full rounded-lg border-gray-200 p-3 text-sm"
//                   placeholder="Age"
//                   type="number"
//                   id="age"
//                   value={formData.age}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="border-2 rounded-md">
//                 <label className="sr-only" htmlFor="gender">
//                   Gender
//                 </label>
//                 <input
//                   className="w-full rounded-lg border-gray-200 p-3 text-sm"
//                   placeholder="Gender"
//                   type="text"
//                   id="gender"
//                   value={formData.gender}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="border-2 rounded-md">
//                 <label className="sr-only" htmlFor="specialization">
//                   Specialization
//                 </label>
//                 <input
//                   className="w-full rounded-lg border-gray-200 p-3 text-sm"
//                   placeholder="Specialization"
//                   type="text"
//                   id="specialization"
//                   value={formData.specialization}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="border-2 rounded-md">
//                 <label className="sr-only" htmlFor="place">
//                   Place
//                 </label>
//                 <input
//                   className="w-full rounded-lg border-gray-200 p-3 text-sm"
//                   placeholder="Place"
//                   type="text"
//                   id="place"
//                   value={formData.place}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="border-2 rounded-md">
//                 <label className="sr-only" htmlFor="phone">
//                   Phone Number
//                 </label>
//                 <input
//                   className="w-full rounded-lg border-gray-200 p-3 text-sm"
//                   placeholder="Phone Number"
//                   type="number"
//                   id="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="border-2 rounded-md">
//                 <label className="sr-only" htmlFor="mgoodid">
//                   MgoodId
//                 </label>
//                 <input
//                   className="w-full rounded-lg border-gray-200 p-3 text-sm"
//                   placeholder="MgoodId"
//                   type="text"
//                   id="specialization"
//                   value={formData.specialization}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {/* <div className="border-2 rounded-md">
//                 <label className="sr-only" htmlFor="problem">
//                   Describe Problem
//                 </label>
//                 <textarea
//                   className="w-full rounded-lg border-gray-200 p-3 text-sm"
//                   placeholder="Describe Problem"
//                   id="problem"
//                   value={formData.problem}
//                   onChange={handleChange}
//                   required
//                 ></textarea>
//               </div> */}
//               {/* <div className="border-2 rounded-md">
//                 <label className="sr-only" htmlFor="pastMedicalHistory">
//                   Past Medical History
//                 </label>
//                 <textarea
//                   className="w-full rounded-lg border-gray-200 p-3 text-sm"
//                   placeholder="Past Medical History"
//                   id="pastMedicalHistory"
//                   value={formData.pastMedicalHistory}
//                   onChange={handleChange}
//                 ></textarea>
//               </div>
//               <div className="border-2 rounded-md">
//                 <label className="sr-only" htmlFor="currentMedication">
//                   Current Medication
//                 </label>
//                 <textarea
//                   className="w-full rounded-lg border-gray-200 p-3 text-sm"
//                   placeholder="Current Medication"
//                   id="currentMedication"
//                   value={formData.currentMedication}
//                   onChange={handleChange}
//                 ></textarea>
//               </div> */}
//               <Dialog>
//                 <DialogTrigger>
//                   <button
//                     type="submit"
//                     className="w-full rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white"
//                   >
//                     Start Consultation
//                   </button>
//                 </DialogTrigger>
//                 <DialogContent>
//                   <DialogHeader>
//                     <DialogTitle>Starting consultation</DialogTitle>
//                     <DialogDescription className="p-28 text-center flex flex-col gap-10">
//                       Please wait while we connect you with a healthcare
//                       {loading ? (
//                         <SyncLoader />
//                       ) : (
//                         <Link href={`/Room/${roomId}`}>
//                           <button className="border-2 bg-primary text-white text-xl px-8 py-4 rounded-lg">
//                             Join
//                           </button>
//                         </Link>
//                       )}
//                     </DialogDescription>
//                   </DialogHeader>
//                   <DialogFooter>
//                     <Button>End Consultation</Button>
//                   </DialogFooter>
//                 </DialogContent>
//               </Dialog>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PatientDetails;

"use client";
import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { io } from "socket.io-client";
import { toast } from "sonner";

const socket = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}`);

const specialtyList = [
  "Cardiology",
  "Dermatology",
  "Endocrinology",
  "Gastroenterology",
  "General Surgery",
  "Hematology",
  "Infectious Disease",
  "Internal Medicine",
  "Nephrology",
  "Neurology",
  "Obstetrics and Gynecology",
  "Oncology",
  "Ophthalmology",
  "Orthopedics",
  "Otolaryngology",
  "Pathology",
  "Pediatrics",
  "Plastic Surgery",
  "Psychiatry",
  "Pulmonology",
  "Radiology",
  "Rheumatology",
  "Sports Medicine",
  "Thoracic Surgery",
  "Urology",
  "Vascular Surgery",
];

const mgoodIds = ["ID001", "ID002", "ID003", "ID004"]; // Example IDs

const PatientDetails = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedData = {
      ...formData,
      age: parseInt(formData.age, 10),
      phone: parseInt(formData.phone, 10),
    };
    setRoomId(parsedData.phone);
    console.log("Submitting formData: ", parsedData);
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/patient`, {
        data: parsedData,
      })
      .then((response) => {
        console.log(response);
        toast("Form Submitted Successfully");
        handlePayment(parsedData);
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
      {showDialog && (
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
      )}
    </section>
  );
};

export default PatientDetails;

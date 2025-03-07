"use client";
import React, { useState, useEffect,useRef } from "react";
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
import Cookies from "js-cookie";

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



const PatientDetails = (phoneNumber) => {
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

  const initialQrFormData = {
    phoneNumber: "",
    mgoodId: "",
    transactionId: "",
  };

  const [qrFormData, setQrFormData] = useState(initialQrFormData);
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const [amount, setamount] = useState(169);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [timer, setTimer] = useState(30);
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [meetingUrl, setMeetingUrl] = useState("");
  const [prescriptionUrl, setPrescriptionUrl] = useState("");
  const [paymentOptions, setPaymentOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("other");
  const [updates, setUpdates] = useState([
    {
      triggered_action: "Pending",
      name: "Initial",
      custom_order_id: "0",
    },
  ]);
  const [appointmentStatus, setAppointmentStatus] = useState("pending");
  const [docNumber, setDocNumber] = useState(0);
  const [cusipcoOrderId, setCusipcoOrderId] = useState("CS1735913848");
  const [voucher, setVoucher] = useState("");
  const [voucherLoading, setVoucherLoading] = useState(false);
  const [accessRole, setAccessRole] = useState(null);
  const [user, setUser] = useState(null); // Store user from cookies

  const intervalRef = useRef(null);

  // useEffect(() => {
  //   // Retrieve user details from cookies
  //   const storedUser = Cookies.get("user"); // Assuming you stored the user as a JSON string
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);

  // useEffect(() => {
  //   const fetchAccessRole = async () => {
  //     try {
  //       const response = await axios.post(
  //         `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/getAccessRole`,
  //         { phoneNumber: String(user) }
  //       );
  //       setAccessRole(response.data.role);
  //       // console.log(response);
  //     } catch (error) {
  //       setAccessRole("user");
  //       console.error(
  //         "Error fetching accessRole:",
  //         error.response?.data?.message || error.message
  //       );
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (user) {
  //     fetchAccessRole();
  //   }
  // }, [user]);

  // Check URL for userId on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("userid");
    if (userId) {
      setFormData((prev) => ({
        ...prev,
        mgoodId: userId,
      }));
    }
  }, []);

  // Socket event listeners
  useEffect(() => {
    socket.on("update", (data) => {
      console.log("Update received:", data);
      setUpdates((prev) => [...prev, data]);

      if (
        data.triggered_action === "Accepted" ||
        data.triggered_action === "accepted"
      ) {
        console.log("Call accepted by doctor, updating status");
        setAppointmentStatus("accepted");
        setLoading(false);
        clearInterval(intervalRef.current);

        // Update meeting URL if provided
        if (data.meeting_url) {
          setMeetingUrl(data.meeting_url);
        }
      }
    });

    socket.on("appointment-status-updated", (data) => {
      console.log("Status update received:", data);
      if (data.status === "accepted") {
        console.log("Call accepted via status update");
        setAppointmentStatus("accepted");
        setLoading(false);
        clearInterval(intervalRef.current);

        // Update meeting URL if provided
        if (data.meeting_url) {
          setMeetingUrl(data.meeting_url);
        }
      }
    });

    // Debug connection
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    return () => {
      socket.off("update");
      socket.off("appointment-status-updated");
      socket.off("connect");
      socket.off("error");
      socket.disconnect();
    };
  }, []);

  // Timer effect
  useEffect(() => {
    // let interval;
    if (showDialog) {
      setTimer(30);
      intervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev > 1) {
            return prev - 1;
          } else {
            clearInterval(intervalRef.current);
            createAppointment({ data: formData });
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [showDialog, formData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleQrChange = (e) => {
    const { id, value } = e.target;
    setQrFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setPaymentOptions(true); // Show payment options after form submission
  };

  const handlePayment = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        }
      );
      const data = await response.json();
      handlePaymentVerify(data.data);
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment initialization failed");
    }
  };

  const handlePaymentVerify = (data) => {
    const options = {
      key: process.env.RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "MGood",
      description: "Test Mode",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyResponse = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/verify`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            }
          );

          if (verifyResponse.ok) {
            const verifyData = await verifyResponse.json();
            toast.success(verifyData.message);
            socket.emit("appointment-booked", { data: formData });
            setShowDialog(true);
            setMeetingUrl(`https://mgood.org/Room/${roomId}`);
          }
          setPaymentStatus(true);
        } catch (error) {
          console.error("Payment verification error:", error);
          toast.error("Payment verification failed");
        }
      },
      theme: { color: "#5f63b8" },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handleRazorpaySubmit = async (e) => {
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
        handlePayment(parsedData);
        setFormData(initialFormData);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred. Please try again.");
      });
  };

  const createAppointment = async (data) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/third-party/create-appointment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.data.name,
            age: data.data.age?.toString(),
            appointment_for: "Doctor",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create appointment");
      }

      const result = await response.json();

      // Check if result and result.data exist before accessing properties
      if (result && result.data) {
        setMeetingUrl(result.data.meeting_url || "");
        setDocNumber(result.data.meeting_number || 0);
        setPrescriptionUrl(result.data.download_prescription || "");
        setCusipcoOrderId(result.data.custom_order_id || "");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      toast.error("Failed to create appointment");
      // Set default values in case of error
      setMeetingUrl("");
      setDocNumber(0);
      setPrescriptionUrl("");
      setCusipcoOrderId("");
    }
  };

  const handleQrSubmit = async (e) => {
    e.preventDefault();
    console.log("QR Form Data: ", qrFormData);

    if (
      !qrFormData.phoneNumber ||
      !qrFormData.mgoodId ||
      !qrFormData.transactionId
    ) {
      alert("All fields are required!");
      return;
    }
    // setRoomId(qrFormData.phoneNumber);
    setLoading(true);
    await axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/qr`, qrFormData)
      .then((response) => {
        console.log(response);
        toast("Form Submitted Successfully");
        setQrFormData(initialQrFormData);
        socket.emit("appointment-booked", { data: formData });
        setShowDialog(true);
        setPaymentOptions(false);
        setRoomId(formData.phone);
        setMeetingUrl(`https://mgood.org/Room/${roomId}`);
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred. Please try again.");
      });

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
        setFormData(initialFormData);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        alert("An error occurred. Please try again.");
      });

    setLoading(false);
  };

  const handleRedeem = async () => {
    setVoucherLoading(true);
    await axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/planUsers/teleconsult`, {
        userId: voucher,
      })
      .then((response) => {
        socket.emit("appointment-booked", { data: formData });
        setPaymentOptions(false);
        setShowDialog(true);
        setMeetingUrl(`https://mgood.org/Room/${roomId}`);
      })
      .catch((error) => {
        toast.error("Something went wrong. Please try again.");
      })
      .finally(() => {
        setVoucherLoading(false);
      });

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
        setFormData(initialFormData);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        alert("An error occurred. Please try again.");
      });
  };

  const hasPrescriptionUploaded = updates.some(
    (update) =>
      update.triggered_action === "Prescription-Uploaded" &&
      update.custom_order_id === cusipcoOrderId
  );

  const hasCompleted = updates.some(
    (update) =>
      update.triggered_action === "Completed" &&
      update.custom_order_id === cusipcoOrderId
  );
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }


  // if (accessRole != "Partner") {
  //   return <>Access Denied</>;
  // }
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
            <form className="space-y-4" onSubmit={handleFormSubmit}>
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
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm text-gray-400"
                  id="mgoodId"
                  placeholder="MgoodId"
                  value={formData.mgoodId}
                  onChange={handleChange}
                  required
                />
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

      {paymentOptions && (
        <div>
          <Dialog open={paymentOptions} onOpenChange={setPaymentOptions}>
            <DialogContent className="h-screen sm:h-fit my-10 p-2 sm:p-4 text-xs sm:text-sm md:p-4 md:text-sm">
              <DialogHeader>
                <DialogTitle className="text-center">
                  Choose Payment Option
                </DialogTitle>
                <DialogDescription asChild>
                  <div className="flex flex-col gap-6 p-6">
                    {/* Payment Options */}
                    <div className="flex gap-4 justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          value="other"
                          checked={selectedOption === "other"}
                          onChange={() => setSelectedOption("other")}
                        />
                        Pay with Other Options
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          value="qr"
                          checked={selectedOption === "qr"}
                          onChange={() => setSelectedOption("qr")}
                        />
                        Pay with QR
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          value="voucher"
                          checked={selectedOption === "voucher"}
                          onChange={() => setSelectedOption("voucher")}
                        />
                        Redeem Voucher
                      </label>
                    </div>

                    {/* Content Based on Selected Option */}
                    {selectedOption === "qr" && (
                      <form
                        className="flex flex-col gap-4 justify-center"
                        onSubmit={handleQrSubmit}
                      >
                        <img
                          src="/pro_plan_qr.jpg"
                          alt="QR Code"
                          className="w-32 h-32 m-auto"
                        />
                        <p>
                          After successful payment, fill in the details below:
                        </p>

                        {/* Phone Number Input */}
                        <input
                          type="text"
                          id="phoneNumber"
                          placeholder="Enter Phone Number"
                          value={qrFormData.phoneNumber}
                          onChange={handleQrChange}
                          className="border bg-slate-200 rounded-md p-2"
                          required
                        />

                        {/* MgoodId Input */}
                        <input
                          type="text"
                          id="mgoodId"
                          placeholder="Enter MgoodId"
                          value={qrFormData.mgoodId}
                          onChange={handleQrChange}
                          className="border bg-slate-200 rounded-md p-2"
                          required
                        />

                        {/* TransactionId Input */}
                        <input
                          type="text"
                          id="transactionId"
                          placeholder="Enter TransactionId"
                          value={qrFormData.transactionId}
                          onChange={handleQrChange}
                          className="border bg-slate-200 rounded-md p-2"
                          required
                        />

                        {/* Submit Button */}
                        <button
                          type="submit"
                          className="border-2 bg-primary text-white text-xl p-2 rounded-lg hover:bg-green-400"
                        >
                          Submit
                        </button>
                      </form>
                    )}

                    {selectedOption === "other" && (
                      <div className="flex flex-col gap-3 justify-center">
                        <button
                          type="button"
                          onClick={handleRazorpaySubmit}
                          className="border-2 bg-primary text-white text-xl p-2 rounded-lg hover:bg-green-400"
                        >
                          Go To Razorpay
                        </button>
                      </div>
                    )}
                    {selectedOption === "voucher" && (
                      <div className="flex flex-col gap-3 justify-center">
                        <input
                          type="text"
                          placeholder="Enter voucher"
                          value={voucher}
                          onChange={(e) => setVoucher(e.target.value)}
                          className="p-2 border rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={handleRedeem}
                          className="border-2 bg-primary text-white text-xl p-2 rounded-lg hover:bg-green-400"
                          disabled={voucherLoading}
                        >
                          {voucherLoading ? "Checking" : "Redeem"}
                        </button>
                      </div>
                    )}
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      )}
      {showDialog && (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="min-h-auto max-h-auto overflow-y-auto sm:my-10 p-4 sm:p-6 text-sm sm:text-base">
            <DialogHeader>
              <DialogTitle className="text-center">
                Starting Consultation
              </DialogTitle>
              <DialogDescription asChild>
                <div className="md:p-0 p-2 text-center flex flex-col gap-10 font-body md:text-sm text-xl">
                  {timer > 0 && (
                    <>
                      <div>
                        {appointmentStatus === "pending"
                          ? "Please wait while we connect you with a healthcare provider."
                          : "Doctor has accepted your call. You can join now!"}
                      </div>
                      {appointmentStatus === "pending" && (
                        <div className="flex justify-center">
                          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}
                    </>
                  )}
                  {appointmentStatus === "accepted" ? (
                    <></>
                  ) : (
                    <div className="text-lg font-semibold">
                      Time remaining: {timer} seconds
                    </div>
                  )}
                  {loading ? (
                    <div className="flex justify-center">
                      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <Link
                        href={meetingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button
                          className={`border-2 text-xl px-8 py-4 rounded-lg ${
                            appointmentStatus === "accepted"
                              ? "bg-primary text-white hover:bg-green-600"
                              : "bg-gray-400 cursor-not-allowed"
                          }`}
                          disabled={appointmentStatus !== "accepted"}
                          onClick={() =>
                            console.log(
                              "Join button clicked, status:",
                              appointmentStatus
                            )
                          }
                        >
                          {appointmentStatus === "accepted"
                            ? "Join Now"
                            : "Waiting for Doctor"}
                        </button>
                      </Link>
                      {appointmentStatus === "accepted" && (
                        <p className="font-bold text-2xl">
                          Or Contact Doctor on The Displayed Number{" "}
                          <a
                            href={`tel:+91${docNumber}`}
                            className="text-blue-500 font-extrabold"
                          >
                            {docNumber}
                          </a>
                        </p>
                      )}
                      {(hasPrescriptionUploaded || hasCompleted) && (
                        <Link
                          href={prescriptionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button
                            className={`border-2 text-xl px-8 py-4 rounded-lg ${
                              appointmentStatus === "accepted"
                                ? "bg-primary text-white"
                                : "bg-gray-400 cursor-not-allowed"
                            }`}
                            disabled={appointmentStatus !== "accepted"}
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
              {hasCompleted && (
                <Button onClick={() => setShowDialog(false)}>
                  End Consultation
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default PatientDetails;


// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import io from "socket.io-client";
// import { toast } from "sonner";
// import axios from "axios";

// const specialtyList = [
//   "Dental", "Ortho", "Derma", "Patho", "Pedo", "Physiotherapy",
//   "General Physician", "Dietician", "Gyane", "Psychiatry", "Cardio",
//   "Neuro", "Urology", "Pulmonologist", "General Surgeon", "Radiology",
//   "Hair Transplant Clinics", "Plastic Surgeon", "Ayurveda", "Homeopathy",
//   "Eye", "ENT", "Primary Healthcare Centres", "Yoga Instructors",
//   "Pharmacy", "Diagnostic Centres", "Associate", "RMP",
// ];

// const PatientDetails = () => {
//   const socket = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}`);
  
//   // Initial form states
//   const [formData, setFormData] = useState({
//     name: "",
//     age: "",
//     gender: "",
//     phone: "",
//     specialization: "",
//     place: "",
//     mgoodId: "",
//   });

//   const [qrFormData, setQrFormData] = useState({
//     phoneNumber: "",
//     mgoodId: "",
//     transactionId: "",
//   });

//   // UI states
//   const [loading, setLoading] = useState(false);
//   const [showDialog, setShowDialog] = useState(false);
//   const [paymentOptions, setPaymentOptions] = useState(false);
//   const [selectedOption, setSelectedOption] = useState("other");
//   const [timer, setTimer] = useState(30);
//   const [voucherLoading, setVoucherLoading] = useState(false);
//   const [appointmentStatus, setAppointmentStatus] = useState("pending");

//   // Data states
//   const [amount] = useState(169);
//   const [meetingUrl, setMeetingUrl] = useState("");
//   const [prescriptionUrl, setPrescriptionUrl] = useState("");
//   const [docNumber, setDocNumber] = useState(0);
//   const [roomId, setRoomId] = useState(null);
//   const [cusipcoOrderId, setCusipcoOrderId] = useState("");
//   const [voucher, setVoucher] = useState("");
//   const [updates, setUpdates] = useState([
//     { triggered_action: "Pending", name: "Initial", custom_order_id: "0" }
//   ]);
//   const intervalRef = useRef(null);

//   // Check URL for userId on mount
//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const userId = urlParams.get('userid');
//     if (userId) {
//       setFormData(prev => ({
//         ...prev,
//         mgoodId: userId
//       }));
//     }
//   }, []);

//   // Socket event listeners
// useEffect(() => {
//   socket.on("update", (data) => {
//     console.log("Update received:", data);
//     setUpdates(prev => [...prev, data]);
    
//     if (data.triggered_action === "Accepted" || data.triggered_action === "accepted") {
//       console.log("Call accepted by doctor, updating status");
//       setAppointmentStatus("accepted");
//       setLoading(false);
//       clearInterval(intervalRef.current);
      
//       // Update meeting URL if provided
//       if (data.meeting_url) {
//         setMeetingUrl(data.meeting_url);
//       }
//     }
//   });

//   socket.on("appointment-status-updated", (data) => {
//     console.log("Status update received:", data);
//     if (data.status === "accepted") {
//       console.log("Call accepted via status update");
//       setAppointmentStatus("accepted");
//       setLoading(false);
//       clearInterval(intervalRef.current);
      
//       // Update meeting URL if provided
//       if (data.meeting_url) {
//         setMeetingUrl(data.meeting_url);
//       }
//     }
//   });

//   // Debug connection
//   socket.on("connect", () => {
//     console.log("Socket connected:", socket.id);
//   });

//   socket.on("error", (error) => {
//     console.error("Socket error:", error);
//   });

//   return () => {
//     socket.off("update");
//     socket.off("appointment-status-updated");
//     socket.off("connect");
//     socket.off("error");
//     socket.disconnect();
//   };
// }, []);

//   // Timer effect
//   useEffect(() => {
//     // let interval;
//     if (showDialog) {
//       setTimer(30);
//       intervalRef.current = setInterval(() => {
//         setTimer((prev) => {
//           if (prev > 1) {
//             return prev - 1;
//           } else {
//             clearInterval(intervalRef.current);
//             createAppointment({ data: formData });
//             return 0;
//           }
//         });
//       }, 1000);
//     }
//     return () => clearInterval(intervalRef.current);
//   }, [showDialog, formData]);

//   // Form handlers
//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData(prev => ({ ...prev, [id]: value }));
//   };

//   const handleQrChange = (e) => {
//     const { id, value } = e.target;
//     setQrFormData(prev => ({ ...prev, [id]: value }));
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     setPaymentOptions(true);
//   };

//   const createAppointment = async (data) => {
//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/third-party/create-appointment`,
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             name: data.data.name,
//             age: data.data.age?.toString(),
//             appointment_for: "Doctor",
//           }),
//         }
//       );
      
//       if (!response.ok) {
//         throw new Error('Failed to create appointment');
//       }
  
//       const result = await response.json();
      
//       // Check if result and result.data exist before accessing properties
//       if (result && result.data) {
//         setMeetingUrl(result.data.meeting_url || '');
//         setDocNumber(result.data.meeting_number || 0);
//         setPrescriptionUrl(result.data.download_prescription || '');
//         setCusipcoOrderId(result.data.custom_order_id || '');
//       } else {
//         throw new Error('Invalid response format');
//       }
//     } catch (error) {
//       console.error("Error creating appointment:", error);
//       toast.error("Failed to create appointment");
//       // Set default values in case of error
//       setMeetingUrl('');
//       setDocNumber(0);
//       setPrescriptionUrl('');
//       setCusipcoOrderId('');
//     }
//   };

//   const handleQrSubmit = async (e) => {
//     e.preventDefault();
//     if (!qrFormData.phoneNumber || !qrFormData.mgoodId || !qrFormData.transactionId) {
//       toast.error("All fields are required!");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/qr`,
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(qrFormData),
//         }
//       );

//       if (response.ok) {
//         toast.success("Payment successful");
//         setQrFormData({ phoneNumber: "", mgoodId: "", transactionId: "" });
//         socket.emit("appointment-booked", { data: formData });
//         setShowDialog(true);
//         setPaymentOptions(false);
//         setRoomId(formData.phone);
//         setMeetingUrl(`https://mgood.org/Room/${formData.phone}`);
//       } else {
//         throw new Error('Payment failed');
//       }
//     } catch (error) {
//       console.error("Error processing QR payment:", error);
//       toast.error("Payment failed");
//     } finally {
//       const parsedData = {
//         ...formData,
//         age: parseInt(formData.age, 10),
//         phone: parseInt(formData.phone, 10),
//       };
//       setRoomId(parsedData.phone);
//       console.log("Submitting formData: ", parsedData);

//       await axios
//         .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/patient`, {
//           data: parsedData,
//         })
//         .then((response) => {
//           console.log(response);
//           toast("Form Submitted Successfully");
//           setFormData(initialFormData);
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.log(error);
//           alert("An error occurred. Please try again.");
//         });
//       setLoading(false);
//     }
//   };

//   const handlePayment = async () => {
//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/order`,
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ amount }),
//         }
//       );
//       const data = await response.json();
//       handlePaymentVerify(data.data);
//     } catch (error) {
//       console.error("Payment error:", error);
//       toast.error("Payment initialization failed");
//     }
//   };

//   const handlePaymentVerify = (data) => {
//     const options = {
//       key: process.env.RAZORPAY_KEY_ID,
//       amount: data.amount,
//       currency: data.currency,
//       name: "MGood",
//       description: "Test Mode",
//       order_id: data.id,
//       handler: async (response) => {
//         try {
//           const verifyResponse = await fetch(
//             `${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/verify`,
//             {
//               method: 'POST',
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify({
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//               }),
//             }
//           );

//           if (verifyResponse.ok) {
//             const verifyData = await verifyResponse.json();
//             toast.success(verifyData.message);
//             socket.emit("appointment-booked", { data: formData });
//             setShowDialog(true);
//             setMeetingUrl(`https://mgood.org/Room/${roomId}`);
//           }
//         } catch (error) {
//           console.error("Payment verification error:", error);
//           toast.error("Payment verification failed");
//         }
//       },
//       theme: { color: "#5f63b8" },
//     };

//     const rzp1 = new window.Razorpay(options);
//     rzp1.open();
//   };

//   const handleRazorpaySubmit = async (e) => {
//     e.preventDefault();
//     const parsedData = {
//       ...formData,
//       age: parseInt(formData.age, 10),
//       phone: parseInt(formData.phone, 10),
//     };
//     setRoomId(parsedData.phone);

//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/patient`,
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ data: parsedData }),
//         }
//       );

//       if (response.ok) {
//         toast.success("Form submitted successfully");
//         handlePayment(parsedData);
//         setFormData({
//           name: "", age: "", gender: "", phone: "",
//           specialization: "", place: "", mgoodId: "",
//         });
//         setLoading(false);
//       } else {
//         throw new Error('Form submission failed');
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       toast.error("Form submission failed");
//     }
//   };

//   const handleRedeem = async () => {
//     try {
//       setVoucherLoading(true);
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/planUsers/teleconsult`,
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ userId: voucher }),
//         }
//       );

//       if (response.ok) {
//         socket.emit("appointment-booked", { data: formData });
//         setPaymentOptions(false);
//         setShowDialog(true);
//         setRoomId(formData.phone);
//         setMeetingUrl(`https://mgood.org/Room/${formData.phone}`);
//       } else {
//         throw new Error('Voucher redemption failed');
//       }
//     } catch (error) {
//       console.error("Voucher error:", error);
//       toast.error("Voucher redemption failed");
//     } finally {
//       setVoucherLoading(false);
//     }
//   };

//   // Status checks
//   const hasPrescriptionUploaded = updates.some(
//     update => update.triggered_action === "Prescription-Uploaded" &&
//     update.custom_order_id === cusipcoOrderId
//   );

//   const hasCompleted = updates.some(
//     update => update.triggered_action === "Completed" &&
//     update.custom_order_id === cusipcoOrderId
//   );

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
//               <a
//                 href="https://mgood.org"
//                 className="text-2xl font-bold text-primary"
//               >
//                 Mgood.org
//               </a>
//             </div>
//           </div>

//           <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
//             <form className="space-y-4" onSubmit={handleFormSubmit}>
//               <div className="border-2 rounded-md">
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
//                 <input
//                   className="w-full rounded-lg border-gray-200 p-3 text-sm"
//                   placeholder="Phone"
//                   type="text"
//                   id="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="border-2 rounded-md">
//                 <select
//                   className="w-full rounded-lg border-gray-200 p-3 text-sm text-gray-400"
//                   id="gender"
//                   value={formData.gender}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="M">Male</option>
//                   <option value="F">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>

//               <div className="border-2 rounded-md">
//                 <select
//                   className="w-full rounded-lg border-gray-200 p-3 text-sm text-gray-400"
//                   id="specialization"
//                   value={formData.specialization}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">Select Specialization</option>
//                   {specialtyList.map((specialty, index) => (
//                     <option key={index} value={specialty}>
//                       {specialty}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="border-2 rounded-md">
//                 <input
//                   className="w-full rounded-lg border-gray-200 p-3 text-sm text-black"
//                   id="mgoodId"
//                   placeholder="MgoodId"
//                   value={formData.mgoodId}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="border-2 rounded-md">
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
//               <button
//                 type="submit"
//                 className="w-full rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white"
//               >
//                 Start Consultation
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>

//       {paymentOptions && (
//         <div>
//           <Dialog open={paymentOptions} onOpenChange={setPaymentOptions}>
//             <DialogContent className="h-screen sm:h-fit my-10 p-2 sm:p-4 text-xs sm:text-sm md:p-4 md:text-sm">
//               <DialogHeader>
//                 <DialogTitle className="text-center">
//                   Choose Payment Option
//                 </DialogTitle>
//                 <DialogDescription asChild>
//                   <div className="flex flex-col gap-6 p-6">
//                     {/* Payment Options */}
//                     <div className="flex gap-4 justify-between">
//                       <label className="flex items-center gap-2 cursor-pointer">
//                         <input
//                           type="radio"
//                           name="payment"
//                           value="other"
//                           checked={selectedOption === "other"}
//                           onChange={() => setSelectedOption("other")}
//                         />
//                         Pay with Other Options
//                       </label>
//                       <label className="flex items-center gap-2 cursor-pointer">
//                         <input
//                           type="radio"
//                           name="payment"
//                           value="qr"
//                           checked={selectedOption === "qr"}
//                           onChange={() => setSelectedOption("qr")}
//                         />
//                         Pay with QR
//                       </label>
//                       <label className="flex items-center gap-2 cursor-pointer">
//                         <input
//                           type="radio"
//                           name="payment"
//                           value="voucher"
//                           checked={selectedOption === "voucher"}
//                           onChange={() => setSelectedOption("voucher")}
//                         />
//                         Redeem Voucher
//                       </label>
//                     </div>

//                     {/* Content Based on Selected Option */}
//                     {selectedOption === "qr" && (
//                       <form
//                         className="flex flex-col gap-4 justify-center"
//                         onSubmit={handleQrSubmit}
//                       >
//                         <img
//                           src="/pro_plan_qr.jpg"
//                           alt="QR Code"
//                           className="w-32 h-32 m-auto"
//                         />
//                         <p>
//                           After successful payment, fill in the details below:
//                         </p>

//                         {/* Phone Number Input */}
//                         <input
//                           type="text"
//                           id="phoneNumber"
//                           placeholder="Enter Phone Number"
//                           value={qrFormData.phoneNumber}
//                           onChange={handleQrChange}
//                           className="border bg-slate-200 rounded-md p-2"
//                           required
//                         />

//                         {/* MgoodId Input */}
//                         <input
//                           type="text"
//                           id="mgoodId"
//                           placeholder="Enter MgoodId"
//                           value={qrFormData.mgoodId}
//                           onChange={handleQrChange}
//                           className="border bg-slate-200 rounded-md p-2"
//                           required
//                         />

//                         {/* TransactionId Input */}
//                         <input
//                           type="text"
//                           id="transactionId"
//                           placeholder="Enter TransactionId"
//                           value={qrFormData.transactionId}
//                           onChange={handleQrChange}
//                           className="border bg-slate-200 rounded-md p-2"
//                           required
//                         />

//                         {/* Submit Button */}
//                         <button
//                           type="submit"
//                           className="border-2 bg-primary text-white text-xl p-2 rounded-lg hover:bg-green-400"
//                         >
//                           Submit
//                         </button>
//                       </form>
//                     )}

//                     {selectedOption === "other" && (
//                       <div className="flex flex-col gap-3 justify-center">
//                         <button
//                           type="button"
//                           onClick={handleRazorpaySubmit}
//                           className="border-2 bg-primary text-white text-xl p-2 rounded-lg hover:bg-green-400"
//                         >
//                           Go To Razorpay
//                         </button>
//                       </div>
//                     )}
//                     {selectedOption === "voucher" && (
//                       <div className="flex flex-col gap-3 justify-center">
//                         <input
//                           type="text"
//                           placeholder="Enter voucher"
//                           value={voucher}
//                           onChange={(e) => setVoucher(e.target.value)}
//                           className="p-2 border rounded-lg"
//                         />
//                         <button
//                           type="button"
//                           onClick={handleRedeem}
//                           className="border-2 bg-primary text-white text-xl p-2 rounded-lg hover:bg-green-400"
//                           disabled={voucherLoading}
//                         >
//                           {voucherLoading ? "Checking" : "Redeem"}
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </DialogDescription>
//               </DialogHeader>
//             </DialogContent>
//           </Dialog>
//         </div>
//       )}

//       {showDialog && (
//         <Dialog open={showDialog} onOpenChange={setShowDialog}>
//           <DialogContent className="min-h-auto max-h-auto overflow-y-auto sm:my-10 p-4 sm:p-6 text-sm sm:text-base">
//             <DialogHeader>
//               <DialogTitle className="text-center">
//                 Starting Consultation
//               </DialogTitle>
//               <DialogDescription asChild>
//                 <div className="md:p-0 p-2 text-center flex flex-col gap-10 font-body md:text-sm text-xl">
//                   {timer > 0 && (
//                     <>
//                       <div>
//                         {appointmentStatus === "pending"
//                           ? "Please wait while we connect you with a healthcare provider."
//                           : "Doctor has accepted your call. You can join now!"}
//                       </div>
//                       {appointmentStatus === "pending" && (
//                         <div className="flex justify-center">
//                           <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
//                         </div>
//                       )}
//                     </>
//                   )}
//                   {appointmentStatus === "accepted" ? (
//                     <></>
//                   ) : (
//                     <div className="text-lg font-semibold">
//                     Time remaining: {timer} seconds
//                   </div>
//                   )}
//                   {loading ? (
//                     <div className="flex justify-center">
//                       <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
//                     </div>
//                   ) : (
//                     <div className="flex flex-col gap-4">
//                       <Link
//                         href={meetingUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         <button
//                           className={`border-2 text-xl px-8 py-4 rounded-lg ${
//                             appointmentStatus === "accepted"
//                               ? "bg-primary text-white hover:bg-green-600"
//                               : "bg-gray-400 cursor-not-allowed"
//                           }`}
//                           disabled={appointmentStatus !== "accepted"}
//                           onClick={() =>
//                             console.log(
//                               "Join button clicked, status:",
//                               appointmentStatus
//                             )
//                           }
//                         >
//                           {appointmentStatus === "accepted"
//                             ? "Join Now"
//                             : "Waiting for Doctor"}
//                         </button>
//                       </Link>
//                       {appointmentStatus === "accepted" && (
//                         <p className="font-bold text-2xl">
//                           Or Contact Doctor on The Displayed Number{" "}
//                           <a
//                             href={`tel:+91${docNumber}`}
//                             className="text-blue-500 font-extrabold"
//                           >
//                             {docNumber}
//                           </a>
//                         </p>
//                       )}
//                       {(hasPrescriptionUploaded || hasCompleted) && (
//                         <Link
//                           href={prescriptionUrl}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           <button
//                             className={`border-2 text-xl px-8 py-4 rounded-lg ${
//                               appointmentStatus === "accepted"
//                                 ? "bg-primary text-white"
//                                 : "bg-gray-400 cursor-not-allowed"
//                             }`}
//                             disabled={appointmentStatus !== "accepted"}
//                           >
//                             Prescription
//                           </button>
//                         </Link>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </DialogDescription>
//             </DialogHeader>
//             <DialogFooter>
//               {hasCompleted && (
//                 <Button onClick={() => setShowDialog(false)}>
//                   End Consultation
//                 </Button>
//               )}
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       )}
//     </section>
//   );};
// export default PatientDetails;
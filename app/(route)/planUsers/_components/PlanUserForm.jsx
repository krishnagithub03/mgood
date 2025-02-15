

"use client";
import React, { use, useState } from "react";
import axios from "axios";
import { SyncLoader } from "react-spinners";
import { toast } from "sonner";
const PlanUserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    price: 299,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [razorpay_payment_id, setRazorpay_payment_id] = useState("");
  const [isPaymentSuccess, setPaymentSuccess] = useState(false);
  const [userId, setUserId] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
            amount: 1,
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
  const updateIsBoarded = () => {
    axios
      .patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/planUsers/activate-plan/${userId}`
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Error activating plan:", err);
        alert("Failed to activate plan. Please try again.");
      });
  };

  const handlePaymentVerify = async (data) => {
    const options = {
      key: process.env.RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "MGood",
      description: "Live Mode",
      order_id: data.id,
      handler: async (response) => {
        console.log("response", response);
        setRazorpay_payment_id(response.razorpay_payment_id);
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
          console.log(verifyData, "verifyData");

          if (verifyData.message) {
            toast.success("Payment successful!");
            await updateIsBoarded(userId);
            setPaymentSuccess(true);
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#5f63b8",
      },
      method: {
        qr: true, 
        netbanking: true,
        card: true,
        upi: true,
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/planUsers/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      setLoading(false);
      setMessage(`User registered successfully!!`);
      setUserId(data.userId);
      setFormData({
        name: "",
        email: "",
        phone: "",
        price: 299,
      });
      setDialog(true);
    } else {
      setLoading(false);
      setMessage(`Error: ${data.error}`);
    }
    setLoading(false);
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Teleconsultation"
            src="https://womens-health.sg/wp-content/uploads/2020/04/DTAP-Online-Consultation-Ad.png"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              MGood Plans
            </h1>
            <p className="mt-4 leading-relaxed text-gray-500">
              Get our teleconsultation plan for only INR 299. Register below.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 grid grid-cols-6 gap-6"
            >
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-2 border-gray-400 bg-white text-sm text-gray-700 shadow-xs p-2"
                />
              </div>

              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-2 border-gray-400 p-2 bg-white text-sm text-gray-700 shadow-xs"
                />
              </div>

              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-2 border-gray-400 p-2 bg-white text-sm text-gray-700 shadow-xs"
                />
              </div>

              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">
                  Cost (INR)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-2 border-gray-400 p-2 bg-white text-sm text-gray-700 shadow-xs"
                  disabled
                />
              </div>

              <div className="col-span-6">
                <button
                  type="submit"
                  className="inline-block shrink-0 rounded-md border border-primary bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-primary focus:ring-3 focus:outline-hidden"
                >
                  Register
                </button>
              </div>
            </form>

            {message && <p className="mt-4 text-red-500">{message}</p>}
          </div>
        </main>
      </div>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-20 backdrop-blur-sm flex-col gap-4">
          <SyncLoader color="green" height={15} width={200} />
          <p className="font-bold text-xl">Submitting...</p>
        </div>
      )}
      {dialog && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold text-center">
              One Step Away From Becoming A Part Of MGood
            </h2>
            <div className="mt-4 text-center">
              <p className="text-lg text-gray-600 mb-6">
                Click below to Continue.
              </p>
            </div>
            <div className="flex justify-around">
              {/* Go To MGood Button */}
              <button
                className="bg-primary text-white px-4 py-2 rounded-lg"
                onClick={handlePayment}
              >
                Proceed to pay
              </button>
            </div>
          </div>
        </div>
      )}
      {isPaymentSuccess && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-3xl font-bold text-center text-green-600">
              🎉 Congratulations! 🎉
            </h2>
            <p className="text-lg text-gray-700 mt-4 text-center font-body">
              {userId} Redeem this voucher code at the time of payment before
              teleconsultation.
            </p>
            <div className="flex justify-around mt-6">
              {/* Go To MGood Button */}
              <button
                className="bg-primary text-white px-6 py-2 rounded-lg"
                onClick={() => {
                  window.location.href = `https://mgood.org/book-tc`;
                }}
              >
                Start Teleconsultation
              </button>
              {/* Close Button */}
              <button
                className="bg-gray-500 text-white px-6 py-2 rounded-lg"
                onClick={() => {
                  setDialog(false);
                  setPaymentSuccess(false);
                }} // Close the dialog
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PlanUserForm;

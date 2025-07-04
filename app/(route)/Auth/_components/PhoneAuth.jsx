// import { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Phone, Shield, ArrowRight, Loader2 } from "lucide-react";
// import { toast } from "sonner";
// import { AlertCircle } from "lucide-react";
// import { useRouter, useSearchParams } from 'next/navigation';

// export default function OTPVerification() {
//   const [step, setStep] = useState("phone");
//   const [otp, setOtp] = useState(new Array(6).fill(""));
//   const [loading, setLoading] = useState(false);
//   const [retryDisabled, setRetryDisabled] = useState(false);
//   const inputRefs = useRef([]);
  
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [error, setError] = useState("");
//   const [retryCount, setRetryCount] = useState(0);
//   const timerRef = useRef(null);

//   const handleChange = (index, e) => {
//     const value = e.target.value.replace(/\D/, "");
//     if (!value) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (index < 5 && inputRefs.current[index + 1]) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (index, e) => {
//     if (e.key === "Backspace") {
//       const newOtp = [...otp];
//       if (!newOtp[index] && index > 0) {
//         inputRefs.current[index - 1].focus();
//       }
//       newOtp[index] = "";
//       setOtp(newOtp);
//     }
//   };


//   const validatePhoneNumber = (input) => {
//     const number = String(input).trim();
//     const cleanedNumber = number.replace(/\D/g, "");
//     return cleanedNumber.length === 10 && /^[6-9]\d{9}$/.test(cleanedNumber);
//   };

//   const handlePhoneSubmit = async (e) => {
//     e.preventDefault();
//     if (!validatePhoneNumber(phoneNumber)) {
//       toast.error("Please enter a valid phone number", {
//         icon: <AlertCircle className="h-5 w-5 text-destructive" />,
//       });
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/send-otp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phoneNumber }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Failed to send OTP");
//       }
//       toast.success("OTP sent successfully", {
//         description: `A 6-digit code has been sent to ${phoneNumber}`,
//       });
//       setStep("otp");
//       setRetryCount(0);
//     } catch (error) {
//       toast.error("Failed to send OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     if (otp.some((digit) => digit === "")) {
//       toast.error("Please enter a valid 6-digit OTP");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-otp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           phoneNumber,
//           otp: otp.join(""), // Join the array to form a string
//         }),
//       });

//       const data = await response.json();
//       console.log(data);

//       if (!response.ok) {
//         throw new Error(data.message || "Invalid OTP");
//       }

//       document.cookie = `accessToken=${data.token}; path=/; max-age=${
//         7 * 24 * 60 * 60
//       }; secure`;
//       document.cookie = `user=${phoneNumber}; path=/; max-age=${
//         7 * 24 * 60 * 60
//       }; secure`;

//       toast.success("Authentication successful", {
//         description: "Redirecting you...",
//       });

//       // You might want to add a redirect here
//       window.location.href = "/";
//     } catch (error) {
//       toast.error("Invalid OTP");
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleRetry = async () => {
//     if (retryCount >= 3) {
//       setRetryDisabled(true);
//       toast.error("Maximum retry attempts reached", {
//         description: "Please wait 60 seconds before trying again",
//       });

//       timerRef.current = setTimeout(() => {
//         setRetryDisabled(false);
//         setRetryCount(0);
//       }, 60000);

//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/send-otp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phoneNumber }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Failed to send OTP");
//       }

//       setRetryCount((prev) => prev + 1);
//       toast.success("OTP resent successfully");
//     } catch (error) {
//       toast.error("Failed to resend OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//     useEffect(() => {
//       return () => {
//         if (timerRef.current) {
//           clearTimeout(timerRef.current);
//         }
//       };
//     }, []);

//   return (
//     <div className="max-h-screen flex bg-gradient-to-r from-primary via-green-300 to-blue-200">
//       {/* Left Side - Image Section */}
//       <motion.div
//         className="hidden md:flex w-1/2 relative"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//       >
//         <img
//           // src="https://source.unsplash.com/800x800/?technology,security"
//           src="https://cygnusweb.in/cnci_dev/backend/public/uploads/2024/07/17/TeleConsultationsImage.png"
//           alt="Teleconsultation Photo"
//           className="w-full h-full object-contain p-8"
//         />
//         {/* <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
//           <h2 className="text-white text-3xl font-bold">Secure Login</h2>
//         </div> */}
//       </motion.div>

//       {/* Right Side - OTP Form */}
//       <div className="w-full md:w-1/2 flex items-center justify-center p-8 ">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="w-full max-w-sm"
//         >
//           <div className="bg- dark:bg-gray-950 shadow-lg rounded-lg p-6 bg-white">
//             <div className="text-center">
//               <motion.div
//                 initial={{ scale: 0.5, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ delay: 0.2 }}
//                 className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto"
//               >
//                 {step === "phone" ? (
//                   <Phone className="w-6 h-6 text-primary" />
//                 ) : (
//                   <Shield className="w-6 h-6 text-primary" />
//                 )}
//               </motion.div>
//               <h2 className="text-2xl font-bold">
//                 {step === "phone" ? "Welcome back" : "Verify OTP"}
//               </h2>
//               <p className="text-gray-500 mt-2">
//                 {step === "phone"
//                   ? "Enter your phone number to receive an OTP"
//                   : `Enter the 6-digit code sent to ${phoneNumber}`}
//               </p>
//             </div>

//             <div className="mt-6">
//               <AnimatePresence mode="wait">
//                 {step === "phone" ? (
//                   <motion.form
//                     key="phone-form"
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: 20 }}
//                     onSubmit={handlePhoneSubmit}
//                     className="space-y-4"
//                   >
//                     <div className="space-y-2">
//                       <label
//                         htmlFor="phone"
//                         className="block text-sm font-medium"
//                       >
//                         Phone Number
//                       </label>
//                       <input
//                         id="phone"
//                         type="tel"
//                         placeholder="Enter your phone number"
//                         value={phoneNumber}
//                         onChange={(e) => setPhoneNumber(e.target.value)}
//                         className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-400 outline-none"
//                         required
//                       />
//                     </div>
//                     <button
//                       type="submit"
//                       className="w-full p-3 bg-blue-500 text-white rounded-lg flex justify-center"
//                       disabled={loading}
//                     >
//                       {loading ? (
//                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       ) : (
//                         <>
//                           Continue <ArrowRight className="ml-2 h-4 w-4 mt-1" />
//                         </>
//                       )}
//                     </button>
//                   </motion.form>
//                 ) : (
//                   <motion.form
//                     key="otp-form"
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     onSubmit={handleVerify}
//                     className="space-y-4"
//                   >
//                     <div className="space-y-2">
//                       <label className="block text-sm font-medium">
//                         Enter OTP
//                       </label>
//                       <div className="flex justify-center space-x-2">
//                         {otp.map((digit, index) => (
//                           <input
//                             key={index}
//                             ref={(el) => (inputRefs.current[index] = el)}
//                             type="text"
//                             value={digit}
//                             maxLength={1}
//                             onChange={(e) => handleChange(index, e)}
//                             onKeyDown={(e) => handleKeyDown(index, e)}
//                             className="w-12 h-12 text-xl text-center border rounded-lg focus:ring focus:ring-blue-400 outline-none"
//                           />
//                         ))}
//                       </div>
//                     </div>
//                     <button
//                       type="submit"
//                       className="w-full p-3 bg-blue-500 text-white rounded-lg"
//                       disabled={loading}
//                     >
//                       {loading ? (
//                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       ) : (
//                         "Verify OTP"
//                       )}
//                     </button>
//                   </motion.form>
//                 )}
//               </AnimatePresence>
//             </div>

//             <AnimatePresence>
//               {step === "otp" && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: 10 }}
//                 >
//                   <div className="text-sm text-center mt-4">
//                     Didn't receive the code?{" "}
//                     <button
//                       onClick={handleRetry}
//                       className="text-blue-600 font-medium"
//                       disabled={loading || retryDisabled}
//                     >
//                       Resend OTP
//                     </button>
//                   </div>
//                   <button
//                     className="w-full mt-2 p-2 border rounded-lg"
//                     onClick={() => setStep("phone")}
//                     disabled={loading}
//                   >
//                     Change Phone Number
//                   </button>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Shield, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import { useRouter, useSearchParams } from 'next/navigation';

export default function OTPVerification() {
  const [step, setStep] = useState("phone");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [retryDisabled, setRetryDisabled] = useState(false);
  const inputRefs = useRef([]);
  
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const timerRef = useRef(null);

  // Get router and search params
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl');

  // Add debug logging
  useEffect(() => {
    console.log("Auth component loaded");
    console.log("Return URL from search params:", returnUrl);
  }, [returnUrl]);

  const handleChange = (index, e) => {
    const value = e.target.value.replace(/\D/, "");
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (!newOtp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      }
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const validatePhoneNumber = (input) => {
    const number = String(input).trim();
    const cleanedNumber = number.replace(/\D/g, "");
    return cleanedNumber.length === 10 && /^[6-9]\d{9}$/.test(cleanedNumber);
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    if (!validatePhoneNumber(phoneNumber)) {
      toast.error("Please enter a valid phone number", {
        icon: <AlertCircle className="h-5 w-5 text-destructive" />,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send OTP");
      }
      toast.success("OTP sent successfully", {
        description: `A 6-digit code has been sent to ${phoneNumber}`,
      });
      setStep("otp");
      setRetryCount(0);
    } catch (error) {
      toast.error("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (otp.some((digit) => digit === "")) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber,
          otp: otp.join(""), // Join the array to form a string
        }),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || "Invalid OTP");
      }

      document.cookie = `accessToken=${data.token}; path=/; max-age=${
        7 * 24 * 60 * 60
      }; secure`;
      document.cookie = `user=${phoneNumber}; path=/; max-age=${
        7 * 24 * 60 * 60
      }; secure`;

      toast.success("Authentication successful", {
        description: "Redirecting you...",
      });

      // Use returnUrl from middleware or default to home
      const redirectTo = returnUrl || "/";
      console.log("Login successful, redirecting to:", redirectTo);
      
      // Use Next.js router instead of window.location.href
      router.push(redirectTo);
      
    } catch (error) {
      toast.error("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = async () => {
    if (retryCount >= 3) {
      setRetryDisabled(true);
      toast.error("Maximum retry attempts reached", {
        description: "Please wait 60 seconds before trying again",
      });

      timerRef.current = setTimeout(() => {
        setRetryDisabled(false);
        setRetryCount(0);
      }, 60000);

      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send OTP");
      }

      setRetryCount((prev) => prev + 1);
      toast.success("OTP resent successfully");
    } catch (error) {
      toast.error("Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="max-h-screen flex bg-gradient-to-r from-primary via-green-300 to-blue-200">
      {/* Left Side - Image Section */}
      <motion.div
        className="hidden md:flex w-1/2 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <img
          src="https://cygnusweb.in/cnci_dev/backend/public/uploads/2024/07/17/TeleConsultationsImage.png"
          alt="Teleconsultation Photo"
          className="w-full h-full object-contain p-8"
        />
      </motion.div>

      {/* Right Side - OTP Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="bg- dark:bg-gray-950 shadow-lg rounded-lg p-6 bg-white">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto"
              >
                {step === "phone" ? (
                  <Phone className="w-6 h-6 text-primary" />
                ) : (
                  <Shield className="w-6 h-6 text-primary" />
                )}
              </motion.div>
              <h2 className="text-2xl font-bold">
                {step === "phone" ? "Welcome back" : "Verify OTP"}
              </h2>
              <p className="text-gray-500 mt-2">
                {step === "phone"
                  ? "Enter your phone number to receive an OTP"
                  : `Enter the 6-digit code sent to ${phoneNumber}`}
              </p>
              {/* Debug info - Remove this after testing */}
              {returnUrl && (
                <p className="text-xs text-blue-600 mt-1">
                  You'll be redirected to: {returnUrl}
                </p>
              )}
            </div>

            <div className="mt-6">
              <AnimatePresence mode="wait">
                {step === "phone" ? (
                  <motion.form
                    key="phone-form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    onSubmit={handlePhoneSubmit}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium"
                      >
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-400 outline-none"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full p-3 bg-blue-500 text-white rounded-lg flex justify-center"
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          Continue <ArrowRight className="ml-2 h-4 w-4 mt-1" />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.form
                    key="otp-form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleVerify}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">
                        Enter OTP
                      </label>
                      <div className="flex justify-center space-x-2">
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            value={digit}
                            maxLength={1}
                            onChange={(e) => handleChange(index, e)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-12 h-12 text-xl text-center border rounded-lg focus:ring focus:ring-blue-400 outline-none"
                          />
                        ))}
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full p-3 bg-blue-500 text-white rounded-lg"
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        "Verify OTP"
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {step === "otp" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <div className="text-sm text-center mt-4">
                    Didn't receive the code?{" "}
                    <button
                      onClick={handleRetry}
                      className="text-blue-600 font-medium"
                      disabled={loading || retryDisabled}
                    >
                      Resend OTP
                    </button>
                  </div>
                  <button
                    className="w-full mt-2 p-2 border rounded-lg"
                    onClick={() => setStep("phone")}
                    disabled={loading}
                  >
                    Change Phone Number
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
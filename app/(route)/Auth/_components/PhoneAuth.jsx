// 'use client';

// // This is the Client Component. It's marked with 'use client' because it uses
// // React hooks like useState, useEffect, and useSearchParams which require browser APIs.

// import { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Phone, Shield, ArrowRight, Loader2 } from "lucide-react";
// import { toast } from "sonner";
// import { AlertCircle } from "lucide-react";
// import { useRouter, useSearchParams } from 'next/navigation';

// export default function PhoneAuth() {
//   const [step, setStep] = useState("phone");
//   const [otp, setOtp] = useState(new Array(6).fill(""));
//   const [loading, setLoading] = useState(false);
//   const [retryDisabled, setRetryDisabled] = useState(false);
//   const inputRefs = useRef([]);
  
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [retryCount, setRetryCount] = useState(0);
//   const timerRef = useRef(null);

//   // Get router and search params. This hook is why this component must be a client component.
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const returnUrl = searchParams.get('returnUrl');

//   useEffect(() => {
//     console.log("Auth component loaded on the client.");
//     if (returnUrl) {
//       console.log("Will redirect to:", returnUrl, "after successful login.");
//     }
//   }, [returnUrl]);

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
//       toast.error("Please enter a valid 10-digit phone number", {
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
//       toast.error("Failed to send OTP", { description: error.message });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     if (otp.join("").length !== 6) {
//       toast.error("Please enter the complete 6-digit OTP");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-otp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           phoneNumber,
//           otp: otp.join(""),
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Invalid OTP");
//       }

//       document.cookie = `accessToken=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=lax`;
//       document.cookie = `user=${phoneNumber}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=lax`;

//       toast.success("Authentication successful", {
//         description: "Redirecting you...",
//       });
      
//     } catch (error) {
//       toast.error("Invalid OTP", { description: "Please check the code and try again." });

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
//       // Re-using the handlePhoneSubmit logic is cleaner
//       await handlePhoneSubmit({ preventDefault: () => {} }); // Pass a mock event
//       setRetryCount((prev) => prev + 1);
//     } catch (error) {
//       // The error is already handled in handlePhoneSubmit
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     return () => {
//       if (timerRef.current) {
//         clearTimeout(timerRef.current);
//       }
//     };
//   }, []);

//   return (
//     <div className="min-h-screen flex bg-gradient-to-r from-blue-100 via-green-100 to-indigo-100">
//       {/* Left Side - Image Section */}
//       <div className="hidden md:flex w-1/2 items-center justify-center p-8">
//         <motion.img
//           src="https://cygnusweb.in/cnci_dev/backend/public/uploads/2024/07/17/TeleConsultationsImage.png"
//           alt="Teleconsultation Photo"
//           className="w-full h-auto max-w-lg object-contain"
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.7, ease: "easeOut" }}
//         />
//       </div>

//       {/* Right Side - OTP Form */}
//       <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="w-full max-w-sm"
//         >
//           <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8">
//             <div className="text-center">
//               <motion.div
//                 initial={{ scale: 0.5, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
//                 className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto"
//               >
//                 {step === "phone" ? (
//                   <Phone className="w-8 h-8 text-primary" />
//                 ) : (
//                   <Shield className="w-8 h-8 text-primary" />
//                 )}
//               </motion.div>
//               <h2 className="text-2xl font-bold text-gray-800">
//                 {step === "phone" ? "Welcome Back" : "Verify Your Identity"}
//               </h2>
//               <p className="text-gray-500 mt-2">
//                 {step === "phone"
//                   ? "Enter your phone number to sign in or sign up."
//                   : `Enter the 6-digit code sent to ${phoneNumber}`}
//               </p>
//             </div>

//             <div className="mt-8">
//               <AnimatePresence mode="wait">
//                 {step === "phone" ? (
//                   <motion.form
//                     key="phone-form"
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: 20 }}
//                     onSubmit={handlePhoneSubmit}
//                     className="space-y-6"
//                   >
//                     <div className="relative">
//                       <label htmlFor="phone" className="sr-only">Phone Number</label>
//                       <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//                       <input
//                         id="phone"
//                         type="tel"
//                         placeholder="Enter 10-digit number"
//                         value={phoneNumber}
//                         onChange={(e) => setPhoneNumber(e.target.value)}
//                         className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
//                         required
//                       />
//                     </div>
//                     <button
//                       type="submit"
//                       className="w-full p-3 bg-blue-500 text-white rounded-lg flex items-center justify-center font-semibold hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
//                       disabled={loading}
//                     >
//                       {loading ? (
//                         <Loader2 className="h-5 w-5 animate-spin" />
//                       ) : (
//                         <>
//                           Continue <ArrowRight className="ml-2 h-5 w-5" />
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
//                     className="space-y-6"
//                   >
//                     <div className="flex justify-center space-x-2 sm:space-x-3">
//                       {otp.map((digit, index) => (
//                         <input
//                           key={index}
//                           ref={(el) => (inputRefs.current[index] = el)}
//                           type="tel"
//                           value={digit}
//                           maxLength={1}
//                           onChange={(e) => handleChange(index, e)}
//                           onKeyDown={(e) => handleKeyDown(index, e)}
//                           className="w-12 h-12 text-2xl text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
//                           aria-label={`OTP digit ${index + 1}`}
//                         />
//                       ))}
//                     </div>
//                     <button
//                       type="submit"
//                       className="w-full p-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
//                       disabled={loading}
//                     >
//                       {loading ? (
//                         <Loader2 className="h-5 w-5 animate-spin mx-auto" />
//                       ) : (
//                         "Verify & Continue"
//                       )}
//                     </button>
//                   </motion.form>
//                 )}
//               </AnimatePresence>
//             </div>

//             <AnimatePresence>
//               {step === "otp" && (
//                 <motion.div
//                   className="text-center mt-6"
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: 10 }}
//                   transition={{ delay: 0.2 }}
//                 >
//                   <div className="text-sm text-gray-600">
//                     Didn't receive the code?{" "}
//                     <button
//                       onClick={handleRetry}
//                       className="text-blue-600 font-medium hover:underline disabled:text-gray-400 disabled:no-underline"
//                       disabled={loading || retryDisabled}
//                     >
//                       Resend
//                     </button>
//                   </div>
//                   <button
//                     className="mt-4 text-sm text-gray-500 hover:text-gray-700"
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

// This is the Client Component. It's marked with 'use client' because it uses
// React hooks like useState, useEffect, and useSearchParams which require browser APIs.

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Shield, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import { useRouter, useSearchParams } from 'next/navigation';

export default function PhoneAuth() {
  const [step, setStep] = useState("phone");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [retryDisabled, setRetryDisabled] = useState(false);
  const inputRefs = useRef([]);
  
  const [phoneNumber, setPhoneNumber] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const timerRef = useRef(null);

  // Get router and search params. This hook is why this component must be a client component.
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl');

  useEffect(() => {
    console.log("Auth component loaded on the client.");
    if (returnUrl) {
      console.log("Will redirect to:", returnUrl, "after successful login.");
    }
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
      toast.error("Please enter a valid 10-digit phone number", {
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
      toast.error("Failed to send OTP", { description: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (otp.join("").length !== 6) {
      toast.error("Please enter the complete 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber,
          otp: otp.join(""),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid OTP");
      }

      // Set cookies
      document.cookie = `accessToken=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=lax`;
      document.cookie = `user=${phoneNumber}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=lax`;

      toast.success("Authentication successful", {
        description: "Redirecting you...",
      });

      // Redirect after successful authentication
      setTimeout(() => {
        if (returnUrl) {
          // Use window.location.href for hard navigation to ensure cookies are loaded
          window.location.href = returnUrl;
        } else {
          // Default redirect - change '/dashboard' to your default page
          window.location.href = '/dashboard';
        }
      }, 1000); // 1 second delay to show the success message
      
    } catch (error) {
      toast.error("Invalid OTP", { description: "Please check the code and try again." });
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
      // Re-using the handlePhoneSubmit logic is cleaner
      await handlePhoneSubmit({ preventDefault: () => {} }); // Pass a mock event
      setRetryCount((prev) => prev + 1);
    } catch (error) {
      // The error is already handled in handlePhoneSubmit
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
    <div className="min-h-screen flex bg-gradient-to-r from-blue-100 via-green-100 to-indigo-100">
      {/* Left Side - Image Section */}
      <div className="hidden md:flex w-1/2 items-center justify-center p-8">
        <motion.img
          src="https://cygnusweb.in/cnci_dev/backend/public/uploads/2024/07/17/TeleConsultationsImage.png"
          alt="Teleconsultation Photo"
          className="w-full h-auto max-w-lg object-contain"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </div>

      {/* Right Side - OTP Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto"
              >
                {step === "phone" ? (
                  <Phone className="w-8 h-8 text-primary" />
                ) : (
                  <Shield className="w-8 h-8 text-primary" />
                )}
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800">
                {step === "phone" ? "Welcome Back" : "Verify Your Identity"}
              </h2>
              <p className="text-gray-500 mt-2">
                {step === "phone"
                  ? "Enter your phone number to sign in or sign up."
                  : `Enter the 6-digit code sent to ${phoneNumber}`}
              </p>
            </div>

            <div className="mt-8">
              <AnimatePresence mode="wait">
                {step === "phone" ? (
                  <motion.form
                    key="phone-form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    onSubmit={handlePhoneSubmit}
                    className="space-y-6"
                  >
                    <div className="relative">
                      <label htmlFor="phone" className="sr-only">Phone Number</label>
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        id="phone"
                        type="tel"
                        placeholder="Enter 10-digit number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full p-3 bg-blue-500 text-white rounded-lg flex items-center justify-center font-semibold hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          Continue <ArrowRight className="ml-2 h-5 w-5" />
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
                    className="space-y-6"
                  >
                    <div className="flex justify-center space-x-2 sm:space-x-3">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => (inputRefs.current[index] = el)}
                          type="tel"
                          value={digit}
                          maxLength={1}
                          onChange={(e) => handleChange(index, e)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          className="w-12 h-12 text-2xl text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                          aria-label={`OTP digit ${index + 1}`}
                        />
                      ))}
                    </div>
                    <button
                      type="submit"
                      className="w-full p-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                      ) : (
                        "Verify & Continue"
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {step === "otp" && (
                <motion.div
                  className="text-center mt-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-sm text-gray-600">
                    Didn't receive the code?{" "}
                    <button
                      onClick={handleRetry}
                      className="text-blue-600 font-medium hover:underline disabled:text-gray-400 disabled:no-underline"
                      disabled={loading || retryDisabled}
                    >
                      Resend
                    </button>
                  </div>
                  <button
                    className="mt-4 text-sm text-gray-500 hover:text-gray-700"
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

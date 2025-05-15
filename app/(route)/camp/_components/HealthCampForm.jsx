'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import for App Router

const HealthCampForm = () => {
  const router = useRouter(); // Initialize router
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    phoneNumber: '',
    disease: ''
  });
  const [submitted, setSubmitted] = useState(false); // To show success message for the current submission
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateMobileNumber = (mobileNumber) => {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(mobileNumber);
  };

  // Cookie functions (setPermanentCookie, getCookie) are REMOVED

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    setSubmitted(false); // Reset submitted state for new submissions

    try {
      // Cookie check logic is REMOVED

      if (!formData.name.trim()) throw new Error("Please enter your name");
      if (!formData.age.trim() || parseInt(formData.age, 10) <= 0) throw new Error("Please enter a valid age");
      if (!formData.gender.trim()) throw new Error("Please select your gender");
      if (!validateMobileNumber(formData.phoneNumber))
        throw new Error("Please enter a valid 10-digit mobile number");

      const dataToSend = { ...formData, submissionDate: new Date().toISOString() };

      setLoading(true);
      const response = await fetch("/api/submit-to-sheets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Submission error:", errorData);
        throw new Error(errorData.message || "Failed to submit data");
      }

      // Setting cookie is REMOVED
      setSubmitted(true); // Show success message for this submission

      // Clear form fields after successful submission to allow for a new entry
      setFormData({
        name: '',
        age: '',
        gender: '',
        phoneNumber: '',
        disease: ''
      });

      // Optional: Redirect after a delay, or you can let the user stay on the form
      // to make another entry immediately after seeing the success message.
      // If you want to redirect, uncomment the following:
      // setTimeout(() => {
      //   router.push('/'); // Or another page
      //   // If redirecting, you might want to setSubmitted(false) again before redirecting
      //   // or handle the "thank you" message on the target page.
      // }, 3000);

    } catch (err) {
      console.error("Error in form submission:", err);
      setError(err.message || "An error occurred during submission");
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  // useEffect to check for cookie on mount is REMOVED

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <div>Submitting your registration...</div>
      </div>
    );
  }
  
  return (
    <div className="max-w-xl mx-auto p-6 sm:p-10 bg-white rounded-lg shadow-xl my-10 sm:my-20">
      <h1 className="text-xl sm:text-2xl font-bold mb-2 text-center text-primary">Nagata Auto Engineering India Pvt Limited</h1>
      <h2 className="text-lg sm:text-xl font-semibold mb-6 text-center text-gray-700">Eye Checkup Camp Organized by: <span className="text-primary">MGood</span></h2>
      {/* Disclaimer about one submission can be removed or rephrased if multiple entries are allowed */}
      {/* <p className='italic mb-6 text-sm text-gray-600 text-center'>Disclaimer: Each user is allowed only one registration. Further attempts will not be accepted.</p> */}
      
      {/* Show success message only for the current successful submission */}
      {submitted && (
        <div className="text-center mb-4 p-4 bg-green-100 text-green-700 rounded-md">
            Thank you for your registration! You can submit another entry if needed.
        </div>
      )}
      
      {/* Always show the form if multiple entries are allowed, unless actively submitting */}
      <form onSubmit={handleSubmit}>
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}
        
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 font-medium">Full Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" 
            placeholder="Enter your full name" 
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="age" className="block mb-2 font-medium">Age</label>
          <input 
            type="number" 
            id="age" 
            name="age" 
            value={formData.age} 
            onChange={handleChange} 
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" 
            placeholder="Enter your age" 
            min="1" 
            max="120"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="gender" className="block mb-2 font-medium">Gender</label>
          <select 
            id="gender" 
            name="gender" 
            value={formData.gender} 
            onChange={handleChange} 
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select your gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block mb-2 font-medium">Mobile Number</label>
          <input 
            type="text"
            id="phoneNumber" 
            name="phoneNumber" 
            value={formData.phoneNumber} 
            onChange={handleChange} 
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" 
            placeholder="Enter your 10-digit mobile number" 
            maxLength="10" 
            pattern="[6-9]{1}[0-9]{9}"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="disease" className="block mb-2 font-medium">Any Pre-existing Disease / Current Ailments</label>
          <textarea 
            id="disease" 
            name="disease" 
            value={formData.disease} 
            onChange={handleChange} 
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" 
            placeholder="List any known medical conditions or current symptoms (if none, write 'None')" 
            rows="3"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting} 
          className={`w-full ${isSubmitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-primary hover:bg-blue-600'} text-white py-3 px-4 rounded transition duration-200 font-semibold`}
        >
          {isSubmitting ? 'Registering...' : 'Register for Eye Checkup Camp'}
        </button>
      </form>

      <div className="mt-10 pt-6 border-t border-gray-300 text-center">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Our Esteemed Partners</h3>
        <div className="space-y-2 text-sm">
          <p className="text-gray-600">
            <span className="font-medium">Eye Checkup Partner:</span> NEEL EYE HOSPITAL
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Pharmacy Partner:</span> AVA Pharma
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Optician Partner:</span> Agrawal Optical Company
          </p>
        </div>
      </div>
    </div>
  );
};

export default HealthCampForm;
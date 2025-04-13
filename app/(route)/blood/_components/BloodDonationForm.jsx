'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BloodDonationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    sex: '',
    city: '',
    state: '',
    mobileNumber: '',
    bloodGroup: '',
    preexistingDisease: '',
    willingToDonate: 'No'
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRadioChange = (e) => {
    setFormData(prev => ({
      ...prev,
      willingToDonate: e.target.value
    }));
  };

  const validateMobileNumber = (mobileNumber) => {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(mobileNumber);
  };

  // Set permanent cookie that doesn't expire
  function setPermanentCookie() {
    // Set expiration date far in the future (10 years)
    const farFuture = new Date();
    farFuture.setFullYear(farFuture.getFullYear() + 10);
    
    // Set cookie with very long expiration - using a unique name for blood donation
    document.cookie = `bloodDonationSubmitted=true; expires=${farFuture.toUTCString()}; path=/`;
  }

  // Read cookie helper function
  function getCookie(name) {
    const value = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`));
    return value ? value.split("=")[1] : null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const hasSubmitted = getCookie("bloodDonationSubmitted");

      if (hasSubmitted) {
        throw new Error("You have already submitted your information. Only one submission is allowed per person.");
      }

      if (!formData.name.trim()) throw new Error("Please enter your name");
      if (!formData.age.trim()) throw new Error("Please enter your age");
      if (!formData.sex.trim()) throw new Error("Please select your sex");
      if (!formData.city.trim()) throw new Error("Please enter your city");
      if (!formData.state.trim()) throw new Error("Please enter your state");
      if (!validateMobileNumber(formData.mobileNumber))
        throw new Error("Please enter a valid 10-digit mobile number");
      if (!formData.bloodGroup.trim()) throw new Error("Please select your blood group");

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

      // Set permanent cookie to track that this user has submitted
      setPermanentCookie();
      setSubmitted(true);

    } catch (err) {
      console.error("Error in form submission:", err);
      setError(err.message || "An error occurred during submission");
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    const hasSubmitted = getCookie("bloodDonationSubmitted");
    if (hasSubmitted) {
      setSubmitted(true);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <div> Submitting your response... </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-xl mx-auto p-10 bg-white rounded-lg shadow-xl mt-20 mb-20">
      <h1 className="text-2xl font-bold mb-6 text-center text-primary">BLOOD DONATION REGISTRY</h1>
      <p className='italic mb-6'>Disclaimer: Each user is allowed only one submission. Further attempts will not be accepted.</p>
      
      {submitted ? (
        <div className="text-center mb-4 p-4 bg-green-100 text-green-700 rounded-md">Thank you for registering as a potential blood donor!</div>
      ) : (
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
              min="18"
              max="65"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="sex" className="block mb-2 font-medium">Sex</label>
            <select 
              id="sex" 
              name="sex" 
              value={formData.sex} 
              onChange={handleChange} 
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select your sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="city" className="block mb-2 font-medium">City</label>
            <input 
              type="text" 
              id="city" 
              name="city" 
              value={formData.city} 
              onChange={handleChange} 
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" 
              placeholder="Enter your city" 
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="state" className="block mb-2 font-medium">State</label>
            <input 
              type="text" 
              id="state" 
              name="state" 
              value={formData.state} 
              onChange={handleChange} 
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" 
              placeholder="Enter your state" 
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="mobileNumber" className="block mb-2 font-medium">Mobile Number</label>
            <input 
              type="text" 
              id="mobileNumber" 
              name="mobileNumber" 
              value={formData.mobileNumber} 
              onChange={handleChange} 
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" 
              placeholder="Enter your 10-digit mobile number" 
              maxLength="10" 
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="bloodGroup" className="block mb-2 font-medium">Blood Group</label>
            <select 
              id="bloodGroup" 
              name="bloodGroup" 
              value={formData.bloodGroup} 
              onChange={handleChange} 
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select your blood group</option>
              {bloodGroups.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="preexistingDisease" className="block mb-2 font-medium">Any Preexisting Disease</label>
            <textarea 
              id="preexistingDisease" 
              name="preexistingDisease" 
              value={formData.preexistingDisease} 
              onChange={handleChange} 
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" 
              placeholder="List any preexisting medical conditions (if none, write 'None')" 
              rows="3"
            />
          </div>
          
          <div className="mb-6">
            <label className="block mb-2 font-medium">Are you willing to volunteer for a blood donation in case of need?</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="willingToDonate" 
                  value="Yes" 
                  checked={formData.willingToDonate === "Yes"} 
                  onChange={handleRadioChange} 
                  className="mr-2" 
                />
                Yes
              </label>
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="willingToDonate" 
                  value="No" 
                  checked={formData.willingToDonate === "No"} 
                  onChange={handleRadioChange} 
                  className="mr-2" 
                />
                No
              </label>
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting} 
            className={`w-full ${isSubmitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-primary hover:bg-blue-600'} text-white py-2 px-4 rounded transition duration-200`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      )}
    </div>
  );
};

export default BloodDonationForm;
'use client';

import React, { useState } from 'react';

const HealthPackageForm = () => {
  // State for all form fields
  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    email: '',
    mobileNo: '',
    gender: '',
    age: '',
    healthPackage: '',
    address: '',
    pincode: ''
  });

  // State for managing submission status
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  // Generic handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // --- Validation Helpers ---
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateMobileNumber = (mobile) => /^[6-9]\d{9}$/.test(mobile);
  const validatePincode = (pincode) => /^\d{6}$/.test(pincode);

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    setSubmitted(false);

    try {
      // --- Validation Checks ---
      if (!formData.employeeId.trim()) throw new Error("Please enter your Employee ID");
      if (!formData.name.trim()) throw new Error("Please enter your full name");
      if (!validateEmail(formData.email)) throw new Error("Please enter a valid email address");
      if (!validateMobileNumber(formData.mobileNo)) throw new Error("Please enter a valid 10-digit mobile number");
      if (!formData.gender) throw new Error("Please select your gender");
      if (!formData.age.trim() || parseInt(formData.age, 10) <= 0) throw new Error("Please enter a valid age");
      if (!formData.healthPackage) throw new Error("Please select a health package plan");
      if (!formData.address.trim()) throw new Error("Please enter your complete address");
      if (!validatePincode(formData.pincode)) throw new Error("Please enter a valid 6-digit pincode");

      setLoading(true);

      // --- API Call to the serverless function ---
      const response = await fetch("/api/submit-to-sheets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit data. Please try again.");
      }

      // --- Success State ---
      setSubmitted(true);
      // Clear the form to allow for another entry
      setFormData({
        employeeId: '', name: '', email: '', mobileNo: '', gender: '',
        age: '', healthPackage: '', address: '', pincode: ''
      });

    } catch (err) {
      console.error("Form submission error:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  // Loading spinner view
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <div className="mt-4 text-gray-700">Submitting your registration...</div>
      </div>
    );
  }
  
  return (
    <div className="max-w-xl mx-auto p-6 sm:p-10 bg-white rounded-lg shadow-xl my-10 sm:my-20">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary">MGood Logo</h1>
        <p className="text-gray-600 mt-2">Employee Health Package Registration</p>
      </div>

      {submitted && (
        <div className="text-center mb-4 p-4 bg-green-100 text-green-700 rounded-md">
          Registration successful! You may submit another response if needed.
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}

        <div className="mb-4">
          <label htmlFor="employeeId" className="block mb-2 font-medium">Employee Id</label>
          <input type="text" id="employeeId" name="employeeId" value={formData.employeeId} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" placeholder="Enter your Employee ID" />
        </div>
        
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 font-medium">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" placeholder="Enter your full name" />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-medium">Email Id</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" placeholder="you@company.com" />
        </div>

        <div className="mb-4">
          <label htmlFor="mobileNo" className="block mb-2 font-medium">Mobile No</label>
          <input type="tel" id="mobileNo" name="mobileNo" value={formData.mobileNo} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" placeholder="10-digit mobile number" maxLength="10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="gender" className="block mb-2 font-medium">Gender</label>
              <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 bg-white">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="age" className="block mb-2 font-medium">Age</label>
              <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" placeholder="Enter your age" min="1" />
            </div>
        </div>

        <div className="mb-4">
          <label htmlFor="healthPackage" className="block mb-2 font-medium">Health Package</label>
          <select id="healthPackage" name="healthPackage" value={formData.healthPackage} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 bg-white">
            <option value="">Select a Plan</option>
            <option value="Plan A">Plan A</option>
            <option value="Plan B">Plan B</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block mb-2 font-medium">Complete address</label>
          <textarea id="address" name="address" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" placeholder="Enter your full address for sample collection" rows="3" />
        </div>

        <div className="mb-4">
          <label htmlFor="pincode" className="block mb-2 font-medium">Pincode</label>
          <input type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" placeholder="6-digit pincode" maxLength="6" />
        </div>
        
        <button type="submit" disabled={isSubmitting} className={`w-full ${isSubmitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-primary hover:bg-blue-600'} text-white py-3 px-4 rounded transition duration-200 font-semibold mt-4`}>
          {isSubmitting ? 'Submitting...' : 'Submit Button'}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-600">
          All test are done by <span className="font-semibold">Thyrocare Labs/ Max Hospitals/ Sarvodaya Hospital</span> as per the package selected by the Corporate.
        </p>
      </div>
    </div>
  );
};

export default HealthPackageForm;
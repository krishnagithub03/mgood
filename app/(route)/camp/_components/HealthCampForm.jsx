'use client';

import React, { useState, useEffect } from 'react';

const HealthCampForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    disease: ''
  });
  const [submitted, setSubmitted] = useState(false);
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

  function setPermanentCookie(cookieName) {
    const farFuture = new Date();
    farFuture.setFullYear(farFuture.getFullYear() + 10);
    document.cookie = `${cookieName}=true; expires=${farFuture.toUTCString()}; path=/`;
  }

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
      const cookieName = "healthCampSubmitted";
      const hasSubmitted = getCookie(cookieName);

      if (hasSubmitted) {
        throw new Error("You have already submitted your information for the Health Camp. Only one submission is allowed.");
      }

      if (!formData.name.trim()) throw new Error("Please enter your name");
      if (!formData.age.trim() || parseInt(formData.age, 10) <= 0) throw new Error("Please enter a valid age");
      if (!formData.gender.trim()) throw new Error("Please select your gender");
      // 'disease' can be optional

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

      setPermanentCookie(cookieName);
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
    const cookieName = "healthCampSubmitted";
    const hasSubmitted = getCookie(cookieName);
    if (hasSubmitted) {
      setSubmitted(true);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <div>Submitting your registration...</div>
      </div>
    );
  }
  
  return (
    <div className="max-w-xl mx-auto p-10 bg-white rounded-lg shadow-xl mt-20 mb-20">
      <h1 className="text-2xl font-bold mb-6 text-center text-primary">Nagata Auto Engineering India Pvt Limited</h1>
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">Organized by : MGood</h2>
      <p className='italic mb-6'>Disclaimer: Each user is allowed only one registration for the health camp. Further attempts will not be accepted.</p>
      
      {submitted ? (
        <div className="text-center mb-4 p-4 bg-green-100 text-green-700 rounded-md">Thank you for registering for the Health Camp! We will contact you with further details.</div>
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
            className={`w-full ${isSubmitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-primary hover:bg-blue-600'} text-white py-2 px-4 rounded transition duration-200`}
          >
            {isSubmitting ? 'Registering...' : 'Register for Health Camp'}
          </button>
        </form>
      )}

      {/* Partners Section - Added Here */}
      <div className="mt-10 pt-6 border-t border-gray-300 text-center">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Our Partners</h2>
        <div className="space-y-2">
          <p className="text-gray-600">
            <span className="font-lg">Eye Checkup Partner:</span> NEEL EYE HOSPITAL
          </p>
          <p className="text-gray-600">
            <span className="font-lg">Pharmacy Partner:</span> AVA Pharma
          </p>
          <p className="text-gray-600">
            <span className="font-lg">Optician Partner:</span> Agrawal Optical Company
          </p>
        </div>
      </div>
    </div>
  );
};

export default HealthCampForm;
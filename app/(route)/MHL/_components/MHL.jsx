'use client';

import React, { useState } from 'react';

const MhlForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    numberOfSixes: 0
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSliderChange = (e) => {
    setFormData(prev => ({
      ...prev,
      numberOfSixes: parseInt(e.target.value)
    }));
  };

  const validatePhoneNumber = (phoneNumber) => {
    // Basic validation for Indian phone numbers (used with Paytm)
    const regex = /^[6-9]\d{9}$/;
    return regex.test(phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Validate form data
      if (!formData.name.trim()) {
        throw new Error('Please enter your name');
      }

      if (!validatePhoneNumber(formData.phoneNumber)) {
        throw new Error('Please enter a valid 10-digit phone number');
      }

      // Prepare the data to be sent to your API route
      const dataToSend = {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        numberOfSixes: formData.numberOfSixes,
        submissionDate: new Date().toISOString()
      };

      // Send the data to your API route that will handle Google Sheets integration
      const response = await fetch('/api/submit-to-sheets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      // Handle non-ok responses
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Submission error:', errorData);
        throw new Error(errorData.message || 'Failed to submit data');
      }

      // If we got here, submission was successful
      setSubmitted(true);
    } catch (err) {
      console.error('Error in form submission:', err);
      setError(err.message || 'An error occurred during submission');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phoneNumber: '',
      numberOfSixes: 0
    });
    setSubmitted(false);
  };

  return (
    <div className="max-w-xl mx-auto p-10 bg-white rounded-lg shadow-xl mt-20 mb-20">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">MGOOD HEALTH LEAGUE</h1>
      
      {submitted ? (
        <div className="text-center">
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
            Thank you for your submission!
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-2 font-medium">
              Phone Number (Paytm)
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your 10-digit phone number"
              maxLength="10"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="numberOfSixes" className="block mb-2 font-medium">
              Number of Sixes: {formData.numberOfSixes}
            </label>
            <input
              type="range"
              id="numberOfSixes"
              name="numberOfSixes"
              min="0"
              max="20"
              step="1"
              value={formData.numberOfSixes}
              onChange={handleSliderChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0</span>
              <span>10</span>
              <span>20</span>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full ${isSubmitting ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'} text-white py-2 px-4 rounded transition duration-200`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      )}
    </div>
  );
};

export default MhlForm;
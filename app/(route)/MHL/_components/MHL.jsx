// // 'use client';

// // import React, { useState } from 'react';

// // const MhlForm = () => {
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     phoneNumber: '',
// //     numberOfSixes: 0
// //   });
// //   const [submitted, setSubmitted] = useState(false);
// //   const [error, setError] = useState('');
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));
// //   };

// //   const handleSliderChange = (e) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       numberOfSixes: parseInt(e.target.value)
// //     }));
// //   };

// //   const validatePhoneNumber = (phoneNumber) => {
// //     // Basic validation for Indian phone numbers (used with Paytm)
// //     const regex = /^[6-9]\d{9}$/;
// //     return regex.test(phoneNumber);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError('');
// //     setIsSubmitting(true);

// //     try {
// //       // Validate form data
// //       if (!formData.name.trim()) {
// //         throw new Error('Please enter your name');
// //       }

// //       if (!validatePhoneNumber(formData.phoneNumber)) {
// //         throw new Error('Please enter a valid 10-digit phone number');
// //       }

// //       // Prepare the data to be sent to your API route
// //       const dataToSend = {
// //         name: formData.name,
// //         phoneNumber: formData.phoneNumber,
// //         numberOfSixes: formData.numberOfSixes,
// //         submissionDate: new Date().toISOString()
// //       };

// //       // Send the data to your API route that will handle Google Sheets integration
// //       const response = await fetch('/api/submit-to-sheets', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(dataToSend),
// //       });

// //       // Handle non-ok responses
// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         console.error('Submission error:', errorData);
// //         throw new Error(errorData.message || 'Failed to submit data');
// //       }

// //       // If we got here, submission was successful
// //       setSubmitted(true);
// //     } catch (err) {
// //       console.error('Error in form submission:', err);
// //       setError(err.message || 'An error occurred during submission');
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   const handleReset = () => {
// //     setFormData({
// //       name: '',
// //       phoneNumber: '',
// //       numberOfSixes: 0
// //     });
// //     setSubmitted(false);
// //   };

// //   return (
// //     <div className="max-w-xl mx-auto p-10 bg-white rounded-lg shadow-xl mt-20 mb-20">
// //       <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">MGOOD HEALTH LEAGUE</h1>
      
// //       {submitted ? (
// //         <div className="text-center">
// //           <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
// //             Thank you for your submission!
// //           </div>
// //         </div>
// //       ) : (
// //         <form onSubmit={handleSubmit}>
// //           {error && (
// //             <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
// //               {error}
// //             </div>
// //           )}
          
// //           <div className="mb-4">
// //             <label htmlFor="name" className="block mb-2 font-medium">
// //               Full Name
// //             </label>
// //             <input
// //               type="text"
// //               id="name"
// //               name="name"
// //               value={formData.name}
// //               onChange={handleChange}
// //               className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               placeholder="Enter your full name"
// //             />
// //           </div>
          
// //           <div className="mb-4">
// //             <label htmlFor="phoneNumber" className="block mb-2 font-medium">
// //               Phone Number (Paytm)
// //             </label>
// //             <input
// //               type="text"
// //               id="phoneNumber"
// //               name="phoneNumber"
// //               value={formData.phoneNumber}
// //               onChange={handleChange}
// //               className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               placeholder="Enter your 10-digit phone number"
// //               maxLength="10"
// //             />
// //           </div>
          
// //           <div className="mb-6">
// //             <label htmlFor="numberOfSixes" className="block mb-2 font-medium">
// //               Number of Sixes: {formData.numberOfSixes}
// //             </label>
// //             <input
// //               type="range"
// //               id="numberOfSixes"
// //               name="numberOfSixes"
// //               min="0"
// //               max="20"
// //               step="1"
// //               value={formData.numberOfSixes}
// //               onChange={handleSliderChange}
// //               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
// //             />
// //             <div className="flex justify-between text-xs text-gray-500 mt-1">
// //               <span>0</span>
// //               <span>10</span>
// //               <span>20</span>
// //             </div>
// //           </div>
          
// //           <button
// //             type="submit"
// //             disabled={isSubmitting}
// //             className={`w-full ${isSubmitting ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'} text-white py-2 px-4 rounded transition duration-200`}
// //           >
// //             {isSubmitting ? 'Submitting...' : 'Submit'}
// //           </button>
// //         </form>
// //       )}
// //     </div>
// //   );
// // };

// // export default MhlForm;






// 'use client';

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const MhlForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     phoneNumber: '',
//     numberOfSixes: 0
//   });
//   const [submitted, setSubmitted] = useState(false);
//   const [error, setError] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [match, setMatch] = useState(null);
//   const [matchLoading, setMatchLoading] = useState(true);
//   const [matchError, setMatchError] = useState('');

//   // Fetch the most recent match when component mounts
//   useEffect(() => {
//     const fetchMatch = async () => {
//       try {
//         setMatchLoading(true);
//         const response = await axios.get('/api/matches');
//         setMatch(response.data);
//         setMatchError('');
//       } catch (error) {
//         console.error('Error fetching match:', error);
//         setMatchError('Failed to load current match');
//       } finally {
//         setMatchLoading(false);
//       }
//     };

//     // Initial fetch
//     fetchMatch();
    
    
//     const intervalId = setInterval(() => {
//       fetchMatch();
//     }, 100000);
    
//     // Clean up the interval when component unmounts
//     return () => clearInterval(intervalId);
//   }, []);




//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSliderChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       numberOfSixes: parseInt(e.target.value)
//     }));
//   };

//   const validatePhoneNumber = (phoneNumber) => {
//     // Basic validation for Indian phone numbers (used with Paytm)
//     const regex = /^[6-9]\d{9}$/;
//     return regex.test(phoneNumber);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsSubmitting(true);

//     try {
//       // Validate form data
//       if (!formData.name.trim()) {
//         throw new Error('Please enter your name');
//       }

//       if (!validatePhoneNumber(formData.phoneNumber)) {
//         throw new Error('Please enter a valid 10-digit phone number');
//       }

//       // Prepare the data to be sent to your API route
//       const dataToSend = {
//         name: formData.name,
//         phoneNumber: formData.phoneNumber,
//         numberOfSixes: formData.numberOfSixes,
//         submissionDate: new Date().toISOString(),
//         matchId: match?._id, // Include match ID if available
//         matchName: match?.matchName // Include match name if available
//       };

//       // Send the data to your API route that will handle Google Sheets integration
//       const response = await fetch('/api/submit-to-sheets', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(dataToSend),
//       });

//       // Handle non-ok responses
//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error('Submission error:', errorData);
//         throw new Error(errorData.message || 'Failed to submit data');
//       }

//       // If we got here, submission was successful
//       setSubmitted(true);
//     } catch (err) {
//       console.error('Error in form submission:', err);
//       setError(err.message || 'An error occurred during submission');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleReset = () => {
//     setFormData({
//       name: '',
//       phoneNumber: '',
//       numberOfSixes: 0
//     });
//     setSubmitted(false);
//   };

//   return (
//     <div className="max-w-xl mx-auto p-10 bg-white rounded-lg shadow-xl mt-20 mb-20">
//       <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">MGOOD HEALTH LEAGUE</h1>
      
//       {/* Display Current Match */}
//       <div className="mb-6 p-4 bg-gray-50 rounded-md border border-gray-200">
//         <h2 className="text-lg font-medium mb-2 text-gray-700">Current Match</h2>
//         {matchLoading ? (
//           <div className="flex justify-center items-center py-4">
//             <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
//           </div>
//         ) : matchError ? (
//           <div className="text-red-600 text-sm">{matchError}</div>
//         ) : match ? (
//           <div className="text-center">
//             <span className="font-bold text-xl text-blue-700">{match.matchName}</span>
//             {match.date && (
//               <p className="text-sm text-gray-500 mt-1">
//                 {new Date(match.date).toLocaleDateString()}
//               </p>
//             )}
//           </div>
//         ) : (
//           <div className="text-gray-500 text-center">No active match found</div>
//         )}
//       </div>
      
//       {submitted ? (
//         <div className="text-center">
//           <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
//             Thank you for your submission!
//           </div>
//           {/* <button
//             onClick={handleReset}
//             className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-200"
//           >
//             Submit Another Entry
//           </button> */}
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit}>
//           {error && (
//             <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
//               {error}
//             </div>
//           )}
          
//           <div className="mb-4">
//             <label htmlFor="name" className="block mb-2 font-medium">
//               Full Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your full name"
//             />
//           </div>
          
//           <div className="mb-4">
//             <label htmlFor="phoneNumber" className="block mb-2 font-medium">
//               Phone Number (Paytm)
//             </label>
//             <input
//               type="text"
//               id="phoneNumber"
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your 10-digit phone number"
//               maxLength="10"
//             />
//           </div>
          
//           <div className="mb-6">
//             <label htmlFor="numberOfSixes" className="block mb-2 font-medium">
//               Number of Sixes: {formData.numberOfSixes}
//             </label>
//             <input
//               type="range"
//               id="numberOfSixes"
//               name="numberOfSixes"
//               min="0"
//               max="20"
//               step="1"
//               value={formData.numberOfSixes}
//               onChange={handleSliderChange}
//               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//             />
//             <div className="flex justify-between text-xs text-gray-500 mt-1">
//               <span>0</span>
//               <span>10</span>
//               <span>20</span>
//             </div>
//           </div>
          
//           <button
//             type="submit"
//             disabled={isSubmitting || !match}
//             className={`w-full ${isSubmitting || !match ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white py-2 px-4 rounded transition duration-200`}
//           >
//             {isSubmitting ? 'Submitting...' : 'Submit'}
//           </button>
          
//           {!match && !matchLoading && !matchError && (
//             <p className="text-red-500 text-sm mt-2 text-center">
//               No active match found. Submission is disabled.
//             </p>
//           )}
//         </form>
//       )}
//     </div>
//   );
// };

// export default MhlForm;



'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { set } from 'date-fns';

const MhlForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    numberOfSixes: 0,
    selectedMatch: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [matches, setMatches] = useState([]);
  const [matchLoading, setMatchLoading] = useState(true);
  const [matchError, setMatchError] = useState('');
  const [loading, setLoading] = useState(false);
  const PacmanLoader = require('react-spinners/PacmanLoader');
  // const [alredaySubmitted, setAlredaySubmitted] = useState(false);

  // Fetch matches when component mounts
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setMatchLoading(true);
        const response = await axios.get('/api/matches');
        const matchData = response.data.matchName.split(',');
        setMatches(matchData);
        setMatchError('');
      } catch (error) {
        console.error('Error fetching matches:', error);
        setMatchError('Failed to load matches');
      } finally {
        setMatchLoading(false);
      }
    };

    fetchMatches();
  }, []);


  useEffect(() => {
    const alreadySubmitted = document.cookie
      .split('; ')
      .find(row => row.startsWith('alreadySubmitted='));
    if (alreadySubmitted && alreadySubmitted.split('=')[1] === 'true') {
      setSubmitted(true);
    }
  }, []);

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

  const handleMatchSelect = (match) => {
    setFormData(prev => ({
      ...prev,
      selectedMatch: match
    }));
  };

  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (!formData.name.trim()) throw new Error('Please enter your name');
      if (!validatePhoneNumber(formData.phoneNumber)) throw new Error('Please enter a valid 10-digit phone number');
      if (!formData.selectedMatch.trim()) throw new Error('Please select a match');

      const dataToSend = { ...formData, submissionDate: new Date().toISOString() };

      setLoading(true);
      const response = await fetch('/api/submit-to-sheets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Submission error:', errorData);
        throw new Error(errorData.message || 'Failed to submit data');
      }

      setSubmitted(true);
      document.cookie = `alreadySubmitted=true; max-age=${12 * 60 * 60}; path=/`;
      // setAlredaySubmitted(true);
    } catch (err) {
      console.error('Error in form submission:', err);
      setError(err.message || 'An error occurred during submission');
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

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
      <h1 className="text-2xl font-bold mb-6 text-center text-primary">MGOOD HEALTH LEAGUE</h1>
      {matchLoading ? (
        <div className="text-center">Loading matches...</div>
      ) : matchError ? (
        <div className="text-red-600 text-center">{matchError}</div>
      ) : (
        <div className="grid grid-cols-2 gap-4 mb-6">
          {matches.map((match, index) => (
            <div
              key={index}
              className={`p-4 border rounded cursor-pointer text-center ${formData.selectedMatch === match ? 'bg-primary text-white' : 'bg-gray-100'}`}
              onClick={() => handleMatchSelect(match)}
            >
              {match.trim()}
            </div>
          ))}
        </div>
      )}
      {submitted ? (
        <div className="text-center mb-4 p-4 bg-green-100 text-green-700 rounded-md">Thank you for your submission!</div>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 font-medium">Full Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" placeholder="Enter your full name" />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-2 font-medium">Phone Number (Paytm)</label>
            <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" placeholder="Enter your 10-digit phone number" maxLength="10" />
          </div>
          <div className="mb-6">
            <label htmlFor="numberOfSixes" className="block mb-2 font-medium">Number of Sixes: {formData.numberOfSixes}</label>
            <input type="range" id="numberOfSixes" name="numberOfSixes" min="0" max="20" step="1" value={formData.numberOfSixes} onChange={handleSliderChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
          </div>
          <button type="submit" disabled={isSubmitting} className={`w-full ${isSubmitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-primary hover:bg-blue-600'} text-white py-2 px-4 rounded transition duration-200`}>{isSubmitting ?  'Submitting...' : 'Submit'}</button>
        </form>
      )}
    </div>
  );
};

export default MhlForm;

"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Prescription = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); // Store user from cookies
  const [accessRole, setAccessRole] = useState(null);

  useEffect(() => {
    // Retrieve user details from cookies
    const storedUser = Cookies.get("user"); // Assuming you stored the user as a JSON string
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const fetchAccessRole = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/getAccessRole`,
          { phoneNumber: String(user) }
        );
        setAccessRole(response.data.role);
        // console.log(response);
      } catch (error) {
        setAccessRole("user");
        console.error(
          "Error fetching accessRole:",
          error.response?.data?.message || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchAccessRole();
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/prescription/get`
        );
        setPrescriptions(response.data);
      } catch (error) {
        setError("Failed to fetch prescriptions");
        console.error("Error fetching prescriptions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getFileType = (url) => {
    const extension = url.split(".").pop().toLowerCase();
    return ["jpg", "jpeg", "png", "gif"].includes(extension) ? "image" : "pdf";
  };

  const PreviewThumbnail = ({ url }) => {
    const fileType = getFileType(url);

    if (fileType === "image") {
      return (
        <img
          src={url}
          alt="Prescription"
          className="w-32 h-32 object-cover rounded-lg"
          onError={(e) => {
            e.target.src = "/api/placeholder/128/128";
          }}
        />
      );
    }

    return (
      <div className="w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg flex flex-col items-center justify-center">
        <svg
          className="w-12 h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <span className="text-gray-500 text-sm mt-2">PDF Document</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

   if (accessRole != "Partner") {
    return <>Access Denied</>;
  }

  return (
    <div className="min-h-screen h-fit bg-gray-100 p-6">
      <h1 className="text-5xl font-display text-gray-800 mb-6">
        Prescriptions <span className="text-primary">.</span>
      </h1>
      {prescriptions.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {prescriptions.map((prescription) => (
            <div
              key={prescription._id}
              className="bg-white rounded-lg shadow-lg flex items-center p-4 hover:shadow-xl transition-shadow duration-200"
            >
              <PreviewThumbnail url={prescription.url} />

              <div className="ml-6 flex-grow">
                <h2 className="text-xl font-semibold text-gray-900">
                  {prescription.name}
                </h2>
                <div className="mt-2 space-y-2">
                  {prescription.patientName && (
                    <p className="text-gray-600">
                      Patient: {prescription.patientName}
                    </p>
                  )}
                  {prescription.date && (
                    <p className="text-gray-600">
                      Date: {new Date(prescription.date).toLocaleDateString()}
                    </p>
                  )}
                  <a
                    href={prescription.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:text-primary-dark"
                  >
                    <span>View Document</span>
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <p className="text-gray-600">No prescriptions found.</p>
        </div>
      )}
    </div>
  );
};

export default Prescription;
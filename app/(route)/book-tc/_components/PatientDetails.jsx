"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ConsultationSubscription from "./ConsultationSubscription";
import { useRouter } from 'next/navigation';
import { Clock, CheckCircle,AlertCircle } from 'lucide-react';
import io from 'socket.io-client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SyncLoader, PacmanLoader } from "react-spinners";
import { Alert, AlertDescription } from "@/components/ui/alert";

const specialtyList = [
  "Dental", "Ortho", "Derma", "Patho", "Pedo", "Physiotherapy",
  "General Physician", "Dietician", "Gyane", "Psychiatry", "Cardio",
  "Neuro", "Urology", "Pulmonologist", "General Surgeon", "Radiology",
  "Hair Transplant Clinics", "Plastic Surgeon", "Ayurveda", "Homeopathy",
  "Eye", "ENT", "Primary Healthcare Centres", "Yoga Instructors",
  "Pharmacy", "Diagnostic Centres", "Associate", "RMP"
];

const PatientDetails = () => {
  const [websocket, setWebsocket] = useState(null);
  const [showSubscription, setShowSubscription] = useState(true);
  
  const initialFormData = {
    name: "",
    age: "",
    gender: "",
    phone: "",
    specialization: "",
    place: "",
    mgoodId: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [timer, setTimer] = useState(30);
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [meetingUrl, setMeetingUrl] = useState("");
  const [prescriptionUrl, setPrescriptionUrl] = useState("");
  const [docNumber, setDocNumber] = useState("");
  const [error, setError] = useState("");
  const [updates, setUpdates] = useState([]);
  const [cusipcoOrderId, setCusipcoOrderId] = useState("");

  // Initialize WebSocket
  useEffect(() => {
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3000');
    
    ws.onopen = () => {
      console.log('WebSocket Connected');
      setWebsocket(ws);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'update') {
        setUpdates(prev => [...prev, data]);
        if (data.triggered_action === 'Prescription-Uploaded') {
          setPrescriptionUrl(data.prescription_url);
        }
      }
    };

    // Timer logic
    let interval;
    if (showDialog) {
      setTimer(30);
      setButtonEnabled(true);
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev > 1) {
            return prev - 1;
          } else {
            clearInterval(interval);
            createAppointment({ data: formData });
            return 0;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
      if (ws) ws.close();
    };
  }, [showDialog]);

  const handleSubscriptionComplete = () => {
    setShowSubscription(false);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const createAppointment = async (data) => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/third-party/create-appointment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.data.name,
          age: data.data.age?.toString(),
          appointment_for: "Doctor"
        })
      });

      const result = await response.json();
      console.log("Appointment created:", result);

      if (result.data) {
        setMeetingUrl(result.data.meeting_url);
        setDocNumber(result.data.meeting_number);
        setPrescriptionUrl(result.data.download_prescription);
        setCusipcoOrderId(result.data.custom_order_id);
      }
    } catch (error) {
      console.error('Error creating appointment:', error);
      setError('Failed to create appointment');
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowPaymentOptions(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const parsedData = {
        ...formData,
        age: parseInt(formData.age, 10),
        phone: parseInt(formData.phone, 10)
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/patient`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: parsedData })
      });

      if (response.ok) {
        if (websocket?.readyState === WebSocket.OPEN) {
          websocket.send(JSON.stringify({
            type: 'appointment-booked',
            data: parsedData
          }));
        }
        setShowDialog(true);
        setFormData(initialFormData);
      } else {
        throw new Error('Failed to create appointment');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  const hasPrescriptionUploaded = updates.some(
    update => update.triggered_action === "Prescription-Uploaded" && 
              update.custom_order_id === cusipcoOrderId
  );

  const hasCompleted = updates.some(
    update => update.triggered_action === "Completed" && 
              update.custom_order_id === cusipcoOrderId
  );

  if (showSubscription) {
    return <ConsultationSubscription onSubscriptionComplete={handleSubscriptionComplete} />;
  }

  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold">
          Fill Patient <span className="text-primary">Details</span>
        </h1>

        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
          <div className="lg:col-span-2 lg:py-12">
            <p className="max-w-xl text-lg">
              At MGood, we believe that access to quality healthcare should be
              seamless, efficient, and instant. Our mission is to bridge the gap
              between those seeking medical attention and qualified healthcare
              professionals, ensuring timely support and care.
            </p>
            <div className="mt-8">
              <a href="https://mgood.org" className="text-2xl font-bold text-primary">
                Mgood.org
              </a>
            </div>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="sr-only" htmlFor="name">Name</label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Name"
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="sr-only" htmlFor="age">Age</label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Age"
                  type="number"
                  id="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="sr-only" htmlFor="gender">Gender</label>
                <select
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  id="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="sr-only" htmlFor="phone">Phone</label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Phone"
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="sr-only" htmlFor="specialization">Specialization</label>
                <select
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  id="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Specialization</option>
                  {specialtyList.map((specialty, index) => (
                    <option key={index} value={specialty}>{specialty}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="sr-only" htmlFor="place">Place</label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Place"
                  type="text"
                  id="place"
                  value={formData.place}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="sr-only" htmlFor="mgoodId">MGood ID</label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="MGood ID"
                  type="text"
                  id="mgoodId"
                  value={formData.mgoodId}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button 
                type="submit"
                className="w-full rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Start Consultation'}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Consultation Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Starting Consultation</DialogTitle>
            <DialogDescription>
              {timer > 0 ? (
                <div className="text-center space-y-4">
                  <p>Please wait while we connect you with a healthcare provider.</p>
                  <div className="flex justify-center">
                    <PacmanLoader color="#1CAC78" />
                  </div>
                  <p className="text-lg font-semibold">Time remaining: {timer} seconds</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {loading ? (
                    <div className="flex justify-center">
                      <SyncLoader />
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {meetingUrl && (
                        <Link
                          href={meetingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            className="w-full"
                            disabled={!buttonEnabled}
                          >
                            Join Consultation
                          </Button>
                        </Link>
                      )}

                      {docNumber && (
                        <p className="text-center">
                          Or contact doctor at:{' '}
                          <a href={`tel:${docNumber}`} className="text-primary font-bold">
                            {docNumber}
                          </a>
                        </p>
                      )}

                      {hasPrescriptionUploaded && prescriptionUrl && (
                        <Link
                          href={prescriptionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            className="w-full"
                            disabled={!buttonEnabled}
                          >
                            View Prescription
                          </Button>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {hasCompleted && (
              <Button onClick={() => setShowDialog(false)}>
                End Consultation
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PatientDetails;
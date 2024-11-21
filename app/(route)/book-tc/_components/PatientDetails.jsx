"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SyncLoader } from "react-spinners";

const PatientDetails = () => {
  const initialFormData = {
    name: "",
    age: "",
    gender: "",
    phone: "",
    specialization: "",
    place: "",
    problem: "",
    pastMedicalHistory: "",
    currentMedication: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedData = {
      ...formData,
      age: parseInt(formData.age, 10),
      phone: parseInt(formData.phone, 10),
    };
    console.log("Submitting formData: ", parsedData);
    axios
      .post(`${process.env.BACKEND_URL}/api/patient`, parsedData)
      // .post("http://localhost:8000/api/patient", parsedData)
      .then((response) => {
        console.log(response);
        alert("Form Submitted Successfully");
        setFormData(initialFormData); // Reset form fields after successful submission
        // setFile(null);
        // document.getElementById("uploadFile").value = "";
      })
      .catch((error) => {
        console.log(error);
        alert("An error occurred. Please try again.");
      });
  };

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
              <a href="/" className="text-2xl font-bold text-primary">
                Mgood.org
              </a>
            </div>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="border-2 rounded-md">
                <label className="sr-only" htmlFor="name">
                  Name
                </label>
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

              <div className="border-2 rounded-md">
                <label className="sr-only" htmlFor="age">
                  Age
                </label>
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
              <div className="border-2 rounded-md">
                <label className="sr-only" htmlFor="gender">
                  Gender
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Gender"
                  type="text"
                  id="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="border-2 rounded-md">
                <label className="sr-only" htmlFor="specialization">
                  Specialization
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Specialization"
                  type="text"
                  id="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="border-2 rounded-md">
                <label className="sr-only" htmlFor="place">
                  Place
                </label>
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

              <div className="border-2 rounded-md">
                <label className="sr-only" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Phone Number"
                  type="number"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="border-2 rounded-md">
                <label className="sr-only" htmlFor="problem">
                  Describe Problem
                </label>
                <textarea
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Describe Problem"
                  id="problem"
                  value={formData.problem}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="border-2 rounded-md">
                <label className="sr-only" htmlFor="pastMedicalHistory">
                  Past Medical History
                </label>
                <textarea
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Past Medical History"
                  id="pastMedicalHistory"
                  value={formData.pastMedicalHistory}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="border-2 rounded-md">
                <label className="sr-only" htmlFor="currentMedication">
                  Current Medication
                </label>
                <textarea
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Current Medication"
                  id="currentMedication"
                  value={formData.currentMedication}
                  onChange={handleChange}
                ></textarea>
              </div>
              <Dialog>
                <DialogTrigger>
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white"
                  >
                    Start Consultation
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Starting consultation</DialogTitle>
                    <DialogDescription className="p-28 text-center">
                      <SyncLoader />
                    </DialogDescription>
                  </DialogHeader>
                  {/* <DialogFooter>End Consultation</DialogFooter> */}
                </DialogContent>
              </Dialog>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientDetails;

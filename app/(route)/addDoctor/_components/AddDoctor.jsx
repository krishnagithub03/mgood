"use client";
import React, { useState } from "react";
import axios from "axios";

const AddDoctor = async () => {
  const initialFormData = {
    name: "",
    email: "",
    specialization: "",
    exp: "",
    establishmentType: "",
    clinicName: "",
    place: "",
    clinicNumber: "",
    clinicService: "",
    fees: "",
    sessionTimings: "",
    message: "",
    uploadFile: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [file, setFile] = useState(null);

  // if (isAuthenticated()) {
  //   const result = await getCgelaim();
  //   console.log("Role: ", result);
  // }
  //   // If user is basic, check if they are trying to access /details
  // if (result?.value.some((role) => role === "basic-user")) {
  //   if (request.nextUrl.pathname === "/details") {
  //     // Allow access to /details
  //     return NextResponse.next();
  //   } else {
  //     // Redirect basic user to home page if they try to access any other route
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  // }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleRadioChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      establishmentType: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    console.log(e.target.files);
    setFile(e.target.files[0]);
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET); // Replace with your upload preset from Cloudinary
    formData.append("cloud_name", process.env.NEXT_CLOUDINARY_CLOUD_NAME); // Replace with your Cloudinary cloud name
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_CLOUDINARY_URL, // Replace with your Cloudinary cloud name
        formData
      );
      return response.data.secure_url; // URL of uploaded file
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const uploadedFileUrl = await uploadToCloudinary(file);
      if (uploadedFileUrl) {
        formData.uploadFile = uploadedFileUrl;
      }
    }
    axios
      .post("https://backend-production-7277.up.railway.app/api/", formData)
      // .post("http://localhost:8000/api/", formData)
      .then((response) => {
        console.log(response);
        alert("Form Submitted Successfully");
        setFormData(initialFormData); // Reset form fields after successful submission
        setFile(null);
        document.getElementById("uploadFile").value = "";
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
          Join <span className="text-primary">Us</span>
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
                <label className="sr-only" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Email address"
                  type="email"
                  id="email"
                  value={formData.email}
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
                <label className="sr-only" htmlFor="exp">
                  Experience
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Experience in Years"
                  type="number"
                  id="exp"
                  value={formData.exp}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col px-3 gap-2">
                <p className="text-primary">Choose Type of Establishment</p>
                <div className="flex gap-4">
                  <input
                    type="radio"
                    id="Owner of Establishment"
                    value="Owner of Establishment"
                    checked={
                      formData.establishmentType === "Owner of Establishment"
                    }
                    onChange={handleRadioChange}
                    className="appearance-none h-5 w-5 border-2 border-slate-400 rounded-full checked:bg-primary cursor-pointer"
                  />
                  <label
                    htmlFor="Owner of Establishment"
                    className="text-sm text-slate-400"
                  >
                    Owner of Establishment
                  </label>
                </div>
                <div className="flex gap-4">
                  <input
                    type="radio"
                    id="Consultant Doctor"
                    value="Consultant Doctor"
                    checked={formData.establishmentType === "Consultant Doctor"}
                    onChange={handleRadioChange}
                    className="appearance-none h-5 w-5 border-2 border-slate-400 rounded-full checked:bg-primary cursor-pointer"
                  />
                  <label
                    htmlFor="Consultant Doctor"
                    className="text-sm text-slate-400"
                  >
                    Consultant Doctor
                  </label>
                </div>
                <div className="flex gap-4">
                  <input
                    type="radio"
                    id="Rented at other establishment"
                    value="Rented at other establishment"
                    checked={
                      formData.establishmentType ===
                      "Rented at other establishment"
                    }
                    onChange={handleRadioChange}
                    className="appearance-none h-5 w-5 border-2 border-slate-400 rounded-full checked:bg-primary cursor-pointer"
                  />
                  <label
                    htmlFor="Rented at other establishment"
                    className="text-sm text-slate-400"
                  >
                    Rented at other establishment
                  </label>
                </div>
                <div className="flex gap-4">
                  <input
                    type="radio"
                    id="Practicing at home"
                    value="Practicing at home"
                    checked={
                      formData.establishmentType === "Practicing at home"
                    }
                    onChange={handleRadioChange}
                    className="appearance-none h-5 w-5 border-2 border-slate-400 rounded-full checked:bg-primary cursor-pointer"
                  />
                  <label
                    htmlFor="Practicing at home"
                    className="text-sm text-slate-400"
                  >
                    Practicing at home
                  </label>
                </div>
              </div>

              {/* Additional form fields */}
              <div className="border-2 rounded-md">
                <label className="sr-only" htmlFor="clinicName">
                  Clinic Name
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Clinic Name"
                  type="text"
                  id="clinicName"
                  value={formData.clinicName}
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
                <label className="sr-only" htmlFor="clinicNumber">
                  Clinic Phone Number
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Clinic Phone Number"
                  type="number"
                  id="clinicNumber"
                  value={formData.clinicNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="border-2 rounded-md">
                <label className="sr-only" htmlFor="clinicService">
                  Clinic Services
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Clinic Services"
                  type="text"
                  id="clinicService"
                  value={formData.clinicService}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="border-2 rounded-md">
                <label className="sr-only" htmlFor="fees">
                  Fees
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Fees"
                  type="number"
                  id="fees"
                  value={formData.fees}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="border-2 rounded-md">
                <label className="sr-only" htmlFor="sessionTimings">
                  Session Timings
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Session Timings"
                  type="text"
                  id="sessionTimings"
                  value={formData.sessionTimings}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <p className="text-gray-400 text-sm">
                  Upload image or PDF of owners proof
                </p>
                <div className="border-2 rounded-md flex">
                  <label className="sr-only" htmlFor="uploadFile">
                    Upload image or PDF of owners proof
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Upload image or PDF of owners proof"
                    type="file"
                    id="uploadFile"
                    // value={formData.uploadFile}
                    onChange={handleFileChange}
                    required
                  />
                </div>
              </div>

              <div className="border-2 rounded-md">
                <label className="sr-only" htmlFor="message">
                  Message
                </label>
                <textarea
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddDoctor;

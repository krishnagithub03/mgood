import React from "react";
import PatientDetails from "./_components/PatientDetails";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";
const page = async () => {
  return (
    <div>
      <PatientDetails />
    </div>
  );
};

export default page;

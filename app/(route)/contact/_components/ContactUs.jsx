import React from "react";

const ContactUs = () => {
  return (
    <div className="m-2 p-8">
      <h1 className="font-bold text-4xl">
        Contact <span className="text-primary font-display">Us</span>
      </h1>
      <p className="text-3xl mt-10">
        If you have any questions, please contact us at{" "}
        <a href="mailto:info@mgood.org">info@mgood.org</a>
      </p>
      <p className="text-3xl mt-10">
        For Telephone support, please call us at{" "}
        <a href="tel:+918923894358">+91-8923894358</a>
      </p>
    </div>
  );
};

export default ContactUs;

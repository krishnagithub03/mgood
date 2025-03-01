"use client";
import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the invoice component to avoid server-side rendering issues
const Invoice = ({ razorpay_payment_id, formData, userId,onClose }) => 
  {
    // Add data validation
    const patientData = {
      name: formData?.name || 'N/A',
      email: formData?.email || 'N/A',
      phone: formData?.phone || 'N/A',
      paymentId: razorpay_payment_id || 'N/A',
      userId: userId || 'N/A'
    }
const generatePDF = async () => {
  try {
    const { jsPDF } = await import("jspdf");
    const html2canvas = await import("html2canvas");

    const element = document.getElementById("invoice-content");
    const canvas = await html2canvas.default(element, {
      scale: 1.5, // Reduce scale to lower resolution
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.5); // Convert to JPEG with compression
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true, // Enable compression
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight, "", "FAST"); // Use 'FAST' compression
    pdf.save(`MGood-Invoice-${razorpay_payment_id || "download"}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("There was an error generating the PDF. Please try again.");
  }
};


  const currentDate = new Date().toLocaleDateString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
      <div className="my-8 mx-auto bg-white rounded-lg shadow-lg max-w-4xl w-full">
        <div className="max-h-[80vh] overflow-y-auto">
          <div id="invoice-content" className="bg-white p-8">
            {/* Invoice Header */}
            <div className="flex justify-between items-center mb-8">
              <div className="w-32">
                <img 
                  src="./mgood_logo.jpg" 
                  alt="MGood Logo" 
                  className="w-full h-auto object-fill"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0ZXh0IHg9IjEwIiB5PSIzMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjMDAwIj5NR29vZDwvdGV4dD48L3N2Zz4=';
                  }}
                />
              </div>
              <div className="text-right">
                <h2 className="text-2xl font-bold">INVOICE</h2>
                <p>Date: {currentDate}</p>
              </div>
            </div>

            {/* Patient Details */}
            {/* <div className="mb-6">
              <h3 className="font-bold mb-2">Patient Details:</h3>
              <p>Name: {formData?.name || 'N/A'}</p>
              <p>Email: {formData?.email || 'N/A'}</p>
              <p>Phone: {formData?.phone || 'N/A'}</p>
              <p>Payment ID: {razorpay_payment_id || 'N/A'}</p>
            </div> */}

            <div className="mb-6">
              <h3 className="font-bold mb-2">Patient Details:</h3>
              <p>Name: {patientData.name}</p>
              <p>Email: {patientData.email}</p>
              <p>Phone: {patientData.phone}</p>
              <p>Payment ID: {patientData.paymentId}</p>
              <p>Voucher Code: {patientData.userId}</p>
            </div>

            {/* Invoice Table */}
            <div className="overflow-x-auto">
              <table className="w-full mb-6">
                <thead>
                  <tr className="border-b-2">
                    <th className="text-left py-2">Description</th>
                    <th className="text-right py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">PRO fee</td>
                    <td className="text-right">₹253.00</td>
                    </tr>
                  <tr className="border-b">
                    <td className="py-2 font-bold">Subtotal</td>
                    <td className="text-right">₹253.00</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">GST 18%</td>
                    <td className="text-right">₹46.00</td>
                  </tr>
                    <tr className="border-b-2">
                    <td className="py-2 font-bold">Total Amount</td>
                    <td className="text-right font-bold">₹299.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Payment Details */}
            <div className="mb-6">
              <p><strong>Payment Status:</strong> Paid</p>
              <p><strong>Payment Method:</strong> Online Payment</p>
              <p>Payment received to MGood via online method</p>
            </div>

            {/* Terms and Conditions */}
            <div className="text-sm">
              <h4 className="font-bold mb-2">Terms & Conditions:</h4>
              <ul className="list-disc pl-5">
                <li>This is a computer generated invoice.</li>
                <li>Payment is non-refundable once the consultation is completed.</li>
                <li>Any disputes should be raised within 7 days of consultation.</li>
              </ul>
            </div>

            {/* Footer */}
            <div className="mt-8 text-sm text-gray-600 flex flex-wrap justify-between">
              <span>info@mgood.org</span>
              <span>www.mgood.org</span>
              <span>Any issues: +918923894358</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="sticky bottom-0 bg-white p-4 border-t flex justify-end gap-4">
          <button
            onClick={generatePDF}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90"
          >
            Download PDF
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-opacity-90"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// // Export as a client component
// export default dynamic(() => Promise.resolve(InvoiceTemplate), {
//   ssr: false
// });


export default Invoice;
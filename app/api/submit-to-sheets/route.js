import { google } from "googleapis";
import { NextResponse } from "next/server";

// Create auth client once and cache it
let authClient = null;
let sheetsClient = null;

// Initialize the Google Sheets client
async function getSheetClient() {
  if (sheetsClient) {
    return sheetsClient;
  }
  try {
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;
    if (!privateKey) {
      throw new Error("Google Private Key is missing in environment variables");
    }
    const formattedPrivateKey = privateKey.replace(/\\n/g, "\n");
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: formattedPrivateKey,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    authClient = await auth.getClient();
    sheetsClient = google.sheets({ version: "v4", auth: authClient });
    return sheetsClient;
  } catch (error) {
    console.error("Error initializing Google Sheets client:", error);
    authClient = null; // Reset on error
    sheetsClient = null; // Reset on error
    throw error;
  }
}

// Validate Indian Mobile Number (10 digits, starting with 6, 7, 8, or 9) - Server side
const validateServerMobileNumber = (mobileNumber) => {
    if (!mobileNumber) return false; // handle cases where it might be undefined or null
    const regex = /^[6-9]\d{9}$/;
    return regex.test(String(mobileNumber)); // Ensure it's a string
};


export async function POST(request) {
  try {
    const body = await request.json();
    let values = [];
    let range = "";

    // Blood Donation Form
    if (body.bloodGroup !== undefined) { 
      if (!body.name || !body.mobileNumber) {
        return NextResponse.json(
          { message: "Name and mobile number are required for blood donation" },
          { status: 400 }
        );
      }
      // Basic validation for blood donation mobile number
      if (!validateServerMobileNumber(body.mobileNumber)) {
        return NextResponse.json(
            { message: "Invalid mobile number for blood donation." },
            { status: 400 }
        );
      }
      values = [
        [
          body.name, body.age, body.sex, body.city, body.state,
          body.mobileNumber, body.bloodGroup, body.preexistingDisease || "None",
          body.willingToDonate,
          new Date(body.submissionDate).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", /* ... */ })
        ],
      ];
      range = "BloodDonations!A:J";

    // Health Camp Form (differentiate by 'gender' and 'phoneNumber' if 'bloodGroup' is absent)
    } else if (body.gender !== undefined && body.phoneNumber !== undefined) {
      if (!body.name || !body.age || !body.gender || !body.phoneNumber) { 
        return NextResponse.json(
          { message: "Name, age, gender, and phone number are required for health camp registration" },
          { status: 400 }
        );
      }
      // Server-side validation for Health Camp phone number
      if (!validateServerMobileNumber(body.phoneNumber)) {
        return NextResponse.json(
            { message: "Invalid phone number for health camp registration." },
            { status: 400 }
        );
      }
      values = [
        [
          body.name,
          body.age,
          body.gender,
          body.phoneNumber, // Added phone number
          body.disease || "None",
          new Date(body.submissionDate).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            year: "numeric", month: "numeric", day: "numeric",
            hour: "2-digit", minute: "2-digit", second: "2-digit",
          })
        ],
      ];
      range = "HealthCamp!A:F"; // Updated range to include new column (A-F = 6 columns)

    // MHL Form
    } else if (body.phoneNumber !== undefined && body.numberOfSixes !== undefined) { 
      // Differentiating MHL by presence of numberOfSixes if phoneNumber is common
      if (!body.name || !body.phoneNumber) {
        return NextResponse.json(
          { message: "Name and phone number are required for MHL" },
          { status: 400 }
        );
      }
      // Basic validation for MHL phone number
      if (!validateServerMobileNumber(body.phoneNumber)) {
        return NextResponse.json(
            { message: "Invalid phone number for MHL." },
            { status: 400 }
        );
      }
      values = [
        [
          body.name, body.phoneNumber, body.numberOfSixes,
          new Date(body.submissionDate).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", /* ... */ }),
          body.selectedMatch || "No Match",
        ],
      ];
      range = "MHL!A:E"; 

    } else {
      console.warn("Unknown form submission type. Body:", body);
      return NextResponse.json(
        { message: "Could not determine form type from submitted data." },
        { status: 400 }
      );
    }

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    if (!spreadsheetId) {
      throw new Error("Google Sheet ID is missing in environment variables");
    }

    try {
      const sheets = await getSheetClient();
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: range,
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        resource: { values },
      });

      return NextResponse.json(
        { message: "Data submitted successfully", response: response.data },
        { status: 200 }
      );

    } catch (googleError) {
      console.error("Google Sheets API Error:", googleError);
      if (googleError.message?.includes("invalid_grant")) {
        authClient = null;
        sheetsClient = null;
        return NextResponse.json(
          { message: "Authentication error. Please try again or contact support." }, // User-friendly
          { status: 401 }
        );
      }
      if (googleError.message?.includes("permission")) {
        return NextResponse.json(
          { message: "Permission denied. Contact support." }, // User-friendly
          { status: 403 }
        );
      }
      throw googleError;
    }
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error);
    return NextResponse.json(
      {
        message: "Failed to submit data. Please try again later.", // User-friendly
        error: process.env.NODE_ENV === "development" ? error.message : undefined, // Only show details in dev
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
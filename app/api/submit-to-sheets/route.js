
import { google } from "googleapis";
import { NextResponse } from "next/server";

// Create auth client once and cache it
let authClient = null;
let sheetsClient = null;

// Initialize the Google Sheets client
async function getSheetClient() {
  // Return cached client if available
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
    throw error;
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    let values = [];
    let range = "";

    // Determine submission type based on unique fields
    // Blood Donation Form
    if (body.bloodGroup !== undefined) { 
      if (!body.name || !body.mobileNumber) {
        return NextResponse.json(
          { message: "Name and mobile number are required for blood donation" },
          { status: 400 }
        );
      }
      values = [
        [
          body.name,
          body.age,
          body.sex, // Assuming 'sex' field is used in blood donation form
          body.city,
          body.state,
          body.mobileNumber,
          body.bloodGroup,
          body.preexistingDisease || "None",
          body.willingToDonate,
          new Date(body.submissionDate).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata", // IST
            year: "numeric", month: "numeric", day: "numeric",
            hour: "2-digit", minute: "2-digit", second: "2-digit",
          })
        ],
      ];
      range = "BloodDonations!A:J"; // Sheet for blood donations

    // Health Camp Form (differentiate by fields like 'gender' and 'disease' if 'bloodGroup' is absent)
    } else if (body.gender !== undefined && body.disease !== undefined) {
      if (!body.name || !body.age || !body.gender) { // 'disease' can be optional from client, but we handle it here
        return NextResponse.json(
          { message: "Name, age, and gender are required for health camp registration" },
          { status: 400 }
        );
      }
      values = [
        [
          body.name,
          body.age,
          body.gender,
          body.disease || "None", // Ensure 'None' if empty
          new Date(body.submissionDate).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata", // IST
            year: "numeric", month: "numeric", day: "numeric",
            hour: "2-digit", minute: "2-digit", second: "2-digit",
          })
        ],
      ];
      range = "HealthCamp!A:E"; // New sheet for Health Camp, 5 columns

    // MHL Form
    } else if (body.phoneNumber !== undefined) { 
      if (!body.name || !body.phoneNumber) {
        return NextResponse.json(
          { message: "Name and phone number are required for MHL" },
          { status: 400 }
        );
      }
      values = [
        [
          body.name,
          body.phoneNumber,
          body.numberOfSixes,
          new Date(body.submissionDate).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata", // IST
            year: "numeric", month: "numeric", day: "numeric",
            hour: "2-digit", minute: "2-digit", second: "2-digit",
          }),
          body.selectedMatch || "No Match",
        ],
      ];
      range = "MHL!A:E"; // Existing sheet for MHL, 5 columns (A:E) - corrected from A:F if only 5 values
                         // If MHL has 6 columns, it should be A:F

    // Unknown form type
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
          { message: "Authentication error with Google Sheets. Please check service account credentials." },
          { status: 401 }
        );
      }
      if (googleError.message?.includes("permission")) {
        return NextResponse.json(
          { message: "Permission denied. Make sure your service account has access to the spreadsheet." },
          { status: 403 }
        );
      }
      throw googleError; // Rethrow other Google errors
    }
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error);
    return NextResponse.json(
      {
        message: "Failed to submit data",
        error: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
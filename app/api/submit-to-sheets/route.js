// // File: app/api/submit-to-sheets/route.js
// import { google } from 'googleapis';
// import { NextResponse } from 'next/server';

// export async function POST(request) {
//   try {
//     const body = await request.json();

//     // Validate the required fields
//     if (!body.name || !body.phoneNumber) {
//       return NextResponse.json(
//         { message: 'Name and phone number are required' },
//         { status: 400 }
//       );
//     }

//     // Log the received data for debugging
//     console.log('Received form data:', body);

//     // Handle Google Sheets integration
//     try {
//       // Configure Google Auth - with better error handling for private key
//       const privateKey = process.env.GOOGLE_PRIVATE_KEY;
//       if (!privateKey) {
//         throw new Error('Google Private Key is missing in environment variables');
//       }

//       // Parse the private key properly
//       const formattedPrivateKey = privateKey.replace(/\\n/g, '\n');

//       const auth = new google.auth.GoogleAuth({
//         credentials: {
//           client_email: process.env.GOOGLE_CLIENT_EMAIL,
//           private_key: formattedPrivateKey,
//         },
//         scopes: ['https://www.googleapis.com/auth/spreadsheets'],
//       });

//       // Create client instance for auth
//       const client = await auth.getClient();
//       console.log('Google auth client created successfully');

//       // Instance of Google Sheets API
//       const sheets = google.sheets({ version: 'v4', auth: client });

//       // Get spreadsheet ID from environment variables
//       const spreadsheetId = process.env.GOOGLE_SHEET_ID;
//       if (!spreadsheetId) {
//         throw new Error('Google Sheet ID is missing in environment variables');
//       }

//       // Format the data as required by the Sheets API
//       const values = [
//         [
//           body.name,
//           body.phoneNumber,
//           body.numberOfSixes,
//           new Date(body.submissionDate).toLocaleString()
//         ]
//       ];

//       console.log('Attempting to append data to sheet:', spreadsheetId);

//       // Append data to the sheet
//       const response = await sheets.spreadsheets.values.append({
//         spreadsheetId,
//         range: 'Sheet1!A:D', // Adjust range as needed
//         valueInputOption: 'USER_ENTERED',
//         insertDataOption: 'INSERT_ROWS',
//         resource: {
//           values,
//         },
//       });

//       console.log('Data successfully appended to sheet:', response.data);

//       return NextResponse.json(
//         {
//           message: 'Data submitted successfully',
//           response: response.data
//         },
//         { status: 200 }
//       );
//     } catch (googleError) {
//       console.error('Google Sheets API Error:', googleError);

//       // Check for specific Google API errors
//       if (googleError.message?.includes('invalid_grant')) {
//         return NextResponse.json(
//           { message: 'Authentication error with Google Sheets. Please check service account credentials.' },
//           { status: 401 }
//         );
//       }

//       if (googleError.message?.includes('permission')) {
//         return NextResponse.json(
//           { message: 'Permission denied. Make sure your service account has access to the spreadsheet.' },
//           { status: 403 }
//         );
//       }

//       throw googleError; // Re-throw for the outer catch
//     }
//   } catch (error) {
//     console.error('Error submitting to Google Sheets:', error);

//     return NextResponse.json(
//       {
//         message: 'Failed to submit data',
//         error: error.message,
//         stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
//       },
//       { status: 500 }
//     );
//   }
// }

//

// app/api/submit-to-sheets/route.js
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

    // Create and cache the auth client
    authClient = await auth.getClient();

    // Create and cache the sheets client
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

    // Validate the required fields
    if (!body.name || !body.phoneNumber) {
      return NextResponse.json(
        { message: "Name and phone number are required" },
        { status: 400 }
      );
    }

    // Get spreadsheet ID from environment variables
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    if (!spreadsheetId) {
      throw new Error("Google Sheet ID is missing in environment variables");
    }

    // Format the data for the Sheets API, including the match data
    const values = [
      [
        body.name,
        body.phoneNumber,
        body.numberOfSixes,
        new Date(body.submissionDate).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata", // Indian Standard Time
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        body.selectedMatch || "No Match", // Add match name
      ],
    ];

    try {
      // Get the cached sheets client or create a new one
      const sheets = await getSheetClient();

      // Append data to the sheet (updated range to include match columns)
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: "Sheet1!A:F", // Updated range to include match data columns
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        resource: {
          values,
        },
      });

      return NextResponse.json(
        {
          message: "Data submitted successfully",
          response: response.data,
        },
        { status: 200 }
      );
    } catch (googleError) {
      console.error("Google Sheets API Error:", googleError);

      if (googleError.message?.includes("invalid_grant")) {
        // If auth token expired, clear cache and try again
        authClient = null;
        sheetsClient = null;

        return NextResponse.json(
          {
            message:
              "Authentication error with Google Sheets. Please check service account credentials.",
          },
          { status: 401 }
        );
      }

      if (googleError.message?.includes("permission")) {
        return NextResponse.json(
          {
            message:
              "Permission denied. Make sure your service account has access to the spreadsheet.",
          },
          { status: 403 }
        );
      }

      throw googleError;
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

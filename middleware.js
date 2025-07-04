// import { NextResponse } from "next/server";
// import { jwtVerify } from "jose";

// const SECRET_KEY = new TextEncoder().encode(
//   process.env.JWT_SECRET ?? "default_secret"
// );

// async function middleware(req) {
//   console.log("Middleware Triggered");

//   // Retrieve token safely
//   const token = req.cookies.get("accessToken")?.value;
//   console.log("Token:", token || "No token found");

//   // Redirect if no token is present
//   if (!token) {
//     console.log("Redirecting: No token found");
//     return NextResponse.redirect(new URL("/Auth", req.url), 307);
//   }

//   try {
//     // Verify JWT token
//     await jwtVerify(token, SECRET_KEY, { algorithms: ["HS256"] });
//     console.log("Token verified successfully!");
//     return NextResponse.next();
//   } catch (error) {
//     console.error("Token verification failed:", error.message);
//     return NextResponse.redirect(new URL("/Auth", req.url), 307);
//   }
// }

// // Middleware applies to specific paths
// export const config = {
//   matcher: ["/book-tc", "/details/:path*", "/prescriptions", "/planUsers"],
// };


// export default middleware;


// import { NextResponse } from "next/server";
// import { jwtVerify } from "jose";

// const SECRET_KEY = new TextEncoder().encode(
//   process.env.JWT_SECRET ?? "default_secret"
// );

// export async function middleware(req) {
//   // Get the token
//   const token = req.cookies.get("accessToken")?.value;

//   // If no token, redirect to Auth page
//   if (!token) {
//     // Save current path in a cookie for redirection after login
//     const response = NextResponse.redirect(new URL("/Auth", req.url));
//     response.cookies.set("returnUrl", req.nextUrl.pathname, {
//       path: "/",
//       httpOnly: true,
//       maxAge: 900, // 15 minutes
//     });
//     return response;
//   }

//   try {
//     // Verify token
//     await jwtVerify(token, SECRET_KEY, { algorithms: ["HS256"] });
//     return NextResponse.next();
//   } catch (error) {
//     // Invalid token - redirect to Auth
//     const response = NextResponse.redirect(new URL("/Auth", req.url));
//     response.cookies.set("returnUrl", req.nextUrl.pathname, {
//       path: "/",
//       httpOnly: true,
//       maxAge: 900, // 15 minutes
//     });
//     return response;
//   }
// }

// export const config = {
//   matcher: ["/book-tc", "/details/:path*", "/prescriptions", "/planUsers"],
// };


// import { NextResponse } from "next/server";
// import { jwtVerify } from "jose";

// // More robust secret key handling
// function getSecretKey() {
//   const secret = process.env.JWT_SECRET;
//   if (!secret || secret === "default_secret") {
//     console.warn("Warning: Using default JWT secret. Set JWT_SECRET environment variable in production.");
//   }
//   return new TextEncoder().encode(secret || "default_secret");
// }

// export async function middleware(req) {
//   // try {
//     // console.log("Middleware triggered for:", req.nextUrl.pathname);
//     console.log("Middleware Triggered");
    
//     // Get the token
//     const token = req.cookies.get("accessToken")?.value;
    
//   //   // If no token, redirect to Auth page
//     if (!token) {
//       // Save current path in a cookie for redirection after login
//       const response = NextResponse.redirect(new URL("/Auth", req.url));
//       response.cookies.set("returnUrl", req.nextUrl.pathname, {
//         path: "/",
//         httpOnly: true,
//         maxAge: 900, // 15 minutes
//       });
//       return response;
//     }
    
//     try {
//       // Verify token with proper error handling
//       const SECRET_KEY = getSecretKey();
//       await jwtVerify(token, SECRET_KEY, { algorithms: ["HS256"] });
//       return NextResponse.next();
//     } catch (tokenError) {
//       console.error("Token verification failed:", tokenError.message);
      
//       // Invalid token - redirect to Auth
//       const response = NextResponse.redirect(new URL("/Auth", req.url));
//       response.cookies.set("returnUrl", req.nextUrl.pathname, {
//         path: "/",
//         httpOnly: true,
//         maxAge: 900, // 15 minutes
//       });
//       return response;
//     }
    
//     // In case of critical error, let the request proceed 
//     // rather than showing a 500 error
//     // Alternative: redirect to an error page
//     return NextResponse.next();
// }

// export const config = {
//   matcher: ["/book-tc", "/details/:path*", "/prescriptions", "/planUsers","/MHL","/blood","/camp"],
// };




// import { NextResponse } from "next/server";
// import { jwtVerify } from "jose";

// function getSecretKey() {
//   const secret = process.env.JWT_SECRET;
//   if (!secret || secret === "default_secret") {
//     // It's better to avoid logging secrets, even default ones, in production.
//     // This warning is fine for development.
//     console.warn("Warning: JWT secret is not set or is the default value.");
//   }
//   return new TextEncoder().encode(secret || "default_secret");
// }

// export async function middleware(req) {
//   const { pathname } = req.nextUrl;
//   console.log("Middleware triggered for path:", pathname);

//   // 1. ADD THIS CHECK: If the request is for the authentication page,
//   // let it go through without any token verification. This prevents a redirect loop.
//   if (pathname.startsWith("/Auth")) {
//     return NextResponse.next();
//   }

//   const token = req.cookies.get("accessToken")?.value;

//   // If no token exists, redirect to the login page
//   if (!token) {
//     // Construct the full redirect URL
//     const loginUrl = new URL("/Auth", req.url);
    
//     // Set the returnUrl so we can redirect back after a successful login
//     loginUrl.searchParams.set("returnUrl", pathname + req.nextUrl.search);
    
//     return NextResponse.redirect(loginUrl);
//   }

//   // If a token exists, try to verify it
//   try {
//     const SECRET_KEY = getSecretKey();
//     await jwtVerify(token, SECRET_KEY, { algorithms: ["HS256"] });

//     // Token is valid, allow the request to proceed
//     return NextResponse.next();
//   } catch (err) {
//     // This block catches invalid/expired tokens
//     console.error("Invalid token:", err.message);

//     // Redirect to login page just like the 'no token' case
//     const loginUrl = new URL("/Auth", req.url);
//     loginUrl.searchParams.set("returnUrl", pathname + req.nextUrl.search);
    
//     const response = NextResponse.redirect(loginUrl);
    
//     // It's good practice to clear the invalid cookie
//     response.cookies.delete("accessToken");
    
//     return response;
//   }
// }

// // Your matcher config remains the same.
// // It correctly specifies which routes are protected.
// export const config = {
//   matcher: ["/book-tc", "/details/:path*", "/prescriptions", "/planUsers", "/MHL", "/blood", "/camp","/healthPackage"],
// };



import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

function getSecretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret === "default_secret") {
    console.warn("Warning: JWT secret is not set or is the default value.");
  }
  return new TextEncoder().encode(secret || "default_secret");
}

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  console.log("Middleware triggered for path:", pathname);
  console.log("Full URL:", req.url);
  console.log("Search params:", req.nextUrl.search);

  // If the request is for the authentication page, let it go through
  if (pathname.startsWith("/Auth")) {
    console.log("Allowing access to Auth page");
    return NextResponse.next();
  }

  const token = req.cookies.get("accessToken")?.value;
  console.log("Token exists:", !!token);

  // If no token exists, redirect to the login page
  if (!token) {
    const returnUrl = pathname + req.nextUrl.search;
    const loginUrl = new URL("/Auth", req.url);
    loginUrl.searchParams.set("returnUrl", returnUrl);
    
    console.log("No token - redirecting to:", loginUrl.toString());
    console.log("Return URL set to:", returnUrl);
    
    return NextResponse.redirect(loginUrl);
  }

  // If a token exists, try to verify it
  try {
    const SECRET_KEY = getSecretKey();
    await jwtVerify(token, SECRET_KEY, { algorithms: ["HS256"] });
    console.log("Token verified successfully");
    return NextResponse.next();
  } catch (err) {
    console.error("Invalid token:", err.message);
    
    const returnUrl = pathname + req.nextUrl.search;
    const loginUrl = new URL("/Auth", req.url);
    loginUrl.searchParams.set("returnUrl", returnUrl);
    
    console.log("Invalid token - redirecting to:", loginUrl.toString());
    console.log("Return URL set to:", returnUrl);
    
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete("accessToken");
    return response;
  }
}

export const config = {
  matcher: [
    "/book-tc", 
    "/details/:path*", 
    "/prescriptions", 
    "/planUsers", 
    "/MHL", 
    "/blood", 
    "/camp",
    "/healthPackage",
    "/customPlan"
  ],
};
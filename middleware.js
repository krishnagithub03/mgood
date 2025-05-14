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


import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

// More robust secret key handling
function getSecretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret === "default_secret") {
    console.warn("Warning: Using default JWT secret. Set JWT_SECRET environment variable in production.");
  }
  return new TextEncoder().encode(secret || "default_secret");
}

export async function middleware(req) {
  // try {
    // console.log("Middleware triggered for:", req.nextUrl.pathname);
    console.log("Middleware Triggered");
    
    // Get the token
    const token = req.cookies.get("accessToken")?.value;
    
  //   // If no token, redirect to Auth page
    if (!token) {
      // Save current path in a cookie for redirection after login
      const response = NextResponse.redirect(new URL("/Auth", req.url));
      response.cookies.set("returnUrl", req.nextUrl.pathname, {
        path: "/",
        httpOnly: true,
        maxAge: 900, // 15 minutes
      });
      return response;
    }
    
    try {
      // Verify token with proper error handling
      const SECRET_KEY = getSecretKey();
      await jwtVerify(token, SECRET_KEY, { algorithms: ["HS256"] });
      return NextResponse.next();
    } catch (tokenError) {
      console.error("Token verification failed:", tokenError.message);
      
      // Invalid token - redirect to Auth
      const response = NextResponse.redirect(new URL("/Auth", req.url));
      response.cookies.set("returnUrl", req.nextUrl.pathname, {
        path: "/",
        httpOnly: true,
        maxAge: 900, // 15 minutes
      });
      return response;
    }
    
    // In case of critical error, let the request proceed 
    // rather than showing a 500 error
    // Alternative: redirect to an error page
    return NextResponse.next();
}

export const config = {
  matcher: ["/book-tc", "/details/:path*", "/prescriptions", "/planUsers","/MHL","/blood","/camp"],
};
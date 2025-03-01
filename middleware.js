import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "default_secret"
);

export async function middleware(req) {
  console.log("Middleware Triggered");

  // Retrieve token safely
  const token = req.cookies.get("accessToken")?.value;
  console.log("Token:", token || "No token found");

  // Redirect if no token is present
  if (!token) {
    console.log("Redirecting: No token found");
    return NextResponse.redirect(new URL("/Auth", req.url), 307);
  }

  try {
    // Verify JWT token
    await jwtVerify(token, SECRET_KEY, { algorithms: ["HS256"] });
    console.log("Token verified successfully!");
    return NextResponse.next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return NextResponse.redirect(new URL("/Auth", req.url), 307);
  }
}

// Middleware applies to specific paths
export const config = {
  matcher: [
    "/book-tc", 
    "/details/:path*", 
    "/prescriptions", 
    "/planUsers"],
};

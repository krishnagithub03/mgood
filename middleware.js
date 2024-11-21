import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  console.log("Middleware");
  const { isAuthenticated } = getKindeServerSession();
  //   if (!(await isAuthenticated())) {
  //     // redirect("/api/auth/login");
  //     return NextResponse.redirect(
  //       new URL("/api/auth/login?post_login_redirect_url=/", request.url)
  //     );
  //   }
  if (!(await isAuthenticated())) {
    const requestedUrl = request.url; // Capture the URL they are trying to visit
    const loginUrl = new URL("/api/auth/login", request.url);
    loginUrl.searchParams.set("post_login_redirect_url", requestedUrl); // Set the intended route

    return NextResponse.redirect(loginUrl); // Redirect to the login page
  }

  // const { getClaim } = getKindeServerSession();
  // //   // console.log("fjnejnfje", user);
  // const result = await getClaim("roles"); // Assuming role is available in the session
  // console.log("Role: ", result);
  // //   // If user is basic, check if they are trying to access /details
  //   if (result?.value.some((role) => role === "basic-user")) {
  //     if (request.nextUrl.pathname === "/details") {
  //       // Allow access to /details
  //       return NextResponse.next();
  //     } else {
  //       // Redirect basic user to home page if they try to access any other route
  //       return NextResponse.redirect(new URL("/", request.url));
  //     }
  //   }

  //   // If user is a partner, redirect them to /book-tc
  //   if (result?.value.some((role) => role === "mgood-partner")) {
  //     if (request.nextUrl.pathname !== "/book-tc") {
  //       // Redirect partner to /book-tc if they are trying to access any other route
  //       return NextResponse.redirect(new URL("/book-tc", request.url));
  //     }
  //     // Allow access to /book-tc
  //     return NextResponse.next();
  //   }

  //   // Default behavior: allow access if role is not basic or partner (or no role at all)
  // return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/details/:path*", "/addDoctor", "/book-tc"],
};

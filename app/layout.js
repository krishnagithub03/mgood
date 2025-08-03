import localFont from "next/font/local";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { Toaster } from "sonner";
import Script from "next/script";
import LiveUserCounter from "./_components/LiveCounter";
import Event from "./_components/Event";
import '@/marquee.css';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
<Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=G-DG2GY331WV`}></Script>
<Script id="google-analytics" strategy="afterInteractive">
  {
    `
    window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)}
  gtag('js', new Date());

  gtag('config', 'G-DG2GY331WV');
  `
}
</Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div>
          <Header />
          <LiveUserCounter />
         
          {children}
          <Toaster />
        </div>
        <Footer />
      </body>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
    </html>
  );
}

// import {
//     Body,
//     Button,
//     Container,
//     Head,
//     Heading,
//     Html,
//     Img,
//     Preview,
//     Section,
//     Text,
//     Row,
//     Column,
//   } from "@react-email/components";
//   import * as React from "react";
  
//   // Define the props for the email component based on the form data
//   interface CorporateBookingConfirmationEmailProps {
//     contactPerson?: string;
//     companyName?: string;
//     plan?: string;
//     address?: string;
//     pincode?: string;
//     phoneNumber?: string;
//     email?: string;
//     bookingDate?: Date;
//   }
  
//   const baseUrl = "http://mgood.org";
  
//   export const CorporateBookingConfirmationEmail = ({
//     contactPerson = "Valued Client",
//     companyName = "Your Company",
//     plan = "Selected Plan",
//     address = "Your Address",
//     pincode = "000000",
//     bookingDate = new Date(),
//   }: CorporateBookingConfirmationEmailProps) => {
  
//     const formattedDate = new Intl.DateTimeFormat("en-US", {
//       dateStyle: "long",
//       timeStyle: "short",
//     }).format(bookingDate);
  
//     return (
//       <Html>
//         <Head />
//         <Preview>Your MGood Corporate Health Plan Booking is Confirmed</Preview>
//         <Body style={main}>
//           <Container style={container}>
//             <Section style={logoSection}>
//                <Img
//                   src={`${baseUrl}/mgood_logo.jpg`}
//                   width="120"
//                   height="auto"
//                   alt="MGood Logo"
//                   style={logo}
//                 />
//             </Section>
  
//             <Section style={content}>
//               <Heading style={heading}>
//                 Hi {contactPerson},
//               </Heading>
//               <Heading as="h2" style={subheading}>
//                 Your Booking is Confirmed!
//               </Heading>
//               <Text style={paragraph}>
//                 Thank you for choosing MGood for your corporate wellness needs. We have successfully received your request for a health plan for <strong>{companyName}</strong>. Our team is now reviewing the details and will contact you within the next 24 business hours to finalize everything.
//               </Text>
  
//               <Section style={bookingDetailsSection}>
//                 <Heading as="h3" style={detailsHeading}>Booking Summary</Heading>
//                 <Row style={detailRow}>
//                   <Column style={detailLabel}>Company:</Column>
//                   <Column style={detailValue}>{companyName}</Column>
//                 </Row>
//                 <Row style={detailRow}>
//                   <Column style={detailLabel}>Selected Plan:</Column>
//                   <Column style={detailValue}>{plan}</Column>
//                 </Row>
//                 <Row style={detailRow}>
//                   <Column style={detailLabel}>Sample Collection Address:</Column>
//                   <Column style={detailValue}>{address}, {pincode}</Column>
//                 </Row>
//                  <Row style={detailRow}>
//                   <Column style={detailLabel}>Booking Date:</Column>
//                   <Column style={detailValue}>{formattedDate}</Column>
//                 </Row>
//               </Section>
  
//               <Text style={paragraph}>
//                 <strong>What's Next?</strong> A dedicated MGood representative will reach out to you to confirm the schedule, and payment details, and answer any questions you might have.
//               </Text>
//               <Text style={paragraph}>
//                 If you need to make any changes or have an urgent query, please don't hesitate to reach out to our support team.
//               </Text>
  
//               <Section style={buttonContainer}>
//                 <Button style={button} href="https://mgood.org/contact">
//                   Contact Support
//                 </Button>
//               </Section>
//             </Section>
  
//             <Text style={footer}>
//               © {new Date().getFullYear()} MGood | Your Partner in Corporate Wellness
//               <br />
//               73/71 Chagan Pura, Mathura | www.mgood.org
//             </Text>
//           </Container>
//         </Body>
//       </Html>
//     );
//   };
  
  
//   // Set up preview props for development and testing
//   CorporateBookingConfirmationEmail.PreviewProps = {
//     contactPerson: "Ankit Sharma",
//     companyName: "Pyramid Buildtech",
//     plan: "PLAN C",
//     address: "123 Business Park, Sector 62",
//     pincode: "201309",
//     bookingDate: new Date(),
//   } as CorporateBookingConfirmationEmailProps;
  
//   export default CorporateBookingConfirmationEmail;
  
  
//   // --- STYLES ---
  
//   const main = {
//     backgroundColor: "#f6f9fc",
//     fontFamily:
//       '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
//   };
  
//   const container = {
//     backgroundColor: "#ffffff",
//     margin: "0 auto",
//     padding: "20px 0 48px",
//     marginBottom: "64px",
//     borderRadius: "8px",
//     boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//   };
  
//   const logoSection = {
//     padding: "20px 0",
//     textAlign: "center" as const,
//   };
  
//   const logo = {
//     margin: "0 auto",
//   };
  
//   const content = {
//     padding: "0 40px",
//   };
  
//   const heading = {
//     fontSize: "28px",
//     fontWeight: "bold",
//     color: "#1a202c",
//     textAlign: "center" as const,
//     margin: "30px 0",
//   };
  
//   const subheading = {
//     fontSize: "22px",
//     fontWeight: "bold",
//     color: "#2d3748",
//     textAlign: "center" as const,
//     marginTop: "-15px",
//     marginBottom: "20px",
//   };
  
//   const paragraph = {
//     fontSize: "16px",
//     lineHeight: "26px",
//     color: "#4a5568",
//   };
  
//   const bookingDetailsSection = {
//     margin: "28px 0",
//     padding: "20px",
//     backgroundColor: "#f7fafc",
//     border: "1px solid #e2e8f0",
//     borderRadius: "8px",
//   };
  
//   const detailsHeading = {
//     fontSize: "18px",
//     fontWeight: "bold",
//     color: "#1a202c",
//     margin: "0 0 15px 0",
//   };
  
//   const detailRow = {
//     marginBottom: '10px',
//   };
  
//   const detailLabel = {
//     color: '#718096',
//     fontSize: '15px',
//     width: '180px',
//     fontWeight: '600' as '600',
//   };
  
//   const detailValue = {
//     color: '#2d3748',
//     fontSize: '15px',
//   };
  
  
//   const buttonContainer = {
//     textAlign: "center" as const,
//     margin: "32px 0",
//   };
  
//   const button = {
//     backgroundColor: "#2563eb", // Blue-600
//     borderRadius: "6px",
//     color: "#fff",
//     fontSize: "16px",
//     fontWeight: "bold",
//     textDecoration: "none",
//     textAlign: "center" as const,
//     display: "inline-block",
//     padding: "14px 28px",
//   };
  
//   const footer = {
//     color: "#8898aa",
//     fontSize: "12px",
//     lineHeight: "16px",
//     textAlign: "center" as const,
//     margin: "0 auto",
//   };


import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Preview,
    Section,
    Text,
    Row,
    Column,
  } from "@react-email/components";
  import * as React from "react";
  
  // Define the props for the email component based on the form data
  interface CorporateBookingConfirmationEmailProps {
    contactPerson?: string;
    companyName?: string;
    plan?: string;
    address?: string;
    pincode?: string;
    phoneNumber?: string; // This was already here, which is great
    email?: string;
    bookingDate?: Date;
  }
  
  const baseUrl = "http://mgood.org";
  
  export const CorporateBookingConfirmationEmail = ({
    contactPerson = "Valued Client",
    companyName = "Your Company",
    plan = "Selected Plan",
    address = "Your Address",
    pincode = "000000",
    phoneNumber = "N/A", // <<< 1. Added phoneNumber to props with a default
    bookingDate = new Date(),
  }: CorporateBookingConfirmationEmailProps) => {
  
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(bookingDate);
  
    return (
      <Html>
        <Head />
        <Preview>Your MGood Corporate Health Plan Booking is Confirmed</Preview>
        <Body style={main}>
          <Container style={container}>
            <Section style={logoSection}>
               <Img
                  src={`${baseUrl}/mgood_logo.jpg`}
                  width="120"
                  height="auto"
                  alt="MGood Logo"
                  style={logo}
                />
            </Section>
  
            <Section style={content}>
              <Heading style={heading}>
                Hi {contactPerson},
              </Heading>
              <Heading as="h2" style={subheading}>
                Your Booking is Confirmed!
              </Heading>
              <Text style={paragraph}>
                Thank you for choosing MGood for your corporate wellness needs. We have successfully received your request for a health plan for <strong>{companyName}</strong>. Our team is now reviewing the details and will contact you within the next 24 business hours to finalize everything.
              </Text>
  
              <Section style={bookingDetailsSection}>
                <Heading as="h3" style={detailsHeading}>Booking Summary</Heading>
                <Row style={detailRow}>
                  <Column style={detailLabel}>Company:</Column>
                  <Column style={detailValue}>{companyName}</Column>
                </Row>
                <Row style={detailRow}>
                  <Column style={detailLabel}>Selected Plan:</Column>
                  <Column style={detailValue}>{plan}</Column>
                </Row>
                {/* --- vvv 2. THIS IS THE NEWLY ADDED SECTION vvv --- */}
                <Row style={detailRow}>
                  <Column style={detailLabel}>Contact Number:</Column>
                  <Column style={detailValue}>{phoneNumber}</Column>
                </Row>
                {/* --- ^^^ END OF NEWLY ADDED SECTION ^^^ --- */}
                <Row style={detailRow}>
                  <Column style={detailLabel}>Sample Collection Address:</Column>
                  <Column style={detailValue}>{address}, {pincode}</Column>
                </Row>
                 <Row style={detailRow}>
                  <Column style={detailLabel}>Booking Date:</Column>
                  <Column style={detailValue}>{formattedDate}</Column>
                </Row>
              </Section>
  
              <Text style={paragraph}>
                <strong>What's Next?</strong> A dedicated MGood representative will reach out to you to confirm the schedule, and payment details, and answer any questions you might have.
              </Text>
              <Text style={paragraph}>
                If you need to make any changes or have an urgent query, please don't hesitate to reach out to our support team.
              </Text>
  
              <Section style={buttonContainer}>
                <Button style={button} href="https://mgood.org/contact">
                  Contact Support
                </Button>
              </Section>
            </Section>
  
            <Text style={footer}>
              © {new Date().getFullYear()} MGood | Your Partner in Corporate Wellness
              <br />
              73/71 Chagan Pura, Mathura | www.mgood.org
            </Text>
          </Container>
        </Body>
      </Html>
    );
  };
  
  
  // Set up preview props for development and testing
  CorporateBookingConfirmationEmail.PreviewProps = {
    contactPerson: "Ankit Sharma",
    companyName: "Pyramid Buildtech",
    plan: "PLAN C",
    address: "123 Business Park, Sector 62",
    pincode: "201309",
    phoneNumber: "9876543210", // <<< 3. Added phoneNumber for testing
    bookingDate: new Date(),
  } as CorporateBookingConfirmationEmailProps;
  
  export default CorporateBookingConfirmationEmail;
  
  
  // --- STYLES --- (No changes needed here)
  
  const main = {
    backgroundColor: "#f6f9fc",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px 0 48px",
    marginBottom: "64px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  };
  
  const logoSection = {
    padding: "20px 0",
    textAlign: "center" as const,
  };
  
  const logo = {
    margin: "0 auto",
  };
  
  const content = {
    padding: "0 40px",
  };
  
  const heading = {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#1a202c",
    textAlign: "center" as const,
    margin: "30px 0",
  };
  
  const subheading = {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#2d3748",
    textAlign: "center" as const,
    marginTop: "-15px",
    marginBottom: "20px",
  };
  
  const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
    color: "#4a5568",
  };
  
  const bookingDetailsSection = {
    margin: "28px 0",
    padding: "20px",
    backgroundColor: "#f7fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
  };
  
  const detailsHeading = {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#1a202c",
    margin: "0 0 15px 0",
  };
  
  const detailRow = {
    marginBottom: '10px',
  };
  
  const detailLabel = {
    color: '#718096',
    fontSize: '15px',
    width: '180px',
    fontWeight: '600' as '600',
  };
  
  const detailValue = {
    color: '#2d3748',
    fontSize: '15px',
  };
  
  
  const buttonContainer = {
    textAlign: "center" as const,
    margin: "32px 0",
  };
  
  const button = {
    backgroundColor: "#2563eb", // Blue-600
    borderRadius: "6px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "inline-block",
    padding: "14px 28px",
  };
  
  const footer = {
    color: "#8898aa",
    fontSize: "12px",
    lineHeight: "16px",
    textAlign: "center" as const,
    margin: "0 auto",
  };
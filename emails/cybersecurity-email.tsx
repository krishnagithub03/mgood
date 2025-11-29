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

interface CybersecurityConfirmationEmailProps {
  name?: string;
  email?: string;
  number?: string;
  location?: string;
}

const baseUrl = "http://mgood.org";

export const CybersecurityConfirmationEmail = ({
  name = "Valued Customer",
  email = "customer@example.com",
  number = "N/A",
  location = "N/A",
}: CybersecurityConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your MGood Cybersecurity Inquiry has been Received</Preview>
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
              Hi {name},
            </Heading>
            <Heading as="h2" style={subheading}>
              Thank You for Your Cybersecurity Inquiry!
            </Heading>
            <Text style={paragraph}>
              Thank you for reaching out to MGood regarding our cybersecurity protection services. We have successfully received your inquiry and our team will contact you within the next 24 business hours to discuss how we can help protect your online presence.
            </Text>

            <Section style={bookingDetailsSection}>
              <Heading as="h3" style={detailsHeading}>Inquiry Summary</Heading>
              <Row style={detailRow}>
                <Column style={detailLabel}>Name:</Column>
                <Column style={detailValue}>{name}</Column>
              </Row>
              <Row style={detailRow}>
                <Column style={detailLabel}>Email:</Column>
                <Column style={detailValue}>{email}</Column>
              </Row>
              <Row style={detailRow}>
                <Column style={detailLabel}>Phone Number:</Column>
                <Column style={detailValue}>{number}</Column>
              </Row>
              <Row style={detailRow}>
                <Column style={detailLabel}>Location:</Column>
                <Column style={detailValue}>{location}</Column>
              </Row>
            </Section>

            <Text style={paragraph}>
              <strong>What's Next?</strong> Our cybersecurity experts will review your inquiry and reach out to you to discuss:
            </Text>
            <Text style={paragraph}>
              • Identity Theft Protection<br/>
              • Cyber Stalking & Cyber Bullying Protection<br/>
              • Social Media Protection<br/>
              • Privacy Breach Protection & Data Loss Prevention<br/>
              • Online Banking & E-commerce Protection<br/>
              • Personal Information Protection
            </Text>
            <Text style={paragraph}>
              If you need to make any changes or have an urgent query, please don't hesitate to reach out to our support team.
            </Text>

            <Section style={buttonContainer}>
              <Button style={button} href="https://mgood.org/contact">
                Contact Support
              </Button>
            </Section>

            <Text style={footer}>
              Best regards,<br/>
              The MGood Cybersecurity Team<br/>
              <br/>
              MGood Healthcare<br/>
              Email: support@mgood.org<br/>
              Phone: +91-8923894358
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const logoSection = {
  padding: "32px 20px",
  textAlign: "center" as const,
};

const logo = {
  margin: "0 auto",
};

const content = {
  padding: "0 48px",
};

const heading = {
  color: "#1a202c",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0 0 8px",
};

const subheading = {
  color: "#2563eb",
  fontSize: "20px",
  fontWeight: "600",
  margin: "24px 0 16px",
};

const paragraph = {
  color: "#4a5568",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "16px 0",
};

const bookingDetailsSection = {
  backgroundColor: "#f7fafc",
  borderRadius: "8px",
  padding: "24px",
  margin: "24px 0",
};

const detailsHeading = {
  color: "#2d3748",
  fontSize: "18px",
  fontWeight: "600",
  margin: "0 0 16px",
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
  backgroundColor: "#2563eb",
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

export default CybersecurityConfirmationEmail;


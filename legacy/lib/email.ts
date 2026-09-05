import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendProposalNotification(proposalDetails: {
  name: string;
  email?: string;
  phoneNumber: string;
  productType: string;
  proposalData: string;
}) {
  try {
    await transporter.sendMail({
      from: "info@bolt-energy.me",
      to: "info@bolt-energy.me",
      subject: "New Proposal Created",
      html: `
        <h2>New Proposal Notification</h2>
        <p>A new proposal has been created with the following details:</p>
        <ul>
          <li>Customer Name: ${proposalDetails.name}</li>
          <li>Email: ${proposalDetails.email || "Not provided"}</li>
          <li>Phone Number: ${proposalDetails.phoneNumber}</li>
          <li>Product Type: ${proposalDetails.productType}</li>
          <li>Proposal Data: ${proposalDetails.proposalData}</li>
        </ul>
      `,
    });
  } catch (error) {
    console.error("Failed to send email notification:", error);
  }
}

import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function testEmail() {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Test Sender" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send email to yourself for testing
      subject: "Test Email from Node.js",
      text: "This is a test email to verify SMTP setup with Gmail and app password.",
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

testEmail();

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendResetEmail = async (to, token) => {
  const resetLink = `https://yourfrontend.com/reset-password?token=${token}`;

  const mailOptions = {
    from: '"CRM Password Reset" <no-reply@nxerracrm.com>',
    to,
    subject: "Password Reset",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 15 minutes.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async (name, phone, email, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.TO_EMAIL,
    subject: `📩 New Portfolio Message from ${name}`,
    text: `
Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}
Message: ${message}
    `,
  };

  console.log("Sending email with:", { name,phone,email, message });

  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;

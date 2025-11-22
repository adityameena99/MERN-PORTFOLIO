// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const sendMail = async (name, email, message, phone) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const mailOptions = {
//     from: email,
//     to: process.env.TO_EMAIL,
//     subject: `📩 New Portfolio Message from ${name}`,
//     text: `
// Name: ${name}
// Email: ${email}
// Phone: ${phone || "N/A"}
// Message: ${message}
//     `,
//   };

//   console.log("Sending email with:", { name, email, phone, message });

//   await transporter.sendMail(mailOptions);
// };

// module.exports = sendMail;


const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async (name, email, message, phone) => {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
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

  console.log("Sending email with:", { name, email, phone, message });

  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;


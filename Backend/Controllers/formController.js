const Form = require("../Models/Form");
const sendMail = require("../Services/mailService");

exports.handleForm = async (req, res) => {
  const { name, email, phone, message } = req.body;
  console.log("Request body:", req.body);

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
   
    const newForm = new Form({ name, email, phone, message });
    await newForm.save();

    await sendMail(name, email, message,phone);

    res.status(200).json({ message: "Form submitted successfully!" });
  } catch (err) {
    console.error("Backend Error:", err);

    if (err.code === 11000) {
      return res.status(400).json({ message: "This email has already been used!" });
    }

    res.status(500).json({ message: "Server error" });
  }
};

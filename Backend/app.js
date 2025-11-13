const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const formRouter = require("./Routers/Router");

const app = express();

// JSON parsing
app.use(express.json());

// CORS – must be above routes
app.use(cors({
  origin: "https://mern-portfolio-khaki.vercel.app", // ✅ include https://
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true
}));

// Routes
app.use("/api/contact", formRouter);

// MongoDB connection + server start
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    setTimeout(connectDB, 5000);
  }
};

connectDB();

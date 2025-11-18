const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const formRouter = require("./Routers/Router");

const app = express();


app.use(express.json());
app.use(cors({
  origin: "https://mern-portfolio-d64a.vercel.app", 
  credentials: true,
}));


app.use("/api", formRouter);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" Connected to MongoDB"))
  .catch(err => console.error(" Error connecting to MongoDB!", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));

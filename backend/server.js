import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Enquiry from "./models/Enquiry.js";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/enquiry_form_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ✅ API route
app.post("/api/enquiry", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newEnquiry = new Enquiry({ name, email, phone, message });
    await newEnquiry.save();

    res.json({ message: "✅ Enquiry submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Server error" });
  }
});

// ✅ Start backend server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

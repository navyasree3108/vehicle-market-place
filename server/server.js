const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const Booking = require('./models/Booking');
const User = require('./models/User'); // Only if using users

// Route files
const authRoutes = require("./routes/auth");
const vehicleRoutes = require("./routes/vehicles");

const bookingRoutes = require("./routes/bookings");

const notificationRoutes = require("./routes/notifications");

const app = express();  // ✅ Now it's safe to use app.use()
app.use(cors());
app.use(express.json()); // ✅ Add this line to parse JSON body

app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // to access uploaded images


app.use("/api/vehicles", vehicleRoutes);

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Use routes





app.use("/api/bookings", bookingRoutes); // ✅ moved here

app.use("/api/notifications", notificationRoutes);

// Start server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));

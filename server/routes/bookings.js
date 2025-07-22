const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

router.post("/", async (req, res) => {
  console.log("Received booking data:", req.body); 
  try {
    const {
      fullName,
      phoneNumber,
      state,
      pinCode,
      houseNumber,
      areaName,
      addressType,
      name,
      cardName,
      cardNumber,
      expiry,
      cvv
    } = req.body;

    const newBooking = new Booking({
      fullName,
      phoneNumber,
      state,
      pinCode,
      houseNumber,
      areaName,
      addressType,
      name,
      cardName,
      cardNumber,
      expiry,
      cvv
    });

    await newBooking.save();
    res.status(201).json({ message: "Booking successful!" });
  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(500).json({ error: "Booking failed." });
  }
});



module.exports = router;

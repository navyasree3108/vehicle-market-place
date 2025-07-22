const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
 
  fullName: String,
  phoneNumber: String,
  state: String,
  pinCode: String,
  houseNumber: String,
  areaName: String,
  addressType: String,
  vehicleTitle: String, // from selected vehicle
  name: String, // vehicle name
  price: String,
  modelYear: String,
 // 🔐 Credit Card Fields
  cardNumber: String,
  expiryDate: String,
  cvv: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
  vehicleCategory: String // car/bike/lorry
});

module.exports = mongoose.model("Booking", bookingSchema);

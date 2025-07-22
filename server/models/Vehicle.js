// server/models/Vehicle.js
const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  name: String,
  type: String,
  model: String,
  year: Number,
  fuel: String,
  transmission: String,
  price: String,
  description: String,
  image: String,// will store image file path
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Vehicle", vehicleSchema);

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Vehicle = require("../models/Vehicle");

// multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // ensure 'uploads' folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const newVehicle = new Vehicle({
      name: req.body.name,
      category: req.body.category,
      model: req.body.model,
      year: Number(req.body.year),
      price: Number(req.body.price),
      description: req.body.description,
      image: req.file ? req.file.path : null,
    });

    await newVehicle.save();
    res.status(201).json({ message: "Vehicle listed successfully!" });
  } catch (error) {
    console.error("Error saving vehicle:", error);
    res.status(500).json({ error: "Failed to save vehicle" });
  }
});

module.exports = router;

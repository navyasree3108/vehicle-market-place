const express = require("express");
const sgMail = require("@sendgrid/mail");
const twilio = require("twilio");

const router = express.Router();

// Set up SendGrid
if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY.startsWith("SG.")) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  console.warn("SendGrid API key not set or invalid. Email feature disabled.");
}

// Set up Twilio
let client = null;
if (process.env.TWILIO_SID && process.env.TWILIO_SID.startsWith("AC")) {
  client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);
} else {
  console.warn("Twilio SID not set or invalid. SMS feature disabled.");
}

// Send email
router.post("/email", async (req, res) => {
  if (!sgMail) {
    return res.json({ message: "Email feature is disabled." });
  }
  const msg = {
    to: req.body.to,
    from: "noreply@yourdomain.com",
    subject: req.body.subject,
    text: req.body.text,
  };
  try {
    await sgMail.send(msg);
    res.json({ message: "Email sent!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send email." });
  }
});

// Send SMS
router.post("/sms", async (req, res) => {
  if (!client) {
    return res.json({ message: "SMS feature is disabled." });
  }
  try {
    const message = await client.messages.create({
      body: req.body.text,
      from: "+1234567890", // Your Twilio number
      to: req.body.to
    });
    res.json({ message: "SMS sent!", sid: message.sid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send SMS." });
  }
});

module.exports = router;

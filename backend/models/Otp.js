const mongoose = require("mongoose");
const mailSender = require("../utils/mailSend");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 10 * 60,
  },
});

async function sendVerificationMail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email for StudyNotion",
      otp
    );
    console.log("email sent succefully", mailResponse);
  } catch (err) {
    console.log("error occured while sending mail:", err);
    throw err;
  }
}

otpSchema.pre("save", async function (next) {
  await sendVerificationMail(this.email, this.otp);
  next();
});

module.exports = mongoose.model("Otp", otpSchema);

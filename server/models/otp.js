const { mongoose } = require("../db");
const { Schema } = mongoose;

const OtpSchema = new Schema(
  {
    email: { type: String, required: true, index: true },
    code: { type: String, required: true },  
    expiresAt: { type: Date, required: true },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Otp = mongoose.model("Otp", OtpSchema);

module.exports = Otp;

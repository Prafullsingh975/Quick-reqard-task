const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true, max: 10, min: 10 }, // we use this as referral code
    dob: { type: Date, required: true },
    pinCode: { type: String, required: true, max: 6, min: 6 },
    password: { type: String, required: true },
    rewardPoints: { type: Number, default: 0 },
  },
  { timestamps: true }
);
const User = model("User", userSchema);

module.exports = User;

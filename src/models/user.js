const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    phone: { type: String, default: null },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: Number, default: null },
    stripeUserId : { type: String, default: null }
  },
  { timestamps: true }
);

module.exports.userModel = mongoose.model('user',userSchema)
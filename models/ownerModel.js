const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    address: { type: String },
    otp: { type: Number },
    otpCreatedAt: { type: Date }
}, { timestamps: true });

const Owner = mongoose.model('Owner', ownerSchema);

module.exports = Owner;

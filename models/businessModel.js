const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    businessName: { type: String, required: true },
    email: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    address: { type: String },
    otp: { type: Number },
    otpCreatedAt: { type: Date }
}, { timestamps: true });

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;

const Business = require('../models/businessModel');
const Owner = require('../models/ownerModel');
const { sendOTP } = require('../config/mailConfig');

exports.submitBusinessInfo = async (req, res) => {
    const { businessName, email, mobileNumber, address } = req.body;

    if (!businessName) {
        return res.status(400).json({ error: 'Business name is required' });
    }

    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Please provide a valid email' });
    }

    if (!mobileNumber || mobileNumber.length !== 10) {
        return res.status(400).json({ error: 'Mobile number must be 10 digits' });
    }

    try {
        const business = new Business({ businessName, email, mobileNumber, address });
        await business.save();

        return res.status(200).json({ message: 'Business info submitted successfully!' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to save business info' });
    }
};

exports.submitOwnerInfo = async (req, res) => {
    const { fullName, email, mobileNumber, address } = req.body;

    if (!fullName) {
        return res.status(400).json({ error: 'Full name is required' });
    }

    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Please provide a valid email' });
    }

    if (!mobileNumber || mobileNumber.length !== 10) {
        return res.status(400).json({ error: 'Mobile number must be 10 digits' });
    }

    try {
        const owner = new Owner({ fullName, email, mobileNumber, address });
        await owner.save();

        return res.status(200).json({ message: 'Owner info submitted successfully!' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to save owner info' });
    }
};

exports.sendOtp = async (req, res) => {
    const { email, userType } = req.body;

    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Please provide a valid email' });
    }

    try {
        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000);

        if (userType === 'business') {
            const business = await Business.findOneAndUpdate(
                { email },
                { otp, otpCreatedAt: new Date() },
                { new: true }
            );

            if (!business) {
                return res.status(404).json({ error: 'Business not found' });
            }

            sendOTP(email, otp);
            return res.status(200).json({ message: 'OTP sent to business email!' });

        } else if (userType === 'owner') {
            const owner = await Owner.findOneAndUpdate(
                { email },
                { otp, otpCreatedAt: new Date() },
                { new: true }
            );

            if (!owner) {
                return res.status(404).json({ error: 'Owner not found' });
            }

            sendOTP(email, otp);
            return res.status(200).json({ message: 'OTP sent to owner email!' });
        } else {
            return res.status(400).json({ error: 'Invalid user type' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Failed to send OTP' });
    }
};

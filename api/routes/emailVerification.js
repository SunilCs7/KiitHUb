const express = require("express");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const User = require("../models/User"); // Import User model
const router = express.Router();

// Route to send verification email
router.post("/send", async (req, res) => {
    const { email } = req.body;

    try {
        const verificationCode = crypto.randomInt(100000, 999999);

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        user.verificationCode = verificationCode;
        await user.save();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL, // Email from .env
                pass: process.env.EMAIL_PASSWORD, // Password from .env
            },
        });

        const mailOptions = {
            from: '"KIIT Hub" <your-email@gmail.com>',
            to: email,
            subject: "KIIT Hub Email Verification",
            text: `Your verification code is: ${verificationCode}`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Verification email sent!" });
    } catch (error) {
        res.status(500).json({ message: "Error sending email", error });
    }
});

// Route to verify code
router.post("/verify", async (req, res) => {
    const { email, code } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.verificationCode === parseInt(code)) {
            user.isVerified = true;
            user.verificationCode = null;
            await user.save();
            return res.status(200).json({ message: "Email verified successfully!" });
        }

        res.status(400).json({ message: "Invalid verification code" });
    } catch (error) {
        res.status(500).json({ message: "Error verifying code", error });
    }
});

module.exports = router;

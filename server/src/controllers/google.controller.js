import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const googleAuth = async (req, res) => {
    try {
        const { username, email, image } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            user = new User({ username, email, image, password: "" });
            await user.save();
        }

        // ✅ Generate JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(200).json(user);
    } catch (error) {
        console.error("Auth error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ---------------------------- Register ---------------------------- //
const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // --------- Check if user already exists --------- //
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.json({
                success: false,
                message: "User already exists.",
            });
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            username,
            email,
            password: hashPassword,
        });
        await newUser.save();
        res.status(201).json({
            success: true,
            message: "User created successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occurred",
        });
    }
};

// ---------------------------- Login ---------------------------- //
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // --------- Check if user exists --------- //
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.json({ success: false, message: `User doesn't exist.` });
        }
        // --------- Compare password --------- //
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid password." });
        }
        // --------- Generate JWT token --------- //
        const token = jwt.sign(
            {
                id: existingUser._id,
                role: existingUser.role,
                email: existingUser.email,
                username: existingUser.username,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "60d" }
        );
        res.cookie("token", token, { httpOnly: true, secure: false }).json({
            success: true,
            message: `Logged in successfully.`,
            user: {
                email: existingUser.email,
                role: existingUser.role,
                id: existingUser._id,
                username: existingUser.username,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occurred",
        });
    }
};

// ---------------------------- Logout ---------------------------- //
const logout = (req, res) => {
    res.clearCookie("token").json({
        success: true,
        message: "Logged out successfully.",
    });
};

module.exports = {
    register,
    login,
    logout,
};

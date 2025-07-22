import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Helper to generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// Register
export const register = async (req, res) => {
  try {
    const { name, email, password, role, MobileNumber} = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const user = new User({ name, email, password, role, MobileNumber });
    await user.save();

    const token = generateToken(user);
    res.status(201).json({ user: { id: user._id, name, email, role, MobileNumber }, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    res.json({ user: { id: user._id, name: user.name, email, role: user.role, MobileNumber: user.MobileNumber}, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

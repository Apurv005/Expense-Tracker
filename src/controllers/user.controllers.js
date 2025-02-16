const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const { encryptedPassword } = require("../utils/utility");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

// POST: Register a new user
exports.registerUser = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      phone_number,
      profile_picture,
    } = req.body;

    // 1️⃣ Validate required fields
    if (!first_name || !last_name || !email || !password) {
      return res
        .status(400)
        .json({ error: "All required fields must be provided." });
    }

    // 2️⃣ Check if the email is already registered
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already in use!" });
    }

    hashedPassword = await encryptedPassword(password);

    // 4️⃣ Create a new user
    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password_hash: hashedPassword, // Save the hashed password
      phone_number,
      profile_picture,
    });

    // 5️⃣ Return success response (excluding password)
    res.status(201).json({
      message: "User registered successfully!",
      user: {
        id: newUser.id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        phone_number: newUser.phone_number,
        profile_picture: newUser.profile_picture,
      },
    });
  } catch (error) {
    console.error("❌ Error registering user:", error);
    res.status(500).json({ error: "Server error, please try again later." });
  }
};

// Login User
exports.loginUser = async (req,res) => {
  
  try {
    const { email, password } = req.body;
    // 1️⃣ Validate input fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    // 2️⃣ Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // 3️⃣ Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Enter valid password!!" });
    }

    // 4️⃣ Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" } // Token expires in 1 day
    );

    // 5️⃣ Return the token and user details
    res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ error: "Server error, please try again later." });
  }
};
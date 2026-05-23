const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const router = express.Router()

// REGISTER USER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body

    // CHECK USER
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      })
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10)

    // CREATE USER
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    })

    await newUser.save()

    // GENERATE TOKEN
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.status(201).json({
      message: "User Registered Successfully",
      token,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
})

module.exports = router
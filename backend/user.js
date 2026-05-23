const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  bio: {
    type: String,
    default: "",
  },

  skillsOffered: {
    type: [String],
    default: [],
  },

  skillsWanted: {
    type: [String],
    default: [],
  },

  experienceLevel: {
    type: String,
    default: "Beginner",
  },
})

module.exports = mongoose.model("User", userSchema)
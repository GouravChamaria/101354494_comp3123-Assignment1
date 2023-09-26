const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    maxlength: 50,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

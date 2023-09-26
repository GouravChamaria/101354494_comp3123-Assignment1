const User = require("../models/User");
const config = require("../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// POST: Allow user to create a new account
const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: false, message: "Username or email already exists" });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    res
      .status(201)
      .json({ status: true, message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

// POST: Allow user to access the system
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid username or password" });
    }

    // Check if the provided password matches the stored hash
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid username or password" });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign({ _id: user._id }, config.secretKey);

    res.status(200).json({
      status: true,
      username: user.username,
      message: "User logged in successfully",
      jwt_token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

module.exports = {
  signup,
  login,
};

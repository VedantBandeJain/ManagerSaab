const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt=require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are Mandatory.");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already exists.");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  // console.log("hashed password is : ",hashedPassword);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.json({ id: user.id, email: user.email }); //as we dont want to show our hashed password to the user
  } else {
    res.status(400);
    throw new Error("User data is not valid.");
  }
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are Mandatory.");
  }
  const user = await User.findOne({ email });
  if (user && ( await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESSTOKEN_SECRET,
      {expiresIn:"1hr"},
    );
    res.status(200).json({ accessToken });
  }
  else{
      res.status(401);
      throw new Error("Invalid Credentials");
  }
});
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };

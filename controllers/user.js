import userModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// *****************LogIn*****************
export const getUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (!user)
      return res.status(404).json({ message: "Email does not exists" });
    const userPassword = await bcrypt.compare(password, user.password);
    if (!userPassword)
      return res.status(404).json({ message: "Wrong Password" });
    const payload = {
      id: user.id,
      name: user.name,
    };
    jwt.sign(payload, "ecom", { expiresIn: "7d" }, (err, token) => {
      if (err) return res.status(404).json({ message: err.message });
      res.status(201).json({ token: token });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// *****************Creating a User or SignUp*****************
export const createUser = async (req, res) => {
  let { name, email, password } = req.body;

  // Checking if every field has value
  if (name === "" || email === "" || password === "")
    return res.status(404).json({ message: "Please fill all the fields" });

  //  Checking if email is valid
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email))
    return res.status(404).json({ message: "Invalid Email" });

  // Checking for password length
  if (password.length < 5)
    return res.status(404).json({ message: "Your password is too short" });

  // Checking if user already exists
  let user = await userModel.findOne({ email: email });
  if (user) return res.status(404).json({ message: "User already exists" });

  //  Password encryption
  password = await bcrypt.hash(password, 8);
  try {
    //   Creating a new user
    user = await new userModel({
      name,
      email,
      password,
    });
    // Saving User to DB
    await user.save();

    // Creating a payload for generating token
    const payload = {
      id: user.id,
      name: user.name,
    };
    // Generating token
    jwt.sign(payload, "ecom", { expiresIn: "7d" }, (err, token) => {
      if (err) return res.status(404).json({ message: err.message });
      res.status(201).json({ token: token });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

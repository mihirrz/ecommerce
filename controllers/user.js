import userModel from "../models/user.js";
import bcrypt from "bcrypt";

export const getUser = (_, res) => res.json({ name: "user" });

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
    return res.status(404).json({ message: "Password is short" });

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
    res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

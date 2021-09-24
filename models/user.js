import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "customer",
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
});

const userModel = mongoose.model("user", userSchema);
export default userModel;

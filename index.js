import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.js";


const app = express();
const PORT = 3000;

app.use(express.json({ extended: true }));
app.use("/api/user", userRoutes);
app.use("/auth",authRoutes);
app.use("/api/product",productRoutes);

// Database Connection
const MONGO_URL =
  "mongodb+srv://mihir:mihir1204@ecommerce.fomzu.mongodb.net/ecommerce?retryWrites=true&w=majority";
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Database Connected");
  } catch (error) {
    console.error(error.message);
  }
};

connectDB();

// Listing To Server
app.listen(PORT, () => console.log(`Server Started At PORT ${PORT} `));

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNTFhM2JhODk3MTEwMWFjMDk0ZDI5NyIsIm5hbWUiOiJNaWhpciIsImlhdCI6MTYzMjc0MDI4MiwiZXhwIjoxNjMzMzQ1MDgyfQ.FhSdvDB9zx1wq33utNCY8c2lRtT3t0gNWrtT8SNlv_E

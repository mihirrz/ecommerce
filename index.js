import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js"

const app = express();
const PORT = 3000;

app.use(express.json({extended:true}))
app.use('/api/user',userRoutes);

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

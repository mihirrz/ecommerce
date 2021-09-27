import express from "express";
import { auth } from "../middleware/auth.js";
import userModel from "../models/user.js";

const router = express.Router();

router.get("/",auth, async(req,res)=>{
    const user = await userModel.findById(req.user.id).select("-password");
    return res.status(200).json(user);
})

export default router;
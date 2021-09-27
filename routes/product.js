import express from "express";
import {
  createProduct,
  getAllProducts,
  getSpecifiedCategoryProduct,
} from "../controllers/product.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createProduct);
router.get("/", getAllProducts);
router.get("/category/:category", getSpecifiedCategoryProduct);

export default router;

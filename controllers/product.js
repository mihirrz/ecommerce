import productModel from "../models/product.js";

export const getAllProducts = async (_, res) => {
  try {
    const allProducts = await productModel.find();
    return res.status(200).json({ products: allProducts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSpecifiedCategoryProduct = async (req, res) => {
  const params = req.params.category;
  const getProduct = await productModel.find({ category: params });
  return res.status(200).json({ products: getProduct });
};

export const createProduct = async (req, res) => {
  const { name, description, quantity, price, category } = req.body;
  try {
    const product = await new productModel({
      userid: req.user.id,
      name,
      description,
      quantity,
      price,
      category,
    });
    await product.save();
    res.status(201).json({ product });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

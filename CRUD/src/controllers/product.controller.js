import { Product } from '../models/product.model.js'; // আপনার মডেলের পাথ অনুযায়ী ঠিক করে নেবেন

const createProduct = async (req, res) => {
  try {
    const { name, price, description, quantity } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required!" });
    }

    const newProduct = await Product.create({
      name,
      price,
      description,
      quantity,
    });

    return res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      Error: "Failed to create product",
      error: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      Error: "Failed to fetch products",
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true, 
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      Error: "Failed to update product",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      Error: "Failed to delete product",
      error: error.message,
    });
  }
};

export {createProduct, getAllProducts, updateProduct, deleteProduct}
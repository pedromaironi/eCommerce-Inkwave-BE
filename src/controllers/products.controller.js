//! Configuration - Library
const sql = require("mssql");
const { config } = require("../config/dbconfig");

//* Models
const Products = require("../models/Products/products.model");

//* Get all Products
const getProducts = async () => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().execute("GetProductDetails");

    const products = result.recordsets[0];
    return products;
  } catch (error) {
    throw error;
  }
};

//* Find Products by ID
const getProductById = async (product_id) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("product_id", sql.Int, product_id)
      .execute("GetProductById");

    const product = result.recordsets[0][0];
    return product;
  } catch (error) {
    throw error;
  }
};

//* Find Products by category
const getProductsByCategory = async (category_id) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("category_id", sql.Int, category_id)
      .execute("GetProductsByCategory");

    const products = result.recordsets[0];
    return products;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getProductsByCategory,
  getProductById,
  getProducts,
};

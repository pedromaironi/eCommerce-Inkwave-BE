//! Configuration - Library
const sql = require("mssql");
const { config } = require("../config/dbconfig");

//* Models
const Category = require("../models/Category/category.model");

// Get all categories
const getCategories = async () => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().execute("GetCategories");
    return result.recordsets[0];
  } catch (error) {
    throw error;
  }
};

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
    res
      .status(500)
      .json({ error: "An error occurred while fetching products." });
  }
};

const getProductsByCategoryName = async (categoryName) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("categoryName", sql.NVarChar(100), categoryName)
      .execute("GetProductsByCategoryName");

    const products = result.recordsets[0];
    return products;
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching products." });
  }
};

module.exports = {
  getCategories,
  getProductsByCategory,
  getProductsByCategoryName,
};

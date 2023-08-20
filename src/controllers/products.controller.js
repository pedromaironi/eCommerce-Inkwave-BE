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

//* Get all Products By Client
const getProductsByClient = async (id) => {
  try {
    const pool = await sql.connect(config);

    const result = await pool
      .request()
      .input("id_cliente", sql.Int, id)
      .execute("GetProductDetailsByClient");

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

//* Find Products by ID and Client ID
const getProductByIdClient = async (product_id, client_id) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("product_id", sql.Int, product_id)
      .input("id_cliente", sql.Int, client_id)
      .execute("GetProductByIdAndClientId");

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

const addFavorite = async (userId, productId) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("id_cliente", sql.Int, userId)
      .input("id_producto", sql.Int, productId)
      .execute("AddFavProduct");

    if (result.rowsAffected[0] > 0) {
      return true; // Favorito agregado exitosamente
    } else {
      return false; // No se pudo agregar el favorito
    }
  } catch (error) {
    console.error("An error occurred while adding favorite:", error);
    throw error;
  }
};

const removeFavorite = async (userId, productId) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("id_cliente", sql.Int, userId)
      .input("id_producto", sql.Int, productId)
      .execute("DeleteFavProduct");

    if (result.rowsAffected[0] > 0) {
      return true; // Favorito agregado exitosamente
    } else {
      return false; // No se pudo agregar el favorito
    }
  } catch (error) {
    console.error("An error occurred while adding favorite:", error);
    throw error;
  }
};

const addClickProduct = async (userId, productId) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("id_cliente", sql.Int, userId)
      .input("id_producto", sql.Int, productId)
      .execute("AddClickProduct");

    if (result.rowsAffected[0] > 0) {
      return true; // Click registrado exitosamente
    } else {
      return false; // No se pudo registrar el click
    }
  } catch (error) {
    console.error("An error occurred while adding click:", error);
    throw error;
  }
};

const addCalification = async (userId, productId, rating) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("id_cliente", sql.Int, userId)
      .input("id_producto", sql.Int, productId)
      .input("calificacion", sql.Float, rating)
      .execute("AddCalification");

    if (result.rowsAffected[0] > 0) {
      return true; // Calificación agregada exitosamente
    } else {
      return false; // No se pudo agregar la calificación
    }
  } catch (error) {
    console.error("An error occurred while adding calification:", error);
    throw error;
  }
};

const updateCalification = async (userId, productId, rating) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("id_cliente", sql.Int, userId)
      .input("id_producto", sql.Int, productId)
      .input("nueva_calificacion", sql.Int, rating)
      .execute("UpdateCalification");

    if (result.rowsAffected[0] > 0) {
      return true; // Calificación actualizada exitosamente
    } else {
      return false; // No se pudo actualizar la calificación
    }
  } catch (error) {
    console.error("An error occurred while updating calification:", error);
    throw error;
  }
};

const searchProduct = async (search, userId) => {
  try {
    const pool = await sql.connect(config);
    const request = pool.request();
    request.input("id_cliente", sql.Int, userId);
    request.input("busqueda", sql.VarChar, search);

    const result = await request.execute("SearchProducts");

    const products = result.recordsets[0]; // Obtener el conjunto de registros resultante

    if (products.length > 0) {
      return products; // Devolver el resultado de la búsqueda
    } else {
      return null; // No se encontraron productos
    }
  } catch (error) {
    console.error("An error occurred while updating calification:", error);
    throw error;
  }
};

module.exports = {
  getProductsByCategory,
  getProductById,
  getProducts,
  addFavorite,
  removeFavorite,
  addClickProduct,
  updateCalification,
  addCalification,
  getProductsByClient,
  getProductByIdClient,
  searchProduct,
};

//! Configuration - Library
const sql = require("mssql");
const { config } = require("../config/dbconfig");

//* Models
const Products = require("../models/prenda/prenda.model");

//* Get all Products
const getProducts = async () => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().execute("getProducts");

    const prendas = result.recordset.map((prendaData) => {
      return new Prenda(
        prendaData.id,
        prendaData.nombre,
        prendaData.descripcion,
        prendaData.precio,
        prendaData.imagen,
        prendaData.id_categoria
      );
    });

    return prendas;
  } catch (error) {
    throw error;
  }
};

//* Find Prendas by ID
const findPrendaById = async (id) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .execute("findPrendaById");

    if (result.recordset.length > 0) {
      const prendaData = result.recordset[0];
      const prenda = new Prenda(
        prendaData.id,
        prendaData.nombre,
        prendaData.descripcion,
        prendaData.precio,
        prendaData.imagen,
        prendaData.id_categoria
      );
      return prenda;
    }

    return null; // Prenda not found with the given ID
  } catch (error) {
    throw error;
  }
};

//* Find Prendas by category
const findPrendasByCategory = async (categoryId) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("categoryId", sql.Int, categoryId)
      .execute("findPrendasByCategory");

    const prendas = result.recordset.map((prendaData) => {
      return new Prenda(
        prendaData.id,
        prendaData.nombre,
        prendaData.descripcion,
        prendaData.precio,
        prendaData.imagen,
        prendaData.id_categoria
      );
    });

    return prendas;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findPrendaById,
  findPrendasByCategory,
  getProducts,
};

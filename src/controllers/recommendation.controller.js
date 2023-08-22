//! Configuration - Library
const sql = require("mssql");
const { config } = require("../config/dbconfig");

const fetchRecommendedProducts = async (id_usuario, productIds) => {
  try {
    const pool = await sql.connect(config);

    const recommendedProducts = [];
    for (const id_producto of productIds) {
      const result = await pool
        .request()
        .input("id_cliente", sql.Int, id_usuario)
        .input("id_producto", sql.Int, id_producto)
        .execute("GetProductContentBased");

      if (result.recordsets.length > 0 && result.recordsets[0].length > 0) {
        const productDetails = result.recordsets[0][0];
        recommendedProducts.push(productDetails);
      }
    }

    return recommendedProducts;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  fetchRecommendedProducts: fetchRecommendedProducts,
};

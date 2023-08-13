const sql = require("mssql");
const { config } = require("../config/dbconfig");

// Insertar una nueva orden con detalles
const createOrder = async (orderData, orderDetails) => {
  try {
    const pool = await sql.connect(config);
    const transaction = pool.transaction();

    // Iniciar la transacción
    await transaction.begin();

    try {
      // Insertar la orden en la tabla "Orden"
      const { recordset: insertedOrder } = await transaction
        .request()
        .input("id_cliente", sql.Int, orderData.userID)
        .input("fecha", sql.Date, orderData.date)
        .input("total", sql.Decimal(18, 2), orderData.total)
        .input("estado", sql.NVarChar(100), orderData.status)
        .input("subtotal", sql.Decimal(18, 2), orderData.subTotal)
        .input("taxes", sql.Decimal(18, 2), orderData.taxes)
        .input("pago_envio", sql.Decimal(18, 2), orderData.shippingPrice)
        .execute("InsertOrder");

      // Insertar los detalles de la orden en la tabla "OrdenDetalle"
      for (const detail of orderDetails) {
        await transaction
          .request()
          .input("id_orden", sql.Int, insertedOrder[0].id_orden)
          .input("id_producto", sql.Int, detail.product)
          .input("cantidad", sql.Int, detail.qty)
          .input("precio_unitario", sql.Decimal(18, 2), detail.price)
          .execute("InsertOrderDetail");
      }

      // Commit de la transacción
      await transaction.commit();
      return insertedOrder[0].id_orden;
    } catch (error) {
      // Rollback de la transacción en caso de error
      await transaction.rollback();
      console.error("An error occurred while inserting the order:", error);
      throw error;
    }
  } catch (error) {
    console.error("An error occurred while connecting to the database:", error);
    throw error;
  }
};

// Obtener todas las órdenes de un cliente por su ID
const getOrdersByClient = async (clientId) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("id_cliente", sql.Int, clientId)
      .execute("GetOrdersWithDetailsByClientId");

    return result.recordsets[0];
  } catch (error) {
    console.error("An error occurred while fetching orders:", error);
    throw error;
  }
};

// Obtener los detalles de una orden por su ID
const getOrderDetails = async (orderId) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("id_orden", sql.Int, orderId)
      .execute("GetOrderDetails");

    return result.recordsets[0];
  } catch (error) {
    console.error("An error occurred while fetching order details:", error);
    throw error;
  }
};

module.exports = {
  createOrder,
  getOrdersByClient,
  getOrderDetails,
};

const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

// Ruta para crear una nueva orden con detalles
router.post("/create", async (req, res) => {
  try {
    const {
      userID,
      date,
      total,
      status,
      subTotal,
      taxPrice,
      shippingPrice,
      orderItems: orderDetails,
    } = req.body;
    const orderData = {
      userID: userID,
      date: date,
      total: total,
      status: status,
      subTotal: subTotal,
      taxes: taxPrice,
      shippingPrice: shippingPrice,
    };
    const orderId = await orderController.createOrder(orderData, orderDetails);
    res.json({ orderId });
  } catch (error) {
    console.error("An error occurred while creating the order:", error);
    res.status(500).json({ error: "Unable to create the order" });
  }
});

// Ruta para obtener todas las órdenes de un cliente por su ID
router.get("/client/:clientId", async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const orders = await orderController.getOrdersByClient(clientId);
    res.json(orders);
  } catch (error) {
    console.error("An error occurred while fetching orders:", error);
    res.status(500).json({ error: "Unable to fetch orders" });
  }
});

// Ruta para obtener los detalles de una orden por su ID
router.get("/details/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const orderDetails = await orderController.getOrderDetails(orderId);
    res.json(orderDetails);
  } catch (error) {
    console.error("An error occurred while fetching order details:", error);
    res.status(500).json({ error: "Unable to fetch order details" });
  }
});

module.exports = router;

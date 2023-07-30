const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.controller");

// Retrieve all products
router.route("/").get((req, res) => {
  productsController.getProducts().then((data) => {
    res.send(data);
  });
});

module.exports = router;

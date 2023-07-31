const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.controller");

// Retrieve all products
router.route("/").get((req, res) => {
  productsController.getProducts().then((data) => {
    res.send(data);
  });
});

// Retrieve a specific product by ID
router.route("/:id").get((req, res) => {
  const productId = parseInt(req.params.id); // Convert the ID to an integer
  productsController.getProductById(productId).then((data) => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send("Product not found");
    }
  });
});

// Retrieve all products by category
router.route("/category/:categoryId").get((req, res) => {
  const categoryId = parseInt(req.params.categoryId);
  productsController.getProductsByCategory(categoryId).then((data) => {
    res.send(data);
  });
});

module.exports = router;

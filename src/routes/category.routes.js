const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");

// Retrieve all categories
router.route("/").get((req, res) => {
  categoryController.getCategories().then((data) => {
    res.send(data);
  });
});

// Retrieve all products by category
router.route("/:categoryId").get((req, res) => {
  const categoryId = parseInt(req.params.categoryId);
  categoryController.getProductsByCategory(categoryId).then((data) => {
    if (data) {
      res.send(data);
    } else {
      res.send("Category not found");
    }
  });
});

// Retrieve all products by category name
router.route("/categoryName/:name").get((req, res) => {
  const categoryName = req.params.name;
  categoryController
    .getProductsByCategoryName(categoryName)
    .then((data) => {
      if (data.length > 0) {
        res.json(data);
      } else {
        res.send("Category not found");
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "An error occurred while fetching products." });
    });
});

module.exports = router;

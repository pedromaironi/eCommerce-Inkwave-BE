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
  
module.exports = router;
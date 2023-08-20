const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.controller");

// Retrieve all products
router.route("/").get((req, res) => {
  productsController.getProducts().then((data) => {
    res.send(data);
  });
});

// Retrieve all products by cliente
router.route("/client/:clientID").get((req, res) => {
  productsController
    .getProductsByClient(parseInt(req.params.clientID))
    .then((data) => {
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

// Retrieve a specific product by ID and client ID
router.route("/:id/:clientId").get((req, res) => {
  const productId = parseInt(req.params.id); // Convert the ID to an integer
  const clientId = parseInt(req.params.clientId); // Convert the ID to an integer
  productsController.getProductByIdClient(productId, clientId).then((data) => {
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
    if (data) {
      res.send(data);
    } else {
      res.send("Category not found");
    }
  });
});

// Agregar producto a favoritos
router.route("/favorite/:userId/:productId").post(async (req, res) => {
  const userId = parseInt(req.params.userId);
  const productId = parseInt(req.params.productId);
  try {
    const added = await productsController.addFavorite(userId, productId);
    if (added) {
      res.json({ message: "Producto agregado a favoritos exitosamente." });
    } else {
      res
        .status(500)
        .json({ error: "No se pudo agregar el producto a favoritos." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al agregar producto a favoritos." });
  }
});

// Eliminar producto de favoritos
router.route("/favorite/:userId/:productId").delete(async (req, res) => {
  const userId = parseInt(req.params.userId);
  const productId = parseInt(req.params.productId);
  try {
    const removed = await productsController.removeFavorite(userId, productId);
    if (removed) {
      res.json({ message: "Producto eliminado de favoritos exitosamente." });
    } else {
      res
        .status(500)
        .json({ error: "No se pudo eliminar el producto de favoritos." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar producto de favoritos." });
  }
});

// Registrar click en producto
router.route("/click/:userId/:productId").post(async (req, res) => {
  const userId = parseInt(req.params.userId);
  const productId = parseInt(req.params.productId);
  try {
    const clicked = await productsController.addClickProduct(userId, productId);
    if (clicked) {
      res.json({ message: "Click registrado exitosamente." });
    } else {
      res.status(500).json({ error: "No se pudo registrar el click." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al registrar click." });
  }
});

// Agregar calificación a producto
router.route("/rating/:userId/:productId/:rating").post(async (req, res) => {
  const userId = parseInt(req.params.userId);
  const productId = parseInt(req.params.productId);
  const rating = parseFloat(req.params.rating);

  try {
    const added = await productsController.addCalification(
      userId,
      productId,
      rating
    );
    if (added) {
      res.json({ message: "Calificación agregada exitosamente." });
    } else {
      res.status(500).json({ error: "No se pudo agregar la calificación." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al agregar calificación." });
  }
});

// Actualizar calificación de producto
router
  .route("/calification/update/:userId/:productId/:newRating")
  .put(async (req, res) => {
    const userId = parseInt(req.params.userId);
    const productId = parseInt(req.params.productId);
    const newRating = parseInt(req.params.newRating);

    try {
      const updated = await productsController.updateCalification(
        userId,
        productId,
        newRating
      );
      if (updated) {
        res.json({ message: "Calificación actualizada exitosamente." });
      } else {
        res
          .status(500)
          .json({ error: "No se pudo actualizar la calificación." });
      }
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar calificación." });
    }
  });

router.route("/search/:userId/:searchTerm").get(async (req, res) => {
  const userId = parseInt(req.params.userId);
  const searchTerm = req.params.searchTerm;

  try {
    const products = await productsController.searchProduct(userId, searchTerm);

    if (products !== null) {
      res.json(products);
    } else {
      res.json({ message: "No se encontraron productos." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al buscar productos." });
  }
});

module.exports = router;

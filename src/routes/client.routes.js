// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const pool = require("../db");

// Client controller
const clientController = require("../controllers/client.controller");

// Client Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  clientController
    .loginClient(email, password)
    .then((client) => {
      if (client) {
        // Successful login, return client data or token
        res.json(client);
      } else {
        // Incorrect email or password
        res.status(401).json({ error: "Invalid credentials" });
      }
    })
    .catch((error) => {
      // Handle other errors
      res.status(500).json({ error: "An error occurred while logging in" });
    });
});

// Client Registration
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  clientController
    .registerClient(name, email, password)
    .then((client) => {
      if (client) {
        // Successful registration, return client data or token
        res.json(client);
      } else {
        // Registration failed
        res.status(500).json({ error: "Failed to register client" });
      }
    })
    .catch((error) => {
      // Handle other errors
      res.status(500).json({ error: "An error occurred while registering" });
    });
});

module.exports = router;

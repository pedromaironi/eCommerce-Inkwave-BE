// routes/authRoutes.js
const express = require("express");
const router = express.Router();

// Client controller
const clientController = require("../controllers/client.controller");

// Client Login
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
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
  const { name, email, password, date } = req.body;
  clientController
    .registerClient(name, email, password, date)
    .then((success) => {
      if (success) {
        // Successful registration
        res.status(201).json({ message: "Client registered successfully." });
      } else {
        // Unable to register client
        res.status(500).json({ error: "Failed to register client" });
      }
    })
    .catch((error) => {
      // Handle other errors
      console.error("An error occurred while registering the client:", error);
      res.status(500).json({ error: "An error occurred while registering" });
    });
});

router.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const customerDetails = await clientController.getCustomerDetails(id);
    res.status(200).json(customerDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

// routes/authRoutes.js

const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verificar si el correo electrónico ya está registrado
    const existingUser = await pool.query(
      "SELECT * FROM cliente WHERE correo = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "El correo electrónico ya está registrado" });
    }

    // Insertar el nuevo cliente en la base de datos
    const newUser = await pool.query(
      "INSERT INTO cliente (nombre, correo, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, password]
    );

    res.json(newUser.rows[0]);
  } catch (error) {
    console.error("Error en el registro:", error.message);
    res.status(500).json({ message: "Error en el registro" });
  }
});

module.exports = router;

//! Configuration - Library
const sql = require("mssql");
const { config } = require("../config/dbconfig");

// Register a new client
const registerClient = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("name", sql.NVarChar(100), name)
      .input("email", sql.NVarChar(100), email)
      .input("password", sql.NVarChar(100), password)
      .execute("RegisterClient");

    if (result.rowsAffected[0] > 0) {
      res.status(201).json({ message: "Client registered successfully." });
    } else {
      res.status(500).json({ error: "Unable to register client." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while registering the client." });
  }
};

// Login a client
const loginClient = async (email, password) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("correo_electronico", sql.NVarChar(100), email)
      .input("password", sql.NVarChar(100), password)
      .execute("LoginClient");

    if (result.recordsets[0].length > 0) {
      const client = result.recordsets[0][0];
      return client;
    } else {
      res.status(401).json({ error: "Invalid credentials." });
    }
  } catch (error) {
    console.error("An error occurred while logging in the client:", error);
    res
      .status(500)
      .json({ error: "An error occurred while logging in the client." });
  }
};

module.exports = {
  registerClient,
  loginClient,
};

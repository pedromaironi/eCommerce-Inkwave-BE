//! Configuration - Library
const sql = require("mssql");
const { config } = require("../config/dbconfig");

// Register a new client
const registerClient = async (name, email, password, date) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("nombre", sql.NVarChar(100), name)
      .input("correo_electronico", sql.NVarChar(100), email)
      .input("Password", sql.NVarChar(100), password)
      .input("fecha_registro", sql.Date, new Date(date))
      .execute("RegisterClient");

    if (result.rowsAffected[0] > 0) {
      return true; // Client registered successfully
    } else {
      return false; // Unable to register client
    }
  } catch (error) {
    console.error("An error occurred while registering the client:", error);
    throw error;
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

const getCustomerDetails = async (id) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("customerID", sql.Int, id)
      .execute("getCustomerDetails");
    if (result.recordsets[0].length > 0) {
      const client = result.recordsets[0][0];
      return client;
    } else {
      throw new Error("Invalid user.");
    }
  } catch (error) {
    throw new Error("An error occurred while getting the client.");
  }
};

module.exports = {
  registerClient,
  loginClient,
  getCustomerDetails,
};

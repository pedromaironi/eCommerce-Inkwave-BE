const env = process.env.NODE_ENV;
const sql = require("mssql");

const config = {
  user: "pedro",
  password: "Juandejesus2930",
  server: "inkwave",
  database: "ecommerce",
  trustServerCertificate: true,
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Connected to Inkwave");
    return pool;
  })
  .catch((err) => console.log("Database Connection Failed! Bad Config: ", err));

module.exports = {
  config,
  poolPromise,
};

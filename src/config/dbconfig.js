const env = process.env.NODE_ENV;
const sql = require("mssql");

const config = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  server: process.env.HOST,
  database: process.env.DATABASE,
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

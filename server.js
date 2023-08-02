require("dotenv").config();
const PORT = process.env.PORT_API || 8080;
const { config, poolPromise } = require("./src/config/dbconfig");
const { logger } = require("./src/middleware/logEvents");
const errorHandler = require("./src/middleware/errorHandler");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const corsOptions = require("./src/config/corsOptions");
const app = express();
const router = express.Router();

// custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// built-in middleware to handle urlencoded form data
//false
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api/v1/", router);
app.use("/api/v1/products", require("./src/routes/products.routes"));
app.use("/api/v1/category", require("./src/routes/category.routes"));
app.use("/api/v1/auth", require("./src/routes/client.routes"));

//Middleware
app.use((req, response, next) => {
  // console.log("next");
  next();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to inkwave api." });
});

app.use(errorHandler);

// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

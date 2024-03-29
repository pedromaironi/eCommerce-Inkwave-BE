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

// Parse JSON and url-encoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Custom request logging middleware
const requestLogger = (req, res, next) => {
  console.log("-------------------------------");
  console.log("New Request:");
  console.log("Method:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("Headers:", req.headers);
  console.log("Query Parameters:", req.query);
  console.log("Request Body:", req.body);
  console.log("-------------------------------");
  next();
};

app.use(requestLogger);

//Routes
app.use("/api/v1/", router);
app.use("/api/v1/products", require("./src/routes/products.routes"));
app.use("/api/v1/category", require("./src/routes/category.routes"));
app.use("/api/v1/auth/login", require("./src/routes/client.routes"));
app.use("/api/v1/order", require("./src/routes/order.routes"));
app.use(
  "/api/v1/recommendation",
  require("./src/routes/recommendation.routes")
);

//Middleware
app.use((req, response, next) => {
  // console.log("next");
  next();
});

// simple route
app.get("/", (req, res) => {
  console.log(req.body);
  res.json({ message: "Welcome to inkwave api." });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

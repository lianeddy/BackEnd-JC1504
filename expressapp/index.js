// Express
// Node JS framework

// Cors
// FE (client) bisa akses API

// Body Parser
// req.body
// Membawa data lebih aman dari client

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 2000;
const { productRouter, userRouter } = require("./router");

const app = express();
app.use(cors()); // Client Permission
app.use(bodyParser()); // Use Request Body

app.get("/", (req, res) => {
  res.status(200).send("<h1>Express App</h1>");
});

// Endpoints
app.use("/products", productRouter);
app.use("/users", userRouter);

app.listen(port, () => console.log(`API active at port ${port}`));

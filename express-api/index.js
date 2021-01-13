const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const port = 2000;
const { productRouter } = require("./router");

const app = express();

app.use(cors());
app.use(bodyParser());

app.get("/", (req, res) => {
  res.status(200).send("<h1>Express API</h1>");
});

app.use("/products", productRouter);

app.listen(port, () => console.log(`API active at port ${port}`));

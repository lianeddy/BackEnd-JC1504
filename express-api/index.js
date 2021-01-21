const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const bearerToken = require("express-bearer-token");
const port = 2000;
const {
  cartRouter,
  imageRouter,
  productRouter,
  userRouter,
} = require("./router");

const app = express();

app.use(bearerToken());
app.use(bodyParser());
app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.status(200).send("<h1>Express API</h1>");
});

app.use("/cart", cartRouter);
app.use("/image", imageRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);

app.listen(port, () => console.log(`API active at port ${port}`));

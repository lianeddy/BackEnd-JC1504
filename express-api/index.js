const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const cors = require("cors");
const bodyParser = require("body-parser");
const bearerToken = require("express-bearer-token");
const port = 2000;

const { transporter } = require("./helper");
const {
  cartRouter,
  imageRouter,
  productRouter,
  mongoRouter,
  socketRouter,
  userRouter,
} = require("./router");
const { query } = require("./database");

app.use(bearerToken());
app.use(bodyParser());
app.use(cors());
app.use(express.static("public"));

let userCount = 0;
app.io = io;
app.userCount = userCount;
// npm i socket.io@2.3.0
io.on("connection", (socket) => {
  userCount += 1;
  console.log("User Connected", userCount);
  io.emit("JumlahUser", userCount);

  socket.on("disconnect", (data) => {
    userCount--;
    console.log("User Disconnected, Remaining: ", userCount);
    io.emit("JumlahUser", userCount);
  });
});
// Namespace
// const admin = io.of("/admin");
// app.adminNamespace = admin;
// admin.on("connection", (socket) => {
//   console.log("connected admin");
// });

// const user = io.of("/user");
// app.userNamespace = user;
// user.on("connection", (socket) => {
//   console.log("connected user");
// });

app.get("/", (req, res) => {
  res.status(200).send("<h1>Express API</h1>");
});

app.get("/chat", async (req, res) => {
  const response = await query(`SELECT * FROM chat`);
  res.send(response);
});

app.use("/cart", cartRouter);
app.use("/image", imageRouter);
app.use("/mongo", mongoRouter);
app.use("/products", productRouter);
app.use("/socket", socketRouter);
app.use("/users", userRouter);

server.listen(port, () => console.log(`API active at port ${port}`));

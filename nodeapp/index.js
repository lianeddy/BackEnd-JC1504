// Simple HTTP API
// Request === data yang diterima dari client (FE)
// Response === data yang di kirim kembali

const http = require("http");
const fs = require("fs");
const querystring = require("querystring");
const url = require("url");

const users = [
  {
    username: "lianeddy",
    password: "asd123",
  },
  {
    username: "bambang",
    passowrd: "dsa321",
  },
];

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    }); // Header
    res.end("<h1>HTTP API</h1>");
  } else if (req.url === "/products") {
    const data = fs.readFileSync("./json/products.json");
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(data);
  } else if (req.url === "/users" && req.method === "GET") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify(users));
  } else if (
    url.parse(req.url).pathname === "/users" &&
    req.method === "POST"
  ) {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    users.push(
      querystring.parse(url.parse(`http://localhost:2000${req.url}`).query)
    );
    res.end(JSON.stringify(users));
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
    });
    res.end("Not found");
  }
});

server.listen(2000, () => console.log(`API active at port ${2000}`));

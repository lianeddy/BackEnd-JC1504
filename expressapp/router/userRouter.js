let users = [
  {
    id: 1,
    username: "lianeddy",
    password: "asd123",
  },
  {
    id: 2,
    username: "bambang",
    password: "123asd",
  },
  {
    id: 3,
    username: "joko",
    password: "asd",
  },
];
const express = require("express");
const router = express.Router();

// Transactions
// HTTP API
// if(req.url === '/' && req.method === 'GET'){}
// if(req.url === '/' && req.method === 'POST'){}

// Request Object === Data from the client
// Params === Compulsary (route/:params)
// Query === Optional (route?query=value&query=value)
// Body === Adding new Data (Second parameter of POST in Axios)

// Express
router.get("/", (req, res) => {
  if (req.query.username) {
    const contain = users.filter((val) =>
      val.username.includes(req.query.username)
    );
    res.status(200).send(contain);
  } else {
    res.status(200).send(users);
  }
});

router.get("/:id", (req, res) => {
  const getUser = users.find((val) => val.id === parseInt(req.params.id));
  if (getUser) {
    res.status(200).send(getUser);
  } else {
    res.status(500).send({ status: "Error", message: "User not found" });
  }
});

router.post("/", (req, res) => {
  users.push(req.body);
  const reg = users.find((val) => val.id === req.body.id);
  res.status(201).send(reg);
});

router.patch("/:id", (req, res) => {
  let findUser = users.find((val) => val.id === parseInt(req.params.id));
  findUser.password = req.body.password;
  res.status(200).send(users);
});

router.delete("/:id", (req, res) => {
  users = users.filter((val) => val.id !== parseInt(req.params.id));
  res.status(200).send(users);
});

module.exports = router;

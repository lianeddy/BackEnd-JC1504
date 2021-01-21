const express = require("express");
const db = require("../database");
const router = express.Router();
const { checkToken, createJWTToken } = require("../helper");

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  let sql = `
    SELECT 
        id, 
        username, 
        email, 
        alamat, 
        roleID, 
        verified 
    FROM users WHERE username = '${username}' AND password = '${password}'`;
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }
    const responseData = { ...data[0] };
    const token = createJWTToken(responseData);
    responseData.token = token;
    return res.status(200).send(responseData);
  });
});

router.post("/keep-login", checkToken, (req, res) => {
  let sql = `
    SELECT 
        id, 
        username, 
        email, 
        alamat, 
        roleID, 
        verified 
    FROM users WHERE id = ${req.user.id}`;
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).send(data[0]);
  });
});

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsInVzZXJuYW1lIjoiam9rbzEyMyIsImVtYWlsIjoiam9rb0BtYWlsLm9jbSIsInBhc3N3b3JkIjoiYXNkIiwiYWxhbWF0IjoiQmFuZHVuZyIsInJvbGVJRCI6MiwidmVyaWZpZWQiOjAsImlhdCI6MTYxMTE5ODU0NCwiZXhwIjoxNjExMjg0OTQ0fQ.TkIcfGDPF-ZvI-aI8eY644Zqet5n1-7FauKYbhjQuqM

module.exports = router;

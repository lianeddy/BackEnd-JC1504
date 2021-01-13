const express = require("express");
const router = express.Router();
const db = require("../database");

// Get ALL
router.get("/", (req, res) => {
  let sql = `SELECT * FROM products`;
  if (req.query.hargamin && req.query.hargamax) {
    sql += ` WHERE harga > ${parseInt(
      req.query.hargamin
    )} AND harga < ${parseInt(req.query.hargamax)}`;
  } else if (req.query.hargamin) {
    sql += ` WHERE harga > ${parseInt(req.query.hargamin)}`;
  } else if (req.query.hargamax) {
    sql += ` WHERE harga < ${parseInt(req.query.hargamax)}`;
  }
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    return res.status(200).send(data);
  });
});
// Get per ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  db.query(`SELECT * FROM products WHERE id = ${id}`, (err, data) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    if (data.length === 0) {
      res.status(404).send("Data not found");
    }
    return res.status(200).send(data[0]);
  });
});

// Insert
router.post("/", (req, res) => {
  const { nama, harga, caption } = req.body;
  //   let sql = `INSERT INTO products (nama, harga, caption, stock) VALUES ('${nama}', ${harga}, '${caption}', 20)`;
  let sql = `INSERT INTO products set ?`;
  db.query(sql, req.body, (err, data) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    return res.status(201).send({ message: "Data Created", status: "Created" });
  });
});

// Update
router.patch("/:id", (req, res) => {
  let sql = `UPDATE products SET caption = '${req.body.caption}' WHERE id = ${req.params.id}`;
  db.query(sql, (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    return res.status(200).send({ message: "Data Edited", status: "Edited" });
  });
});

// Delete
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  db.query(`DELETE FROM products WHERE id = ${id}`, (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    return res.status(200).send({ message: "Data Deleted", status: "Deleted" });
  });
});

module.exports = router;

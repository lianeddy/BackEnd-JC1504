const express = require("express");
const router = express.Router();
const db = require("../database");
const _ = require("lodash");

// Get ALL
router.get("/", (req, res) => {
  // let sql = `SELECT * FROM products WHERE isAvailable = 1 AND harga BETWEEN 10000 and 50000
  let sql = `SELECT * FROM products`;
  if (!_.isEmpty(req.query)) {
    sql += ` WHERE`;
  }
  if (req.query.isAvailable) {
    sql += ` isAvailable = 1 ${Object.keys(req.query).length > 1 ? "AND" : ""}`;
  }
  if (req.query.hargamin) {
    sql += ` harga > ${req.query.hargamin} ${
      Object.keys(req.query).length > 1 ? "AND" : ""
    }`;
  }
  if (req.query.hargamax) {
    sql += ` harga < ${req.query.hargamax}`;
  }

  // if (req.query.hargamin && req.query.hargamax) {
  //   sql += ` WHERE harga > ${parseInt(
  //     req.query.hargamin
  //   )} AND harga < ${parseInt(req.query.hargamax)}`;
  // } else if (req.query.hargamin) {
  //   sql += ` WHERE harga > ${parseInt(req.query.hargamin)}`;
  // } else if (req.query.hargamax) {
  //   sql += ` WHERE harga < ${parseInt(req.query.hargamax)}`;
  // }
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
  const { nama, harga, caption, stock } = req.body;
  let sql = `INSERT INTO products (nama, harga, caption, stock, isAvailable) VALUES ('${nama}', ${harga}, '${caption}', '${stock}', 1)`;
  // let sql = `INSERT INTO products set ?`;
  db.query(sql, req.body, (err, data) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    return res.status(201).send({ message: "Data Created", status: "Created" });
  });
});

// Update
router.patch("/:id", (req, res) => {
  const { nama, caption, harga, stock } = req.body;
  let sql = `UPDATE products SET nama = '${nama}', harga = ${harga}, stock = ${stock},  caption = '${caption}' WHERE id = ${req.params.id}`;
  db.query(sql, (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    return res.status(200).send({ message: "Data Edited", status: "Edited" });
  });
});

// "Delete" Data (isAvailable = 0)
router.put("/:id", (req, res) => {
  const sql = `UPDATE products SET isAvailable = 0 WHERE id = ${req.params.id}`;
  db.query(sql, (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    return res.status(200).send({
      status: "Edited",
      message: `Set Unavailable Product ID = ${req.params.id}`,
    });
  });
});

// Delete Data
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

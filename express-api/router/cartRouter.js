const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/:id", (req, res) => {
  const sql = `
        SELECT 
            c.id,
            p.nama,
            c.quantity,
            (c.quantity * p.harga) as total
        FROM cart c 
        JOIN products p ON c.productID = p.id
        WHERE c.userID = ${parseInt(req.params.id)}`;
  db.query(sql, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

router.post("/", (req, res) => {
  db.query(`INSERT INTO cart SET ?`, req.body, (err) => {
    if (err) return res.status(500).send(err);
    return res.status(201).send({
      status: "Created",
      message: "Data Created",
    });
  });
});

router.patch("/:id", (req, res) => {
  db.query(
    `UPDATE cart SET quantity = ${req.body.quantity} WHERE id = ${req.params.id}`,
    (err) => {
      if (err) return res.status(500).send(err);
      return res.status(201).send({
        status: "Edited",
        message: "Data Edited",
      });
    }
  );
});

router.delete("/:id", (req, res) => {
  db.query(`DELETE FROM cart WHERE id = ${req.params.id}`, (err) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send({
      status: "Deleted",
      message: "Data Deleted",
    });
  });
});

module.exports = router;

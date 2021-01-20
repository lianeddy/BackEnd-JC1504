const express = require("express");
const router = express.Router();
const db = require("../database");
const fs = require("fs");
const _ = require("lodash");
const { uploader } = require("../helper");

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
  try {
    const path = "/products";
    const upload = uploader(path, "PRD").fields([{ name: "image" }]);
    upload(req, res, (err) => {
      const { image } = req.files;

      // Karena front end mengirim object tapi dalam bentuk string panjang (stringify)
      // Menggunakan parse akan mengubah string tersebut menjadi object js
      // Karena sudah di parse menjadi object js, dapat di destructure (67)
      const { nama, harga, caption, stock } = JSON.parse(req.body.data);

      // tentukan alamat foto di api yang akan disimpan di sql
      const imagePath = image ? `${path}/${image[0].filename}` : null;

      // data produk serta alamat foto disimpan di sql
      let sql = `INSERT INTO products (nama, harga, caption, stock, isAvailable, imagepath) VALUES ('${nama}', ${harga}, '${caption}', '${stock}', 1, '${imagePath}')`;
      db.query(sql, (err, data) => {
        if (err) {
          // Jika sql error akan menghapus foto yang telah di upload
          fs.unlinkSync(`public${imagePath}`);
          return res.status(500).send(err.message);
        }
        // Jika semua proses berjalan dengan lancar return (81)
        return res
          .status(201)
          .send({ message: "Data Created", status: "Created" });
      });
    });
  } catch (err) {
    console.log(err);
  }
});

// Update
router.patch("/:id", (req, res) => {
  db.query(
    `SELECT * FROM products WHERE id = ${req.params.id}`,
    (err, data) => {
      const oldImagePath = data[0].imagepath;
      const idProduct = data[0].id;

      console.log(oldImagePath);
      try {
        const path = "/products";
        const upload = uploader(path, "PRD").fields([{ name: "image" }]);

        upload(req, res, (err) => {
          const { image } = req.files;
          const { nama, harga, caption, stock } = JSON.parse(req.body.data);
          const imagePath = image
            ? `${path}/${image[0].filename}`
            : oldImagePath;
          let sql = `UPDATE products SET nama = '${nama}', harga = ${harga}, caption = '${caption}', stock = ${stock}, imagepath = '${imagePath}' WHERE id = ${idProduct}`;

          // let sql = `UPDATE products set imagepath = '${imagePath}' WHERE id = ${idProduct}`;

          db.query(sql, (err) => {
            if (err) {
              fs.unlinkSync(`public${imagePath}`);
              res.status(500).send(err);
            }

            if (image && oldImagePath !== null) {
              fs.unlinkSync(`public${oldImagePath}`);
            }

            return res.status(200).send({
              message: "Data Edited",
              status: "Edited",
            });
          });
        });
      } catch (err) {
        console.log(err);
      }
    }
  );

  // const { nama, caption, harga, stock } = req.body;
  // let sql = `UPDATE products SET nama = '${nama}', harga = ${harga}, stock = ${stock},  caption = '${caption}' WHERE id = ${req.params.id}`;
  // db.query(sql, (err) => {
  //   if (err) {
  //     return res.status(500).send(err.message);
  //   }
  //   return res.status(200).send({ message: "Data Edited", status: "Edited" });
  // });
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
  // Ambil alamat foto dari sql yang disimpan di API
  db.query(`SELECT * FROM products WHERE id = ${id}`, (err, data) => {
    if (err) {
      res.status(500).send(err);
    }
    // dapat alamat foto di api
    const oldImagePath = data[0].imagepath;
    const idProduct = data[0].id;
    // delete data di sql
    db.query(`DELETE FROM products WHERE id = ${idProduct}`, (err) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      // delete file di API
      fs.unlinkSync(`public${oldImagePath}`);
      return res
        .status(200)
        .send({ message: "Data Deleted", status: "Deleted" });
    });
  });
});

module.exports = router;

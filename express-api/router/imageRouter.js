const express = require("express");
const router = express.Router();
const { db } = require("../database");
const { uploader } = require("../helper");
const fs = require("fs");
const path = "/images";

router.post("/", (req, res) => {
  try {
    // function upload file
    const upload = uploader(path, "IMG").fields([{ name: "image" }]);
    upload(req, res, (err) => {
      const { image } = req.files;
      const imagePath = image ? `${path}/${image[0].filename}` : null;
      // save alamat file di dalam sql
      db.query(
        `INSERT INTO images (imagepath) VALUES ('${imagePath}')`,
        (err) => {
          if (err) {
            return res.status(500).send(err);
          }
          return res
            .status(200)
            .send({ message: "Image Posted", status: "Success" });
        }
      );
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

router.patch("/:id", (req, res) => {
  db.query(`SELECT * FROM images WHERE id = ${req.params.id}`, (err, data) => {
    if (err) {
      res.status(500).send(err);
    }
    const oldImagePath = data[0].imagepath;
    const upload = uploader(path, "IMG").fields([{ name: "image" }]);
    upload(req, res, (err) => {
      const { image } = req.files;
      const imagePath = image ? `${path}/${image[0].filename}` : null;

      db.query(
        `UPDATE images set imagepath = '${imagePath}' WHERE id = ${req.params.id}`,
        (err) => {
          if (err) {
            res.status(500).send(err);
          }
          fs.unlinkSync(`public${oldImagePath}`);
          return res.status(200).send({
            message: "Image Edited",
            status: "Edited",
          });
        }
      );
    });
  });
});

router.delete("/:id", (req, res) => {
  // ambil alamat foto dari id
  db.query(`SELECT * FROM images WHERE id = ${req.params.id}`, (err, data) => {
    if (err) {
      res.status(500).send(err);
    }
    // dapat alamat foto
    const imagePath = data[0].imagepath;
    // Delete row sql
    db.query(`DELETE FROM images WHERE id = ${req.params.id}`, (err) => {
      if (err) {
        res.status(500).send(err);
      }
      // Delete file di dalam API
      fs.unlinkSync(`public${imagePath}`);
      return res.status(200).send({
        message: "Image Deleted",
        status: "Deleted",
      });
    });
  });
});

module.exports = router;

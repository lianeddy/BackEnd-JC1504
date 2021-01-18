const express = require("express");
const router = express.Router();
const db = require("../database");
const { uploader } = require("../helper");
const fs = require("fs");

router.post("/", (req, res) => {
  try {
    const path = "/images";
    const upload = uploader(path, "IMG").fields([{ name: "image" }]);
    upload(req, res, (err) => {
      const { image } = req.files;
      const imagePath = image ? `${path}/${image[0].filename}` : null;
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

module.exports = router;

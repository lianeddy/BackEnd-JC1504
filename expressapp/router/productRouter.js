let products = [
  {
    id: 1,
    nama: "Apel",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-FqVB0I2bP7M%2FU9RLuaLRC2I%2FAAAAAAAAA18%2F0CPwPy-poNE%2Fs1600%2FKandungan-Gizi-Dan-Manfaat-Buah-Apel.jpg&f=1&nofb=1",
    caption: "wah enak apel",
    harga: 10000,
  },
  {
    id: 2,
    nama: "Duren",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F3.bp.blogspot.com%2F-6NabAIFLkjs%2FUe4wbiyn0yI%2FAAAAAAAAQdM%2FM2VeSCoGni8%2Fs1600%2Fduren.jpg&f=1&nofb=1",
    caption: "wah enak duren",
    harga: 20000,
  },
  {
    id: 3,
    nama: "Mangga",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.zepto.store%2Fmy%2Fwp-content%2Fuploads%2F2020%2F03%2FMangga-Susu-Susu-Mango.jpg&f=1&nofb=1",
    caption: "wah enak mangga",
    harga: 30000,
  },
  {
    nama: "rambutan",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.healthbenefitstimes.com%2F9%2Fgallery%2Frambutan%2FPeeled-Rambutan.jpg&f=1&nofb=1",
    caption: "wah enak rambutan",
    id: 4,
    harga: 40000,
  },
  {
    nama: "pisang ",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwiratech.co.id%2Fwp-content%2Fuploads%2F2018%2F11%2Fmanfaat-Buah-pisang.jpg&f=1&nofb=1",
    caption: "wah enak pisang",
    id: 5,
    harga: 50000,
  },
];
const express = require("express");
const router = express.Router();

// Exercise
// Get Products (get semua & dengan harga min & max)
// eg. get product dengan harga min 15000 dan harga max 40000

// Get product by id
// eg. ambil product dengan id 1

// Add new products

// Edit harga dan caption product

// Delete products

router.get("/", (req, res) => {
  let filterProducts = products;
  if (req.query.hargamin) {
    filterProducts = filterProducts.filter(
      (val) => val.harga >= req.query.hargamin
    );
  }
  if (req.query.hargamax) {
    filterProducts = filterProducts.filter(
      (val) => val.harga <= req.query.hargamax
    );
  }
  res.status(200).send(filterProducts);
});

router.get("/:id", (req, res) => {
  const getId = products.find((val) => val.id === parseInt(req.params.id));
  res.status(200).send(getId);
});

router.post("/", (req, res) => {
  products.push(req.body);
  res.status(200).send(products[products.length - 1]);
});

router.patch("/:id", (req, res) => {
  let getId = products.find((val) => val.id === parseInt(req.params.id));
  if (req.body.harga) {
    getId.harga = req.body.harga;
  }
  if (req.body.caption) {
    getId.caption = req.body.caption;
  }
  res.status(200).send(getId);
});

router.delete("/:id", (req, res) => {
  products = products.filter((val) => val.id !== parseInt(req.params.id));
  res.status(200).send(products);
});

module.exports = router;

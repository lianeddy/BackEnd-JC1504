const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const {
  mongo: { MongoClient, ObjectID, url },
} = require("../database");

// GET
//
router.get("/", (req, res) => {
  const { title, gte, lt } = req.query;
  MongoClient.connect(url, (err, client) => {
    if (err) return res.status(500).send(err);

    // db pilih database
    // collection pilih "tabel"
    const moviesCol = client.db("sample_mflix").collection("movies");
    moviesCol
      .find({
        title: {
          $regex: title,
          $options: "i",
        },
        released: {
          $gte: new Date(gte),
          $lt: new Date(lt),
        },
      })
      .limit(50)
      .toArray((err, data) => {
        client.close();
        if (err) return res.status(500).send(err);

        res.status(200).send(data);
      });
  });
});

// Callback
router.get("/:id", (req, res) => {
  const { id } = req.params;
  MongoClient.connect(url, (err, client) => {
    if (err) return res.status(500).send(err);

    const moviesCol = client.db("sample_mflix").collection("movies");

    moviesCol.findOne({ _id: new ObjectID(id) }, (err, data) => {
      client.close();
      if (err) return res.status(500).send(err);

      return res.status(200).send(data);
    });
  });
});

// Promise
// router.get("/:id", (req, res) => {
//   const { id } = req.params;
//   MongoClient.connect(url)
//     .then((client) => {
//       const moviesCol = client.db("sample_mflix").collection("movies");
//       moviesCol.findOne({ _id: new ObjectID(id) }).then((data) => {
//         client.close();
//         return res.status(200).send(data);
//       });
//     })
//     .catch((err) => {
//       return res.status(500).send(err);
//     });
// });

// Async Await
// router.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const client = await MongoClient.connect(url);
//     const moviesCol = client.db("sample_mflix").collection("movies");
//     const data = await moviesCol.findOne({ _id: new ObjectID(id) });

//     return res.status(200).send(data);
//   } catch (err) {
//     return res.status(500).send(err);
//   }
// });

// POST
router.post("/", (req, res) => {
  MongoClient.connect(url, (err, client) => {
    const moviesCol = client.db("sample_mflix").collection("movies");

    moviesCol.insertOne(req.body, (err, data) => {
      client.close();
      if (err) return res.status(500).send(err);

      return res.status(200).send(data);
    });
  });
});
// PATCH
// 6010e0e6f7471b53bdac3682
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { set, unset } = req.body;
  let whereClause = {};
  if (set) {
    whereClause.$set = set;
  }
  if (unset) {
    whereClause.$unset = unset;
  }
  MongoClient.connect(url, (err, client) => {
    if (err) return res.status(500).send(err);
    const moviesCol = client.db("sample_mflix").collection("movies");

    moviesCol.updateOne(
      {
        _id: new ObjectId(id),
      },
      whereClause,
      (err, data) => {
        client.close();
        if (err) return res.status(500).send(err);

        return res.status(200).send(data);
      }
    );
  });
});
// DELETE
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  MongoClient.connect(url, (err, client) => {
    if (err) return res.status(500).send(err);

    const moviesCol = client.db("sample_mflix").collection("movies");
    moviesCol.deleteOne({ _id: new ObjectId(id) }, (err, data) => {
      client.close();
      if (err) return res.status(500).send(err);

      return res.status(200).send(data);
    });
  });
});

module.exports = router;

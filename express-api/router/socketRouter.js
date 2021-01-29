const router = require("express").Router();
const { query } = require("../database");

router.get("/", async (req, res) => {
  try {
    const response = await query(`SELECT * FROM chat`);
    return res.status(200).send(response);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post("/", async (req, res) => {
  const { message } = req.body;
  try {
    const { insertId } = await query(
      `INSERT INTO chat (message) VALUES ("${message}")`
    );
    req.app.io.emit("notification", "Anda menerima pesan baru!");
    req.app.io.emit("chat", { id: insertId, message });
    return res.status(200).send("OK");
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;

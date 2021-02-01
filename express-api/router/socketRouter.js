const router = require("express").Router();
const { query } = require("../database");
const moment = require("moment");
const { getTime } = require("../helper/middlewares");

router.get("/", async (req, res) => {
  try {
    const response = await query(`
    SELECT 
      c.id, 
      u.username,
      c.message, 
      c.createdAt 
    FROM chat c 
    JOIN users u ON u.id = c.userID`);
    return res.status(200).send(response);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post("/:id", getTime, async (req, res) => {
  const { message } = req.body;
  const { id } = req.params;
  const { io } = req.app;
  console.log(req.time);
  try {
    const { insertId } = await query(
      `INSERT INTO chat (message, createdAt, userID) VALUES ("${message}", "${req.time}", ${id})`
    );
    // Broadcast
    io.on("connection", (socket) => {
      socket.on("notification", (data) => {
        socket.broadcast.emit("notification", `Anda menerima pesan: ${data}`);
      });
    });
    const response = await query(`
    SELECT 
      c.id, 
      u.username,
      c.message, 
      c.createdAt 
    FROM chat c 
    JOIN users u ON u.id = c.userID
    WHERE c.id = ${insertId}`);
    io.emit("chat", response[0]);

    return res.status(200).send("OK");
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;

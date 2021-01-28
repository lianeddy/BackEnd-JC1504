const express = require("express");
const { db, query } = require("../database");
const router = express.Router();
const {
  checkToken,
  createJWTToken,
  hashPassword,
  transporter,
  transportPromise,
} = require("../helper");

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  let sql = `
    SELECT 
        id, 
        username, 
        email, 
        alamat, 
        roleID, 
        verified 
    FROM users WHERE username = '${username}' AND password = '${hashPassword(
    password
  )}'`;
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (data.length === 0) {
      return res.status(404).send({
        message: "User Not Found",
        status: "Not Found",
      });
    } else {
      const responseData = { ...data[0] };
      const token = createJWTToken(responseData);
      responseData.token = token;
      return res.status(200).send(responseData);
    }
  });
});

router.post("/keep-login", checkToken, (req, res) => {
  let sql = `
    SELECT 
        id, 
        username, 
        email, 
        alamat, 
        roleID, 
        verified 
    FROM users WHERE id = ${req.user.id}`;
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).send(data[0]);
  });
});

// Register Authentication Flow
// router.post("/register", (req, res) => {
//   let { username, password, email, alamat } = req.body;
//   password = hashPassword(password);
//   // Add data to database
//   const sql = `INSERT INTO users (username, email, password, alamat, roleID, verified) VALUES ('${username}', '${email}', '${password}', '${alamat}', 2, 0)`;
//   db.query(sql, (err, data) => {
//     if (err) return res.send(500).send(err);
//     // Send Email
//     const mailOptions = {
//       from: "Admin <lian.eddy@gmail.com>",
//       to: email,
//       subject: "Email Verification",
//       html: `<h1>Welcome ${username} to Commerce</h1> <br> <a href="http://localhost:3000/verify?username=${username}&password=${password}">Click Here to Verify your Account</a>`,
//     };
//     transporter.sendMail(mailOptions, (err, info) => {
//       if (err) return res.status(500).send(err);
//       // Get data for login at client
//       const get = `SELECT id, username, email, alamat, roleID, verified FROM users WHERE id = ${data.insertId}`;
//       db.query(get, (err, result) => {
//         if (err) return res.status(500).send(err);

//         const responseData = { ...result[0] };
//         const token = createJWTToken(responseData);
//         responseData.token = token;
//         return res.status(200).send(responseData);
//       });
//     });
//   });
// });

// Promisify
router.post("/register", async (req, res) => {
  let { username, password, email, alamat } = req.body;
  password = hashPassword(password);
  try {
    const insert = await query(
      `INSERT INTO users (username, email, password, alamat, roleID, verified) VALUES ('${username}', '${email}', '${password}', '${alamat}', 2, 0)`
    );
    const mailOptions = {
      from: "Admin <lian.eddy@gmail.com>",
      to: email,
      subject: "Email Verification",
      html: `<h1>Welcome ${username} to Commerce</h1> <br> <a href="http://localhost:3000/verify?username=${username}&password=${password}">Click Here to Verify your Account</a>`,
    };
    await transportPromise(mailOptions);
    const select = await query(
      `SELECT id, username, email, alamat, roleID, verified FROM users WHERE id = ${insert.insertId}`
    );
    const responseData = { ...select[0] };
    responseData.token = createJWTToken(responseData);
    return res.status(200).send(responseData);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// Email Verification
router.post("/email-verification", (req, res) => {
  const { username, password } = req.body;
  const get = `SELECT id FROM users WHERE username = '${username}' AND password = '${password}'`;
  db.query(get, (err, data) => {
    if (err) res.status(500).send(err);

    const idUser = data[0].id;
    const edit = `UPDATE users SET verified = 1 WHERE id = ${idUser}`;
    db.query(edit, (err) => {
      if (err) return res.status(500).send(err);

      const login = `SELECT id, username, email, alamat, roleID, verified FROM users WHERE id = ${idUser}`;
      db.query(login, (err, result) => {
        if (err) return res.status(500).send(err);

        const responseData = { ...result[0] };
        const token = createJWTToken(responseData);
        responseData.token = token;
        return res.status(200).send(responseData);
      });
    });
  });
});

router.post("/change-email", (req, res) => {
  const { email } = req.body;
  const getEmail = `SELECT id FROM users WHERE email = '${email}'`;
  db.query(getEmail, (err, getEmailResult) => {
    if (err) return res.status(500).send(err);
    const userID = getEmailResult[0].id;
    const token = createJWTToken({ id: userID });

    const mailOptions = {
      from: "Admin <lian.eddy@gmail.com>",
      to: email,
      subject: "Forget Password Commerce",
      html: `<a href="http://localhost:3000/change-password?token=${token}">Klik disini untuk mengganti password anda</a>`,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) res.status(500).send(err);

      return res.status(200).send("Ok");
    });
  });
});

router.post("/change-pass", checkToken, (req, res) => {
  const { password } = req.body;
  const userID = req.user.id;

  const editPassword = `UPDATE users SET password = '${hashPassword(
    password
  )}' WHERE id = ${userID}`;
  db.query(editPassword, (err) => {
    if (err) return res.status(500).send(err);

    return res.status(200).send("Ok");
  });
});

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTYxMTYzMzA1OCwiZXhwIjoxNjExNjc2MjU4fQ.wNcynEWijZpZAr9Mmv-Km1qLGJQgApk1hx-VbpiTlKs

module.exports = router;

const moment = require("moment");
const { query } = require("../database");

const getTime = async (req, res, next) => {
  const response = await query(
    `SELECT * FROM users WHERE id = ${parseInt(req.params.id)}`
  );
  if (response[0].id === parseInt(req.params.id)) {
  }
  if (parseInt(req.params.id) !== 0 && response.length > 0) {
    req.time = moment().format("LTS");
    next();
  } else {
    res.status(401).send({ status: "Not Authorized" });
  }
};

const registerValidation = async (req, res, next) => {
  const { email, username } = req.body;
  const emailValidation = await query(
    `SELECT * FROM users where email = '${email}'`
  );
  const usernameValidation = await query(
    `SELECT * FROM users where username = '${username}'`
  );
  if (emailValidation) {
    return res.status(500).send({ message: "Email already taken" });
  }
  if (usernameValidation) {
    return res.status(500).send({ message: "Username already taken" });
  }
  next();
};

module.exports = { getTime, registerValidation };

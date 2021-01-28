const mysql = require("mysql");
const { MongoClient, ObjectID } = require("mongodb");
const util = require("util");

const db = mysql.createConnection({
  host: "localhost",
  user: "lianeddy",
  password: "asd123",
  database: "jc1504",
  port: 3306,
});

const url =
  "mongodb+srv://lian:asd123@dbjc11-gitmg.mongodb.net/test?retryWrites=true&w=majority";

const query = util.promisify(db.query).bind(db);

module.exports = { db, query, mongo: { MongoClient, ObjectID, url } };

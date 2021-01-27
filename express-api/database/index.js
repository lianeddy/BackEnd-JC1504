const mysql = require("mysql");
const { MongoClient, ObjectID } = require("mongodb");

const db = mysql.createConnection({
  host: "localhost",
  user: "lianeddy",
  password: "asd123",
  database: "jc1504",
  port: 3306,
});

const url =
  "mongodb+srv://lian:asd123@dbjc11-gitmg.mongodb.net/test?retryWrites=true&w=majority";

module.exports = { db, mongo: { MongoClient, ObjectID, url } };

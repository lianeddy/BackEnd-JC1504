// NPM
// Node Package Manager

// CHALK
// Customize log message colours
// const chalk = require("chalk");
// console.log(chalk.red("Merah"));
// console.log(chalk.blue("Biru"));
// console.log(chalk.yellow("Yellow"));
// console.log(chalk.bgRed("Merah belakang"));
// console.log(chalk.keyword("orange")("Orange"));
// console.log(chalk.rgb(0, 44, 200)("RGB"));
// console.log(chalk.hex("fff")("Hexa"));
// Colors

// MOMENT
// IMPORTANT
// Format Date
// const moment = require("moment");
// console.log(moment().format("MMMM Do YYYY, h:mm:ss a"));
// console.log(moment("20080511").fromNow());

// LODASH
// Various js functions
// const _ = require("lodash");
// Verification
// console.log(_.isString("123"));
// console.log(_.isArray([]));
// console.log(_.isNull(null));

// String manipulation
// console.log(_.capitalize("hELLO WORLD"));
// console.log(_.upperFirst("hEllO WORLD"));
// console.log(_.upperCase("hello"));
// console.log(_.lowerCase("HELLO"));
// console.log(_.lowerFirst("HELLO"));

// Array Manipulation
// const arr = [1, 2, 3, 4, 5, 5, 4, 5];
// console.log(_.isArray(arr));
// console.log(_.uniq(arr));
// console.log(_.max(arr));
// console.log(_.min(arr));
// console.log(_.sum(arr));
// console.log(_.reverse(arr));

// console.log(_.map(arr, (val) => val * 2)); // version lodash
// console.log(arr.map((val) => val * 2)); // es6

// const bioData = [
//   {
//     nama: "bambang",
//     usia: 45,
//   },
//   {
//     nama: "andi",
//     usia: 30,
//   },
// ];

// console.log(_.max(bioData, (val) => val.usia));
// console.log(_.min(bioData, (val) => val.usia));

// YARGS
// Get value from terminal
// const argv = require("yargs").argv;
// const users = [
//   {
//     username: "lianeddy",
//     password: "asd123",
//   },
// ];
// let username = argv.username;
// console.log(username);
// let password = argv.password;

// console.log(users.find((val) => val.username === username));

// console.log(argv.num > 40);

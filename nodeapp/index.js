// IMPORT & EXPORT
// const {
//   satu,
//   dua,
//   tiga,
//   biodata,
//   declareName,
// } = require("./customModules/dua");
// const { tambahDua, tambahTiga } = require("./customModules/satu");

// console.log(tambahDua(dua));
// console.log(tambahTiga(satu));

// BUILT IN MODULES

// ASSERT
// Testing
// const assert = require("assert");
// assert.equal("5", 5);
// assert.strictEqual("5", 5);
// assert.notEqual(5, 5);
// assert.notStrictEqual(5, 5);

// URL & QUERYSTRING
// Extract data from url
// const url = require("url");
// const shoppe =
//   "https://shopee.co.id/Handphone-Aksesoris-cat.40?labelIds=1000953&locations=DKI%20Jakarta&page=0&payCOD=true";

// // const { query } = url.parse(shoppe);
// console.log(query);
// const querystring = require("querystring");
// console.log(querystring.parse(shoppe));

// OS
// Machine info
// const os = require("os");
// const namaCPU = os.hostname();
// const osTipe = os.type();
// const osPlatform = os.platform();
// const osRilis = os.release();
// const dirAwal = os.homedir();
// const ramSisa = os.freemem();
// const ramTotal = os.totalmem();
// console.log(os.);
// console.log(ramTotal);

// FS
// File & Directory Manipulation
// const fs = require("fs");

// Create file
// fs.writeFile("halo2.txt", "Halo Lagi", () =>
//   console.log("file berhasil dibuat")
// );
// fs.writeFileSync("./halo/halo2.txt", "Halo!");

// Add to file
// fs.appendFile("halo2.txt", "\nhalo lagi lagi", () =>
//   console.log("file berhasil ditambahkan")
// );
// fs.appendFileSync("halo3.txt", "\nhalo 3");

// Delete file
// fs.unlinkSync("./halo/halo2.txt");
// fs.unlink("./halo/halo3.txt", () => console.log("file berhasil dihapus"));

// Create directory
// fs.mkdir("contoh", null, () => console.log("berhasil dibuat folder baru"));
// fs.mkdirSync("contoh2");

// Remove directory
// fs.rmdir("contoh2", () => console.log("folder berhasil dihapus"));
// fs.rmdirSync("contoh");

const { encrypt } = require("./customModules/encryption");
const { createToken } = require("./customModules/token");
console.log(encrypt("asd123"));

const users = [
  {
    username: "lianeddy",
    password: "321dsa",
    email: "lian.eddy@gmail.com",
  },
];

let userData = {
  username: "lianeddy",
  password: "321dsa",
  email: "lian.eddy@gmail.com",
};

// Middleware
// A program that is in between two other programs

userData.password = encrypt(userData.password);
userData.refreshToken = createToken();

console.log(userData);

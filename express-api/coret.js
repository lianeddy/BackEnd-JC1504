// let obj = '{"nama": "lian","role": "user","alamat": "BSD"}';
// console.log(JSON.parse(obj));

const { createJWTToken } = require("./helper");
const lama = { verified: 0 };
const baru = { verified: 1 };
console.log(createJWTToken(lama));
console.log(createJWTToken(baru));
// const jwt = require("jsonwebtoken");
// const obj = {
//   id: 10,
//   username: "bambang",
//   alamat: "Jakarta",
// };

// const token = createJWTToken(obj);
// console.log(token);
// jwt.verify(token, "kuncirahasi", (err, decoded) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(decoded);
//   }
// });
// const obj = {
//   nama: "lian",
// };

// obj.hello = true;

// console.log(obj);

// const Crypto = require("crypto");
// const pass = "asdsadasdasdasd123213123";
// console.log(
//   Crypto.createHmac("sha256", "kunciHash").update(pass).digest("hex")
// );

// const { hashPassword } = require("./helper");
// console.log(hashPassword("asd123"));

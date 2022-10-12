const db = require("../database/db.js");

const insertUser = db.prepare(/*sql*/ `
INSERT INTO users (name, email, hash)
VALUES ($name, $email, $hash)
RETURNING id
`);

function createUser(name, email, hash) {
  return insertUser.get({ name, email, hash });
}

const selectUserByEmail = db.prepare(/*sql*/ `
SELECT email, hash FROM users WHERE email = ?
`);

function getUserByEmail(email) {
  return selectUserByEmail.get({ email });
}

module.exports = { createUser, getUserByEmail };

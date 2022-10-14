const db = require("../database/db.js");

const insert_user = db.prepare(/*sql*/ `
INSERT INTO users (name, email, hash)
VALUES ($name, $email, $hash)
RETURNING id
`);

function createUser(name, email, hash) {
  return insert_user.get({ name, email, hash });
}

const select_user_by_email = db.prepare(/*sql*/ `
SELECT id, email, hash FROM users WHERE email = ?
`);

function getUserByEmail(email) {
  return select_user_by_email.get(email);
}

module.exports = { createUser, getUserByEmail };

const crypto = require("node:crypto");

const db = require("../database/db.js");

const insertSession = db.prepare(/*sql*/ `
INSERT INTO sessions(id, user_id, expires_at)
VALUES ($sid, $user_id, DATE('now' + '7 days'))
`);

function createSession(user_id) {
  const sid = crypto.randomBytes(18).toString("base64");
  insertSession.run({ sid, user_id });
  return sid;
}

module.exports = { createSession };

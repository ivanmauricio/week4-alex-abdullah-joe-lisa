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

const get_session = db.prepare(/*sql*/ `
SELECT id, user_id, expires_at
FROM sessions
WHERE id = ? 
`);

function getSession(session_id) {
  return get_session.get(session_id);
}

const delete_session = db.prepare(/*sql*/ `
DELETE FROM sessions 
WHERE id = ?
`);

function removeSession(sid) {
  return delete_session.run(sid);
}

module.exports = { createSession, getSession, removeSession };

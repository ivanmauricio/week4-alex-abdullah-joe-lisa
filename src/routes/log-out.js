const { removeSession, getSession } = require("../model/session.js");

function post(req, res) {
  const sid = req.signedCookies.sid;
  const session = getSession(sid);
  removeSession(session.id);
  res.clearCookie("sid");

  res.redirect("/");
}

module.exports = { post };

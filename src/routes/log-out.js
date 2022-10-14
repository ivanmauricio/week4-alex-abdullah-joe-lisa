const { removeSession, getSession } = require("../model/session.js");

function post(req, res) {
  removeSession(session.id);
  res.clearCookie("sid");

  res.redirect("/");
}

module.exports = { post };

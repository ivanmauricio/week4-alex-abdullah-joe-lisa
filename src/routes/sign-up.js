const { signUpForm, Layout, sanitization } = require("../templates.js");
const { createUser, getUserByEmail } = require("../model/user.js");
const { createSession } = require("../model/session.js");
const bcrypt = require("bcryptjs");

function get(req, res) {
  const title = "Create an Account";
  const content = signUpForm(title);
  const body = Layout({ title, content });
  res.send(body);
}

function post(req, res) {
  const { name, email, password } = req.body;

  //   const existingUser = getUserByEmail(email);

  //   if (existingUser) return res.redirect("/log-in");

  bcrypt.hash(password, 12).then((hash) => {
    const userId = createUser(sanitization(name), sanitization(email), hash).id;
    const sessionId = createSession(userId);

    res.cookie("sid", sessionId, {
      signed: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      sameSite: "lax",
      httpOnly: true,
    });

    res.redirect("/all-pets");
  });
}

module.exports = { get, post };

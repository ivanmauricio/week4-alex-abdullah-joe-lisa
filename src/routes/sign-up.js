const {
  signUpForm,
  Layout,
  sanitization,
  ExistingUser,
} = require("../templates.js");
const { createUser, getUserByEmail } = require("../model/user.js");
const { createSession } = require("../model/session.js");
const bcrypt = require("bcryptjs");

function get(req, res) {
  const title = "Create an Account";
  const content = signUpForm(title, {}, {});
  const body = Layout({ title, content });
  res.send(body);
}

function post(req, res) {
  const { name, email, password } = req.body;
  const errors = {};
  const existingUser = getUserByEmail(email);
  const title = "Create an Account";
  if (existingUser) return res.send(ExistingUser());
  if (!name) {
    errors.name = "Please enter your name";
  }
  if (!email) {
    errors.email = "Please enter your email";
  }
  if (!password) {
    errors.password = "Please enter your password";
  }
  if (Object.keys(errors).length > 0) {
    const body = Layout({
      title,
      content: signUpForm(title, errors, req.body),
    });
    return res.send(body);
  }
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

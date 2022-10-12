const { signUpForm, Layout } = require("../templates.js");
const { createUser, getUserByEmail } = require("../model/user.js");
const { createSession } = require("../model/session.js");
const bcrypt = require("bcryptjs");

function get(req, res) {
  const content = signUpForm();
  res.send(content);
}

function post(req, res) {
  const { name, email, password } = req.body;
  //   const userId = createUser(name, email, password).id;
  //   console.log(userId);
  //   const existingUser = getUserByEmail(email);

  //   if (existingUser) return res.redirect("/log-in");

  bcrypt.hash(password, 12).then((hash) => {
    const userId = createUser(name, email, hash).id;
    // const sid = createSession(userId);
    res.redirect("/all-pets");
  });
}

module.exports = { get, post };

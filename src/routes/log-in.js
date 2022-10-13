const { Layout, Login, ErrorPage, sanitization } = require("../templates.js");
const { getUserByEmail } = require("../model/user");
const { createSession } = require("../model/session");
const bcrypt = require("bcryptjs");

//login route

function get(req, res) {
  const content = Login();
  const title = "Log in";
  const body = Layout({ title, content });

  res.send(body);
}

function post(req, res) {
  const { email, password } = req.body;
  const user = getUserByEmail(sanitization(email));

  bcrypt.compare(password, user.hash).then((match) => {
    if (!match) {
      return res.status(400).send(ErrorPage());
    } else {
      const sessionId = createSession(user.id);

      res.cookie("sid", sessionId, {
        signed: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        sameSite: "lax",
        httpOnly: true,
      });
      res.redirect("/all-pets");
    }
  });
}

module.exports = { get, post };

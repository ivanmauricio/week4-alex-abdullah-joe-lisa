const { Layout, Login, ErrorPage, sanitization } = require("../templates.js");
const { getUserByEmail } = require("../model/user");
const { createSession, getSession } = require("../model/session");
const bcrypt = require("bcryptjs");

//login route

function get(req, res) {
  const content = Login({}, {});
  const title = "Log in";
  const body = Layout({ title, content });
  const sid = req.signedCookies.sid;
  const session = getSession(sid);
  console.log(session);
  if (session) {
    res.redirect("/all-pets");
  }
  res.send(body);
}

function post(req, res) {
  const { email, password } = req.body;
  const user = getUserByEmail(sanitization(email));
  const errors = {};
  const title = "Log in";
  if (!user) res.status(400).send(ErrorPage());
  if (!email) {
    errors.email = "Please enter your email";
  }
  if (!password) {
    errors.password = "Please enter your password";
  }
  if (Object.keys(errors).length > 0) {
    const body = Layout({
      title,
      content: Login(errors, req.body),
    });
    return res.send(body);
  }
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

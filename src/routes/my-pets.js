const { Layout, MyPets, sanitization } = require("../templates");
const { getSession } = require("../model/session");

function get(req, res) {
  const sid = req.signedCookies.sid;
  const sessionId = getSession(sid);
  const currentUser = sessionId && sessionId.user_id;
  const idFromURL = req.params.id;
  if (idFromURL != currentUser) {
    res.send("You're not allowed to access this page");
  }
  const content = MyPets(currentUser);
  const title = "Submit a post about your pet";
  const body = Layout({ title, content });
  res.send(body);
}

function post(req, res) {
  const sid = req.signedCookies.sid;
  const sessionId = getSession(sid);
  const currentUser = sessionId && sessionId.user_id;
  const { petName, petType, petImage, sharing } = req.body;
  res.redirect(`/my-pets`);
}

module.exports = { get, post };

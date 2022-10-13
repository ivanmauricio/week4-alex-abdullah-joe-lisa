const { Layout, MyPets, sanitization } = require("../templates");
const { getSession } = require("../model/session");
const { insertPet } = require('../model/pets.js');

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
  const { petName, petType} = req.body;
  const petImage = req.file.path;
  insertPet(petName, currentUser, petType, petImage);
  // sharing = (sharing === "on") ? 1 : 0;
  res.redirect(`/my-pets/${currentUser}`);
}

module.exports = { get, post };

const { Layout, MyPets, sanitization } = require("../templates");
const { getSession } = require("../model/session");
const { insertPet } = require("../model/pets.js");
const { getUsersPets } = require("../model/pets.js");

function get(req, res) {
  const currentUser = sessionId && sessionId.user_id;
  const idFromURL = req.params.id;
  if (idFromURL != currentUser) {
    res.send("You're not allowed to access this page");
  }
  const petsList = getUsersPets(currentUser); // Query from table
  const content = MyPets(currentUser, petsList);
  const title = "Submit a post about your pet";
  const body = Layout({ title, content });
  res.send(body);
}

function post(req, res) {
  const sid = req.signedCookies.sid;
  const sessionId = getSession(sid);
  const currentUser = sessionId && sessionId.user_id;
  const title = "Submit a post about your pet";
  const errors = {};
  const { petName, petType, sharing } = req.body;
  if (!petName) {
    errors.petName = "Please enter your pet's name";
  }
  if (!petType) {
    errors.petType = "Please enter your pet's type";
  }
  if (Object.keys(errors).length > 0) {
    const body = Layout({
      title,
      content: MyPets(currentUser, petsList, errors, req.body),
    });
    return res.send(body);
  }
  const petImage = req.file.path.replace("public", "..");
  let sharingValue;
  if (!sharing) {
    sharingValue = 1;
  } else {
    sharingValue = 0;
  }

  insertPet(petName, currentUser, petType, petImage, sharingValue);
  // sharing = (sharing === "on") ? 1 : 0;
  res.redirect(`/my-pets/${currentUser}`);
}

module.exports = { get, post };

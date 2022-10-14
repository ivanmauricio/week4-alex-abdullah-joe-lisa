const { Layout, AllPets } = require("../templates.js");
const { getAllPets } = require("../model/pets.js");
const { getSession } = require("../model/session.js");

function get(req, res) {
  const currentUser = sessionId && sessionId.user_id;
  const petsList = getAllPets(); // Query from table
  const content = AllPets(petsList, currentUser); // HTML markup
  const title = "All Pets";
  const body = Layout({ title, content });
  res.send(body);
}

module.exports = { get };

const { Layout, AllPets } = require("../templates.js");
const { getAllPets } = require("../model/pets.js");

function get(req, res) {
  const petsList = getAllPets(); // Query from table
  const content = AllPets(petsList); // HTML markup
  const title = "All Pets";
  const body = Layout({ title, content });
  res.send(body);
}

module.exports = { get };

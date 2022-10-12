const { Layout, MyPets } = require("../templates");

function get(req, res) {
  const content = MyPets();
  const title = "Submit a post about your pet";
  const body = Layout({ title, content });
  res.send(body);
}

function post(req, res) {
  const { petName, petType, petImage, sharing } = req.body;
}

module.exports = { get, post };

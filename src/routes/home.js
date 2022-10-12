const { Layout, Home } = require("../templates.js");

//sign in page / home orute

function get(req, res) {
  const content = Home();
  const title = "Petsagram";
  const body = Layout({ title, content });
  res.send(body);
}

module.exports = { get };

const { Layout, Login } = require("../templates.js");

//login route

function get(req, res) {
  const content = Login();
  const title = "Log in";
  const body = Layout({ title, content });
  res.send(body);
}

module.exports = { get };

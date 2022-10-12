// import modules
const express = require("express");

const cookieParser = require("cookie-parser");

// routes
const home = require("./routes/home.js");
const login = require("./routes/log-in.js");

// import CSS
const staticHandler = express.static("public");
// Middleware variables
const body = express.urlencoded({ extended: false });
const cookies = cookieParser(process.env.COOKIE_SECRET);
const server = express();

//middleweare
server.use(staticHandler);
server.use(cookies);

server.get("/", home.get);
server.get("/log-in", login.get);

module.exports = server;

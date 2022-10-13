// import modules
const express = require("express");

const cookieParser = require("cookie-parser");

// routes
const home = require("./routes/home.js");
const signUp = require("./routes/sign-up.js");
const login = require("./routes/log-in.js");
const allPets = require("./routes/all-pets.js");
const myPets = require("./routes/my-pets.js");

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
server.get("/sign-up", signUp.get);
server.post("/sign-up", body, signUp.post);
server.get("/log-in", login.get);
server.post("/log-in", body, login.post);
server.get("/all-pets", allPets.get);
server.get("/my-pets/:id", myPets.get);

module.exports = server;

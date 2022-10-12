// import modules 
const express = require("express");

const cookieParser = require("cookie-parser");

// routes 
const home = require("./routes/home.js")
const signUp = require("./routes/sign-up.js");

// import CSS
const staticHandler = express.static("public");

// Middleware variables
const body = express.urlencoded({ extended: false });
const cookies = cookieParser(process.env.COOKIE_SECRET);
const server = express();

//middleweare  
server.use(staticHandler);
server.use(cookies);


server.get("/", home.get)
server.get("/sign-up", signUp.get);
server.post('/sign-up', body, signUp.post)


module.exports = server;

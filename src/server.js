// import modules
const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "./public/uploads" });

const cookieParser = require("cookie-parser");

// routes
const home = require("./routes/home.js");
const signUp = require("./routes/sign-up.js");
const login = require("./routes/log-in.js");
const logout = require("./routes/log-out.js");
const allPets = require("./routes/all-pets.js");
const myPets = require("./routes/my-pets.js");

// import CSS
const staticHandler = express.static("public");

// Middleware variables
const body = express.urlencoded({ extended: false });
const cookies = cookieParser(process.env.COOKIE_SECRET);
const { getSession, removeSession } = require("./model/session.js");
const server = express();

//middleweare
server.use(staticHandler);
server.use(cookies);
server.use(sessions);

server.get("/", home.get);
server.get("/sign-up", sessions, signUp.get);
server.post("/sign-up", body, signUp.post);
server.get("/log-in", sessions, login.get);
server.post("/log-in", body, login.post);
server.get("/all-pets", sessions, allPets.get);
server.get("/my-pets/:id", myPets.get);
server.post("/my-pets/:id", upload.single("petImg"), myPets.post);
server.post("/log-out", logout.post);

function sessions(req, res, next) {
  const sid = req.signedCookies.sid;
  const session = getSession(sid);
  if (session) {
    const expiry = new Date(session.expires_at);
    const today = new Date();
    if (expiry < today) {
      removeSession(sid);
      res.clearCookie("sid");
    } else {
      req.session = session;
    }
    next();
  }
}

module.exports = server;

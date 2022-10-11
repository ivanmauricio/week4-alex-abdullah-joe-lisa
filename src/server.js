const express = require("express");
const cookieParser = require("cookie-parser");

const staticHandler = express.static("public");


const body = express.urlencoded({ extended: false });
const cookies = cookieParser(process.env.COOKIE_SECRET);
const server = express();
server.use(staticHandler);
server.use(cookies);

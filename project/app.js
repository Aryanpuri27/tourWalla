const express = require("express");
const app = express();
const path = require("path");
var bodyParser = require("body-parser");
var multer = require("multer");
var upload = multer();

const tourRouter = require("./routes/tourRouter");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/home/aryan/nodejs/project/views"));
app.use(express.json());
app.use("/static", express.static(`${__dirname}/static`));

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

console.log("0000");
app.use("/api/v1/tours", tourRouter);

module.exports = app;

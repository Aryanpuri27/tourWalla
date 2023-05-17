const express = require("express");

const Router = express.Router();
const tourController = require("../controllers/tourController");

Router.route("/").get(tourController.getTours);
Router.route("/create")
  .get(tourController.createTourForm)
  .post(tourController.submitform);

module.exports = Router;

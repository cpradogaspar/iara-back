const express = require("express");
const Router = express.Router();
const Sensor = require("../classes/SensorCheckup");
const sensor = new Sensor();

Router.get("/analysis", (req, res) => {
  let sensors = sensor.get_complete_analysis();

  res.json(sensors);
});

module.exports = Router;

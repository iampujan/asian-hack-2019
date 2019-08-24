var express = require("express");
var router = express.Router();

const { fetchUniLocData, dailyData, locationData } = require("../location");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/uniloc", fetchUniLocData, function(req, res, next) {
  res.json(data);
});

router.get("/daily", dailyData, (req, res, next) => {
  res.json(data);
});

router.get("/locations", locationData, (req, res, next) => {
  res.json(data);
});

module.exports = router;

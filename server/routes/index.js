var express = require('express');
var router = express.Router();

const { fetchUniLocData, dailyData, locationData } = require('../location');

const { doDatabase } = require("../data/complaints");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/uniloc', fetchUniLocData, function(req, res, next) {
  res.json(data);
});

router.get('/daily', dailyData, (req, res, next) => {
  res.json(data);
});

router.get('/locations', locationData, (req, res, next) => {
  res.json(data);
});

router.post("/subscribe", doDatabase, (req, res, next) => {
  res.write("sfsd");
  console.log("asdlfd");
});
module.exports = router;

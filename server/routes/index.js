var express = require('express');
var router = express.Router();

const { fetchUniLocData, dailyData, locationData } = require('../location');

const { saveComplaints } = require('../data/database/complaints');
const { saveDevice } = require('../data/database/device');

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

router.post('/subscribe', async (req, res) => {
  const { deviceId, body } = req.body;
  const saveResp = await saveComplaints({
    deviceId,
    body
  });
  res.send(saveResp);
});

router.post('/device', async (req, res) => {
  const { deviceId, fcmToken } = req.body;
  const saveResp = await saveDevice({
    deviceId,
    fcmToken
  });
  res.send(saveResp);
});
module.exports = router;

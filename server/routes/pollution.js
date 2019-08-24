const express = require('express');
const router = express.Router();

const { fetchPageHtml } = require('../utils/fetchData');
const scrapPollutionData = require('../utils/scrapePollutionData');

router.get('/fetch', async (req, res) => {
  try {
    const html = await fetchPageHtml('http://pollution.gov.np');
    const scrapedData = await scrapPollutionData(html);
    console.log('data data', scrapedData);
    res.send(scrapedData);
  } catch (err) {
    console.log('error', err);
    res.send([]);
  }
});

module.exports = router;

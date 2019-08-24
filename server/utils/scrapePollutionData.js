const cheerio = require('cheerio');
const request = require('request');

const scrapPollutionData = html => {
  const $ = cheerio.load(html);
  let pollutions = [];
  $('div.mini-watch-item').each((index, hotelelement) => {
    try {
      let pollutionJson = {};
      $(hotelelement)
        .children()
        .each((chiIndex, child) => {
          const childText = $(child).text();
          if (chiIndex === 0) {
            pollutionJson.location = childText;
          }
          if (chiIndex === 1) {
            pollutionJson.data =
              childText === '-' ? 0 : Number(childText.split(' ')[0]);
            pollutionJson.unit = 'µg/m³';
          }
        });
      pollutions.push(pollutionJson);
    } catch (exception) {
      console.log('Error on children');
    }
  });
  return pollutions;
};

module.exports = scrapPollutionData;

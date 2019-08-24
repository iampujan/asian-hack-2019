const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

function fetchUniLocData(req, res) {
  const loc = [];
  let uniloc = [];
  // const https = require("https");

  // const  convert = () => {
  fs.createReadStream(path.resolve(__dirname, "./data/data.csv"))
    .pipe(csv())
    .on("data", data => {
      loc.push(data.location);
    })
    .on("end", () => {
      uniloc = [...new Set(loc)];
      console.log("finished");
      res.json(uniloc);
    });
}

function dailyData(req, res) {
  const { location } = req.query;
  if (location) {
    let dataDate = [];
    let dates = [];
    let uniqueDates = [];
    let uniloc = [];
    // const https = require("https");

    // const  convert = () => {
    fs.createReadStream(path.resolve(__dirname, "./data/data.csv"))
      .pipe(csv())
      .on("data", data => {
        if (data.location === location) {
          data.datetime = data.datetime.split("T")[0];
          dates.push(data.datetime);
          dataDate.push(data);
        }
      })
      .on("end", () => {
        uniqueDates = [...new Set(dates)];
        let dateWiseAvgData = [];
        uniqueDates.forEach(date => {
          const dateSpecificData = dataDate.filter(d => d.datetime === date);
          let dateWiseSum = 0;
          for (let i = 0; i < dateSpecificData.length; i += 1) {
            let pmValue = Number(dateSpecificData[i].value);
            if (pmValue < 0) {
              pmValue = 0;
            }
            dateWiseSum += pmValue;
          }
          dateWiseAvgData.push({
            datetime: date,
            location,
            value: dateWiseSum / dateSpecificData.length
          });
        });
        res.json(dateWiseAvgData);
      });
  } else {
    res.json({
      error: "Location is required"
    });
  }
}
// });

function locationData(req, res) {
  report = [];
  locations = [];
  uniqueLocations = [];
  averatePm = [];

  fs.createReadStream(path.resolve(__dirname, "./data/data.csv"))
    .pipe(csv())
    .on("data", data => {
      locations.push(data.location);
      report.push(data);
    })
    .on("end", () => {
      uniqueLocations = [...new Set(locations)];

      let finalLocationData = [];
      for (var i = 0; i < uniqueLocations.length; i += 1) {
        const locationWiseData = report.filter(
          data => uniqueLocations[i] === data.location
        );
        let locationSum = 0;
        locationWiseData.forEach(ddd => {
          let pmValue = Number(ddd.value);
          if (pmValue < 0) {
            pmValue = 0;
          }
          locationSum += Number(pmValue);
        });
        finalLocationData.push({
          location: uniqueLocations[i],
          value: locationSum / locationWiseData.length
        });
      }

      res.json(finalLocationData);
    });
}

module.exports = { fetchUniLocData, dailyData, locationData };

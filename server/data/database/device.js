const { Device } = require('./models');

const saveDevice = async deviceData => {
  const device = new Device(deviceData);
  const resp = await device.save().catch(err => {});
  return resp;
};

module.exports = { saveDevice };

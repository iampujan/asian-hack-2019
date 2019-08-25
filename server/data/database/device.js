const { Device } = require('./models');

const saveDevice = async deviceData => {
  const oldDevice = await Device.findOne({ deviceId: deviceData.deviceId });
  if (oldDevice === null) {
    const device = new Device(deviceData);
    const resp = await device.save().catch(err => {});
    return resp;
  }
  console.log('Old data exists');
  return oldDevice;
};

module.exports = { saveDevice };

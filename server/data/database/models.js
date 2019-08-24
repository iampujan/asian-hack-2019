const mongoose = require('mongoose');

const complaintsSchema = new mongoose.Schema({
  body: String,
  deviceId: String,
  upVote: Number,
  downVote: Number
});

const Complaints = new mongoose.model('Complaints', complaintsSchema);

const subscribeSchema = new mongoose.Schema({
  deviceId: String,
  station: String
});

const Subscribe = new mongoose.model('Subscribe', subscribeSchema);

const deviceSchema = new mongoose.Schema({
  deviceId: String,
  fcmToken: String
});

const Device = new mongoose.model('Device', deviceSchema);

module.exports = { Complaints, Subscribe, Device };

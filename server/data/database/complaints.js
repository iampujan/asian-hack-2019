const { Complaints } = require('./models');

const saveComplaints = async complaintData => {
  const { deviceId, body } = complaintData;
  const complaint = new Complaints({
    deviceId,
    body,
    upVote: 0,
    downVote: 0
  });
  const resp = await complaint.save().catch(err => {});
  return resp;
};

const fetchComplaints = async () => {
  const complaints = await Complaints.find({});
  return complaints;
};

module.exports = { saveComplaints, fetchComplaints };

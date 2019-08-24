const complaints = () => {
  let complaintsSchema = new mongoose.Schema({
    body: String,
    deviceId: String,
    upVoteId: String
  });

  let comp = "dfjds",
    id = "flsjdfflsdj",
    voteId = "dsfsdfl";

  let Complaints = new mongoose.model("Complaints", complaintsSchema);

  let temp = new Complaints({
    body: comp,
    deviceId: id,
    upVoteId: voteId
  });

  temp.save((err, temp) => {
    if (err) return console.error(err);
  });

  Complaints.find({ deviceId: /^AJFSDLKFJDSFLKJ3324/ }, (err, sfd) => {
    if (err) console.error("err");
    sfd.forEach(element => {
      console.log(element.upVoteId);
    });
  });
};

const subscription = () => {
  let subscribeSchema = new mongoose.Schema({
    deviceId: String,
    location: String
  });

  let Subscribe = new mongoose.model("Subscribe", subscribeSchema);

  let sub = new Subscribe({
    deviceId: "sjffsdlkjfdslfj",
    location: "Bhaktapur"
  });

  sub.save(err => {
    if (err) console.log(err);
  });

  Subscribe.find({});
};

module.exports = doDatabase;

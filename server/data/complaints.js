const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/test", { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
  let complaintsSchema = new mongoose.Schema({
    body: String,
    uid: String,
    complaint: [{ body: String, uid: String }],
    upVoteId: Array
  });

  let Complaints = new mongoose.model("Complaints", complaintsSchema);

  let temp = new Complaints({
    body: "Pollution due to Bhaktapur",
    uid: "ADLFJQ948U5324328",
    upVotes: [{ upVoteId: "lsjfjsdlfjSDFSDLKFJ", upVoteId: "ASLFJSDLFKJSDF" }]
  });

  temp.save((err, temp) => {
    if (err) {
      return console.error(err);
    }
  });

  Complaints.find({ uid: /^ADLFJQ948U5324328/ }, (err, sfd) => {
    if (err) console.error("err");
    console.log(sfd);
  });

  complaintsSchema.methods.speak = () => {};
});

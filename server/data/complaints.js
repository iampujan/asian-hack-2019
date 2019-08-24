const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/test", { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
  let complaintsSchema = new mongoose.Schema({
    body: String,
    deviceId: String,
    upVoteId: String
  });

  //   let comp = "too many factories",
  //     id = "AJFSDLKFJDSFLKJ3324",
  //     voteId = "JDLFJJ4984359874987";

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

  complaintsSchema.methods.speak = () => {};
});

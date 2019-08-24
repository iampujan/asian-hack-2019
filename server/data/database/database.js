const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/test", { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", async function() {
  console.log("database mounted");
});

let complaintsSchema = new mongoose.Schema({
  body: String,
  deviceId: String,
  upVoteId: String
});

let Complaints = new mongoose.model("Complaints", complaintsSchema);

let subscribeSchema = new mongoose.Schema({
  deviceId: String,
  location: String
});

let Subscribe = new mongoose.model("Subscribe", subscribeSchema);

module.exports = { Complaints, Subscribe };

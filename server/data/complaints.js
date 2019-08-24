const { Complaints } = require("./database/database");

// console.log(db);
const complaints = comp => {
  console.log(comp);
  let temp = new Complaints({
    body: comp,
    deviceId: id,
    upVoteId: voteId
  });

  temp.save((err, temp) => {
    if (err) return console.error(err);
    res.json(comp);
    console.log(temp);
  });
};

const subscribe = () => {
  //   let sub = new Subscribe({
  //     deviceId: "sjffsdlkjfdslfj",
  //     location: "Bhaktapur"
  //   });

  sub.save(err => {
    if (err) console.log(err);
  });
};

complaints("dfdf");
module.exports = { complaints, subscribe };

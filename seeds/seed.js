const connection = require("../config/connection");
const { User, Reaction, Thought } = require("../models");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  //drop existing Users
  await User.deleteMany({});

  //drop exisitng thoughts
  await Thought.deleteMany({});
});

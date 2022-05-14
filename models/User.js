const { Schema, model } = require("mongoose");
const thoughtSchema = require("./Thought");

//schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    thoughts: [thoughtSchema],
    friends: [userSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

//Virtual property 'friendCount' : returns total friend count

userSchema.Schema.virtual("friendCount")
  //getter
  .get(function () {
    return `${this.friends.length}`;
  });

const User = model("user", userSchema);
module.exports = User;

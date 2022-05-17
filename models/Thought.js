const { Schema, model } = require("mongoose");
const Reaction = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min: 1,
      max: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

//virtual returns formatted date
thoughtSchema.method("getDate", function () {
  const date = new Date(this.createdAt);
  const formattedDate = `${date.getMonth()} ${date.getDay()}, ${date.getFullYear()}`;
  return formattedDate;
});
//virtual property reactionCount: returns number of reactions
thoughtSchema
  .virtual("reactionCount")
  //getter
  .get(function () {
    return `${this.reactions.length}`;
  });

const Thought = model("thought", thoughtSchema);
module.exports = Thought;

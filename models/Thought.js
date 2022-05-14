const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

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
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

//virtual property reactionCount: returns number of reactions
thoughtSchema.Schema.virtual("reactionCount")
  //getter
  .get(function () {
    return `${this.reactions.length}`;
  });

const Thought = model("thought", thoughtSchema);
module.exports = Thought;

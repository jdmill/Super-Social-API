const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      max_length: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

reactionSchema.method("getDate", function () {
  const date = new Date(this.createdAt);
  const formattedDate = `${date.getMonth()} ${date.getDay()}, ${date.getFullYear()}`;
  return formattedDate;
});

module.exports = reactionSchema;

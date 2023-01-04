const { Schema, model } = require("mongoose");
const reactionSchema = require("./reaction");

const reactionSchema = new Schema({
  reactionId: {
    type: mongoose.datatype.ObjectId,
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
});

userSchema.virtual("reactionCount").get(() => {
  return this.reactions.length;
});

const Thought = mongoose.model("thought", thoughtSchema);

module.export = Thought;

const { Schema, model } = require("mongoose");
const reactionSchema = require("./reaction");

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    maxlength: 280,
    minlength: 1,
  },
  createdAt: {
    type: Date,
    createdAt: Data.now,
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

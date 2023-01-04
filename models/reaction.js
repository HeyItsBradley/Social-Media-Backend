const { Schema, model } = require("mongoose");
const reactionSchema = require("./reaction");

const reactionSchema = new Schema({
  reactionId: {
    type: mongoose.datatype.ObjectId,
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const { user, thought } = require("../models");

module.exports = {
  getThoughts(req, res) {
    thought
      .find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    thought
      .findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json("No thought with that Id")
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  addThought(req, res) {
    console.log("you are adding a thought");
    console.log(req.body);
    thought
      .create(req.body)
      .then((thought) => {
        return user.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } }
        );
      })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json("Thought create but no user found with that Id")
          : res.json("Created thought")
      )
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  updateThought(req, res) {
    thought
      .findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
      .then((thought) =>
        !thought
          ? res.status(404).json("no thought found with that Id")
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteThought(req, res) {
    thought
      .findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json("no thought with that Id Found")
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  addReaction(req, res) {
    thought
      .findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } }
      )
      .then((thought) => res.status(200).json(thought))
      .catch((err) => res.status(500).json(err));
  },
  deleteReaction(req, res) {
    thought
      .findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } }.then(
          (thought) => res.status(200).json(thought)
        )
      )
      .catch((err) => res.status(500).json(err));
  },
};

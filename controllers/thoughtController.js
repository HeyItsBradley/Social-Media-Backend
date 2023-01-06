const { User, Thought } = require("../models");

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thought) => {
        return res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
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
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
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
    Thought.findOneAndUpdate(
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
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json("no thought with that Id Found")
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } }
    )
      .then((thought) => res.status(200).json(thought))
      .catch((err) => res.status(500).json(err));
  },
  deleteReaction(req, res) {
    console.log(
      `trying to remove reactionId(${req.params.reactionId}) from thought with id ${req.params.thoughtId}`
    );
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } }
    )
      .then((thought) => res.status(200).json(thought))
      .catch((err) => res.status(500).json(err));
  },
};

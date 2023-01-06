const { user, thought } = require("../models");

module.export = {
  getUsers(req, res) {
    user.find().then(async (users) => {
      const userObj = {
        users,
      };
      return res.json(userObj);
    });
  },
  getSingleUser(req, res) {
    user
      .findOne({ _id: req.params.userId })
      .select("-__v")
      .lean()
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "no user with that ID" })
          : res.json({ user })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  createUser(req, res) {
    user
      .create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  deleteUser(req, res) {
    user
      .findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "no user with that Id found" })
          : thought.findOneAndUpdate(
              { users: req.params.userId },
              { $pull: { users: req.params.userId } },
              { new: true }
            )
      )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "User was deleted but no thoughts found" })
          : res.json({ message: "User sucessfully deleted" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  addThought(req, res) {
    console.log("you are adding a thought");
    console.log(req.body);
    user
      .findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { thoughts: req.body } },
        { runValidators: true, new: true }
      )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that Id" })
          : res.json(user)
      )
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  removeThought(req, res) {
    user
      .findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { thought: { thoughtId: req.params.thoughtId } } },
        { runValidators: true, new: true }
      )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "no user found with that id" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};

const { User, Thought } = require("../models");

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => {
        return res.json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")

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
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No student found with that id" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.deleteOne({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "no user with that Id found" })
          : res.status(200).json("User was deleted")
      )

      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendsId } }
    )
      .then((user) => res.status(200).json(user))
      .catch((err) => res.status(500).json(err));
  },
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendsId } }
    )
      .then((user) =>
        !user
          ? res.status(404).json("no user with that id found")
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};

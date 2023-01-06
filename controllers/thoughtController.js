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
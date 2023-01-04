const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUsers,
  deleteUser,
  addThought,
  removeThought,
} = require("../../controllers/userController");

// /api/user
router.route("/").get(getUsers).post(createUsers);

// /api/user/:userId
router.route("/:userId").get(getSingleUser).delete(deleteUser);

// /api/user/:userId/thoughts
router.route("/:userId/thoughts").post(addThought);

// /api/students/:studentId/assignments/:assignmentId
router.route("/:userId/thoughts/:thoughtId").delete(removeThought);

module.exports = router;

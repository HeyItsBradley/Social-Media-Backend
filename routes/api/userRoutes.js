const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController.js");

// /api/user
router.route("/").get(getUsers).post(createUser);

// /api/user/:userId
router.route("/:userId").get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/user/:userId/friends/:friendsId
router
  .route("/:userId/friends/:friendsId")
  .post(addFriend)
  .delete(deleteFriend);

module.exports = router;

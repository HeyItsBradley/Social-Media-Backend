const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUsers,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

// /api/user
router.route("/").get(getUsers).post(createUsers);

// /api/user/:userId
router.route("/:userId").get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/user/:userId/friends/:friendsId
router
  .route("/:userId/friends/:friendsId")
  .post(addFriend)
  .delete(deleteFriend);

module.exports = router;

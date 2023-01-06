const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  addThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController.js");

// /api/thought
router.route("/").get(getThoughts).post(addThought);

// /api/thought/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .delete(deleteThought)
  .put(updateThought);

// /api/thought/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction);

// /api/thought/:thoughtId/:reactionId

router.route("/:thoughtId/:reactionId").delete(deleteReaction);

module.exports = router;

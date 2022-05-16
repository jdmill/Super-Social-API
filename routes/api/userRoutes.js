const router = require("express").Router();
const {
  getUsers,
  getUserById,
  createPost,
  updateUserById,
  deleteUserById,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

module.exports = router;

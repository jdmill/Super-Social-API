const { ObjectId } = require("mongoose").Types;
const { User, Thought, Reaction } = require("../models");

const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(400).json(err);
  }
};

const addUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

//removes user and all thoughts and reactions
const deleteUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    const username = user.username;
    //removes the user from the collection
    const remUser = await User.findOneAndRemove({ _id: req.params.userId });
    //removes all thoughts and reactions associated with the user
    const remThoughts = await Thought.deleteMany({ username: username });
    const remReaction = await Reaction.deleteMany({ username: username });

    //removes the user from all user's friendlist
    await User.updateMany(
      { friends: req.params.userId },
      { $pull: { friends: req.params.userId } }
    );
    res
      .status(200)
      .json(
        `${remUser} has been deleted with ${remThoughts.deletedCount} thoughts and ${remReaction} reactions`
      );
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateUserById = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

const addFriend = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      {
        _id: req.params.userId,
      },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    );
    await User.findOneAndUpdate(
      {
        _id: req.params.friendId,
      },
      { $addToSet: { friends: req.params.userId } },
      { runValidators: true, new: true }
    );
    res
      .status(200)
      .json(`${req.params.userId} and ${req.params.friendId} are now friends`);
  } catch (err) {}
};

const deleteFriend = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      {
        _id: req.params.userId,
      },
      { $pull: { friends: req.params.friendId } }
    );
    await User.findOneAndUpdate(
      {
        _id: req.params.friendId,
      },
      { $pull: { friends: req.params.userId } }
    );
    res
      .status(200)
      .json(
        `${req.params.userId} and ${req.params.friendId} are no longer friends`
      );
  } catch (err) {
    res.status(400).json(err);
  }
};
module.exports = {
  getUsers,
  addUser,
  getUserById,
  deleteUserById,
  updateUserById,
  addFriend,
  deleteFriend,
};

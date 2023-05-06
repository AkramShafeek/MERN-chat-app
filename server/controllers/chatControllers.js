const Chat = require('../models/ChatModel');
const User = require('../models/UserModel');

const fetchChat = async (req, res) => {
  const response = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 });
  await User.populate(response, { path: "latestMessage.sender", select: "name pic email" });
  res.status(200).send(response);
}

const accessChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("user id not sent with request");
    throw new Error("user id not sent with request");
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ]
  }).populate("users", "-password").populate("latestMessage");

  isChat = await User.populate(isChat, { path: 'latestMessage.sender', select: 'name pic email' });

  if (isChat.length > 0)
    res.status(200).send(isChat[0]);
  else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password");

      res.status(200).send(fullChat);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

const createGroupChat = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    throw new Error("Please fill all the fields");
  }
  var users = req.body.users;

  if (users.length < 2) {
    throw new Error("More than 2 users are required to form a group chat");
  }

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user._id,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    throw new Error(error.message);
  }
}

const renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;
  const updatedChat = await Chat.findByIdAndUpdate(chatId, { chatName: chatName }, { new: true })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat)
    throw new Error("Chat not found");
  else
    res.status(200).json(updatedChat);

}

const addToGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  const added = await Chat.findByIdAndUpdate(chatId, { $push: { users: userId } }, { new: true })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added)
    throw new Error("Chat not found");
  else
    res.status(200).json(added);

}

const removeFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  const removed = await Chat.findByIdAndUpdate(chatId, { $pull: { users: userId } }, { new: true })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed)
    throw new Error("Chat not found");
  else
    res.status(200).json(removed);

}

module.exports = { fetchChat, accessChat, createGroupChat, renameGroup, addToGroup, removeFromGroup };
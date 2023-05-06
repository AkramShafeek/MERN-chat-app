const Chat = require('../models/ChatModel');
const User = require('../models/UserModel');

const fetchChat = (req, res) => {

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
      users: [req.user._id,userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({_id: createdChat._id}).populate("users", "-password");

      res.status(200).send(fullChat);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

const createGroupChat = (req, res) => {

}

const renameGroup = (req, res) => {

}

const addToGroup = (req, res) => {

}

const removeFromGroup = (req, res) => {

}

module.exports = { fetchChat, accessChat, createGroupChat, renameGroup, addToGroup, removeFromGroup };
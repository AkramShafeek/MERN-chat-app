const Message = require('../models/MessageModel');
const User = require('../models/UserModel');
const Chat = require('../models/ChatModel');

const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    throw new Error("Invalid message data");
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  var message = await Message.create(newMessage);

  message = await message.populate("sender", "name pic");
  message = await message.populate("chat");
  message = await User.populate(message, {
    path: 'chat.users',
    select: "name pic email",
  });

  await Chat.findByIdAndUpdate(chatId, {
    latestMessage: message,
  });

  res.status(200).json(message);
}

const getAllMessages = async (req, res) => {
  const messages = await Message.find({ chat: req.params.chatId }).sort({ createdAt: 1 })
    .populate("sender", "name pic")
    .populate("chat");

  res.status(200).send(messages);
}

module.exports = { sendMessage, getAllMessages };
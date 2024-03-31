const { Message, User } = require("../../../db/models");

async function saveMessage(msg) {
  try {
    const { username, message, chatRoomId } = msg;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return Promise.reject(new Error("User not found"));
    }
    const messageDto = {
      message,
      chatRoomId,
      userId: user.id,
    };
    return await Message.create(messageDto);
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = saveMessage;

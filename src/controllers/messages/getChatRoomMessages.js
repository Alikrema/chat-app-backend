const { Message, User } = require("../../../db/models");
const getChatRoomMessages = async (req, res) => {
  try {
    console.log("sdsdda");
    const { chatRoomId } = req.params;
    const messages = await Message.findAll({
      where: { chatRoomId },
      include: User,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getChatRoomMessages;

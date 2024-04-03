const { Message, User } = require("../../../db/models");
const getChatRoomMessages = async (req, res) => {
  try {
    const { chatRoomId } = req.params;
    const messages = await Message.findAll({
      where: { chatRoomId },
      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
      ],
      attributes: ["id", "message", "createdAt"],
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getChatRoomMessages;
